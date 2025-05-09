const API_KEY = 'b1ea75a9bcee77fa9385e893d781108e'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const getImgUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
};



export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};
