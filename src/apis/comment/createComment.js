import instance from '../instance';

export const createComment = async (productId, content) => {
  const { data } = await instance.post(`/products/${productId}/comments`, {
    content,
  });

  return data;
};
