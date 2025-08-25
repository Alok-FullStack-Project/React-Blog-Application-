// src/services/api.js
import axios from 'axios';

// ---------------------------
// Axios instance
// ---------------------------
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------
// Response interceptor
// ---------------------------
API.interceptors.response.use(
  (response) => response.data, // auto-unwrap data
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem('token');
        // optional: window.location.href = "/login";
      }

      return Promise.reject({
        status,
        message: data?.message || 'Something went wrong',
      });
    } else if (error.request) {
      return Promise.reject({
        status: null,
        message: 'No response from server. Check your network.',
      });
    } else {
      return Promise.reject({
        status: null,
        message: error.message || 'Unexpected error',
      });
    }
  }
);

// ---------------------------
// Simplified API Wrapper
// ---------------------------
const api = {
  get: (url, config) => API.get(url, config),
  post: (url, data, config) => API.post(url, data, config),
  put: (url, data, config) => API.put(url, data, config),
  delete: (url, config) => API.delete(url, config),
};

export default api;
