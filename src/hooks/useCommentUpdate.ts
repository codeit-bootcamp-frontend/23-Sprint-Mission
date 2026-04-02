import { useState } from "react";
import { updateProductComment } from "../data/commentApi";
import type { Comment } from "../data/commentApi";

interface UseCommentUpdateReturn {
  updateComment: (
    commentId: number | string,
    content: string
  ) => Promise<Comment>;
  updating: boolean;
}

function useCommentUpdate(): UseCommentUpdateReturn {
  const [updating, setUpdating] = useState<boolean>(false);

  // 댓글 수정 요청
  const updateComment = async (
    commentId: number | string,
    content: string
  ): Promise<Comment> => {
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