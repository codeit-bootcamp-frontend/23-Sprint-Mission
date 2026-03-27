interface AuthInputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  errorMessage?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

function AuthInput({
  label,
  id,
  type = "text",
  value,
  placeholder,
  autoComplete,
  errorMessage,
  onChange,
  onBlur,
}: AuthInputProps) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <input
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
      />

      {/* 에러 메시지 */}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}

export default AuthInput;