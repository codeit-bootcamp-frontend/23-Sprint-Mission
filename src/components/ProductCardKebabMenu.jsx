import styled from 'styled-components';

const ProductCardKebabMenu = ({ className, handleDelete, id, onStartEdit }) => {
  return (
    <Container className={className}>
      <EditButton type="button" onClick={() => onStartEdit?.()}>
        수정하기
      </EditButton>
      <DeleteButton type="button" onClick={() => handleDelete(id)}>
        삭제하기
      </DeleteButton>
    </Container>
  );
};

export default ProductCardKebabMenu;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--coolGray-300);
  border-radius: 8px;
  width: 140px;
  font-weight: 400;
  line-height: 26px;
  color: var(--secondary-500);
  z-index: 900;
  background-color: #ffffff;
`;

const EditButton = styled.button`
  padding: 12px 41.5px 8px;
`;

const DeleteButton = styled.button`
  padding: 8px 41.5px 12px;
`;
