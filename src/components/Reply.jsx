import { useState } from 'react';
import styled from 'styled-components';
import kebab from '../assets/kebab.svg';
import ProductCardKebabMenu from './ProductCardKebabMenu';
import getDate from '../util/date';
import AddItemInput from './AddItemInput';

const Reply = ({ item, handleDelete, handlePatch }) => {
  const [isKebabButtonOpen, setIsKebabButtonOpen] = useState(false);
  const [editInput, setEditInput] = useState(item.content);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleKebabButtonClick = () => {
    if (isKebabButtonOpen) {
      setIsKebabButtonOpen(false);
    } else {
      setIsKebabButtonOpen(true);
    }
  };

  const handleStartEdit = () => {
    setEditInput(item.content);
    setIsEditFormOpen(true);
    setIsKebabButtonOpen(false);
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();
    await handlePatch(e, item.id, editInput);
    setIsEditFormOpen(false);
  };

  return (
    <Container onSubmit={onEditSubmit}>
      {isEditFormOpen ? (
        <AddItemInput
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          variant="textarea"
        />
      ) : (
        <Top>
          <Content>{item.content}</Content>
          <KebabWrapper>
            <IconButton type="button" onClick={handleKebabButtonClick}>
              <KebabImg src={kebab} />
            </IconButton>
            {isKebabButtonOpen && (
              <CustomKebabMenu
                id={item.id}
                handleDelete={handleDelete}
                onStartEdit={handleStartEdit}
              />
            )}
          </KebabWrapper>
        </Top>
      )}
      <Bottom>
        <Profile>
          <ProfileImg src={item.writer.image} alt="" />
          <ProfileContent>
            <User>{item.writer.nickname}</User>
            <Time>{getDate(item.createdAt)}</Time>
          </ProfileContent>
        </Profile>
        {isEditFormOpen ? (
          <EditButtonContainer>
            <CancelButton
              type="button"
              onClick={() => setIsEditFormOpen(false)}
            >
              취소
            </CancelButton>
            <SubmitButton
              type="submit"
              $editInput={editInput}
              disabled={!editInput.trim()}
            >
              수정 완료
            </SubmitButton>
          </EditButtonContainer>
        ) : (
          ''
        )}
      </Bottom>
    </Container>
  );
};

export default Reply;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 24px;
  border-bottom: 1px solid var(--secondary-200);
  padding-bottom: 12px;
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: var(--secondary-800);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KebabWrapper = styled.div`
  position: relative;
`;

const IconButton = styled.button``;

const KebabImg = styled.img``;

const CustomKebabMenu = styled(ProductCardKebabMenu)`
  position: absolute;
  right: 0;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
  border: none;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const User = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: var(--secondary-600);
`;

const Time = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: var(--secondary-400);
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  background-color: none;
  padding: 12px 23px;
  border-radius: 8px;
  color: #737373;
  font-weight: 600;
`;
const SubmitButton = styled.button`
  background-color: ${({ $editInput }) =>
    !$editInput ? 'var(--coolGray-400)' : 'var(--primary-100)'};
  padding: 12px 23px;
  border-radius: 8px;
  color: var(--coolGray-100);
  font-weight: 600;
`;

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
