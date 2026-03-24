import { useState } from "react";
import { updateProductComment } from "../data/comment";

export default function useCommentUpdate() {
  // 수정 요청 중 상태
  const [updating, setUpdating] = useState(false);

  // 댓글 수정 함수
  const updateComment = async (commentId, content) => {
    if (!content.trim()) return null; // 공백 방지

    try {
      setUpdating(true);

      // 댓글 수정 요청
      const updatedComment = await updateProductComment(commentId, content);

      return updatedComment;
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  return { updateComment, updating };
}