import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { useMovies } from '../../Context/MovieContext';
import { useAuth } from '../../Context/Authcontext';
import { fetchMovieDetails, getImageUrl } from '../../Services/Api';

// Cast Member Component with hover & animation
const CastMember = ({ cast }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm"
  >
    <div className="aspect-square overflow-hidden rounded-lg mb-3">
      <img
        src={getImageUrl(cast.profile_path)}
        alt={cast.name}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
      />
    </div>
    <h4 className="text-white font-semibold text-center">{cast.name}</h4>
    <p className="text-gray-400 text-sm text-center">{cast.character}</p>
  </motion.div>
);

// Review Form Component
const ReviewForm = ({ movieId, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Rating</label>
        <input
          type="range"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-white">{rating}/10</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
};

// Main MovieDetails Component
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { addToFavorites, removeFromFavorites, isMovieFavorite } = useMovies();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setReviews(data.reviews || []);
      } catch (err) {
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  if (loading) return <div className="text-center text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-6">{error}</div>;
  if (!movie || !movie.id) return null;

  const isFavorite = isMovieFavorite(movie.id);
  const cast = movie.credits?.cast || [];
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  const backdropPath = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;
  const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';

  const toggleFavorite = () => {
    isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  const handleAddReview = (rating, comment) => {
    const newReview = {
      id: Date.now().toString(),
      userId: user?.id || '',
      movieId: movie.id,
      rating,
      comment,
      createdAt: new Date().toISOString(),
      username: user?.username || 'Anonymous',
    };
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="relative">
      {backdropPath && (
        <div className="absolute inset-0 h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backdropPath})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900" />
        </div>
      )}

      <div className="relative container mx-auto px-4 pt-[20vh]">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-1/3 lg:w-1/4"
          >
            <img
              src={posterPath}
              alt={`${movie.title} poster`}
              className="w-full rounded-lg shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'} transition-colors`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={24} className={isFavorite ? 'fill-current' : ''} />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-white/80">
              <div className="flex items-center gap-2"><Calendar size={18} /><span>{releaseYear}</span></div>
              {movie.runtime && <div className="flex items-center gap-2"><Clock size={18} /><span>{movie.runtime} minutes</span></div>}
              <div className="flex items-center gap-2"><Star size={18} className="text-yellow-400" /><span>{movie.vote_average?.toFixed(1) || 'N/A'}</span></div>
              {movie.vote_count > 0 && <div className="flex items-center gap-2"><Users size={18} /><span>{movie.vote_count.toLocaleString()} votes</span></div>}
            </div>

            {movie.overview && <p className="text-lg text-white/90 mb-6 leading-relaxed">{movie.overview}</p>}

            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">{genre.name}</span>
                ))}
              </div>
            )}

            {cast.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl text-white font-semibold mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {cast.map((member) => <CastMember key={member.id} cast={member} />)}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl text-white font-semibold mb-4 flex items-center gap-2"><MessageSquare size={24} /> Reviews</h2>
              {isAuthenticated ? <ReviewForm movieId={movie.id} onSubmit={handleAddReview} /> : <p className="text-white/70">Please log in to leave a review.</p>}
              <div className="mt-6 space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-white/10 rounded-md text-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{review.username}</span>
                        <span>{review.rating}/10</span>
                      </div>
                      <p className="text-white/80">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-white/70">No reviews yet.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
