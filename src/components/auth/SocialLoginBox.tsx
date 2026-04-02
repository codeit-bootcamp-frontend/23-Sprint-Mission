import googleIcon from "../../assets/images/google.png";
import kakaoIcon from "../../assets/images/kakao.png";

function SocialLoginBox() {
  return (
    <div className="social-login">
      <span className="social-title">간편 로그인하기</span>

      <div className="social-icons">
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <img src={googleIcon} alt="구글 로그인" />
        </a>

        <a
          href="https://www.kakaocorp.com/page/"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <img src={kakaoIcon} alt="카카오 로그인" />
        </a>
      </div>
    </div>
  );
}

export default SocialLoginBox;