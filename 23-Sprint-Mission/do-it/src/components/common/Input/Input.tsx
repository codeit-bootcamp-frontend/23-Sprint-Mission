import { InputHTMLAttributes } from "react";
import { classNames } from "@/lib/utils/classNames";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return <input className={classNames(styles.input, className)} {...props} />;
}
