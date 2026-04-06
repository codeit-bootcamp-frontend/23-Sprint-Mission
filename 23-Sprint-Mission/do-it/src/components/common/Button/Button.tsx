import { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/utils/classNames";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  filled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  filled = false,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        // 입력값이 있을 때 채워진 버튼 스타일 적용
        filled && styles.filled,
        fullWidth && styles.fullWidth,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
