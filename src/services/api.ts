/**
 * @fileoverview API service layer for handling backend communication
 */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Authentication API endpoints
 */
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'seeker' | 'helper';
    helperType?: 'licensed' | 'non_traditional';
    seekerType?: 'licensed' | 'non_traditional' | 'all';
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

/**
 * Seeker API endpoints
 */
export const seekerAPI = {
  getMatches: async (limit?: number) => {
    const response = await api.get('/seeker/matches', {
      params: { limit },
    });
    return response.data;
  },

  updatePreferences: async (preferences: any) => {
    const response = await api.put('/seeker/preferences', preferences);
    return response.data;
  },
};

/**
 * Helper API endpoints
 */
export const helperAPI = {
  getProfile: async () => {
    const response = await api.get('/helper/profile');
    return response.data;
  },

  updateProfile: async (profile: any) => {
    const response = await api.put('/helper/profile', profile);
    return response.data;
  },
};

export default api; 