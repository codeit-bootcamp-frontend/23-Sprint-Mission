import styles from "./ListItem.module.css";
import Heart from "../../assets/favoriteHeart.svg";
import { Link } from "react-router-dom";

function ListItem({ item, type }) {
  const imageClass = type === "best" ? styles["size-best"] : styles["size-all"];

  return (
    <Link to={`/items/${item.id}`} className={styles.container}>
      <div className={styles.box}>
        <img className={imageClass} src={item.images} />
        <div className={styles.description}>
          <h2 className={styles.cardTitle}>{item.name}</h2>
          <span className={styles.cardPrice}>{item.price}</span>
          <div className={styles.favorite}>
            <img src={Heart} />
            <span className={styles.cardFavoriteCount}>
              {item.favoriteCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListItem;
