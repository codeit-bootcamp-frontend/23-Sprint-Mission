import Image from "next/image";
import Link from "next/link";

import LogoSmImg from "@/assets/logo/logo-sm.svg";
import LogoLgImg from "@/assets/logo/logo-lg.svg";

export default function Logo({ className }: { className: string }) {
  return (
    <div className={className}>
      <Link href="/" className="block w-fit">
        <Image
          src={LogoSmImg}
          alt="두잇 로고"
          priority
          width={71}
          height={40}
          className="md:hidden"
        />
        <Image
          src={LogoLgImg}
          alt="두잇 로고"
          priority
          width={151}
          height={40}
          className="hidden md:block"
        />
      </Link>
    </div>
  );
}
