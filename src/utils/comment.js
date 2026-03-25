// 날짜 포맷 (YYYY.MM.DD)
export function formatCommentDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

// 닉네임 fallback 처리
export function getCommentNickname(comment) {
  return comment.writer?.nickname || comment.user?.nickname || "익명";
}

// 프로필 이미지 fallback
export function getCommentImage(comment) {
  return comment.writer?.image || comment.user?.image || "";
}