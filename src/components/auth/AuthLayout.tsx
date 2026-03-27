import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

function AuthLayout({
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) {
  return (
    <main className="login-page">
      <section className="login-card">
        {/* 로고 */}
        <header className="login-header">
          <img src={logoImage} alt="판다마켓 로고" className="logo-icon" />
          <Link to="/">
            <h1 className="logo-text">판다마켓</h1>
          </Link>
        </header>

        {children}

        {/* 하단 안내 */}
        <p className="signup-text">
          {footerText} <Link to={footerLinkTo}>{footerLinkText}</Link>
        </p>
      </section>
    </main>
  );
}

export default AuthLayout;