import axios from "../utils/axios";

// 댓글 조회
export const getProductComments = async (productId) => {
  const { data } = await axios.get(`/products/${productId}/comments`, {
    // 댓글 조회용 쿼리
    params: {
      limit: 10,
      cursor: null,
    },
  });

  return data;
};

// 댓글 등록
export const createProductComment = async (productId, content) => {
  const { data } = await axios.post(`/products/${productId}/comments`, {
    content,
  });

  return data;
};

// 댓글 수정
export const updateProductComment = async (commentId, content) => {
  const { data } = await axios.patch(`/comments/${commentId}`, {
    content,
  });

  return data;
};

// 댓글 삭제
export const deleteProductComment = async (commentId) => {
  const { data } = await axios.delete(`/comments/${commentId}`);
  return data;
};
