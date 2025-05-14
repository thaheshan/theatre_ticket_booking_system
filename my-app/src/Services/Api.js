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
    return { results: [], total_pages: 0, total_results: 0, page: 1 };
  }
};

// ✅ Search movies with filters
export const searchMovies = async (query, filters = {}, page = 1) => {
  try {
    const params = { query, page };

    if (filters.year) {
      params.primary_release_year = filters.year;
    }

    if (filters.rating) {
      params.vote_average_gte = filters.rating;
    }

    if (filters.genre) {
      params.with_genres = filters.genre;
    }

    if (filters.sortBy) {
      params.sort_by = `${filters.sortBy}.desc`;
    }

    const response = await api.get('/search/movie', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0, total_results: 0, page: 1 };
  }
};

// ✅ Fetch movie details (with credits, videos, and reviews)
export const fetchMovieDetails = async (id) => {
  try {
    const [movieResponse, reviewsResponse] = await Promise.all([
      api.get(`/movie/${id}`, {
        params: {
          append_to_response: 'credits,videos',
        },
      }),
      api.get(`/movie/${id}/reviews`),
    ]);

    return {
      ...movieResponse.data,
      reviews: reviewsResponse.data.results,
    };
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
    return [];
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
    return { results: [], total_pages: 0, total_results: 0, page: 1 };
  }
};
