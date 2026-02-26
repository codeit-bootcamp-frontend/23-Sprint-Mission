import searchIcon from "../../../images/ic_search.svg";
import styles from "./InputSearch.module.css";
function InputSearch({ search }) {
  return (
    <div className={styles.searchBox}>
      <img className={styles.searchImg} src={searchIcon} />
      <input
        id="product-search"
        type="search"
        placeholder="검색할 상품을 입력해주세요."
        className={styles.input}
        onChange={search}
      />
    </div>
  );
}

export default InputSearch;
