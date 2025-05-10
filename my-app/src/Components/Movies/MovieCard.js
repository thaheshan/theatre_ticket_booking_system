import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { useMovies } from '../../Context/MovieContext'; 

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isMovieFavorite } = useMovies();

  // Safety check in case movie is undefined
  if (!movie || !movie.id) return null;

  const isFavorite = isMovieFavorite(movie.id);

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Unknown';

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative h-0 pb-[150%]">
          <img
            src={posterPath}
            alt={`${movie.title} poster`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-bold truncate">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm">{releaseYear}</span>
            <div className="flex items-center space-x-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">
                {movie.vote_average?.toFixed(1) || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isFavorite ? 'bg-white/20 text-red-500' : 'bg-black/20 text-white hover:text-red-500'
        } transition-colors z-20`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
      </button>
    </motion.div>
  );
};

export default MovieCard;
