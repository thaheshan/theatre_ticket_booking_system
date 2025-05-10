import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Authcontext';
import { useTheme } from '../../Context/Themecontext';
import { Search, Moon, Sun, LogOut, Heart } from 'lucide-react';

import logo from '../../log0.png'; // Custom logo

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-black shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white"
        >
          <img src={logo} alt="MovieExplorer Logo" className="h-8 w-8 object-contain" />
          <span>MovieExplorer</span>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="py-2 pl-10 pr-4 w-64 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                />
                <Search className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" size={18} />
              </form>

              <nav className="hidden md:flex items-center space-x-4 text-gray-900 dark:text-white">
                <Link to="/" className="hover:underline px-2">Home</Link>
                <Link to="/favorites" className="hover:underline px-2 flex items-center">
                  <Heart size={16} className="mr-1" /> Favorites
                </Link>
              </nav>
            </>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              toggleTheme();
              document.documentElement.classList.toggle('dark'); // 👈 Applies theme globally
            }}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-white" />
            ) : (
              <Moon size={20} className="text-gray-900" />
            )}
          </button>

          {isAuthenticated && (
            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Logout"
            >
              <LogOut size={20} className="text-gray-900 dark:text-white" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
