import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.ul}>
        <NavLink
          to="/community"
          className={({ isActive }) => (isActive ? styles.active : styles.li)}
        >
          자유게시판
        </NavLink>
        <NavLink
          to="/items"
          className={({ isActive }) => (isActive ? styles.active : styles.li)}
        >
          중고마켓
        </NavLink>
      </ul>
    </nav>
  );
}

export default Nav;
