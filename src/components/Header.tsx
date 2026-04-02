import Logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import "./Header.css";

function getLinkStyle({
  isActive,
}: NavLinkRenderProps): React.CSSProperties {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  return (
    <header className="globalHeader">
      <div className="globalHeaderInner">
        {/* 왼쪽 영역 */}
        <div className="headerLeft">
          <Link to="/" className="headerLogo" aria-label="홈으로 이동">
            <img src={Logo} alt="판다마켓 로고" width="153" />
          </Link>

          <nav>
            <ul className="headerNavList">
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

        {/* 오른쪽 영역 */}
        <div className="headerRight">
          <Link to="/login" className="headerLoginButton">
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;