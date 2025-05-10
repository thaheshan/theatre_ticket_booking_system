import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Heart, Play } from 'lucide-react';
import { useMovies } from '../../Context/MovieContext';
import Button from '../UI/Button';

const MovieDetails = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isMovieFavorite } = useMovies();
  const [showTrailer, setShowTrailer] = useState(false);
  const isFavorite = isMovieFavorite(movie.id);

//   const releaseYear = movie.release_date
//     ? new Date(movie.release_date).getFullYear()
//     : 'Unknown';

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : 'Unknown release date';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const trailer = movie.videos?.results.find(
    video =>
      video.site === 'YouTube' &&
      (video.type === 'Trailer' || video.type === 'Teaser')
  );

  const director = movie.credits?.crew.find(
    crewMember => crewMember.job === 'Director'
  );

  const cast = movie.credits?.cast.slice(0, 6) || [];

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="relative">
      {/* Backdrop Image */}
      {backdropUrl && (
        <div className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/30 dark:from-black dark:via-black/90 dark:to-black/50 z-10" />
          <img
            src={backdropUrl}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover object-center filter brightness-50"
          />
        </div>
      )}

      {/* Movie Details Content */}
      <div className={`relative z-20 ${backdropUrl ? 'pt-[15vh]' : 'pt-8'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 md:w-1/3 lg:w-1/4 max-w-xs mx-auto md:mx-0"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={posterUrl}
                  alt={`${movie.title} poster`}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Movie Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-2 text-lg italic text-gray-600 dark:text-gray-400">
                  "{movie.tagline}"
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center text-yellow-500">
                  <Star className="fill-current mr-1" size={18} />
                  <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">({movie.vote_count})</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="mr-1" size={18} />
                  <span>{releaseDate}</span>
                </div>

                {movie.runtime && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="mr-1" size={18} />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>

              {director && (
                <div className="mt-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    Director:{' '}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {director.name}
                    </span>
                  </span>
                </div>
              )}

              {cast.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Cast
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {cast.map(actor => (
                      <div key={actor.id} className="flex items-center space-x-2">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
                              : 'https://via.placeholder.com/92x138?text=No+Image'
                          }
                          alt={actor.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-800 dark:text-gray-200">
                          {actor.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  onClick={handleFavoriteToggle}
                  variant="outline"
                  icon={
                    <Heart
                      size={18}
                      className={isFavorite ? 'fill-red-500 text-red-500' : ''}
                    />
                  }
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>

                {trailer && (
                  <Button onClick={() => setShowTrailer(true)} icon={<Play size={18} />}>
                    Watch Trailer
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-4xl mx-auto">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              aria-label="Close trailer"
            >
              <span className="text-xl">✕</span>
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
