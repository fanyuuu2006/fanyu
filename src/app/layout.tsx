import "@/styles/globals.css";
import { Metadata } from "next";
import { Header } from '@/components/Header';

export const metadata: Metadata={
  title: "IDK",
  icons:{
    icon:[
      { rel: "icon", url: "/favicon.ico" }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
