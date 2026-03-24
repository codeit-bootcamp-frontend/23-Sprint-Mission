import { useState } from "react";
import { updateProductComment } from "../data/commentApi";

function useCommentUpdate() {
  const [updating, setUpdating] = useState(false);

  // 댓글 수정 요청
  const updateComment = async (commentId, content) => {
    try {
      setUpdating(true); // 로딩 시작
      return await updateProductComment(commentId, content);
    } finally {
      setUpdating(false); // 로딩 종료
    }
  };

  return { updateComment, updating };
}

export default useCommentUpdate;