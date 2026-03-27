import { Link, useNavigate } from "react-router-dom";
import useSignUpForm from "../../hooks/useSignUpForm";
import "./SignUpPage.css";

import logoImage from "../../assets/images/logo.png";
import closeEyeIcon from "../../assets/images/icon-close-eye.png";
import openEyeIcon from "../../assets/images/icon-open-eye.png";
import googleIcon from "../../assets/images/google.png";
import kakaoIcon from "../../assets/images/kakao.png";

function SignUpPage() {
  const navigate = useNavigate();

  const {
    formValues,
    showPassword,
    showPasswordConfirmation,
    isSubmitting,
    emailEmptyError,
    emailInvalidError,
    nicknameEmptyError,
    passwordEmptyError,
    passwordInvalidError,
    passwordConfirmationInitError,
    passwordConfirmationError,
    isFormValid,
    setShowPassword,
    setShowPasswordConfirmation,
    setTouchedEmail,
    setTouchedNickname,
    setTouchedPassword,
    setTouchedPasswordConfirmation,
    handleChange,
    handleSubmit,
  } = useSignUpForm({
    onSuccess: () => navigate("/login"),
  });

  return (
    <main className="login-page">
      <section className="login-card">
        {/* 로고 */}
        <header className="login-header">
          <img src={logoImage} alt="판다마켓 로고" className="logo-icon" />
          <Link to="/">
            <h1 className="logo-text">판다마켓</h1>
          </Link>
        </header>

        {/* 회원가입 폼 */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해 주세요"
              value={formValues.email}
              onChange={handleChange}
              onBlur={() => setTouchedEmail(true)}
            />

            {emailEmptyError && (
              <span className="error-message">이메일을 입력해 주세요</span>
            )}
            {emailInvalidError && (
              <span className="error-message">잘못된 이메일 형식입니다</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해 주세요"
              value={formValues.nickname}
              onChange={handleChange}
              onBlur={() => setTouchedNickname(true)}
            />

            {nicknameEmptyError && (
              <span className="error-message">닉네임을 입력해주세요</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>

            <div className="input-group-password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="비밀번호를 입력해 주세요"
                value={formValues.password}
                onChange={handleChange}
                onBlur={() => setTouchedPassword(true)}
              />

              <button
                type="button"
                className="password-toggle-button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                <img
                  className="password-image"
                  src={showPassword ? openEyeIcon : closeEyeIcon}
                  alt=""
                />
              </button>
            </div>

            {passwordEmptyError && (
              <span className="error-message">비밀번호를 입력해 주세요</span>
            )}
            {passwordInvalidError && (
              <span className="error-message">
                비밀번호를 8자 이상 입력해 주세요
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="passwordConfirmation">비밀번호 확인</label>

            <div className="input-group-password">
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                id="passwordConfirmation"
                name="passwordConfirmation"
                autoComplete="new-password"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={formValues.passwordConfirmation}
                onChange={handleChange}
                onBlur={() => setTouchedPasswordConfirmation(true)}
              />

              <button
                type="button"
                className="password-toggle-button"
                onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                aria-label={
                  showPasswordConfirmation ? "비밀번호 숨기기" : "비밀번호 보기"
                }
              >
                <img
                  className="password-image"
                  src={showPasswordConfirmation ? openEyeIcon : closeEyeIcon}
                  alt=""
                />
              </button>
            </div>

            {passwordConfirmationInitError && (
              <span className="error-message">
                조건에 맞는 비밀번호를 입력해 주세요.
              </span>
            )}

            {passwordConfirmationError && (
              <span className="error-message">
                비밀번호가 일치하지 않습니다.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "회원가입 중..." : "회원가입"}
          </button>

          <div className="social-login">
            <span className="social-title">간편 로그인하기</span>

            <div className="social-icons">
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noreferrer"
                className="social-icon google"
              >
                <img src={googleIcon} alt="구글 로그인" />
              </a>

              <a
                href="https://www.kakaocorp.com/page/"
                target="_blank"
                rel="noreferrer"
                className="social-icon kakao"
              >
                <img src={kakaoIcon} alt="카카오 로그인" />
              </a>
            </div>
          </div>
        </form>

        <p className="signup-text">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </section>
    </main>
  );
}

export default SignUpPage;
