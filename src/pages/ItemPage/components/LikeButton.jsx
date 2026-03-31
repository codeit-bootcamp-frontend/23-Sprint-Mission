import styled from "styled-components";
import { FlexContainer } from "../../../styles/Common";
import Icon from "../../../components/Icon";
import HeartIcon from "../../../assets/icons/ic_heart.svg?react";

const PillButton = styled.div`
  color: var(--gray-500);
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--gray-200);

  &:hover svg path {
    fill: var(--red);
    stroke: var(--red);
  }
`;

const ButtonContent = styled(FlexContainer)`
  gap: 4px;
`;

export default function LikeButton({ productId, isFavorite, favoriteCount }) {
  return (
    <PillButton>
      <ButtonContent>
        <Icon
          iconComponent={HeartIcon}
          size={24}
          fillColor={isFavorite && "var(--red)"}
        />
        {favoriteCount.toLocaleString()}
      </ButtonContent>
    </PillButton>
  )
}