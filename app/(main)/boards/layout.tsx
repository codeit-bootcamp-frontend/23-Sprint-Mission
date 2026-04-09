import { ReactNode } from "react";

import Header from "@/components/layout/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-3 md:py-6">{children}</main>
    </>
  );
}
