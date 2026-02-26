import styles from "./ButtonCreateItem.module.css";

function ButtonCreateItem({ children }) {
  return <button className={styles.createBtn}>{children}</button>;
}

export default ButtonCreateItem;
