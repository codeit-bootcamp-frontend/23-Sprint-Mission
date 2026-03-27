import { Link, useNavigate } from "react-router-dom";
import useLoginForm from "../../hooks/useLoginForm";
import "./LoginPage.css";

import logoImage from "../../assets/images/logo.png";
import closeEyeIcon from "../../assets/images/icon-close-eye.png";
import openEyeIcon from "../../assets/images/icon-open-eye.png";
import googleIcon from "../../assets/images/google.png";
import kakaoIcon from "../../assets/images/kakao.png";

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

        {/* 로그인 폼 */}
        <form className="login-form" onSubmit={handleSubmit}>
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
            <label htmlFor="password">비밀번호</label>

            <div className="input-group-password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="비밀번호를 입력해 주세요"
                value={formValues.password}
                onChange={handleChange}
                onBlur={() => setTouchedPassword(true)}
              />

              <img
                className="password-image"
                src={showPassword ? openEyeIcon : closeEyeIcon}
                alt={showPassword ? "비밀번호 보임" : "비밀번호 가림"}
                onClick={() => setShowPassword((prev) => !prev)}
              />
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

          <button
            type="submit"
            className="login-button"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
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
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
