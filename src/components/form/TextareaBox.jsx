import styled from 'styled-components';
import { fieldBaseStyle } from './styles';

export default function TextareaBox({ id, placeholder }) {
  return (
    <>
      <Textarea id={id} placeholder={placeholder} />
    </>
  );
}

const Textarea = styled.textarea`
  ${fieldBaseStyle}
  height: 282px;
  resize: none;
`;
