import instance from '../instance';

export const editComment = async (commentId, content) => {
  const { data } = await instance.patch(`/comments/${commentId}`, { content });

  return data;
};
