import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_TARGET_PROD || 'http://54.146.118.222:8000' // Fallback URL
  : process.env.REACT_APP_API_TARGET_LOCAL || 'http://localhost:8000'; // Fallback URL

const api = axios.create({
  baseURL: baseURL
});

export default api;
