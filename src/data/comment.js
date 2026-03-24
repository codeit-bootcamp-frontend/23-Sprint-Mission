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
  try {
    // 요청 보내기 전 값 확인
    console.log("댓글 등록 요청:", {
      productId,
      content,
    });

    const { data } = await axios.post(`/products/${productId}/comments`, {
      content,
    });

    console.log("댓글 등록 성공:", data);
    return data;
  } catch (error) {
    // 서버가 준 에러 정보 확인
    console.error("댓글 등록 API 에러:", error);
    console.error("응답 상태:", error.response?.status);
    console.error("응답 데이터:", error.response?.data);
    throw error;
  }
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
