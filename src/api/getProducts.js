import axiosInstance from "./axiosInstance";

export async function getProducts(params = {}) {
  try {
    const response = await axiosInstance.get(
      "",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}