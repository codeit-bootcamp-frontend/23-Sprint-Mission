import "../GeneralItemCard.css";
import heartIcon from "../assets/icon-heart.svg";
import productDefaultImg from "../assets/image-product-default.png";

const GeneralItemCard = ({ data }) => {
  const { images, name, price, favoriteCount } = data;

  const productImage =
    images && images.length > 0 ? images[0] : productDefaultImg;

  return (
    <div className="card-general">
      <div className="image-container">
        <img
          src={productImage}
          alt={"상품 이미지"}
          className="product-image"
          onError={(e) => {
            e.target.src = productDefaultImg;
          }}
        />
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

export default GeneralItemCard;
