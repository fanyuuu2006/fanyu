import "@/styles/globals.css";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/context/LanguageContext";
import { LanguageSwitchButton } from "@/components/LanguageSwitchButton";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "飯魚 FanYu",
  icons: {
    icon: [{ rel: "icon", url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <LanguageSwitchButton />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
