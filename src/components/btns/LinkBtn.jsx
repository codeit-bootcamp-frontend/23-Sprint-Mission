import { Link } from "react-router";

export default function LinkBtn({ children, href, className, style }) {
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
