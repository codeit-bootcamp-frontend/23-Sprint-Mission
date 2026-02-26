import styles from "./Pagination.module.css";
import arrowRight from "../../../images/arrow_right.svg";
import arrowLift from "../../../images/arrow_left.svg";
function Pagination({ currentPage, onPageChange, totalCount, pageSize }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const pageLimit = 5;

  const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;

  const pages = [];
  for (let i = startPage; i < startPage + pageLimit && i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevGroup = () => {
    onPageChange(Math.max(1, currentPage - pageLimit));
  };

  const handleNextGroup = () => {
    onPageChange(Math.min(totalPages, currentPage + pageLimit));
  };

  return (
    <ul className={styles.pagination}>
      <button
        className={styles.arrowBtn}
        disabled={currentPage <= 5}
        onClick={handlePrevGroup}
      >
        <img src={arrowLift} alt="이전" />
      </button>

      {pages.map((num) => (
        <li
          key={num}
          className={`${styles.pageItem} ${currentPage === num ? styles.active : ""}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </li>
      ))}
      <button
        className={styles.arrowBtn}
        disabled={startPage + pageLimit > totalPages}
        onClick={handleNextGroup}
      >
        <img src={arrowRight} alt="다음" />
      </button>
    </ul>
  );
}

export default Pagination;
