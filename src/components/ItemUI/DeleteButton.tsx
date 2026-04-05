import styled from "styled-components";
import CloseIcon from '../../assets/icons/ic_x.svg?react';
import React from "react";

const Button = styled.button`
  background=color: ${({ theme }) => theme.color.gray[400]};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.color.blue.primary};
  }
`;

interface DeleteButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, label }) => {
  return (
    <Button aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
}

export default DeleteButton;