import axios from "axios";
import { getToken, removeToken } from "../stores/authStore";

const DEFAULT_TIMEOUT = 30000;
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("/auth/checkPassword")
    ) {
      // 토큰 만료 등 인증 실패
      removeToken();
      alert("인증 실패!");
      window.location.href = "/login";
      return;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
