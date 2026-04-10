import type { Metadata } from "next";

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
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
