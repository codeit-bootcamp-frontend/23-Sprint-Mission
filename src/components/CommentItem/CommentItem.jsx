function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
}

export default function CommentItem({ comment }) {
  const profileImage = comment.image || comment.user?.image || "";
  const nickname = comment.nickname || comment.user?.nickname || "익명 사용자";

  return (
    <article className="commentCard">
      <p className="commentContent">{comment.content}</p>

      <div className="commentMeta">
        <img src={profileImage} alt={nickname} className="commentProfile" />

        <div className="commentMetaText">
          <span className="commentNickname">{nickname}</span>
          <span className="commentDate">{formatDate(comment.updatedAt)}</span>
        </div>
      </div>
    </article>
  );
}
