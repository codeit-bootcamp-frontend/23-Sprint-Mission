import ic_kebab from "../../assets/ic_kebab.svg";
import profile from "../../assets/profile.svg";
import { formatDate } from "../../utils/formatData";
import styles from "./ItemInfo.module.css";
import favoriteHeart from "../../assets/favoriteHeart2.svg";

function ItemInfo({ item }) {
  return (
    <div className={styles.container}>
      <div className={styles.Wrapper}>
        <img src={item.images} alt={item.name} className={styles.image} />
        <div className={styles.contentWrapper}>
          <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <div className={styles.titlePriceGroup}>
                <div className={styles.itemTitleArea}>
                  <h1 className={styles.itemName}>{item.name}</h1>
                  <span className={styles.itemPrice}>{item.price}원</span>
                </div>
                <img src={ic_kebab} alt="kebab" className={styles.kebabIcon} />
              </div>
              <div className={styles.horizontalLine} />
            </div>
            <div className={styles.detailsArea}>
              <div className={styles.descriptionBox}>
                <span className={styles.subTitle}>상품 소개</span>
                <p className={styles.descriptionText}>{item.description}</p>
              </div>
              <div className={styles.tagBox}>
                <span className={styles.subTitle}>상품 태그</span>
                {item.tags && item.tags.length > 0 && (
                  <div className={styles.tagList}>
                    {item.tags.map((tag, index) => (
                      <span key={`${tag}-${index}`} className={styles.tagItem}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.sellerSection}>
            <div className={styles.sellerProfile}>
              <img src={profile} className={styles.profileImg} />
              <div className={styles.textBox}>
                <span className={styles.nickname}>{item.ownerNickname}</span>
                <span className={styles.date}>
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
            <div className={styles.favoriteContainer}>
              <div className={styles.profileLine} />
              <div className={styles.favoriteBox}>
                <img src={favoriteHeart} className={styles.favoriteHeart} />
                <span className={styles.favoriteCount}>
                  {item.favoriteCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomDivider} />
    </div>
  );
}

export default ItemInfo;
