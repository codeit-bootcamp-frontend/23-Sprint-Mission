import { Link } from "react-router";

// Imges
import logoImg from "../../assets/logo_img.svg";
import logoText from "../../assets/logo_text.svg";

export default function Logo() {
  return (
    <Link to="/">
      {/* 모바일 */}
      <img src={logoText} className="md:hidden" alt="판다마켓" />

      {/* 데스크탑 */}
      <img src={logoImg} className="hidden md:block" alt="판다마켓" />
    </Link>
  );
}
