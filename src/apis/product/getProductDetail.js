import instance from '../instance';

export const getProductDetail = async (productId) => {
  const response = await instance.get(`/products/${productId}`);

  return response.data;
};
