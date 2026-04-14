import axios from "axios";

const PANDA_API = import.meta.env.VITE_AXIOS_API_BASE_URL;

export const instance = axios.create({
  baseURL: PANDA_API,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 👈 이 이름이 맞는지 재확인!

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
