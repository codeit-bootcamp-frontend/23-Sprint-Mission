import { Link } from "react-router-dom";
import "./ProductCard.css";
import type { Product } from "../../../../types/product"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/items/${product.id}`} className="productCardLink">
      <article className="productCard">
        <div className="imageWrapper">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="itemCardThumbnail"
          />
        </div>

        <div className="cardBody">
          <p className="productName">{product.name}</p>
          <p className="productPrice">{product.price.toLocaleString()}원</p>

          <div className="likeBox">
            ♡ <span>{product.favoriteCount}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}