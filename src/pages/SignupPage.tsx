import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/loginLogo.svg';
import blinkIcon from '../assets/blink.svg';
import nonBlinkIcon from '../assets/non-blink.svg';
import googleIcon from '../assets/google.svg';
import kakaoIcon from '../assets/kakaologo.svg';
import styles from './SignupPage.module.css';
import { EMAILVALID } from '../util/emailvalid';

const emailPattern: RegExp = EMAILVALID;

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAccept, setPasswordAccept] = useState('');

  const [emailTouched, setEmailTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordAcceptTouched, setPasswordAcceptTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAccept, setShowPasswordAccept] = useState(false);

  const getEmailError = () => {
    if (!emailTouched) return '';
    if (email === '') return '이메일을 입력해주세요.';
    if (!emailPattern.test(email)) return '잘못된 이메일 형식입니다.';
    return '';
  };

  const getNicknameError = () => {
    if (!nicknameTouched) return '';
    if (nickname === '') return '닉네임을 입력해주세요.';
    return '';
  };

  const getPasswordError = () => {
    if (!passwordTouched) return '';
    if (password === '') return '비밀번호를 입력해주세요.';
    if (password.length < 8) return '비밀번호를 8자 이상 입력해주세요.';
    return '';
  };

  const getPasswordAcceptError = () => {
    if (!passwordAcceptTouched) return '';
    if (passwordAccept === '') return '비밀번호를 한 번 더 입력해주세요.';
    if (passwordAccept !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const emailError = getEmailError();
  const nicknameError = getNicknameError();
  const passwordError = getPasswordError();
  const passwordAcceptError = getPasswordAcceptError();

  const emailState = email !== '' && emailPattern.test(email);
  const nicknameState = nickname !== '';
  const passwordState = password !== '' && password.length >= 8;
  const passwordAcceptState =
    passwordAccept !== '' && passwordAccept === password;

  const canSubmit =
    emailState && nicknameState && passwordState && passwordAcceptState;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      navigate('/login');
    }
  };

  return (
    <div className={styles['signup-page']}>
      <div className={styles['wrapper']}>
        <header className={styles['top-header']}>
          <img src={logoIcon} alt="판다마켓 로고" />
          <Link to="/">
            <h1 className={styles['logo-name']}>판다마켓</h1>
          </Link>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <div className={styles['signup-input']}>
              <label className={styles['label-input']} htmlFor="id">
                이메일
              </label>
              <div
                className={`${styles['signup-container']} ${emailTouched ? (emailError ? styles['error-border'] : styles['accept-border']) : ''}`}
              >
                <input
                  className={styles['id-input']}
                  type="email"
                  id="id"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                />
              </div>
              <p className={styles['error-message']}>{emailError}</p>
            </div>

            <div className={styles['signup-input']}>
              <label className={styles['label-input']} htmlFor="nickname">
                닉네임
              </label>
              <div
                className={`${styles['signup-container']} ${nicknameTouched ? (nicknameError ? styles['error-border'] : styles['accept-border']) : ''}`}
              >
                <input
                  className={styles['id-input']}
                  id="nickname"
                  placeholder="닉네임을 입력해주세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onBlur={() => setNicknameTouched(true)}
                />
              </div>
              <p className={styles['error-message']}>{nicknameError}</p>
            </div>

            <div className={styles['signup-input']}>
              <label className={styles['label-input']} htmlFor="password">
                비밀번호
              </label>
              <div
                className={`${styles['signup-container']} ${passwordTouched ? (passwordError ? styles['error-border'] : styles['accept-border']) : ''}`}
              >
                <input
                  className={styles['password-input']}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                />
                <button
                  className={styles['password-blink']}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? blinkIcon : nonBlinkIcon}
                    alt="보임 이모지"
                  />
                </button>
              </div>
              <p className={styles['error-message']}>{passwordError}</p>
            </div>

            <div className={styles['signup-input']}>
              <label
                className={styles['label-input']}
                htmlFor="password-accept"
              >
                비밀번호 확인
              </label>
              <div
                className={`${styles['signup-container']} ${passwordAcceptTouched ? (passwordAcceptError ? styles['error-border'] : styles['accept-border']) : ''}`}
              >
                <input
                  className={styles['password-input']}
                  type={showPasswordAccept ? 'text' : 'password'}
                  id="password-accept"
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  value={passwordAccept}
                  onChange={(e) => setPasswordAccept(e.target.value)}
                  onBlur={() => setPasswordAcceptTouched(true)}
                />
                <button
                  className={styles['password-blink']}
                  type="button"
                  onClick={() => setShowPasswordAccept(!showPasswordAccept)}
                >
                  <img
                    src={showPasswordAccept ? blinkIcon : nonBlinkIcon}
                    alt="보임 이모지"
                  />
                </button>
              </div>
              <p className={styles['error-message']}>{passwordAcceptError}</p>
            </div>

            <button
              className={`${styles['signup-button']} ${canSubmit ? styles['signup-accept-button'] : ''}`}
              type="submit"
              disabled={!canSubmit}
            >
              회원가입
            </button>
          </form>

          <div className={styles['easy-signup-container']}>
            <div>간편 로그인하기</div>
            <div className={styles['icon-container']}>
              <a href="https://www.google.com/" target="_blank">
                <img
                  className={styles['icon']}
                  src={googleIcon}
                  alt="구글 아이콘"
                />
              </a>
              <a href="https://www.kakaocorp.com/page/" target="_blank">
                <img
                  className={styles['icon']}
                  src={kakaoIcon}
                  alt="카카오 아이콘"
                />
              </a>
            </div>
          </div>
        </main>
        <footer className={styles['final-footer']}>
          <p>
            이미 회원이신가요? <Link to="/login">로그인</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignupPage;
