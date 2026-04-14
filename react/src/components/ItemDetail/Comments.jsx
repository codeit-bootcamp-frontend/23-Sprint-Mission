import { useState, useRef, useEffect } from "react";
import { formatRelativeTime } from "../../utils/formatData";
import ic_kebab from "../../assets/ic_kebab.svg";
import {
  patchComment,
  getProductComments,
  deleteComment,
} from "../../api/data";
import styles from "./Comments.module.css";

function Comments({ productId, comments, setComments }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const editInputRef = useRef(null);

  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleMenuToggle = (commentId) => {
    setOpenMenuId(openMenuId === commentId ? null : commentId);
  };

  const handleEditClick = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
    setOpenMenuId(null);
  };

  const handleDeleteClick = async (comment) => {
    try {
      await deleteComment(comment.id);
      alert(`삭제 완료!`);

      if (setComments && productId) {
        const updated = await getProductComments(productId, 3);
        setComments(updated);
      }
      setOpenMenuId(null);
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const formData = new FormData(e.currentTarget);
    const updatedContent = formData.get("content");

    try {
      await patchComment(editingId, { content: updatedContent });
      alert(`수정 완료!`);
      setEditingId(null);

      if (setComments && productId) {
        const updated = await getProductComments(productId, 3);
        setComments(updated);
      }
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openMenuId &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();

      const length = editInputRef.current.value.length;
      editInputRef.current.setSelectionRange(length, length);
    }
  }, [editingId]);

  return (
    <div className={styles.commentsList}>
      {comments?.list?.map((comment) => (
        <div key={comment.id} className={styles.commentCard}>
          <div className={styles.commentBody}>
            <div className={styles.contentArea}>
              {editingId === comment.id ? (
                <form onSubmit={handleEditSubmit} className={styles.editForm}>
                  <textarea
                    ref={editInputRef}
                    name="content"
                    className={styles.editTextarea}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className={styles.editActions}>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className={styles.cancelButton}
                    >
                      취소
                    </button>
                    <button type="submit" className={styles.saveButton}>
                      수정 완료
                    </button>
                  </div>
                </form>
              ) : (
                <p className={styles.commentText}>{comment.content}</p>
              )}
            </div>

            <div className={styles.writerProfile}>
              <img
                src={comment.writer.image}
                alt="writer"
                className={styles.avatar}
              />
              <div className={styles.writerMeta}>
                <span className={styles.nickname}>
                  {comment.writer.nickname}
                </span>
                <span className={styles.timestamp}>
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
            </div>
          </div>
          {editingId !== comment.id && (
            <div className={styles.kebabCo}>
              <img
                src={ic_kebab}
                alt="kebab"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuToggle(comment.id);
                }}
              />
              {openMenuId === comment.id && (
                <div ref={menuRef} className={styles.dropdownMenu}>
                  <div
                    onClick={() => handleEditClick(comment)}
                    className={styles.menuItem}
                  >
                    수정하기
                  </div>
                  <div
                    onClick={() => handleDeleteClick(comment)}
                    className={styles.menuItem}
                  >
                    삭제하기
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
