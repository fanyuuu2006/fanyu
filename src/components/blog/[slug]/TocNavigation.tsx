"use client";

import { useEffect, useMemo, useState } from "react";

import TocSvg from "@/components/svgs/TocSvg";
import { cn } from "@/utils/className";
import { headingToAnchor, MarkdownOutlineItem } from "@/utils/markdown";

type TocNavigationProps = React.HTMLAttributes<HTMLElement> & {
  outline: MarkdownOutlineItem[];
};

export const TocNavigation = ({ outline, ...rest }: TocNavigationProps) => {
  const [activeId, setActiveId] = useState<string>();

  const anchorIds = useMemo(
    () => outline.map((item) => headingToAnchor(item.title)),
    [outline],
  );

  useEffect(() => {
    if (anchorIds.length === 0) return;

    // 取得所有標題元素,若找不到就不觀察。
    const headingElements = anchorIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    // IntersectionObserver 的回呼只會帶入「這次狀態有變化」的元素,
    // 不是目前所有可見的元素。若只用單次 entries 判斷最上方可見項,
    // 在沒有標題穿越偵測線的捲動過程中,activeId 可能停留在錯誤狀態。
    // 因此用 Map 累積每個標題「最後一次已知的觀察結果」,
    // 每次回呼都從累積後的完整狀態中重新篩選可見項。
    const latestEntries = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          latestEntries.set(entry.target.id, entry);
        });

        const topMostVisible = Array.from(latestEntries.values())
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (topMostVisible) {
          setActiveId(topMostVisible.target.id);
        }
      },
      // 只偵測畫面上方 30% 的區域,模擬「捲到標題附近才算作用中」的效果。
      { rootMargin: "0px 0px -70% 0px" },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [anchorIds]);

  if (outline.length === 0) return null;

  return (
    <aside
      className="hidden xl:block fixed z-500 top-24 left-[calc(50%+25rem)] max-h-[calc(100vh-6rem)] overflow-y-auto p-4"
      {...rest}
    >
      <TableOfContents outline={outline} activeId={activeId} />
    </aside>
  );
};

type TableOfContentsProps = React.HTMLAttributes<HTMLElement> & {
  outline: MarkdownOutlineItem[];
  activeId?: string;
};

const TableOfContents = ({
  outline,
  activeId,
  ...rest
}: TableOfContentsProps) => {
  if (outline.length === 0) return null;

  // 文章標題不一定從 h1 開始(常見是從 h2 起跳),
  // 用實際出現的最小 level 當作縮排基準,而不是寫死從某個 level 開始,
  // 這樣不管文章是 h2 開頭還是 h3 開頭,最外層都會對齊在同一個縮排。
  const minLevel = Math.min(...outline.map((item) => item.level));

  return (
    <nav aria-label="本文目錄" {...rest}>
      <h3 className="mb-4 flex items-center gap-1 text-lg font-semibold text-(--foreground)">
        <TocSvg />
        <span>本文目錄</span>
      </h3>
      <ul className="space-y-2">
        {outline.map((item) => (
          <TableOfContentsItem
            key={item.title}
            item={item}
            depth={item.level - minLevel}
            isActive={headingToAnchor(item.title) === activeId}
          />
        ))}
      </ul>
    </nav>
  );
};

type TableOfContentsItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  item: MarkdownOutlineItem;
  depth: number;
  isActive?: boolean;
};

const TableOfContentsItem = ({
  item,
  depth,
  isActive,
  className,
  style,
  ...rest
}: TableOfContentsItemProps) => {
  const id = headingToAnchor(item.title);

  return (
    <li
      className={cn(className)}
      // Tailwind 的 arbitrary value class 在 build 時需要靜態字串才能被掃描到,
      // depth 是執行期才知道的動態數值,無法組出對應的 class name,
      style={{ paddingLeft: depth * 16, ...style }}
      {...rest}
    >
      <a
        href={`#${id}`}
        aria-current={isActive ? "location" : undefined}
        className={cn(
          "text-sm text-(--muted) transition-all hover:text-(--foreground)",
          {
            "text-(--primary)": isActive,
          },
        )}
      >
        {item.title}
      </a>
    </li>
  );
};
