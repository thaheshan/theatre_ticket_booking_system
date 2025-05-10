import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchTrendingMovies, searchMovies } from '../Services/Api'; // Updated to match previous JS API module

const MovieContext = createContext(undefined);

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Load last search on mount
  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setSearchQuery(lastSearch);
      searchForMovies(lastSearch);
    }
  }, []);

  const fetchTrending = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchTrendingMovies(page);

      if (page === 1) {
        setTrendingMovies(results);
      } else {
        setTrendingMovies(prev => [...prev, ...results]);
      }

      setCurrentPage(page);
      setTotalPages(10); // TMDb free API doesn't return total pages with `/trending`
    } catch (err) {
      console.error(err);
      setError('Failed to fetch trending movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchForMovies = async (query, page = 1) => {
    if (!query.trim()) {
      setSearchResults([]);
      setCurrentPage(1);
      setTotalPages(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await searchMovies(query, page);

      if (page === 1) {
        setSearchResults(response.results);
      } else {
        setSearchResults(prev => [...prev, ...response.results]);
      }

      setCurrentPage(response.page);
      setTotalPages(response.total_pages);

      localStorage.setItem('lastSearch', query);
    } catch (err) {
      console.error(err);
      setError('Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!isMovieFavorite(movie.id)) {
      setFavorites(prev => [...prev, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isMovieFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        favorites,
        loading,
        error,
        searchQuery,
        currentPage,
        totalPages,
        fetchTrendingMovies: fetchTrending,
        searchForMovies,
        addToFavorites,
        removeFromFavorites,
        isMovieFavorite,
        setSearchQuery,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
