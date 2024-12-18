import axios from "axios";

export const BASE_URL_API = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: `${BASE_URL_API}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
