import axiosInstance from "./axiosInstance";

export default async function getProductComments({ productId, params }) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const res = await axiosInstance.get(
      `/products/${productId}/comments`,
      {
        params,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Failed to fetch product comments: ", error);

    if (error.res) {
      throw new Error(`HTTP error: ${error.res.status}`);
    }

    throw error;
  }
}