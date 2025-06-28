"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Collapse } from "fanyucomponents";
import { routes } from "./routes";
import { BurgerMenu } from "./BurgerMenu";

export const Header = () => {
  const Language = useLanguage();
  const [menuShow, setMenuShow] = useState<boolean>(false);

  return (
    <header className="fixed top-0 z-1080 w-full bg-[var(--background-color-dark)]">
      <nav className="flex flex-col" role="navigation" aria-label="主導航">
        <div className="container flex items-center justify-between flex-nowrap px-8 py-4 w-full">
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
          <div className="text-3xl lg:hidden">
            <BurgerMenu
              checked={menuShow}
              onChange={() => setMenuShow((prev) => !prev)}
              aria-label={menuShow ? "關閉選單" : "開啟選單"}
              aria-expanded={menuShow}
              aria-controls="mobile-nav"
            />
          </div>
          <div className="hidden lg:flex text-2xl font-bold gap-6">
            {routes.map((item) => (
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
          <div className="flex flex-col w-full text-2xl font-bold text-center">
            {routes.map((item) => (
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
