import styled, { css } from "styled-components";

// input / textarea 공통 스타일 정의
const inputStyle = css`
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.gray.bg};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.text};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.blue.primary};
  }
`;

// 라벨 컴포넌트
export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 18px;
  }
`;

// 기본 input 필드
const InputField = styled.input`
  ${inputStyle}
`;

// textarea 필드
const TextArea = styled.textarea`
  ${inputStyle}
  height: 200px; /* 기본 높이 */
  resize: none; /* 크기 조절 비활성화 */
`;

interface BaseProps {
  id: string;
  label?: string;
  value: string;
  placeholder?: string;
}

interface InputProps extends BaseProps {
  isTextArea?: false;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface TextAreaProps extends BaseProps {
  isTextArea: true;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: never;
}

type InputItemProps = InputProps | TextAreaProps;

// 공통 입력 컴포넌트
// isTextArea 값에 따라 input / textarea 분기
function InputItem({
  id,
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  isTextArea,
}: InputItemProps) {
  return (
    <div>
      {/* label이 있는 경우만 렌더링 */}
      {label && <Label htmlFor={id}>{label}</Label>}

      {isTextArea ? (
        <TextArea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <InputField
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default InputItem;