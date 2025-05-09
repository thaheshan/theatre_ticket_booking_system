import React from 'react';
import { useFavorites } from '../Context/Favouritecontext';
import MovieGrid from '../Components/Movies/MovieGrid';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Favorite Movies
        </h1>

        {favorites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl text-gray-900 dark:text-white mb-4">
              You haven't added any favorites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore movies and click the heart icon to add them to your favorites.
            </p>
          </div>
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;