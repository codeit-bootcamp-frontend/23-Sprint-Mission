import type { Metadata } from "next";
import { Abhaya_Libre } from "next/font/google";
import localFont from "next/font/local";
import "@/libs/styles/globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const abhaya = Abhaya_Libre({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-abhaya",
});

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
    <html lang="ko" className={`${pretendard.variable} ${abhaya.variable}`}>
      <body>{children}</body>
    </html>
  );
}
