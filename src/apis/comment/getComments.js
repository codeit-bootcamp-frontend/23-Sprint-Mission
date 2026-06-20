import instance from '../instance';

export const getComments = async (productId, cursor) => {
  const { data } = await instance.get(`/products/${productId}/comments`, {
    params: {
      limit: 500,
      cursor,
    },
  });

  return data;
};
