import styled from "styled-components";
import { FlexContainer } from "../../styles/Common";
import { useState } from "react";
import InputItem from "./InputItem";
import DeleteButton from "./DeleteButton";

const TagButtonSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const Tag = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.color.gray[2]};
  color: ${({ theme }) => theme.color.black};
  padding: 14px 14px 14px 16px;
  border-radius: 999px;
  min-width: 100px;
`;

const TagText = styled.span`
  font-size: 16px;
  line-height: 24px;
  margin-right: 8px;
  max-width: calc(100% - 28px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function TagInput({ tags, onAddTag, onRemoveTag }) {
  const [input, setInput] = useState("");

  const onPressEnter = (e) => {
    if (e.nativeEvent.isComposing) return;

    const inputString = input.trim();
    if (e.key === "Enter" && inputString) {
      e.preventDefault();
      onAddTag(inputString);
      setInput("");
    }
  };

  return (
    <div>
      <InputItem
        id="tags"
        label="태그"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onPressEnter}
        placeholder="태그를 입력해 주세요"
      />

      {tags.length > 0 && (
        <TagButtonSection>
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`}>
              <TagText>{tag}</TagText>

              <DeleteButton
                onClick={() => onRemoveTag(tag)}
                label={`${tag} 태그`}
              />
            </Tag>
          ))}
        </TagButtonSection>
      )}
    </div>
  )
}