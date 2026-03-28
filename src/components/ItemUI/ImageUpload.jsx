import { useId, useRef, useState } from "react";
import styled, { css } from "styled-components";
import PlusIcon from "../../assets/icons/ic_plus.svg?react";
import DeleteButton from "./DeleteButton";
import { Label } from "./InputItem";

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

const squareStyle = css`
  width: calc(50% - 4px);
  max-width: 282px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 162px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 282px;
  }
`;

const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.color.gray[1]};
  color: ${({ theme }) => theme.color.gray[0]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.gray[2]};
  }

  ${squareStyle}
`;

const ImagePreview = styled.div`
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  position: relative;

  ${squareStyle}
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

export default function ImageUpload({ title }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputId = useId();
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImagePreviewUrl(imageUrl);
  };

  const handleDelete = () => {
    setImagePreviewUrl("");
    setErrorMessage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      {title && <Label>{title}</Label>}

      <ImageUploadContainer>
        <UploadButton
          htmlFor={imagePreviewUrl ? undefined : inputId}
          onClick={(e) => {
            if (imagePreviewUrl) {
              e.preventDefault();
              setErrorMessage("*이미지 등록은 최대 1개까지 가능합니다.");
            } else {
              setErrorMessage("");
            }
          }}
        >
          <PlusIcon />
          이미지 등록
        </UploadButton>

        <HiddenFileInput
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {imagePreviewUrl && (
          <ImagePreview $src={imagePreviewUrl}>
            <DeleteButtonWrapper>
              <DeleteButton onClick={handleDelete} label="이미지 파일" />
            </DeleteButtonWrapper>
          </ImagePreview>
        )}
      </ImageUploadContainer>

      {errorMessage && (
        <div style={{ color: "red", marginTop: "8px", fontSize: "16px" }}>
          {errorMessage}
        </div>
      )}

    </div>
  );
}