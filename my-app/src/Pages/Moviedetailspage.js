import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader } from 'lucide-react';
import { getMovieDetails } from '../Services/Api';
import MovieDetails from '../Components/Movies/MovieDetails';
import Button from '../Components/UI/Button';

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get movie ID from the URL
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null); // State to store movie data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message if fetching fails

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Handle "Go Back" button
  const handleGoBack = () => {
    const fromPath = location.state?.from || '/';
    navigate(fromPath);  // Navigate back to the previous page or default to '/'
  };

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
          <Loader size={30} className="animate-spin mb-2" />
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">
            {error || 'Movie not found'}
          </p>
          <Button onClick={handleGoBack} icon={<ArrowLeft size={18} />}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-4">
        <Button 
          onClick={handleGoBack}
          variant="ghost"
          className="mb-4"
          icon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
      </div>

      <MovieDetails movie={movie} />
    </motion.div>
  );
};

export default MovieDetailsPage;
