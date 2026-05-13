import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="홈으로 이동">
      <Image
        src="/images/logo/logo.svg"
        alt="do it 로고"
        width={180}
        height={50}
        priority
        className={styles.logoImage}
      />
    </Link>
  );
}
