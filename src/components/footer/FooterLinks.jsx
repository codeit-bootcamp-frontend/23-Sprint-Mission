import { Link } from "react-router";

export default function FooterLinks({ className }) {
  return (
    <div
      className={`text-gray-200 font-pretendard text-base leading-4.75 ${className}`}
    >
      <Link to="/privacy" className="hover:underline">
        Privacy Policy
      </Link>
      <Link to="/faq" className="hover:underline">
        FAQ
      </Link>
    </div>
  );
}
