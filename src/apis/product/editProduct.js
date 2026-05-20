import instance from '../instance';

export const editProduct = async (productId, productData) => {
  const { data } = await instance.patch(`/products/${productId}`, productData);

  return data;
};
