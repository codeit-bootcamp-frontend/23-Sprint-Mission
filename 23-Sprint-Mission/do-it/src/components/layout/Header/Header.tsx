import Logo from "@/components/common/Logo/Logo";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />
      </div>
    </header>
  );
}
