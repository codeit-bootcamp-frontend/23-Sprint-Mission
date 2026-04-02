import closeEyeIcon from "../../assets/images/icon-close-eye.png";
import openEyeIcon from "../../assets/images/icon-open-eye.png";

interface PasswordInputProps {
  label: string;
  id: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  showPassword: boolean;
  errorMessage?: string;
  onToggle: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

function PasswordInput({
  label,
  id,
  value,
  placeholder,
  autoComplete,
  showPassword,
  errorMessage,
  onToggle,
  onChange,
  onBlur,
}: PasswordInputProps) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <div className="input-group-password">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
        />

        {/* 비밀번호 보기 / 숨기기 버튼 */}
        <button
          type="button"
          className="password-toggle-button"
          onClick={onToggle}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          <img
            className="password-image"
            src={showPassword ? openEyeIcon : closeEyeIcon}
            alt=""
          />
        </button>
      </div>

      {/* 에러 메시지 */}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}

export default PasswordInput;