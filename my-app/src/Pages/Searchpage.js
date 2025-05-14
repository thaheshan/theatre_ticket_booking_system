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
  const [sortOption, setSortOption] = useState('');

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
      const genreList = await getGenres();
      setGenres(genreList);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query && query !== searchQuery) {
        setSearchQuery(query);
        searchForMovies(query, { ...filters, sortBy: sortOption });
      } else if (searchQuery) {
        searchForMovies(searchQuery, { ...filters, sortBy: sortOption });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, filters, sortOption, searchQuery, searchForMovies, setSearchQuery]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      searchForMovies(searchQuery, { ...filters, sortBy: sortOption }, currentPage + 1);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    // Sync with filters state
    setFilters((prevFilters) => ({ ...prevFilters, sortBy: value || undefined }));
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
          <div className="flex items-center space-x-4">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-white focus:outline-none"
            >
              <option value="">Sort By</option>
              <option value="popularity.desc">Popularity ↓</option>
              <option value="popularity.asc">Popularity ↑</option>
              <option value="vote_average.desc">Rating ↓</option>
              <option value="vote_average.asc">Rating ↑</option>
              <option value="release_date.desc">Release Date ↓</option>
              <option value="release_date.asc">Release Date ↑</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
          </div>
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
