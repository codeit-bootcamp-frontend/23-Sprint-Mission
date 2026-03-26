import { CSSProperties, ReactNode } from "react";
import { Link } from "react-router";

interface Props {
  children: ReactNode;
  href: string;
  className?: string;
  style?: CSSProperties;
}

export default function LinkBtn({ children, href, className, style }: Props) {
  return (
    <Link
      to={href}
      className={`flex items-center justify-center leading-6.5 font-semibold text-[#F3F4F6] ${className}`}
      style={style}
    >
      {children}
    </Link>
  );
}
