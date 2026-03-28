import "../BestItemCard.css";
import heartIcon from "../assets/icon-heart.svg";

const BestItemCard = ({ data }) => {
  const { images, name, price, favoriteCount } = data;

  return (
    <div className="card-best">
      <div className="image-container">
        <img src={images?.[0]} alt={"상품 이미지"} className="product-image" />
      </div>
      <div className="card-info">
        <p className="product-name">{name}</p>
        <p className="product-price">{price?.toLocaleString()}원</p>
        <div className="product-favorite">
          <img src={heartIcon} alt="좋아요" className="icon-heart" />
          <span className="favorite-count">{favoriteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default BestItemCard;
