import axios from 'axios';

// Remove the apiUrl variable if it's not used elsewhere
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_TARGET_PROD : process.env.REACT_APP_API_TARGET_LOCAL,
});

export default api;
