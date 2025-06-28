import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mht-cet-navigator.onrender.com';

export const API_ENDPOINTS = {
  // User endpoints
  LOGIN: `${API_BASE_URL}/api/users/login`,
  REGISTER: `${API_BASE_URL}/api/users/register`,
  PROFILE: `${API_BASE_URL}/api/users/profile`,
  
  // Prediction endpoints
  PREDICT: `${API_BASE_URL}/api/prediction/predict`,
  PREDICT_JEE: `${API_BASE_URL}/api/prediction/predict-jee`,
  
  // Branch endpoints
  BRANCHES: `${API_BASE_URL}/api/branches/standardized`,
  
  // College endpoints
  COLLEGES: `${API_BASE_URL}/api/colleges`,
  COLLEGES_BY_DISTRICT: `${API_BASE_URL}/api/colleges/district`,
  DISTRICTS: `${API_BASE_URL}/api/colleges/districts`,
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API_ENDPOINTS; 