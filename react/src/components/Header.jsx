import profileImg from "../../../images/profile.svg";
import styles from "./Header.module.css";
import Nav from "./Nav.jsx";
import Logo from "./Logo.jsx";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <Logo />
        <Nav />
        <img src={profileImg} />
      </div>
    </header>
  );
}

export default Header;
