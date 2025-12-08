import { usePathname } from "next/navigation";
import { Route } from "../routes";
import { cn } from "@/utils/className";
import { Collapse } from "fanyucomponents";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type DesktopLinkProps = {
  item: Route;
};
export const DesktopLink = ({ item }: DesktopLinkProps) => {
  const Language = useLanguage();
  const pathName = usePathname();
  const hasSubRoute = Boolean(item.sub);
  const [subRouteShow, setSubRouteShow] = useState<boolean>(false);

  const handleSubRouteEnter = useCallback(() => {
    setSubRouteShow(true);
  }, []);

  const handleSubRouteLeave = useCallback(() => {
    if (subRouteShow) setSubRouteShow(false);
  }, [subRouteShow]);

  return (
    <div
      onPointerEnter={hasSubRoute ? handleSubRouteEnter : undefined}
      onPointerLeave={hasSubRoute ? handleSubRouteLeave : undefined}
      className="relative"
    >
      <Link
        href={item.url}
        className={cn({
          "text-(--text-color-primary)":
            item.isActive?.(pathName) || pathName === item.url,
        })}
      >
        {item.label[Language.Current]}
      </Link>

      {/* 子選單下拉區域 */}
      {hasSubRoute && (
        <Collapse
          className="slide-collapse absolute top-full left-1/2 transform -translate-x-1/2 z-50"
          state={subRouteShow}
        >
          <div className="bg-(--background-color) border border-(--border-color) rounded-md shadow-lg mt-2 min-w-48">
            <div className="text-(--text-color-muted) flex flex-col text-base font-normal">
              {item.sub!.map((sub) => {
                if (sub.hidden?.header) return null;
                return (
                  <Link
                    key={sub.url}
                    href={`${item.url}${sub.url}`}
                    className="px-4 py-3 hover:text-(--text-color) hover:backdrop-brightness-(--brightness-light) transition-all duration-200"
                  >
                    {sub.label[Language.Current]}
                  </Link>
                );
              })}
            </div>
          </div>
        </Collapse>
      )}
    </div>
  );
};
