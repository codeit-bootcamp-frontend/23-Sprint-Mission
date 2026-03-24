import { useState } from "react";
import { createProductComment } from "../data/comment";

export default function useCommentCreate(productId) {
  // 등록 중 상태
  const [submitting, setSubmitting] = useState(false);

  // 댓글 등록 함수
  const createComment = async (content) => {
    if (!content.trim()) return null;

    try {
      setSubmitting(true);

      // 댓글 POST 요청
      const newComment = await createProductComment(productId, content);

      return newComment;
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return { createComment, submitting };
}