import styled from 'styled-components';

export default function SubmitButton({ children = '등록', ...props }) {
  return <Button {...props}>{children}</Button>;
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  padding: 12px 23px;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 600;
  border-radius: 8px;
  color: var(--gray-100);
  background: var(--primary-100);

  &:disabled {
    background: var(--gray-400);
  }
`;
