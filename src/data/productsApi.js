import axios from "../utils/axios";

// 상품 목록 조회
export const getProducts = async (params = {}) => {
  const { data } = await axios.get("/products", { params });

  let list = [...data.list];

  if (params.orderBy === "recent") {
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (params.orderBy === "favorite") {
    list.sort((a, b) => b.favoriteCount - a.favoriteCount);
  }

  return {
    ...data,
    list,
  };
};

// 상품 상세 조회
export const getProductDetail = async (productId) => {
  const { data } = await axios.get(`/products/${productId}`);
  console.log("요청 URL:", `/products/${productId}`);
  return data;
};
