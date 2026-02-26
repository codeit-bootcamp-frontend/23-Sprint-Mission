import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.ul}>
        <li className={styles.li}>자유게시판</li>
        <li className={styles.li}>중고마켓</li>
      </ul>
    </nav>
  );
}

export default Nav;
