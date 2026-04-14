import styles from "./ProductDescriptionInput.module.css";

function ProductDescriptionInput({ value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="description" className={styles.subtitle}>
        상품 소개
      </label>
      <textarea
        type="text"
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        placeholder="상품 소개를 입력해주세요"
        className={styles.inputbox}
      />
    </div>
  );
}

export default ProductDescriptionInput;
