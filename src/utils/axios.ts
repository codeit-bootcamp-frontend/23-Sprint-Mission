import Axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const axios = Axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");

  const isAuthRequest =
    config.url?.includes("/auth/signIn") ||
    config.url?.includes("/auth/signUp") ||
    config.url?.includes("/auth/refresh-token");

  if (token && !isAuthRequest) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;