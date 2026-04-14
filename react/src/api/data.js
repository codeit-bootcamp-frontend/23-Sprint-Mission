import { instance } from "./axios";

export async function getBestProducts(orderBy = "favorite", pageSize = 4) {
  const response = await instance.get("/products", {
    params: {
      orderBy: orderBy,
      pageSize: pageSize,
    },
  });

  return response.data;
}

export async function getAllProducts(page, orderBy, keyword, pageSize) {
  const response = await instance.get("/products", {
    params: {
      page: page,
      orderBy: orderBy,
      keyword: keyword,
      pageSize: pageSize,
    },
  });

  return response.data;
}

export async function postProduct(productData) {
  const product = await instance.post(`/products`, productData);
  return product.data;
}

export async function getSizeReviews(productId) {
  const response = await instance.get(`/products/${productId}/comments`);
  return response.data;
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("accessToken");

  const response = await instance.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.url || response.data?.url;
}

export async function getProduct(productId) {
  const product = await instance.get(`/products/${productId}`);
  return product.data;
}

export async function getProductComments(productId, limit = 3) {
  const productComments = await instance.get(
    `/products/${productId}/comments?limit=${limit}`,
  );
  return productComments.data;
}

export async function postProductComment(commentId, commentData) {
  const comment = await instance.post(
    `/products/${commentId}/comments`,
    commentData,
  );
  return comment.data;
}

export async function patchComment(commentId, commentData) {
  const comment = await instance.patch(`/comments/${commentId}`, commentData);
  return comment.data;
}

export async function deleteComment(commentId) {
  const comment = await instance.delete(`/comments/${commentId}`);
  return comment.data;
}
