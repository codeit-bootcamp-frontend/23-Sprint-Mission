import { useState } from 'react';
import styled from 'styled-components';
import InputBox from './InputBox';
import { deleteButtonStyle } from './styles';

export default function Tag({ tags, setTags }) {
  const [tagInput, setTagInput] = useState('');

  const handleChangeTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();

      setTags((prevTags) => [...prevTags, tagInput]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (targetTag) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  return (
    <TagSection>
      <InputBox
        id="tag"
        placeholder="태그를 입력해주세요"
        value={tagInput}
        onChange={handleChangeTagInput}
        onKeyDown={handleKeyDown}
      />
      {tags.length > 0 && (
        <TagList>
          {tags.map((tag) => (
            <TagItem key={tag}>
              #{tag}
              <DeleteButton
                type="button"
                onClick={() => handleDeleteTag(tag)}
              ></DeleteButton>
            </TagItem>
          ))}
        </TagList>
      )}
    </TagSection>
  );
}

const TagSection = styled.div``;
const TagList = styled.ul`
  margin-top: 14px;
  display: flex;
  gap: 12px;
`;
const TagItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px 6px 16px;
  background: var(--gray-100);
  border-radius: 26px;
  font-size: 16px;
  line-height: 1.6;
`;
const DeleteButton = styled.button`
  ${deleteButtonStyle}
  position: relative;
`;
