import styled from 'styled-components';

export default function InputBox({ placeholder }) {
  return (
    <>
      <Input placeholder={placeholder} />
    </>
  );
}

const Input = styled.input`
  padding: 16px 24px;
  height: 56px;
  border-radius: 12px;
  font-size: 16px;
  color: var(--gray-800);
  background: var(--gray-100);
  border: 1px solid transparent;

  &::placeholder {
    color: var(--gray-400);
  }

  &:focus {
    border-color: var(--primary-100);
  }
`;
