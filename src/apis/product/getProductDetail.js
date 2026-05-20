import instance from '../instance';

export const getProductDetail = async (productId) => {
  const { data } = await instance.get(`/products/${productId}`);

  return data;
};
