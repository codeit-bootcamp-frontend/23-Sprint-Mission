import { useLocation } from "react-router";

// Components
import HeaderLayout from "./HeaderLayout";
import Logo from "./Logo";
import LoginBtn from "./LoginBtn";
import NavLinks from "./NavLinks";

const INDEX_HEADER_MAX_WIDTH = "1120px";
const ANOTHER_HEADER_MAX_WIDTH = "1520px";

export default function Header() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <HeaderLayout
      maxWidth={isMainPage ? INDEX_HEADER_MAX_WIDTH : ANOTHER_HEADER_MAX_WIDTH}
    >
      <div className="flex items-center gap-6 md:gap-10">
        <Logo />
        {!isMainPage && <NavLinks />}
      </div>

      <LoginBtn isMainPage={isMainPage} />
    </HeaderLayout>
  );
}
