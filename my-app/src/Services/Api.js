import axios from 'axios';

const API_KEY = 'eb03df251074313f6e24c705f23a1cdc';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const searchMovies = async (query, filters = {}, page = 1) => {
  try {
    const params = {
      query,
      page,
      include_adult: false,
    };

    if (filters.year) params.primary_release_year = filters.year;
    if (filters.rating) params['vote_average.gte'] = filters.rating;
    if (filters.genre) params.with_genres = filters.genre;

    const endpoint = filters.sortBy ? '/discover/movie' : '/search/movie';

    if (filters.sortBy) params.sort_by = filters.sortBy;

    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0, total_results: 0, page: 1 };
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get('/trending/movie/week', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return { results: [], total_pages: 0, total_results: 0, page: 1 };
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const [movieResponse, reviewsResponse] = await Promise.all([
      api.get(`/movie/${id}`, { params: { append_to_response: 'credits,videos' } }),
      api.get(`/movie/${id}/reviews`)
    ]);

    return {
      ...movieResponse.data,
      reviews: reviewsResponse.data.results,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
export const fetchMovieReviews = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    return [];
  }
};
export const fetchMovieCredits = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return null;
  }
};
export const fetchMovieVideos = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/videos`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return [];
  }
};
export const fetchMovieRecommendations = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/recommendations`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    return [];
  }
};
export const fetchMovieSimilar = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/similar`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
};
