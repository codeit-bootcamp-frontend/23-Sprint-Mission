import { useState } from "react";
import { deleteProductComment } from "../data/commentApi";

interface UseCommentDeleteReturn {
  removeComment: (commentId: number | string) => Promise<unknown>;
  deleting: boolean;
}

function useCommentDelete(): UseCommentDeleteReturn {
  const [deleting, setDeleting] = useState<boolean>(false);

  // 댓글 삭제 요청
  const removeComment = async (
    commentId: number | string
  ): Promise<unknown> => {
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