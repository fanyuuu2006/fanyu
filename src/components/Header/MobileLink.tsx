import { Route } from "@/types";
import { cn } from "@/utils/className";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Collapse, DistributiveOmit, OverrideProps } from "fanyucomponents";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

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
  const isActive = route.isActive?.(pathName) ?? pathName.startsWith(route.url);
  const hasSubRoute = route.sub && route.sub.length > 0;
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
            "flex items-center gap-2 text-nowrap font-semibold text-(--muted) transition-all duration-300 hover:text-(--primary)",
            {
              "text-(--primary)": isActive,
            },
            className,
          )}
          onClick={handleLinkClick}
          {...rest}
        >
          <span>{route.label}</span>
        </Link>
        {hasSubRoute && (
          <button
            onClick={handleToggleSubMenu}
            className="absolute right-4 p-2 text-(--muted) transition-all duration-300 hover:text-(--primary)"
            aria-label={isSubMenuOpen ? "關閉子選單" : "開啟子選單"}
            aria-expanded={isSubMenuOpen}
            aria-controls={`sub-menu-${route.url.replace("/", "")}`}
          >
            <CaretLeftOutlined
              className={cn("transition-transform duration-300", {
                "-rotate-90": isSubMenuOpen,
              })}
            />
          </button>
        )}
      </div>

      {hasSubRoute && (
        <Collapse
          state={isSubMenuOpen}
          className="slide-collapse"
          id={`sub-menu-${route.url.replace("/", "")}`}
        >
          <div className="flex flex-col bg-black/10 border-b border-(--border)">
            {route.sub!.map((sub) => {
              const isSubActive = pathName === `${route.url}${sub.url}`;
              return (
                <Link
                  key={sub.url}
                  href={`${route.url}${sub.url}`}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center justify-center gap-2 py-3 text-[0.9em] text-(--muted) transition-all duration-300 hover:text-(--primary)",
                    {
                      "text-(--primary)": isSubActive,
                    },
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
