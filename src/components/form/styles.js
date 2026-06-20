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

export const deleteButtonStyle = css`
  width: 20px;
  height: 20px;
  background: var(--gray-400);
  border-radius: 50%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    background: #fff;
    border-radius: 999px;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
