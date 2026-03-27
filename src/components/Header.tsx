import Logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import axios from "../utils/axios";
import Axios from "axios";
import "./Header.css";

function getLinkStyle({ isActive }: NavLinkRenderProps): React.CSSProperties {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  // 테스트 회원가입 함수
  const handleTestSignUp = async (): Promise<void> => {
    try {
      const res = await axios.post<{ accessToken: string }>("/auth/signUp", {
        email: "a7522154@naver.com",
        nickname: "테스트유저",
        password: "kdo06133!",
        passwordConfirmation: "kdo06133!",
      });

      localStorage.setItem("accessToken", res.data.accessToken);

      console.log("회원가입 성공:", res.data);
      alert("회원가입 성공");
    } catch (error: unknown) {
      if (Axios.isAxiosError(error)) {
        console.error("회원가입 실패:", error.response?.data || error.message);
      } else {
        console.error("회원가입 실패:", error);
      }
      alert("회원가입 실패");
    }
  };

  // 테스트 로그인 함수
  const handleTestLogin = async (): Promise<void> => {
    try {
      const res = await axios.post<{ accessToken: string }>("/auth/signIn", {
        email: "a7522154@naver.com",
        password: "kdo06133!",
      });

      localStorage.setItem("accessToken", res.data.accessToken);

      console.log("로그인 성공:", res.data);
      alert("로그인 성공");
    } catch (error: unknown) {
      if (Axios.isAxiosError(error)) {
        console.error("로그인 실패:", error.response?.data || error.message);
      } else {
        console.error("로그인 실패:", error);
      }
      alert("로그인 실패");
    }
  };

  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <Link to="/" className="headerLogo" aria-label="홈으로 이동">
          <img src={Logo} alt="판다마켓 로고" width="153" />
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/community" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* 테스트 회원가입 버튼 */}
      <button onClick={handleTestSignUp} className="signup button">
        테스트 회원가입
      </button>

      {/* 테스트 로그인 버튼 */}
      <button onClick={handleTestLogin} className="login button">
        테스트 로그인
      </button>
    </header>
  );
}

export default Header;