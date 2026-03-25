import { useEffect, useRef, useState } from "react";
import moreIcon from "../../assets/images/more.svg";

function CommentActions({ onEdit, onDelete, deleting }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // 바깥 클릭하면 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="commentMenuWrapper" ref={ref}>
      {/* 점 세 개 버튼 */}
      <button
        type="button"
        className="commentMenuButton"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img src={moreIcon} alt="댓글 메뉴" className="commentMenuIcon" />
      </button>

      {/* 드롭다운 */}
      {open && (
        <div className="commentDropdownMenu">
          <button
            className="commentDropdownItem"
            onClick={() => {
              setOpen(false);
              onEdit(); // 수정 모드 전환
            }}
          >
            수정하기
          </button>

          <button
            className="commentDropdownItem delete"
            onClick={() => {
              setOpen(false);
              onDelete(); // 삭제 실행
            }}
            disabled={deleting}
          >
            {deleting ? "삭제 중..." : "삭제하기"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentActions;