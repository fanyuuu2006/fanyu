import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/context/LanguageContext";
import { LanguageSwitchButton } from "@/components/LanguageSwitchButton";
import { Footer } from "@/components/Footer";
export { metadata } from "./metadata";

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
