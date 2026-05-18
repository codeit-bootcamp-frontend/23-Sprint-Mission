import instance from '../instance';

export const createProduct = async (productData) => {
  const { data } = await instance.post('/products', productData);

  return data;
};
