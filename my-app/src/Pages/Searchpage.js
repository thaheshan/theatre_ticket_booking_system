import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { useMovies } from '../Context/MovieContext';
import MovieGrid from '../Components/Movies/MovieGrid';
import SearchFilters from '../Components/Search/SearchFilters';
import { getGenres } from '../Services/Api';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [genres, setGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});

  const {
    searchResults,
    searchQuery,
    loading,
    error,
    searchForMovies,
    setSearchQuery,
    currentPage,
    totalPages
  } = useMovies();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (err) {
        console.error('Failed to load genres', err);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    if (query && query !== searchQuery) {
      setSearchQuery(query);
      searchForMovies(query, filters);
    } else if (!query && searchQuery) {
      searchForMovies(searchQuery, filters);
    }
  }, [query, searchQuery, filters, searchForMovies, setSearchQuery]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      searchForMovies(searchQuery, filters, currentPage + 1);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    searchForMovies(searchQuery, newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <SearchIcon size={24} className="text-black dark:text-white" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : 'Search Results'}
            </h1>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {showFilters && (
            <div className="md:col-span-1">
              <SearchFilters
                genres={genres}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          <div className={showFilters ? 'md:col-span-3' : 'md:col-span-4'}>
            <MovieGrid
              movies={searchResults}
              loading={loading}
              error={error}
              hasMore={currentPage < totalPages}
              onLoadMore={handleLoadMore}
              emptyMessage={searchQuery
                ? `No results found for "${searchQuery}". Try adjusting your filters or search term.`
                : 'Enter a search term to find movies.'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
