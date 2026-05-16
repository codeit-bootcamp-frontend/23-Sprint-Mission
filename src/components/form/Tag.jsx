import { useState } from 'react';
import styled from 'styled-components';
import InputBox from './InputBox';

export default function Tag() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleChangeTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();

      setTags([...tags, tagInput]);
      setTagInput('');
    }
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
            <TagItem key={tag}>#{tag}</TagItem>
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
  padding: 6px 12px 6px 16px;
  background: var(--gray-100);
  border-radius: 26px;
`;
