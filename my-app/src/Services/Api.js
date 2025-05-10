import axios from 'axios';

// ✅ TMDb API Config
const API_KEY = 'eb03df251074313f6e24c705f23a1cdc';
const BASE_URL = 'https://api.themoviedb.org/3';

// ✅ Create reusable Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// ✅ Utility: Get full image URL
export const getImgUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// ✅ Fetch trending movies
export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get('/trending/movie/week', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw new Error('Failed to fetch trending movies');
  }
};

// ✅ Search movies by query
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies');
  }
};

// ✅ Fetch movie details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits', // Append additional info like videos and credits
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details');
  }
};

// ✅ Fetch all genres
export const fetchGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw new Error('Failed to fetch genres');
  }
};

// ✅ Fetch movies by genre
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw new Error('Failed to fetch movies by genre');
  }
};
