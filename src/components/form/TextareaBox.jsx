import styled from 'styled-components';

export default function TextareaBox({ placeholder }) {
  return (
    <>
      <Textarea placeholder={placeholder} />
    </>
  );
}

const Textarea = styled.textarea`
  padding: 16px 24px;
  height: 282px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 12px;
  color: var(--gray-800);
  background: var(--gray-100);
  border: 1px solid transparent;
  resize: none;

  &::placeholder {
    color: var(--gray-400);
  }

  &:focus {
    border-color: var(--primary-100);
  }
`;
