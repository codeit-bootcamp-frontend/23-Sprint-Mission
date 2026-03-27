import { useNavigate } from "react-router-dom";
import useSignUpForm from "../../hooks/useSignUpForm";
import "./SignUpPage.css";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLoginBox from "../../components/auth/SocialLoginBox";

function SignUpPage() {
  const navigate = useNavigate();

  const {
    formValues,
    showPassword,
    showPasswordConfirmation,
    isSubmitting,
    emailErrorMessage,
    nicknameErrorMessage,
    passwordErrorMessage,
    passwordConfirmationErrorMessage,
    isFormValid,
    setShowPassword,
    setShowPasswordConfirmation,
    handleChange,
    handleSubmit,
  } = useSignUpForm({
    onSuccess: () => navigate("/login"),
  });

  return (
    <AuthLayout
      footerText="이미 회원이신가요?"
      footerLinkText="로그인"
      footerLinkTo="/login"
    >
      {/* 회원가입 폼 */}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* 이메일 */}
        <AuthInput
          label="이메일"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="이메일을 입력해 주세요"
          value={formValues.email}
          errorMessage={emailErrorMessage}
          onChange={handleChange}
        />

        {/* 닉네임 */}
        <AuthInput
          label="닉네임"
          id="nickname"
          placeholder="닉네임을 입력해 주세요"
          value={formValues.nickname}
          errorMessage={nicknameErrorMessage}
          onChange={handleChange}
        />

        {/* 비밀번호 */}
        <PasswordInput
          label="비밀번호"
          id="password"
          autoComplete="new-password"
          placeholder="비밀번호를 입력해 주세요"
          value={formValues.password}
          showPassword={showPassword}
          errorMessage={passwordErrorMessage}
          onToggle={() => setShowPassword((prev) => !prev)}
          onChange={handleChange}
        />

        {/* 비밀번호 확인 */}
        <PasswordInput
          label="비밀번호 확인"
          id="passwordConfirmation"
          autoComplete="new-password"
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          value={formValues.passwordConfirmation}
          showPassword={showPasswordConfirmation}
          errorMessage={passwordConfirmationErrorMessage}
          onToggle={() =>
            setShowPasswordConfirmation((prev) => !prev)
          }
          onChange={handleChange}
        />

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className="login-button"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>

        {/* 간편 로그인 */}
        <SocialLoginBox />
      </form>
    </AuthLayout>
  );
}

export default SignUpPage;