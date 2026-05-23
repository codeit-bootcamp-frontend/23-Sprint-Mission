import React, { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import styled, { css } from 'styled-components';
import { UseFormRegisterReturn } from 'react-hook-form';

const inputStyle = css`
  background-color: ${({ theme }) => theme.color.gray[100]};
  color: ${({ theme }) => theme.color.gray[800]};
  width: 100%;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  padding: 16px 24px;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray[400]};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.color.blue.primary};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 18px;
  }
`;

export const InputField = styled.input<{
  hasError?: boolean;
  hasSuccess?: boolean;
}>`
  ${inputStyle}

  border: 1px solid
    ${({ hasError }) => (hasError ? 'var(--red)' : 'transparent')};

  background-color: ${({ theme, hasSuccess, hasError }) => {
    if (hasError) return theme.color.gray[100];
    if (hasSuccess) return 'rgba(54, 124, 255, 0.1)';
    return theme.color.gray[100];
  }};

  &:focus {
    outline: none;
    border-color: ${({ hasError }) =>
      hasError ? 'var(--red)' : 'var(--blue)'};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean; hasSuccess?: boolean }>`
  ${inputStyle}
  height: 200px;
  resize: none;

  border: 1px solid
    ${({ hasError }) => (hasError ? 'var(--red)' : 'transparent')};

  background-color: ${({ theme, hasSuccess, hasError }) => {
    if (hasError) return theme.color.gray[100];
    if (hasSuccess) return 'rgba(54, 124, 255, 0.1)';
    return theme.color.gray[100];
  }};

  &:focus {
    outline: none;
    border-color: ${({ hasError }) =>
      hasError ? 'var(--red)' : 'var(--blue)'};
  }
`;

export const ErrorMessage = styled.span`
  color: var(--red);
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  margin-top: 8px;
  display: block;
`;

interface InputItemProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  errorMessage?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  hasSuccess?: boolean;
}

const InputItem: React.FC<InputItemProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  onKeyDown,
  isTextArea,
  errorMessage,
  hasSuccess,
  type = 'text',
  register,
}) => {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      {isTextArea ? (
        <TextArea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          hasError={!!errorMessage}
          {...register}
        />
      ) : (
        <InputField
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
          hasError={!!errorMessage}
          hasSuccess={hasSuccess}
          {...register}
        />
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default InputItem;
