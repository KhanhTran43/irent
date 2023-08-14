import axios, { CreateAxiosDefaults } from 'axios';
import qs from 'qs';

import { useAuthStore } from '../auth';

const defaultConfigs: CreateAxiosDefaults = {
  headers: { 'Content-Type': 'application/json' },
  baseURL: import.meta.env.VITE_BASE_URL,
  paramsSerializer: function (params) {
    return qs.stringify(params);
  },
  timeout: 5000,
};

export const api = axios.create({
  ...defaultConfigs,
});

export const privateApi = axios.create({
  ...defaultConfigs,
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
