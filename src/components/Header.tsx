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
      <nav className="d-flex flex-column">
        <div
          className="container d-flex align-items-center justify-content-between"
          style={{ width: "100%", flexWrap: "nowrap", padding: "0.5em 2em" }}
        >
          <Link href="/" className="nav-brand">
            <Image
              alt="Logo"
              src="/logo.png"
              width={1500}
              height={500}
              style={{
                height: "6em",
                width: "auto",
              }}
            />
          </Link>
          <button
            className="btn-text label nav-menu"
            style={{ borderRadius: "5px", padding: "0.5em" }}
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            <MenuOutlined />
          </button>
          <div className="nav-collapse note text-bold ">
            {Routes.map((item, index) => (
              <Link key={index} href={item.href}>
                {item.label[Language.Current]}
              </Link>
            ))}
          </div>
        </div>
        <div
          className="slide-toggle-wrapper nav-menu"
          style={{
            maxHeight: showMenu ? `${menuRef.current?.scrollHeight}px` : "0",
          }}
        >
          <div
            ref={menuRef}
            className="note text-bold text-center d-flex flex-column "
            style={{ width: "100%" }}
          >
            {Routes.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="card-glass card-link"
                style={{ padding: "0.5em 1em" }}
                onClick={() => {
                  setShowMenu(false);
                }}
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
