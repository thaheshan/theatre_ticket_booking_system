import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchTrendingMovies } from '../Services/Api';
import MovieGrid from '../Components/Movies/MovieGrid';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTrendingMovies(currentPage);
        if (data && data.results) {
          setTrendingMovies((prev) => [...prev, ...data.results]);
          setTotalPages(data.total_pages || 1);
        } else {
          setError('No movies found.');
        }
      } catch (err) {
        console.error('Error fetching trending movies:', err);
        setError('Failed to fetch trending movies.');
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const progress = Math.min(scrollPosition / heroHeight, 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const parallaxScale = 1 + scrollProgress * 0.2;
  const contentScale = 1 - scrollProgress * 0.3;
  const contentOpacity = 1 - scrollProgress * 1.5;

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${parallaxScale})`,
          }}
        >
          <div className="w-full h-full bg-white/60 dark:bg-black/50" />
        </div>

        <div
          className="relative px-4 text-center transition-all duration-300 ease-out"
          style={{
            transform: `scale(${contentScale})`,
            opacity: contentOpacity,
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Discover Your Next
            <span className="block mt-2 bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
              Favorite Film
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of movies, from timeless classics to the latest blockbusters.
            Your next cinematic journey begins here.
          </p>

          <form
            onSubmit={handleSearch}
            className="w-full max-w-2xl relative group mx-auto"
          >
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-6 px-8 pl-16 rounded-full text-lg text-gray-900 dark:text-white bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-300 dark:border-white/20 shadow-md dark:shadow-[0_0_30px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-black/30 dark:focus:ring-white/30 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search size={24} className="text-gray-500 dark:text-gray-300" />
            </div>
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 mb-8">
            <Film size={24} className="text-black dark:text-white" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
          </div>

          <MovieGrid
            movies={trendingMovies}
            loading={loading}
            onLoadMore={handleLoadMore}
            error={error}
            onMovieClick={handleMovieClick}
            hasMore={currentPage < totalPages}
            emptyMessage="No trending movies available at the moment. Please check back later."
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
