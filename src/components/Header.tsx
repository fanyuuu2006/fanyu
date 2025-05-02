"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent } from "@/types/language";
import Link from "next/link";
import Image from "next/image";
import { MenuOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

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

  {
    label: {
      chinese: "技能",
      english: "Skills",
    },
    href: "/#skills",
  },
  {
    label: {
      chinese: "作品集",
      english: "Portfolio",
    },
    href: "/#portfolio",
  },
];

export const Header = () => {
  const Language = useLanguage();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <header>
      <nav className="flex flex-col">
        <div className="container flex items-center justify-between flex-nowrap px-8 py-2 w-full">
          <Link href="/" className="h-full">
            <Image
              alt="Logo"
              src="/logo.png"
              width={1500}
              height={500}
              className="h-24 w-auto object-contain"
            />
          </Link>
          <button
            className="md:hidden label px-2 py-1"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <MenuOutlined />
          </button>
          <div className="hidden md:flex note font-bold gap-6">
            {Routes.map((item, index) => (
              <Link key={index} href={item.href}>
                {item.label[Language.Current]}
              </Link>
            ))}
          </div>
        </div>
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: showMenu ? `${menuRef.current?.scrollHeight}px` : "0px",
          }}
        >
          <div
            ref={menuRef}
            className="flex flex-col w-full note font-bold text-center"
          >
            {Routes.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="w-full pb-4 px-4 hover:scale-105 transition transform"
                onClick={() => setShowMenu(false)}
              >
                {item.label[Language.Current]}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
