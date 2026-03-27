import axios from "../utils/axios";

export interface CommentUser {
  nickname?: string;
  image?: string;
}

export interface Comment {
  id: number | string;
  content: string;
  createdAt?: string;
  updatedAt?: string;

  writer?: CommentUser;
  user?: CommentUser;

  [key: string]: unknown;
}

export interface CommentListResponse {
  list: Comment[];
  nextCursor?: number | string | null;
  [key: string]: unknown;
}

// 댓글 조회
export const getProductComments = async (
  productId: number | string,
  cursor: number | string | null = null,
  limit: number = 10,
): Promise<CommentListResponse> => {
  const { data } = await axios.get<CommentListResponse>(
    `/products/${productId}/comments`,
    {
      // 댓글 조회용 쿼리
      params: {
        limit,
        cursor,
      },
    },
  );

  return data;
};

// 댓글 등록
export const createProductComment = async (
  productId: number | string,
  content: string,
): Promise<Comment> => {
  const { data } = await axios.post<Comment>(
    `/products/${productId}/comments`,
    {
      content,
    },
  );

  return data;
};

// 댓글 수정
export const updateProductComment = async (
  commentId: number | string,
  content: string,
): Promise<Comment> => {
  const { data } = await axios.patch<Comment>(`/comments/${commentId}`, {
    content,
  });

  return data;
};

// 댓글 삭제
export const deleteProductComment = async (
  commentId: number | string,
): Promise<unknown> => {
  const { data } = await axios.delete(`/comments/${commentId}`);
  return data;
};
