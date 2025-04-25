"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent } from "@/types/language";
import Link from "next/link";
import Image from "next/image";

const Routes: {
  label: LanguageContent<string>;
  href: string;
}[] = [
  {
    label: {
      chinese: "首頁",
      english: "Home",
    },
    href: "/#home",
  },
  {
    label: {
      chinese: "關於我",
      english: "About Me",
    },
    href: "/#aboutMe",
  },
];

export const Header = () => {
  const Language = useLanguage();
  return (
    <header>
      <nav
        className="container d-flex align-items-center justify-center"
        style={{ height: "6em", color: "white", padding: "0.5em 2em" }}
      >
        <Link href="/#home" className="nav-brand">
          <Image
            alt="Logo"
            src="/logo.png"
            width={1500}
            height={500}
            style={{
              height: "100%",
              width: "auto",
            }}
          />
        </Link>
        <div className="nav-collapse content text-bold">
          {Routes.map((item, index) => (
            <Link key={index} href={item.href}>
              {item.label[Language.Current]}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
