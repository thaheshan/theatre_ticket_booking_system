import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { searchMovies } from '../Services/Api';
import MovieGrid from '../Components/Movies/MovieGrid';

const SearchPage = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const observer = useRef(null);
  const loadingRef = useRef(null);

  const searchForMovies = useCallback(async (searchQuery, pageNum, append = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(searchQuery, pageNum);

      if (append) {
        setMovies(prev => [...prev, ...data.results]);
      } else {
        setMovies(data.results);
        document.title = `Search: ${searchQuery} | MovieExplorer`;
      }

      setTotalPages(data.total_pages);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to load search results. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      setPage(1);
      searchForMovies(query, 1, false);
    }

    return () => {
      document.title = 'MovieExplorer';
    };
  }, [query, searchForMovies]);

  useEffect(() => {
    const handleObserver = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && page < totalPages) {
        setPage(prev => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 0.1,
    });

    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, page, totalPages]);

  useEffect(() => {
    if (page > 1 && query) {
      searchForMovies(query, page, true);
    }
  }, [page, query, searchForMovies]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {movies.length ? (
            `Search results for "${query}"`
          ) : loading && page === 1 ? (
            'Searching...'
          ) : (
            `No results found for "${query}"`
          )}
        </h1>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <MovieGrid movies={movies} loading={loading && page === 1} />

        {page < totalPages && (
          <div ref={loadingRef} className="w-full py-8 flex justify-center">
            {loading && page > 1 ? (
              <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Scroll for more results</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
