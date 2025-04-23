import "@/styles/globals.css";
import { Metadata } from "next";
import { Header } from '@/components/Header';

export const metadata: Metadata={
  title: "飯魚 FanYu",
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
