import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Do It",
  description: "할 일 목록 페이지",

  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
