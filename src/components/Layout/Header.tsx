import Logo from '../../assets/logo/logo.svg';
import styled from 'styled-components';
import { StyledLink } from '../../styles/Common';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import DefaultProfileImage from '../../assets/ui/ic_profile.svg?react';
import { useEffect, useRef, useState } from 'react';

const GlobalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(Link)`
  margin-right: 16px;

  @media (min-width: 768px) {
    margin-right: 35px;
  }

  @media (min-width: 1280px) {
    margin-right: 47px;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  color: var(--gray-600);

  @media (min-width: 768px) {
    gap: 36px;
    font-size: 18px;
  }
`;

const NavItem = styled.li`
  a:hover {
    color: var(--blue);
  }
`;

const LoginLink = styled(StyledLink)``;

const ProfileWrapper = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 120px;
  padding: 8px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    color: var(--blue);
  }
`;

function getLinkStyle({ isActive }: { isActive: boolean }) {
  return { color: isActive ? 'var(--blue)' : undefined };
}

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = localStorage.getItem('accessToken');

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');

    setIsOpen(false);

    navigate('/login');
  };

  return (
    <GlobalHeader>
      <HeaderLeft>
        <HeaderLogo to="/" aria-label="홈으로 이동">
          <img src={Logo} alt="판다마켓 로고" width="153" />
        </HeaderLogo>

        <nav>
          <NavList>
            <NavItem>
              <NavLink to="/community" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                to="/items"
                style={({ isActive }) =>
                  location.pathname === '/additem' || isActive
                    ? {
                        color: 'var(--blue)',
                      }
                    : {}
                }
              >
                중고마켓
              </NavLink>
            </NavItem>
          </NavList>
        </nav>
      </HeaderLeft>

      {isLoggedIn ? (
        <ProfileWrapper ref={wrapperRef}>
          <ProfileButton onClick={() => setIsOpen((prev) => !prev)}>
            <DefaultProfileImage />
          </ProfileButton>

          {isOpen && (
            <Dropdown>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </Dropdown>
          )}
        </ProfileWrapper>
      ) : (
        <LoginLink to="/login">로그인</LoginLink>
      )}
    </GlobalHeader>
  );
};

export default Header;
