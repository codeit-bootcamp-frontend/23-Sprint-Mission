import styled from "styled-components";
import CloseIcon from '../../assets/icons/ic_x.svg?react';

const Button = styled.button`
  background=color: ${({ theme }) => theme.color.gray[0]};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.color.blue[0]};
  }
`;

export default function DeleteButton({ onClick, label }) {
  return (
    <Button aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
}