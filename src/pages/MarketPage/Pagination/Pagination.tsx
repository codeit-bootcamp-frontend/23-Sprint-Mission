import "./Pagination.css";
import LeftArrow from "../../../assets/images/arrowLeft.svg";
import RightArrow from "../../../assets/images/arrowRight.svg";

interface PaginationBarProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (page: number) => void;
}

const PaginationBar = ({
  totalPageNum,
  activePageNum,
  onPageChange,
}: PaginationBarProps) => {
  const maxVisiblePages = 5;

  let startPage: number;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(
      activePageNum - Math.floor(maxVisiblePages / 2),
      1
    );
    startPage = Math.min(
      startPage,
      totalPageNum - maxVisiblePages + 1
    );
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="paginationBar">
      <button
        type="button"
        className="paginationButton"
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <img src={LeftArrow} alt="이전" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`paginationButton ${
            activePageNum === page ? "active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="paginationButton"
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <img src={RightArrow} alt="다음" />
      </button>
    </div>
  );
};

export default PaginationBar;