import styled from 'styled-components';
import { fieldBaseStyle } from './styles';

export default function InputBox({ placeholder }) {
  return <Input placeholder={placeholder} />;
}

const Input = styled.input`
  ${fieldBaseStyle}
  height: 56px;
`;
