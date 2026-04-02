import { useState } from "react";
import CommentActions from "./CommentActions";
import CommentEditForm from "./CommentEditForm";
import useCommentUpdate from "../../hooks/useCommentUpdate";
import useCommentDelete from "../../hooks/useCommentDelete";
import "./CommentItem.css";
import type { Comment } from "../../data/commentApi";

interface CommentItemProps {
  comment: Comment;
  onRefreshComments?: () => void;
}

function CommentItem({ comment, onRefreshComments }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(comment.content || "");

  const { updateComment, updating } = useCommentUpdate();
  const { removeComment, deleting } = useCommentDelete();

  const nickname = comment.writer?.nickname || comment.user?.nickname || "익명";

  const profileImage = comment.writer?.image || comment.user?.image || "";

  const date = comment.createdAt
    ? comment.createdAt.slice(0, 10).replace(/-/g, ".")
    : "";

  const handleStartEdit = (): void => {
    setEditValue(comment.content || "");
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    setEditValue(comment.content || "");
    setIsEditing(false);
  };

  const handleSaveEdit = async (): Promise<void> => {
    if (!editValue.trim()) return;

    try {
      await updateComment(comment.id, editValue);
      setIsEditing(false);
      onRefreshComments?.();
    } catch (error: unknown) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    const ok = window.confirm("댓글을 삭제할까요?");
    if (!ok) return;

    try {
      await removeComment(comment.id);
      onRefreshComments?.();
    } catch (error: unknown) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  return (
    <div className="commentItem">
      {isEditing ? (
        <CommentEditForm
          editValue={editValue}
          setEditValue={setEditValue}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
          updating={updating}
        />
      ) : (
        <>
          <div className="commentTopRow">
            <p className="commentContent">{comment.content}</p>

            <CommentActions
              onEdit={handleStartEdit}
              onDelete={handleDelete}
              deleting={deleting}
            />
          </div>

          <div className="commentMeta">
            {profileImage ? (
              <img
                src={profileImage}
                alt={nickname}
                className="commentProfile"
              />
            ) : (
              <div className="commentProfile commentProfileFallback" />
            )}

            <div className="commentMetaText">
              <span className="commentNickname">{nickname}</span>
              <span className="commentDate">{date}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CommentItem;
