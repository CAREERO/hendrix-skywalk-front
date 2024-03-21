import axios from 'axios';

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_TARGET_PROD : process.env.REACT_APP_API_TARGET_LOCAL;

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
