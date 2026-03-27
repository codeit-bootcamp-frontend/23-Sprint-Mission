import { useNavigate } from "react-router-dom";
import useLoginForm from "../../hooks/useLoginForm";
import "./LoginPage.css";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLoginBox from "../../components/auth/SocialLoginBox";

function LoginPage() {
  const navigate = useNavigate();

  const {
    formValues,
    showPassword,
    isSubmitting,
    emailEmptyError,
    emailInvalidError,
    passwordEmptyError,
    passwordInvalidError,
    isFormValid,
    setShowPassword,
    setTouchedEmail,
    setTouchedPassword,
    handleChange,
    handleSubmit,
  } = useLoginForm({
    onSuccess: () => navigate("/items"),
  });

  // 이메일 에러 메시지
  const emailError =
    emailEmptyError
      ? "이메일을 입력해 주세요"
      : emailInvalidError
      ? "잘못된 이메일 형식입니다"
      : "";

  // 비밀번호 에러 메시지
  const passwordError =
    passwordEmptyError
      ? "비밀번호를 입력해 주세요"
      : passwordInvalidError
      ? "비밀번호를 8자 이상 입력해 주세요"
      : "";

  return (
    <AuthLayout
      footerText="판다마켓이 처음이신가요?"
      footerLinkText="회원가입"
      footerLinkTo="/signup"
    >
      {/* 로그인 폼 */}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* 이메일 입력 */}
        <AuthInput
          label="이메일"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="이메일을 입력해 주세요"
          value={formValues.email}
          errorMessage={emailError}
          onChange={handleChange}
          onBlur={() => setTouchedEmail(true)}
        />

        {/* 비밀번호 입력 */}
        <PasswordInput
          label="비밀번호"
          id="password"
          autoComplete="current-password"
          placeholder="비밀번호를 입력해 주세요"
          value={formValues.password}
          showPassword={showPassword}
          errorMessage={passwordError}
          onToggle={() => setShowPassword((prev) => !prev)}
          onChange={handleChange}
          onBlur={() => setTouchedPassword(true)}
        />

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="login-button"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        {/* 간편 로그인 */}
        <SocialLoginBox />
      </form>
    </AuthLayout>
  );
}

export default LoginPage;