import ListItem from "./ListItem.jsx";
import styles from "./BestList.module.css";

function BestList({ items, type }) {
  return (
    <div className={styles.bestList}>
      <h1 className={styles.title}>베스트 상품</h1>
      <ul className={styles.card}>
        {items.map((item) => (
          <li className={styles.list} key={item.id}>
            <ListItem item={item} type={type} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestList;
