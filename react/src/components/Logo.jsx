import logoPanda from "../../../images/logo_panda.svg";
import styles from "./Logo.module.css";
function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logoPanda} alt="logo" />
      <a className={styles.logoFont} href="/">
        판다마켓
      </a>
    </div>
  );
}

export default Logo;
