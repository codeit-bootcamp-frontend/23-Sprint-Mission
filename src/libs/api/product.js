import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getProducts = async (
  pageSize = 10,
  orderBy = "recent",
  page = 1,
  keyword,
) => {
  try {
    const response = await instance.get("/products", {
      params: {
        pageSize,
        orderBy,
        page,
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`API 호출 에러:`, error);
    throw error;
  }
};
