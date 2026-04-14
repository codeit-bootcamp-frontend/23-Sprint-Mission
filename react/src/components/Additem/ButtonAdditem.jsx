import styles from "./ButtonAdditem.module.css";

function ButtonAdditem({ disabled, form }) {
  return (
    <button
      className={styles.addButton}
      form={form}
      type="submit"
      disabled={disabled}
    >
      등록
    </button>
  );
}
export default ButtonAdditem;
