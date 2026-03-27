import pandaLogo from "../assets/logo.svg";
import pandoProfile from "../assets/icon-profile.svg";

function Header() {
  return (
    <>
      <header id="gnb">
        <div className="gnb-content">
          <img src={pandaLogo} className="logo" alt="중고마켓 로고" />
          <p className="freeboard">자유게시판</p>
          <p className="itemsmarket">중고마켓 </p>
          <img src={pandoProfile} className="profile" alt="중고마켓 프로필" />
        </div>
      </header>
    </>
  );
}

export default Header;
