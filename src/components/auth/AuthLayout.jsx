import { Link } from "react-router";

// Imges
import logoImg from "../../assets/login-form-logo.svg";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-10 lg:py-20">
      <div className="w-full max-w-100 md:max-w-160 flex flex-col items-center">
        <Link to="/" className="mb-10">
          <img src={logoImg} alt="판다마켓" className="w-49.5 md:w-52.5" />
        </Link>
        {children}
      </div>
    </main>
  );
}
