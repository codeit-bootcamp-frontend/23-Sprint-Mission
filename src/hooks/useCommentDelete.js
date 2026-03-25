import { useState } from "react";
import { deleteProductComment } from "../data/commentApi";

function useCommentDelete() {
  const [deleting, setDeleting] = useState(false);

  // 댓글 삭제 요청
  const removeComment = async (commentId) => {
    try {
      setDeleting(true);
      return await deleteProductComment(commentId);
    } finally {
      setDeleting(false);
    }
  };

  return { removeComment, deleting };
}

export default useCommentDelete;