import styled from 'styled-components';
import { fieldBaseStyle } from './styles';

export default function InputBox({ id, placeholder, ...props }) {
  return <Input id={id} placeholder={placeholder} {...props} />;
}

const Input = styled.input`
  ${fieldBaseStyle}
  height: 56px;
`;
