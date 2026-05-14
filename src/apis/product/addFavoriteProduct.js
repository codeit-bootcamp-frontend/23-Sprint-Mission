import instance from '../instance';

export const addFavoriteProduct = async (productId) => {
  const { data } = await instance.post(`/products/${productId}/favorite`);

  return data;
};
