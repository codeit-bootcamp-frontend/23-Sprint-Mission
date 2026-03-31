import styled from "styled-components";

const TagDisplaySection = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.color.gray[50]};
  color: ${({ theme }) => theme.color.gray[800]};
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 16px;
`;

export default function TagDisplay({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <TagDisplaySection>
      {tags.map((tag, idx) => (
        <Tag key={`tag-display-${idx}`}>#{tag}</Tag>
      ))}
    </TagDisplaySection>
  )
}