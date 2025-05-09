import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { fetchTrendingMovies } from '../Services/Api';

import MovieGrid from '../Components/Movies/MovieGrid';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setTrendingMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

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

  const parallaxScale = 1 + scrollProgress * 0.2;
  const contentScale = 1 - scrollProgress * 0.3;
  const contentOpacity = 1 - scrollProgress * 1.5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
            transform: `scale(${parallaxScale})`,
          }}
        />
        <div
          className="relative px-4 text-center transition-all duration-300 ease-out"
          style={{
            transform: `scale(${contentScale})`,
            opacity: contentOpacity,
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
            Discover Your Next
            <span className="block mt-2 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              Favorite Film
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
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
              className="w-full py-6 px-8 pl-16 rounded-full text-lg text-white bg-black/30 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 placeholder-gray-400"
            />
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search size={24} className="text-gray-400 group-focus-within:text-white transition-colors" />
            </div>
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Trending Movies
            </span>
          </h2>

          <MovieGrid
            movies={trendingMovies}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
