import axios from 'axios';
import qs from 'qs';

import { useAuthStore } from '../store/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  paramsSerializer: function (params) {
    return qs.stringify(params);
  },
});

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  paramsSerializer: function (params) {
    return qs.stringify(params);
  },
  withCredentials: true,
});

privateApi.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
