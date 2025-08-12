import axios from 'axios';

const API = axios.create({
  //baseURL: 'http://localhost:5000/api', // Adjust if using a different port or domain
  baseURL: 'https://react-blog-application-6gp4.onrender.com/api',
});

// Add auth token to headers if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
