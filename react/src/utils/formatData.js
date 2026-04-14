export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}. ${mm}. ${dd}`;
}

export function formatRelativeTime(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now - past; // 밀리초 단위 차이

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));

  // 1. 1시간 미만 (방금 전 또는 n분 전)
  if (diffInMinutes < 60) {
    if (diffInMinutes < 1) return "방금 전";
    return `${diffInMinutes}분 전`;
  }

  // 2. 24시간 미만 (n시간 전)
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 3. 7일 미만 (n일 전)
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // 4. 4주 미만 (n주 전)
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  // 5. 12개월 미만 (n달 전)
  if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  }

  // 6. 그 외 (아주 오래된 경우: 2024. 05. 06 형식)
  const yyyy = past.getFullYear();
  const mm = String(past.getMonth() + 1).padStart(2, "0");
  const dd = String(past.getDate()).padStart(2, "0");
  return `${yyyy}. ${mm}. ${dd}`;
}
