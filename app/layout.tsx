import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/libs/styles/globals.css";

const nanumSquare = localFont({
  src: [
    {
      path: "../assets/fonts/NanumSquareR.ttf",
      weight: "400",
    },
    {
      path: "../assets/fonts/NanumSquareB.ttf",
      weight: "700",
    },
    {
      path: "../assets/fonts/NanumSquareEB.ttf",
      weight: "800",
    },
  ],
  variable: "--font-nanum",
});

export const metadata: Metadata = {
  title: "Do it",
  description: "투두 리스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanumSquare.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
