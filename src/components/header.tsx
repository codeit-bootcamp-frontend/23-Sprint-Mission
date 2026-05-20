import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container py-2.5">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.svg"
            alt="do it Logo"
            width="151"
            height="40"
            className="cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
}
