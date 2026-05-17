import styled from 'styled-components';
import { fieldBaseStyle } from './styles';

export default function TextareaBox({ id, placeholder, ...props }) {
  return <Textarea id={id} placeholder={placeholder} {...props} />;
}

const Textarea = styled.textarea`
  ${fieldBaseStyle}
  height: 282px;
  resize: none;
`;
