import { Link } from "react-router";

export default function AuthFooter({ type }) {
  const isLogin = type === "login";

  const message = isLogin ? "판다마켓이 처음이신가요?" : "이미 회원이신가요?";

  const linkText = isLogin ? "회원가입" : "로그인";
  const href = isLogin ? "/signup" : "/login";

  return (
    <div className="text-center font-medium text-sm leading-6 text-gray-800 mt-8">
      {message}
      <Link to={href} className="ml-2 underline text-primary font-semibold">
        {linkText}
      </Link>
    </div>
  );
}
