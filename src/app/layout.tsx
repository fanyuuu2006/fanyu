import "@/styles/globals.css";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/context/LanguageContext";
import { LanguageSwitchButton } from "@/components/LanguageSwitchButton";
import { Footer } from "@/components/Footer";

const title = "飯魚 FanYu";
const description =
  "飯魚的個人網站，包括個人資料、自我介紹、作品集、學經歷以及聯繫方式。FanYu's personal website featuring biography, self-introduction, portfolio, education background, project experience, and contact information.";
const url = "https://fanyu.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s | " + title,
  },
  description,
  icons: {
    icon: [{ rel: "icon", url: "/favicon.ico" }],
  },
  authors: [{ name: "FanYu", url: "https://github.com/fanyuuu2006" }],

  keywords: [
    "FanYu",
    "飯魚",
    "Fan-Yu Zhen-Fu",
    "范余振富",
    "飯魚正負",
    "fan._.yuu",
    "fanyuuu2006",
    "范振富",
    "personal website",
    "個人網站",
  ],

  openGraph: {
    siteName: title,
    title,
    description,
    url,
    images: "/GameShow.jpg",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
