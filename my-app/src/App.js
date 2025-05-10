import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './Context/Themecontext';
import { AuthProvider, useAuth } from './Context/Authcontext';
import { MovieProvider } from './Context/MovieContext';
import { FavoritesProvider } from './Context/Favouritecontext'; 

// Layout Components
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import LoginForm from './Components/Layout/Loginform';

// Pages
import HomePage from './Pages/Homepage';
import SearchPage from './Pages/Searchpage';
import MovieDetails from './Components/Movies/MovieDetails';
import FavoritesPage from './Pages/Favouritespage';

// 🔐 Protected Route wrapper
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// 🎬 Main App Content
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'MovieExplorer';
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200">
        {isAuthenticated && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />}
            />
            <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="/search/:query" element={<ProtectedRoute element={<SearchPage />} />} />
            <Route path="/movie/:id" element={<ProtectedRoute element={<MovieDetails />} />} />
            <Route path="/favorites" element={<ProtectedRoute element={<FavoritesPage />} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

// 🌍 Root App with All Providers
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <FavoritesProvider>
            <AppContent />
          </FavoritesProvider>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
