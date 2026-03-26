import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface SubmitBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SubmitBtn({
  children,
  disabled,
  className,
}: PropsWithChildren<SubmitBtnProps>) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={` bg-primary disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
