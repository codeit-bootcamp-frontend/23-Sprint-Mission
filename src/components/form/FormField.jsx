import styled from 'styled-components';

export default function FormField({ id, label, children }) {
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </Field>
  );
}

const Field = styled.div``;
const Label = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 700;
  color: var(--gray-800);
`;
