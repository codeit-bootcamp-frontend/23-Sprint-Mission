import instance from '../instance';

export const deleteProduct = async (productId) => {
  const { data } = await instance.delete(`/products/${productId}`);

  return data;
};
