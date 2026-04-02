import { useState } from "react";
import { createProductComment } from "../data/commentApi";

interface UseCommentCreateReturn {
  createComment: (content: string) => Promise<unknown>;
  submitting: boolean;
}

export default function useCommentCreate(
  productId?: string
): UseCommentCreateReturn {
  // 등록 중 상태
  const [submitting, setSubmitting] = useState<boolean>(false);

  // 댓글 등록 함수
  const createComment = async (content: string): Promise<unknown> => {
    if (!content.trim()) return null;

    if (!productId) {
      throw new Error("productId가 없습니다.");
    }

    try {
      setSubmitting(true);

      // 댓글 POST 요청
      const newComment = await createProductComment(productId, content);

      return newComment;
    } catch (error: unknown) {
      console.error("댓글 등록 실패:", error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return { createComment, submitting };
}