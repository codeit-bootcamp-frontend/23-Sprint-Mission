import styled from 'styled-components';
import { fieldBaseStyle } from './styles';

export default function InputBox({ id, placeholder }) {
  return <Input id={id} placeholder={placeholder} />;
}

const Input = styled.input`
  ${fieldBaseStyle}
  height: 56px;
`;
