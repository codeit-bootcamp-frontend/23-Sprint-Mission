import axiosInstance from "./axiosInstance";

export default async function getProductDetail(productId) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const res = await axiosInstance.get(`/products/${productId}`);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);

    if (error.res) {
      throw new Error(`HTTP error: ${error.res.status}`);
    }

    throw error;
  }
}