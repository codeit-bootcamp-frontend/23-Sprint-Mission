import Axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const axios = Axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");

  // 로그인/회원가입/토큰 재발급 요청인지 확인
  const isAuthRequest =
    config.url?.includes("/auth/signIn") ||
    config.url?.includes("/auth/signUp") ||
    config.url?.includes("/auth/refresh-token");

  // 공개 조회 API인지 확인
  const isPublicGetRequest =
    config.method?.toLowerCase() === "get" &&
    (config.url?.startsWith("/products") ||
      config.url?.startsWith("/comments"));

  // 토큰이 있고, 인증 요청도 아니고, 공개 GET 요청도 아닐 때만 Authorization 추가
  if (token && !isAuthRequest && !isPublicGetRequest) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;