import { useState } from "react";
import CommentActions from "./CommentActions";
import CommentEditForm from "./CommentEditForm";
import useCommentUpdate from "../../hooks/useCommentUpdate";
import useCommentDelete from "../../hooks/useCommentDelete";

function CommentItem({ comment, onRefreshComments }) {
  // 수정 모드 여부
  const [isEditing, setIsEditing] = useState(false);

  // 수정 input 값
  const [editValue, setEditValue] = useState(comment.content || "");

  // 수정 / 삭제 요청 훅
  const { updateComment, updating } = useCommentUpdate();
  const { removeComment, deleting } = useCommentDelete();

  // 데이터 가공 (없으면 fallback)
  const nickname =
    comment.writer?.nickname || comment.user?.nickname || "익명";

  const profileImage =
    comment.writer?.image || comment.user?.image || "";

  const date =
    comment.createdAt?.slice(0, 10).replaceAll("-", ".") || "";

  // 수정 시작
  const handleStartEdit = () => {
    setEditValue(comment.content || "");
    setIsEditing(true);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditValue(comment.content || "");
    setIsEditing(false);
  };

  // 수정 요청 (PATCH)
  const handleSaveEdit = async () => {
    if (!editValue.trim()) return;

    try {
      await updateComment(comment.id, editValue);
      setIsEditing(false);
      onRefreshComments?.(); // 목록 다시 불러오기
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  // 삭제 요청 (DELETE)
  const handleDelete = async () => {
    const ok = window.confirm("댓글 삭제할까?");
    if (!ok) return;

    try {
      await removeComment(comment.id);
      onRefreshComments?.();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  return (
    <div className="commentItem">
      {isEditing ? (
        // ===== 수정 모드 =====
        <CommentEditForm
          editValue={editValue}
          setEditValue={setEditValue}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
          updating={updating}
        />
      ) : (
        // ===== 일반 모드 =====
        <>
          {/* 내용 + 점세개 메뉴 */}
          <div className="commentTopRow">
            <p className="commentContent">{comment.content}</p>

            <CommentActions
              onEdit={handleStartEdit}
              onDelete={handleDelete}
              deleting={deleting}
            />
          </div>

          {/* 프로필 / 닉네임 / 날짜 */}
          <div className="commentMeta">
            {profileImage ? (
              <img
                src={profileImage}
                alt={nickname}
                className="commentProfile"
              />
            ) : (
              // 이미지 없을 때 기본 원형
              <div className="commentProfile" />
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