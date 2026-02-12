import React from "react";
import Logo from "../../src/assets/logo.svg"; // 로고 이미지 import
import { Link, NavLink } from "react-router-dom"; // 페이지 이동용 컴포넌트
import "./Header.css";

// NavLink는 현재 경로와 일치하면 isActive가 true가 됨
// 활성화된 메뉴 색상을 변경하는 함수
function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  return (
    <header className="globalHeader">
      <div className="headerLeft">

        {/* 로고 클릭 시 홈("/")으로 이동 */}
        <Link to="/" className="headerLogo" aria-label="홈으로 이동">
          <img src={Logo} alt="판다마켓 로고" width="153" />
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav>
          <ul>
            <li>
              {/* 현재 경로가 /community면 파란색으로 표시 */}
              <NavLink to="/community" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </li>
            <li>
              {/* 현재 경로가 /items면 파란색으로 표시 */}
              <NavLink to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* 로그인 페이지로 이동 */}
      <Link to="/login" className="login button">
        로그인
      </Link>
    </header>
  );
}

export default Header;