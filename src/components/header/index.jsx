// Components
import HeaderLayout from "../layout/HeaderLayout";
import Logo from "./Logo";
import LoginBtn from "./LoginBtn";

export default function Header() {
  return (
    <HeaderLayout>
      <Logo />
      <LoginBtn />
    </HeaderLayout>
  );
}
