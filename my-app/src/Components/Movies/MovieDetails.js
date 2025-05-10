import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader } from 'lucide-react';
import { fetchMovieDetails } from '../../Services/Api';
import MovieDetails from '../../Components/Movies/MovieDetails';
import Button from '../../Components/UI/Button';

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get movie ID from URL params
  const navigate = useNavigate(); // To navigate the user back
  const [movie, setMovie] = useState(null); // Store movie data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch movie details when component mounts or when `id` changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return; // Prevent fetch if ID is invalid

      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieDetails(id); // Fetch data using the API function
        console.log('Fetched movie data:', data); // Log the response for debugging
        setMovie(data); // Set the movie data
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
        console.error(err); // Log error
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchMovieDetails(); // Call the function to fetch data
  }, [id]); // Re-run if `id` changes

  // Handle the back button click
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Show loading state
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

  // Show error or "movie not found" if movie data is missing or there's an error
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

  // Render the movie details page after fetching the data
  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial opacity for fade-in effect
      animate={{ opacity: 1 }} // Final opacity
      exit={{ opacity: 0 }} // Exit opacity for fade-out effect
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-4">
        {/* Back button */}
        <Button
          onClick={handleGoBack}
          variant="ghost"
          className="mb-4"
          icon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
      </div>

      {/* Movie Details Component */}
      <MovieDetails movie={movie} />
    </motion.div>
  );
};

export default MovieDetailsPage;
