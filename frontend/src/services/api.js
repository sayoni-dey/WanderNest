import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/authRoutes', // Adjust port if your backend uses a different one
  withCredentials: true, // Crucial for sending and receiving httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;