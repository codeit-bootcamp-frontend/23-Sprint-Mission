"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logo/PandaLogo";
import DefaultProfileIcon from "@/assets/icons/DefaultProfileIcon";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center border-b border-gray-200">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-4 py-3">
        <HeaderLinks currentPath={pathname} />

        <DefaultProfileIcon />
      </div>
    </header>
  );
}

interface NavLink {
  href: string;
  label: string;
}

const LINKS: NavLink[] = [
  { href: "/boards", label: "자유게시판" },
  { href: "/items", label: "중고마켓" },
];

const HeaderLinks = ({ currentPath }: { currentPath: string }) => (
  <div className="flex items-center gap-2 md:gap-8">
    <Link href="/">
      <Logo />
    </Link>

    <nav className="flex gap-3 md:gap-6">
      {LINKS.map((link) => (
        <NavLink
          key={link.label}
          link={link}
          isActive={currentPath === link.href}
        />
      ))}
    </nav>
  </div>
);

const LINK_STYLE =
  "text-base-16 font-extrabold hover:text-primary transition-colors";

const NavLink = ({ link, isActive }: { link: NavLink; isActive: boolean }) => (
  <Link
    href={link.href}
    className={`${LINK_STYLE} ${isActive ? "text-primary" : "text-gray-700"}`}
  >
    {link.label}
  </Link>
);
