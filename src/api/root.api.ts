/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const requestInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 20000,
});


// Methods
const requestProtected = {
  get: (url: string) => requestInstance.get(url),
  post: async (url: string, data: any) => requestInstance.post(url, data),
  put: async (url: string, data: any) => requestInstance.put(url, data),
  delete: async (url: string) => requestInstance.delete(url),
}


export default requestProtected


// interceptors
requestInstance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
requestInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('token');
    }

    return error.response
  }
);