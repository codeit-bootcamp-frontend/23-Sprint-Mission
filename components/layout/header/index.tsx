import Link from "next/link";

import Logo from "@/assets/logo/PandaLogo";
import DefaultProfileIcon from "@/assets/icons/DefaultProfileIcon";

export default function Header() {
  return (
    <header className="flex items-center border-b border-gray-200">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-4 py-3">
        <HeaderLinks />

        <DefaultProfileIcon />
      </div>
    </header>
  );
}

const LINK_STYLE =
  "text-base-16 font-extrabold text-gray-700 hover:text-primary transition-colors";

const LINKS = [
  { href: "/board", label: "자유게시판" },
  { href: "/items", label: "중고마켓" },
];

const HeaderLinks = () => (
  <div className="flex items-center gap-2 md:gap-8">
    <Link href="/">
      <Logo />
    </Link>

    <nav className="flex gap-3 md:gap-6">
      {LINKS.map((link) => (
        <Link key={link.label} href={link.href} className={LINK_STYLE}>
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
);
