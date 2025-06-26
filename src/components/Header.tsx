"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent } from "@/types/language";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Collapse } from "fanyucomponents";
import styled from "styled-components";

const Routes: {
  label: LanguageContent<string>;
  href: string;
}[] = [
  {
    label: {
      chinese: "首頁",
      english: "Home",
    },
    href: "/#hero",
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
      chinese: "留言版",
      english: "Guestbook",
    },
    href: "/guestbook",
  },
  {
    label: {
      chinese: "相簿",
      english: "Album",
    },
    href: "/album",
  },
];

export const MenuLabel = styled.label`
  position: relative;
  display: inline-block;
  width: ${4 / 3}em;
  height: 1em;
  cursor: pointer;
`;

export const MenuSpan = styled.span`
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  height: 0.25rem;
  border-radius: 0.5rem;
  background-color: var(--text-color);
  transition: 0.3s ease-in-out;
  transform-origin: right center;

  &:nth-of-type(1) {
    top: 0;
  }
  &:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
  }
  &:nth-of-type(3) {
    top: 100%;
    transform: translateY(-100%);
  }
`;

export const MenuCheckbox = styled.input`
  display: none;

  &:checked ~ ${MenuSpan}:nth-of-type(1) {
    transform: rotate(-45deg);
    right: ${1 / 6}em;
  }

  &:checked ~ ${MenuSpan}:nth-of-type(2) {
    opacity: 0;
    width: 0;
  }

  &:checked ~ ${MenuSpan}:nth-of-type(3) {
    transform: rotate(45deg);
    top: ${29 / 30}em;
    right: ${1 / 6}em;
  }
`;

export const Header = () => {
  const Language = useLanguage();
  const [menuShow, setMenuShow] = useState<boolean>(false);

  return (
    <header className="fixed top-0 z-1080 w-full bg-[var(--background-color-dark)]">
      <nav className="flex flex-col" role="navigation" aria-label="主導航">
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
          <div className="content lg:hidden">
            <MenuLabel>
              <MenuCheckbox
                type="checkbox"
                checked={menuShow}
                onChange={() => setMenuShow((prev) => !prev)}
                aria-label={menuShow ? "關閉選單" : "開啟選單"}
                aria-expanded={menuShow}
                aria-controls="mobile-nav"
              />
              <MenuSpan />
              <MenuSpan />
              <MenuSpan />
            </MenuLabel>
          </div>
          <div className="hidden lg:flex note font-bold gap-6">
            {Routes.map((item) => (
              <Link
                className="hover:underline-spread"
                key={item.href}
                href={item.href}
              >
                {item.label[Language.Current]}
              </Link>
            ))}
          </div>
        </div>
        <Collapse
          state={menuShow}
          className="slide-collapse lg:hidden"
          id="mobile-nav"
        >
          <div className="flex flex-col w-full note font-bold text-center">
            {Routes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 px-4 hover:bg-[var(--background-color-primary)]"
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
