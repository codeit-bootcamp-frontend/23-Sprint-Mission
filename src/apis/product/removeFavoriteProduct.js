import instance from '../instance';

export const removeFavoriteProduct = async (productId) => {
  const { data } = await instance.delete(`/products/${productId}/favorite`);

  return data;
};
