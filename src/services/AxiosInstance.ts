import axios from "axios";
import { getToken, removeToken } from "../stores/authStore";

const DEFAULT_TIMEOUT = 30000;
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout:DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
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
    if (error.response?.status === 401) { // 토큰 만료 등 인증 실패
      alert("다시 로그인해주세요.");
      removeToken();
      window.location.href="/login";
      return;
    }
    if (error.response?.status === 404) { // 로그인 실패
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      window.location.href="/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;