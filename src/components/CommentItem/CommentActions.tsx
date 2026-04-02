import { useEffect, useRef, useState } from "react";
import moreIcon from "../../assets/images/more.svg";

interface CommentActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}

function CommentActions({
  onEdit,
  onDelete,
  deleting,
}: CommentActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭하면 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      const target = e.target as Node | null;

      if (ref.current && target && !ref.current.contains(target)) {
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
            type="button"
            className="commentDropdownItem"
            onClick={() => {
              setOpen(false);
              onEdit(); // 수정 모드 전환
            }}
          >
            수정하기
          </button>

          <button
            type="button"
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