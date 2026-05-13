import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container py-2.5">
        <Image src="/logo.svg" alt="do it Logo" width="151" height="40" />
      </div>
    </header>
    
  )
}