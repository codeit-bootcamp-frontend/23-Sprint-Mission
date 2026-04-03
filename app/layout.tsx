import type { Metadata } from "next";
import "@/libs/styles/globals.css";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "판다마켓",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
