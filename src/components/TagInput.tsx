import styled from "styled-components";
import InputItem from "./InputItem";
import { FlexContainer } from "../styles/CommonStyles";
import { useState } from "react";
import DeleteButton from "./DeleteButton";

// 태그 리스트 영역
const TagButtonsSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap; /* 태그가 길어지면 다음 줄로 */
`;

// 개별 태그 스타일
const Tag = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.colors.gray.bgLight};
  color: ${({ theme }) => theme.colors.black};
  padding: 14px 14px 14px 16px;
  border-radius: 999px;
  min-width: 100px;
`;

// 태그 텍스트
const TagText = styled.span`
  font-size: 16px;
  line-height: 24px;
  margin-right: 8px;
  max-width: calc(100% - 28px); /* 삭제 버튼 영역 제외 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

function TagInput({ tags, onAddTag, onRemoveTag }: TagInputProps) {
  const [input, setInput] = useState<string>("");

  // Enter 입력 시 태그 추가
  const onPressEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    // 한글 IME 입력 중일 때는 처리하지 않음
    if ((event.nativeEvent as KeyboardEvent).isComposing) return;

    const trimmed = input.trim();

    if (event.key === "Enter" && trimmed) {
      event.preventDefault(); // form submit 방지
      onAddTag(trimmed);
      setInput(""); // 입력 초기화
    }
  };

  return (
    <div>
      <InputItem
        id="tags"
        label="태그"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onKeyDown={onPressEnter}
        placeholder="태그를 입력해 주세요"
      />

      {/* 태그가 있을 때만 렌더링 */}
      {tags.length > 0 && (
        <TagButtonsSection>
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`}>
              <TagText>{tag}</TagText>

              <DeleteButton
                onClick={() => onRemoveTag(tag)}
                label={`${tag} 태그`}
              />
            </Tag>
          ))}
        </TagButtonsSection>
      )}
    </div>
  );
}

export default TagInput;