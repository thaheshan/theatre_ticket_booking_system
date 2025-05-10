import React, { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { Loader } from 'lucide-react';

/**
 * @param {Object} props
 * @param {Array} props.movies
 * @param {boolean} props.loading
 * @param {string|null} props.error
 * @param {boolean} props.hasMore
 * @param {Function} props.onLoadMore
 * @param {Function} props.onMovieClick
 * @param {string} [props.emptyMessage]
 */
const MovieGrid = ({
  movies,
  loading,
  error,
  hasMore,
  onLoadMore,
  onMovieClick,
  emptyMessage = 'No movies found',
}) => {
  const observer = useRef(null);

  const loadMoreRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Error message if there was an issue fetching the movies
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-40 text-red-500 dark:text-red-400"
      >
        <p>{error}</p>
      </motion.div>
    );
  }

  // Empty message when no movies are available
  if (!loading && movies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-40 text-gray-500 dark:text-gray-400"
      >
        <p>{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <div className="py-4">
      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div onClick={() => onMovieClick(movie.id)} className="cursor-pointer">
              <MovieCard movie={movie} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Loading more indicator */}
      {(loading || hasMore) && (
        <div ref={loadMoreRef} className="flex justify-center items-center py-8">
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
            >
              <Loader size={20} className="animate-spin" />
              <span>Loading more movies...</span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
