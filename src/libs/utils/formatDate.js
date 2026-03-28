const units = [
  { label: "년", seconds: 31536000 },
  { label: "개월", seconds: 2592000 },
  { label: "일", seconds: 86400 },
  { label: "시간", seconds: 3600 },
  { label: "분", seconds: 60 },
];

export const formatRelativeTime = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  for (const unit of units) {
    const quotient = Math.floor(diffInSeconds / unit.seconds);

    if (quotient >= 1) {
      return `${quotient}${unit.label} 전`;
    }
  }

  return "방금 전";
};
