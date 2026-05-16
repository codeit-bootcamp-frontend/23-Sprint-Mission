import styled from 'styled-components';
import { fieldBaseStyle } from './styles';

export default function TextareaBox({ placeholder }) {
  return (
    <>
      <Textarea placeholder={placeholder} />
    </>
  );
}

const Textarea = styled.textarea`
  ${fieldBaseStyle}
  height: 282px;
  resize: none;
`;
