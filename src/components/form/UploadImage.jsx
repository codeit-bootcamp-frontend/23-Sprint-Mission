import { useState } from 'react';
import styled from 'styled-components';
import PlusIcon from '/src/assets/icon/icon-plus.svg?react';
import { deleteButtonStyle } from './styles';

export default function UploadImage({ id }) {
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState(false);

  const handleImageChange = (e) => {
    if (previewUrl) {
      setMessage(true);
      e.target.value = '';
      return;
    }

    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    setMessage(false);
  };

  const handleDeleteImage = () => {
    setPreviewUrl('');
    setMessage(false);
  };

  return (
    <UploadImageSection>
      <ImageList>
        <UploadWrap htmlFor={id}>
          <TextBox>
            <PlusIcon />
            <UploadText>이미지 등록</UploadText>
          </TextBox>
        </UploadWrap>
        <HiddenInput
          id={id}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <PreviewWrap>
            <PreviewImage src={previewUrl} alt="상품 이미지 미리보기" />
            <DeleteButton
              type="button"
              onClick={handleDeleteImage}
            ></DeleteButton>
          </PreviewWrap>
        )}
      </ImageList>
      {message && <Message>*이미지 등록은 최대 1개까지 가능합니다.</Message>}
    </UploadImageSection>
  );
}

const UploadImageSection = styled.div``;
const ImageList = styled.div`
  display: flex;
  gap: 24px;
`;
const UploadWrap = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 282px;
  height: 282px;
  background: var(--gray-100);
  border-radius: 12px;
  cursor: pointer;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  svg {
    width: 48px;
    height: 48px;
  }
`;
const UploadText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: var(--gray-400);
`;
const HiddenInput = styled.input`
  display: none;
`;
const PreviewWrap = styled.div`
  position: relative;
  width: 282px;
  height: 282px;
  background: var(--gray-100);
  border-radius: 12px;
  overflow: hidden;
`;
const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const DeleteButton = styled.button`
  ${deleteButtonStyle}
  position: absolute;
  top: 12px;
  right: 12px;
`;
const Message = styled.p`
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--error);
`;
