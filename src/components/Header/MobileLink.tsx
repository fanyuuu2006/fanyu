import { Route } from "@/types";
import { cn } from "@/utils/className";
import { Collapse, DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import LeftOutlinedSvg from "../svgs/LeftOutlinedSvg";

type MobileLinkProps = OverrideProps<
  DistributiveOmit<React.ComponentProps<typeof Link>, "href" | "children">,
  {
    route: Route;
  }
>;

export const MobileLink = ({
  route,
  className,
  onClick,
  ...rest
}: MobileLinkProps) => {
  const pathName = usePathname();

  const isActive =
    route.isActive?.(pathName) ??
    (pathName === route.url || pathName.startsWith(`${route.url}/`));

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleToggleSubMenu = useCallback(() => {
    setIsSubMenuOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // 點擊連結時關閉選單
      setIsSubMenuOpen(false);
      onClick?.(e);
    },
    [onClick],
  );

  return (
    <div className="flex flex-col w-full">
      <div className="relative flex w-full items-center justify-center border-b border-(--border) py-4">
        <Link
          href={route.url}
          className={cn(
            "flex items-center gap-2 text-nowrap font-semibold transition-all duration-300",
            {
              "text-(--primary)": isActive,
              "text-(--muted) hover:text-(--foreground)": !isActive,
            },
            className,
          )}
          onClick={handleLinkClick}
          {...rest}
        >
          <span>{route.label}</span>
        </Link>
        {route.sub && (
          <button
            onClick={handleToggleSubMenu}
            className="absolute right-4 p-2 transition-all duration-300 hover:text-(--primary)"
            aria-label={isSubMenuOpen ? "關閉子選單" : "開啟子選單"}
            aria-expanded={isSubMenuOpen}
            aria-controls={`sub-menu-${route.url.replace("/", "")}`}
          >
            <LeftOutlinedSvg
              className={cn("transition-transform duration-300", {
                "-rotate-90": isSubMenuOpen,
              })}
            />
          </button>
        )}
      </div>

      {route.sub && (
        <Collapse
          state={isSubMenuOpen}
          className="slide-collapse"
          id={`sub-menu-${route.url.replace("/", "")}`}
        >
          <div className="flex flex-col bg-black/10 border-b border-(--border)">
            {route.sub.map((sub) => {
              return (
                <Link
                  key={sub.url}
                  href={`${route.url}${sub.url}`}
                  onClick={handleLinkClick}
                  className={cn(
                    "text-(--muted) hover:text-(--foreground) flex items-center justify-center gap-2 py-3 text-[0.9em] transition-all duration-300",
                  )}
                >
                  {sub.label}
                </Link>
              );
            })}
          </div>
        </Collapse>
      )}
    </div>
  );
};
