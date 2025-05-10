import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Calendar, Clock, Users } from 'lucide-react';
import { useMovies } from '../../Context/MovieContext';
import { fetchMovieDetails } from '../../Services/Api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, removeFromFavorites, isMovieFavorite } = useMovies();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
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

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Unknown';

  const backdropPath = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="relative">
      {backdropPath && (
        <div className="absolute inset-0 h-[50vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropPath})` }}
          />
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
                className={`p-2 rounded-full ${
                  isFavorite ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={24} className={isFavorite ? 'fill-current' : ''} />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{releaseYear}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{movie.runtime} minutes</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-400" />
                <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
              </div>
              {movie.vote_count > 0 && (
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{movie.vote_count.toLocaleString()} votes</span>
                </div>
              )}
            </div>

            {movie.overview && (
              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                {movie.overview}
              </p>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
