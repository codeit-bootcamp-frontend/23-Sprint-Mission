import { nanumSquareFont, santokki } from "@/assets/fonts";
import { TodoGnb } from "@/components/todo-gnb";
import { Providers } from "@/provider/query-provider";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${nanumSquareFont.variable} ${santokki.variable}`}
    >
      <body className="font-nanum bg-gray-50">
        <Providers>
          <TodoGnb />
          {children}
        </Providers>
      </body>
    </html>
  );
}
