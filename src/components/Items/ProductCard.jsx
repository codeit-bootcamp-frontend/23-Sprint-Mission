import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeartIcon from '../../assets/icon/icon-heart.svg?react';

export default function ProductCard({ product, onFavoriteClick }) {
  return (
    <>
      <ProductThumb>
        <ProductLink to={`/products/${product.id}`}>
          <img
            src={product.images?.[0] || '/noimg.jpg'}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = '/noimg.jpg';
            }}
          />
        </ProductLink>
      </ProductThumb>
      <ProductInfo>
        <ProductName>
          <ProductLink to={`/products/${product.id}`}>
            {product.name}
          </ProductLink>
        </ProductName>
        <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
        <ProductFavoriteCountButton
          type="button"
          $isFavorite={product.isFavorite}
          onClick={() => onFavoriteClick(product)}
        >
          <HeartIcon />
          {product.favoriteCount}
        </ProductFavoriteCountButton>
      </ProductInfo>
    </>
  );
}

const ProductLink = styled(Link)``;

const ProductThumb = styled.div`
  overflow: hidden;
  margin-bottom: 16px;
  border-radius: 16px;

  position: relative;
  padding-bottom: 100%;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
`;

const ProductName = styled.strong`
  font-size: 14px;
  line-height: 1.7;
  font-weight: 500;
  color: var(--gray-800);
`;

const ProductPrice = styled.span`
  font-size: 16px;
  line-height: 1.6;
  font-weight: 700;
  color: var(--gray-800);
`;

const ProductFavoriteCountButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 1.5;
  font-weight: 500;
  color: var(--gray-600);

  svg {
    width: 16px;
    height: 16px;

    path {
      fill: ${({ $isFavorite }) => $isFavorite && '#FF68CC'};
      stroke: ${({ $isFavorite }) => $isFavorite && '#FF68CC'};
    }
  }
`;
