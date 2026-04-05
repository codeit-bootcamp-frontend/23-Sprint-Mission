import { Link } from "react-router-dom";
import styled from "styled-components";
import HeartIcon from "../../../assets/icons/ic_heart.svg?react";
import { Product } from "../../../types/productTypes";

const ItemCardContainer = styled(Link)`
  color: var(--gray-800);
  overflow: hidden;
  cursor: pointer;
`;

const ItemCardThumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  margin-bottom: 16px;
`;

const ItemSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

const ItemName = styled.h2`
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const FavoriteCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--gray-600);
  font-size: 12px;
`;

interface ItemCardProps {
  item: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <ItemCardContainer to={`/items/${item.id}`} className="itemCard">
      <ItemCardThumbnail
        src={item.images[0]}
        alt={`${item.name} 상품 썸네일`}
      />
      <ItemSummary>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
        <FavoriteCount>
          <HeartIcon />
          {item.favoriteCount}
        </FavoriteCount>
      </ItemSummary>
    </ItemCardContainer>
  );
}

export default ItemCard;