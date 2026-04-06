"use client";

import { useRouter } from "next/navigation";
import styles from "./Logo.module.css";

export default function Logo() {
  const router = useRouter();

  const handleClick = () => {
    // 요구사항: 로고 클릭 시 홈으로 이동
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      className={styles.logo}
      onClick={handleClick}
      aria-label="홈으로 이동"
    >
      do it ;
    </button>
  );
}
