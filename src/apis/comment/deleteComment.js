import instance from '../instance';

export const deleteComment = async (commentId) => {
  const { data } = await instance.delete(`/comments/${commentId}`);

  return data;
};
