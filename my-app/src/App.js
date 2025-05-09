import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context//Themecontext';
import { AuthProvider } from './Context/Authcontext';
import { MovieProvider } from './Context/MovieContext';
import Navbar from './Components/Layout/navbar';
import HomePage from './Pages/Homepage';
import LoginPage from './Pages/loginpage';
import SearchPage from './Pages/Searchpage';
import MovieDetailsPage from './Pages/Moviedetailspage';
import FavoritesPage from './Pages/Favouritespage';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/movie/:id" element={<MovieDetailsPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
              </main>
              <footer className="py-6 px-4 bg-white dark:bg-gray-800 shadow-inner mt-12">
                <div className="container mx-auto">
                  <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Movie Explorer. Powered by TMDb.
                  </p>
                </div>
              </footer>
            </div>
          </Router>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
