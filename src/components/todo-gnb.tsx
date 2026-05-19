import Image from "next/image";
import Link from "next/link";

export function TodoGnb() {
  return (
    <header className="flex w-full justify-center bg-white outline outline-slate-200">
      <div className="mx-10 flex w-full max-w-300 items-center py-2.5">
        <Link href="/">
          <Image src="/logo.svg" width={151} height={40} alt="로고" />
        </Link>
      </div>
    </header>
  );
}
