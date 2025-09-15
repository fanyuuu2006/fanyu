"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { Collapse } from "fanyucomponents";
import { routes } from "../routes";
import { BurgerMenu } from "./BurgerMenu";
import { DesktopLink } from "./DesktopLink";
import { MobileLink } from "./MobileLink";

export const Header = () => {
  const [menuShow, setMenuShow] = useState<boolean>(false);

  const handleMenuToggle = useCallback(() => {
    setMenuShow((prev) => !prev);
  }, []);

  return (
    <header className="fixed top-0 z-1080 w-full bg-[var(--background-color)]/90 backdrop-blur-md border-[var(--border-color)] border-b-1">
      <nav className="flex flex-col" role="navigation" aria-label="主導航">
        {/* 主要導航區域 */}
        <div className="container px-8 py-4 w-full flex flex-nowrap items-center justify-between">
          {/* Logo 區域 */}
          <Link href="/">
            <Image
              priority
              alt="Logo"
              src="/logo.png"
              width={1500}
              height={500}
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* 手機版漢堡選單按鈕 */}
          <div className="text-xl lg:hidden">
            <BurgerMenu
              checked={menuShow}
              onChange={handleMenuToggle}
              aria-label={menuShow ? "關閉選單" : "開啟選單"}
              aria-expanded={menuShow}
              aria-controls="mobile-nav"
            />
          </div>

          {/* 桌面版導覽列 */}
          <div className="hidden lg:flex text-xl font-bold gap-4">
            {routes.map((item) => (
              <DesktopLink key={item.url} item={item} />
            ))}
          </div>
        </div>

        {/* 手機版導覽列 */}
        <Collapse
          state={menuShow}
          className="slide-collapse lg:hidden"
          id="mobile-nav"
        >
          <div className="flex flex-col w-full text-xl font-semibold">
            {routes.map((item) => (
              <MobileLink
                key={item.url}
                item={item}
                menuShow={menuShow}
                setMenuShow={setMenuShow}
              />
            ))}
          </div>
        </Collapse>
      </nav>
    </header>
  );
};
