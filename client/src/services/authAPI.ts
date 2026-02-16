import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      password
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  },

  getMe: async (token: string) => {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  }
};
