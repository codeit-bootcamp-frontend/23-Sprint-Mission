import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../../assets/images/logo.svg?react';
import LogoMobileImg from '../../assets/images/logo-mo.svg?react';
import MyPage from '../../assets/icon/icon-profile-default.svg?react';
import { DEVICE } from '../../styles/breakpoints';

function Header() {
  const location = useLocation();

  const isItemsPage =
    location.pathname === '/items' ||
    location.pathname === '/additem' ||
    /^\/items\/\d+$/.test(location.pathname) ||
    /^\/items\/\d+\/edit$/.test(location.pathname);

  return (
    <>
      <HeaderSection>
        <HeaderInner>
          <LeftArea>
            <LogoLink to="/">
              <LogoPc>
                <LogoImg />
              </LogoPc>
              <LogoMobile>
                <LogoMobileImg />
              </LogoMobile>
            </LogoLink>
            <NavList>
              <NavItem>
                <NavLink to="/" $isActive={location.pathname === '/'}>
                  자유게시판
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/items" $isActive={isItemsPage}>
                  중고마켓
                </NavLink>
              </NavItem>
            </NavList>
          </LeftArea>
          <RightArea>
            <MyPageLink>
              <MyPage />
            </MyPageLink>
          </RightArea>
        </HeaderInner>
      </HeaderSection>
    </>
  );
}

export default Header;

const HeaderSection = styled.div`
  height: 70px;
  border-bottom: 1px solid #dfdfdf;
`;
const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  max-width: 1568px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media ${DEVICE.tablet} {
    gap: 20px;
  }
  @media ${DEVICE.mobile} {
    gap: 4px;
  }
`;
const LogoLink = styled(Link)`
  width: 153px;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${DEVICE.mobile} {
    width: 81px;
  }
`;
const LogoPc = styled.div`
  display: block;

  @media ${DEVICE.mobile} {
    display: none;
  }
`;
const LogoMobile = styled.div`
  display: none;

  @media ${DEVICE.mobile} {
    display: block;
  }
`;
const NavList = styled.ul`
  display: flex;
`;
const NavItem = styled.li``;
const NavLink = styled(Link)`
  padding: 15px;
  font-size: 18px;
  font-weight: 700;
  color: ${({ $isActive }) => ($isActive ? '#3692FF' : 'var(--gray-600)')};

  @media ${DEVICE.mobile} {
    padding: 4px;
    font-size: 16px;
  }
`;
const RightArea = styled.div``;
const MyPageLink = styled(Link)`
  width: 40px;
  height: 40px;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
