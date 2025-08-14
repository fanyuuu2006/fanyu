import { Route } from "./routes";
import { cn } from "@/utils/className";
import { Collapse } from "fanyucomponents";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CaretLeftOutlined } from "@ant-design/icons";

type MobileLinkProps = {
  item: Route;
  menuShow: boolean; // 新增：接收父選單的狀態
  setMenuShow: React.Dispatch<React.SetStateAction<boolean>>; // 新增：接收父組件的狀態更新函數
};

export const MobileLink = ({
  item,
  menuShow,
  setMenuShow,
}: MobileLinkProps) => {
  const Language = useLanguage();
  const hasSubRoute = Boolean(item.sub);
  const [subRouteShow, setSubRouteShow] = useState<boolean>(false);

  // 當父選單關閉時，同時關閉子選單
  useEffect(() => {
    if (!menuShow) {
      setSubRouteShow(false);
    }
  }, [menuShow]);

  const handleSubRouteToggle = useCallback(() => {
    setSubRouteShow((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    // 點擊連結時關閉選單
    setMenuShow(false);
  }, [setMenuShow]);

  return (
    <div className="flex flex-col">
      {/* 主選單項目 */}
      <div
        className={cn(
          "flex items-center justify-between py-3 px-6 border-b border-[var(--border-color)]"
        )}
      >
        <Link
          href={item.url}
          className="flex-1 text-left "
          onClick={handleLinkClick}
        >
          {item.label[Language.Current]}
        </Link>

        {hasSubRoute && (
          <button
            onClick={handleSubRouteToggle}
            className={cn("p-1")}
            aria-label={subRouteShow ? "關閉子選單" : "開啟子選單"}
            aria-expanded={subRouteShow}
            aria-controls={`sub-menu-${item.url.replace("/", "")}`}
          >
            <CaretLeftOutlined
              className={cn("transition-transform duration-200", {
                "-rotate-90": subRouteShow,
              })}
            />
          </button>
        )}
      </div>

      {/* 子選單區域 */}
      {hasSubRoute && (
        <Collapse
          state={subRouteShow}
          className="slide-collapse"
          id={`sub-menu-${item.url.replace("/", "")}`}
        >
          <div className="flex flex-col text-sm bg-[var(--background-color-tertiary)]">
            {item.sub!.map((sub) => (
              <Link
                key={sub.url}
                href={`${item.url}${sub.url}`}
                onClick={handleLinkClick}
                className="px-8 py-3 text-[var(--text-color-muted)] hover:text-[var(--text-color)] hover:backdrop-brightness-[var(--brightness-light)] transition-all duration-200"
              >
                {sub.label[Language.Current]}
              </Link>
            ))}
          </div>
        </Collapse>
      )}
    </div>
  );
};
