function CommentEditForm({
  editValue,
  setEditValue,
  onCancel,
  onSave,
  updating,
}) {
  return (
    <>
      {/* 수정 textarea */}
      <textarea
        className="commentEditTextarea"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />

      {/* 버튼 영역 */}
      <div className="commentEditButtons">
        <button
          type="button"
          className="commentCancelButton"
          onClick={onCancel}
        >
          취소
        </button>

        <button
          type="button"
          className="commentSaveButton"
          onClick={onSave}
          disabled={updating}
        >
          {updating ? "수정 중..." : "수정 완료"}
        </button>
      </div>
    </>
  );
}

export default CommentEditForm;