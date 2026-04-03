import axiosInstance from "./axiosInstance";

export default async function getProducts(params = {}) {
  try {
    const response = await axiosInstance.get(
      "/products",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}