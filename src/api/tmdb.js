import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${VITE_API_TOKEN}`,
  },
};

export const getTrends = (params) => {
  const url = "/trending/movie/day?language=en-US";
  return axios.get(url, options).then((response) => response.data);
};

export const searchMovie = (params) => {
  const url = "/search/movie";
  return axios
    .get(url, { ...options, params })
    .then((response) => response.data);
};

export const getMovieDetail = (movie_id) => {
  const url = `/movie/${movie_id}`;
  return axios.get(url, options).then((response) => response.data);
};

export const getMovieCast = (movie_id) => {
  const url = `/movie/${movie_id}/credits`;
  return axios.get(url, options).then((response) => response.data);
};

export const getMovieReviews = (movie_id) => {
  const url = `/movie/${movie_id}/reviews`;
  return axios.get(url, options).then((response) => response.data);
};
