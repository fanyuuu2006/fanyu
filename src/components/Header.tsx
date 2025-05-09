"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent } from "@/types/language";
import Link from "next/link";
import Image from "next/image";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Collapse } from "fanyucomponents";

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
  {
    label: {
      chinese: "經歷",
      english: "Experience",
    },
    href: "/#experience",
  },
  {
    label: {
      chinese: "聯繫",
      english: "Contact",
    },
    href: "/#contact",
  },
  {
    label: {
      chinese: "相簿",
      english: "Album",
    },
    href: "/album",
  },
];

export const Header = () => {
  const Language = useLanguage();

  const [menuShow, setMenuShow] = useState<boolean>(false);

  return (
    <header>
      <nav className="flex flex-col">
        <div className="container flex items-center justify-between flex-nowrap px-8 py-2 w-full">
          <Link href="/" className="h-full">
            <Image
              priority
              alt="Logo"
              src="/logo.png"
              width={1500}
              height={500}
              className="h-16 w-auto object-contain"
            />
          </Link>
          <button
            className="lg:hidden label px-2 py-1"
            onClick={() => setMenuShow((prev) => !prev)}
          >
            <MenuOutlined />
          </button>
          <div className="hidden lg:flex note font-bold gap-6">
            {Routes.map((item, index) => (
              <Link key={index} href={item.href}>
                {item.label[Language.Current]}
              </Link>
            ))}
          </div>
        </div>
        <Collapse state={menuShow} className="slide-collapse lg:hidden">
          <div className="flex flex-col w-full note font-bold text-center">
            {Routes.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="w-full pb-4 px-4 hover:scale-105 transition transform"
                onClick={() => setMenuShow(false)}
              >
                {item.label[Language.Current]}
              </Link>
            ))}
          </div>
        </Collapse>
      </nav>
    </header>
  );
};
