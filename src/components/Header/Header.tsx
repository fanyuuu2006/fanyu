"use client";
import Link from "next/link";
import { Burger } from "./Burger";
import { useState, useCallback } from "react";
import { Collapse } from "fanyucomponents";
import { DesktopLink } from "./DesktopLink";
import { MobileLink } from "./MobileLink";
import { cn } from "@/utils/className";
import { routes } from "@/libs/routes";
import { LogoSvg } from "../LogoSvg";
import { site } from "@/libs/site";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = React.HTMLAttributes<HTMLElement>;
export const Header = ({ className, ...rest }: HeaderProps) => {
  const [menuShow, setMenuShow] = useState<boolean>(false);

  const handleMenuToggle = useCallback(() => {
    setMenuShow((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuShow(false);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-99999 flex flex-col bg-transparent backdrop-blur-xl transition-all",
        className,
      )}
      {...rest}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" onClick={closeMenu} aria-label="FanYu 首頁">
          <LogoSvg className="h-16 object-contain text-(--primary) transition-all duration-300" />
          <span className="sr-only">{site.title}</span>
        </Link>

        <div className="text-xl lg:hidden">
          <Burger
            checked={menuShow}
            onChange={handleMenuToggle}
            aria-label={menuShow ? "關閉選單" : "開啟選單"}
            aria-expanded={menuShow}
            aria-controls="desktop-nav"
          />
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <nav
            className="flex text-2xl items-center gap-2 md:gap-4"
            id="desktop-nav"
          >
            {routes.map((route) => (
              <DesktopLink key={route.url} route={route} />
            ))}
          </nav>
          <div className="h-6 w-px bg-(--foreground)/25" />
          <ThemeToggle className="btn secondary text-2xl flex items-center justify-center p-2 rounded-full" />
        </div>
      </div>
      <Collapse
        as="nav"
        state={menuShow}
        className="slide-collapse lg:hidden"
        id="mobile-nav"
      >
        <div className="flex flex-col w-full text-2xl">
          {routes.map((route) => (
            <MobileLink key={route.url} onClick={closeMenu} route={route} />
          ))}
        </div>
        <div className="flex items-center justify-center py-4">
          <ThemeToggle className="btn secondary text-2xl flex items-center justify-center p-2 rounded-full" />
        </div>
      </Collapse>
    </header>
  );
};
