"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent } from "@/types/language";
import Link from "next/link";

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
];

export const Header = () => {
  const Language = useLanguage();
  return (
    <header>
      <nav
        className="container d-flex align-items-center"
        style={{ height: "6em", color: "white", padding: "0.5em 2em" }}
      >
        <div className="nav-brand"></div>
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
