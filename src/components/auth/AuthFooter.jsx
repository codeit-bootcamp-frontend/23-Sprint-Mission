import { Link } from "react-router";

const AUTH_FOOTER_CONFIG = {
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

export default function AuthFooter({ type }) {
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
