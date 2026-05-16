import styled from 'styled-components';

export default function FormFiled({ label, children }) {
  return (
    <Filed>
      <Label>{label}</Label>
      {children}
    </Filed>
  );
}

const Filed = styled.div`
  & + & {
    margin-top: 16px;
  }
`;
const Label = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 700;
  color: var(--gray-800);
`;
