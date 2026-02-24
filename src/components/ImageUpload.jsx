import { Label } from "./InputItem";
import { useState } from "react";
import styled, { css } from "styled-components";
import PlusIcon from "../assets/images/ic_plus.svg";
import DeleteButton from "./DeleteButton";

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 18px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 24px;
  }
`;

// 업로드 버튼 / 이미지 공통 정사각형 스타일
const squareStyles = css`
  width: calc(50% - 4px);
  max-width: 200px;
  aspect-ratio: 1 / 1; /* 정사각형 유지 */
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 162px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 282px;
  }
`;

// file input과 연결되는 커스텀 업로드 버튼
const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.gray.bg};
  color: ${({ theme }) => theme.colors.gray.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.bgLight};
  }

  ${squareStyles}
`;

// 업로드된 이미지 미리보기 영역
const ImagePreview = styled.div`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  position: relative; /* 삭제 버튼 포지셔닝 기준 */

  ${squareStyles}
`;

// 삭제 버튼 위치 고정
const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

// 기본 file input 숨김 처리
const HiddenFileInput = styled.input`
  display: none;
`;

function ImageUpload({ title }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // 이미지 선택 시 미리보기 URL 생성
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImagePreviewUrl(imageUrl);
  };

  // 이미지 삭제
  const handleDelete = () => {
    setImagePreviewUrl("");
  };

  return (
    <div>
      {title && <Label>{title}</Label>}

      <ImageUploadContainer>
        <UploadButton htmlFor="image-upload">
          <img src={PlusIcon} alt="plus" />
          이미지 등록
        </UploadButton>

        <HiddenFileInput
          id="image-upload"
          type="file"
          accept="image/*" // 이미지 파일만 허용
          onChange={handleImageChange}
        />

        {/* 이미지가 있을 때만 미리보기 렌더링 */}
        {imagePreviewUrl && (
          <ImagePreview src={imagePreviewUrl}>
            <DeleteButtonWrapper>
              <DeleteButton onClick={handleDelete} label="이미지 파일" />
            </DeleteButtonWrapper>
          </ImagePreview>
        )}
      </ImageUploadContainer>
    </div>
  );
}

export default ImageUpload;
