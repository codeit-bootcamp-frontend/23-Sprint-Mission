"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Logo.module.css";

export default function Logo() {
  const router = useRouter();

  const handleClick = () => {
    // 홈으로만 이동
    router.push("/");
  };

  return (
    <button
      type="button"
      className={styles.logo}
      onClick={handleClick}
      aria-label="홈으로 이동"
    >
      <Image
        src="/images/logo/logo.svg"
        alt="do it 로고"
        width={180}
        height={50}
        priority
        className={styles.logoImage}
      />
    </button>
  );
}
