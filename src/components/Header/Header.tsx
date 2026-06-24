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
        "fixed top-0 w-full z-99999 flex flex-col bg-transparent backdrop-blur-md transition-all",
        className,
      )}
      {...rest}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" onClick={closeMenu} aria-label="FanYu 首頁">
          <LogoSvg className="h-16 object-contain hover:drop-shadow-[0_0_1rem_var(--primary)] transition-all duration-300" />
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

        <nav className="hidden lg:flex text-2xl items-center gap-2 md:gap-4">
          {routes.map((route) => (
            <DesktopLink key={route.url} route={route} />
          ))}
        </nav>
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
      </Collapse>
    </header>
  );
};
