import { css } from 'styled-components';

export const fieldBaseStyle = css`
  padding: 16px 24px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 12px;
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
