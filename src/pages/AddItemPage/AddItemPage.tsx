import { useState } from "react";
import {
  Button,
  Container,
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles";
import styled from "styled-components";
import InputItem from "../../components/InputItem";
import TagInput from "../../components/TagInput";
import ImageUpload from "../../components/ImageUpload";

// 상단 제목 + 버튼 영역
const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

// 입력 영역 전체 감싸는 컨테이너
const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  // 태블릿 이상에서는 간격 조금 더 넓게
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;

function AddItemPage() {
  // 각 input 값 상태 관리
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // 태그 추가 (중복 방지)
  const addTag = (tag: string): void => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]); // 기존 배열 복사 후 추가
    }
  };

  // 선택한 태그 삭제
  const removeTag = (tagToRemove: string): void => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 폼 제출 시 실행
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // 새로고침 방지

    // 기본적인 유효성 검사
    if (!name.trim() || !description.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 가격이 숫자인지 확인
    if (isNaN(Number(price))) {
      alert("가격은 숫자로 입력해주세요.");
      return;
    }

    // 등록할 상품 객체 생성
    const newItem = {
      id: Date.now(), // 간단하게 고유 id 생성
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      tags,
    };

    console.log("등록된 상품:", newItem);

    // 등록 후 입력값 초기화
    setName("");
    setDescription("");
    setPrice("");
    setTags([]);
  };

  // 이미지 제외 모든 값이 입력되어야 버튼 활성화
  const isSubmitDisabled =
    !name || !description || !price || !tags.length;

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button type="submit" disabled={isSubmitDisabled}>
            등록
          </Button>
        </TitleSection>

        <InputSection>
          {/* 이미지 업로드 컴포넌트 */}
          <ImageUpload title="상품 이미지" />

          {/* 상품명 입력 */}
          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="상품명을 입력해 주세요"
          />

          {/* 상품 설명 입력 */}
          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
          />

          {/* 가격 입력 */}
          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            placeholder="판매 가격을 입력해 주세요"
          />

          {/* 태그 입력 */}
          <TagInput
            tags={tags}
            onAddTag={addTag}
            onRemoveTag={removeTag}
          />
        </InputSection>
      </form>
    </Container>
  );
}

export default AddItemPage;