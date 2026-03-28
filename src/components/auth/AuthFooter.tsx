import { Link } from "react-router";

type AuthPageType = "login" | "signup";

interface FooterItem {
  message: string;
  linkText: string;
  href: string;
}

const AUTH_FOOTER_CONFIG: Record<AuthPageType, FooterItem> = {
  login: {
    message: "판다마켓이 처음이신가요?",
    linkText: "회원가입",
    href: "/signup",
  },
  signup: {
    message: "이미 회원이신가요?",
    linkText: "로그인",
    href: "/login",
  },
};

interface AuthFooterProps {
  type: "login" | "signup";
}

export default function AuthFooter({ type }: AuthFooterProps) {
  const { message, linkText, href } = AUTH_FOOTER_CONFIG[type];

  return (
    <div className="text-center font-medium text-sm leading-6 text-gray-800 mt-8">
      {message}
      <Link to={href} className="ml-2 underline text-primary font-semibold">
        {linkText}
      </Link>
    </div>
  );
}
