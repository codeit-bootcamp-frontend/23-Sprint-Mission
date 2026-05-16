import styled from 'styled-components';
import PlusIcon from '/src/assets/icon/icon-plus.svg?react';

export default function UploadImage({ id }) {
  return (
    <>
      <UploadImageSection>
        <ImageList>
          <UploadWrap htmlFor={id}>
            <TextBox>
              <PlusIcon />
              <UploadText>이미지 등록</UploadText>
            </TextBox>
          </UploadWrap>
          <HiddenInput id={id} type="file" accept="image/*" />
          {/* <PreviewWrap>
            <PreviewImage src="" alt="상품 이미지 미리보기" />
            <DeleteButton type="button"></DeleteButton>
          </PreviewWrap> */}
        </ImageList>
        {/* <Notice>*이미지 등록은 최대 10개까지 가능합니다.</Notice> */}
      </UploadImageSection>
    </>
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
`;
const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  background: var(--gray-400);
  border-radius: 50%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    background: #fff;
    border-radius: 999px;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
const Notice = styled.p`
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--error);
`;
