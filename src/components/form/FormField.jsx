import styled from 'styled-components';
import { DEVICE } from '../../styles/breakpoints';

export default function FormField({ id, label, labelSize, children }) {
  return (
    <Field>
      <Label htmlFor={id} $labelSize={labelSize}>
        {label}
      </Label>
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

  @media ${DEVICE.mobile} {
    font-size: ${({ $labelSize }) => ($labelSize ? `${$labelSize}px` : '18px')};
  }
`;
