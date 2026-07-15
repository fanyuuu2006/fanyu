import { MarkdownOutlineItem, headingToAnchor } from "@/utils/markdown";
import { useEffect, useMemo, useState } from "react";

/**
 * 追蹤目前捲動位置對應到哪個標題,提供 TOC 的高亮狀態。
 * 用 IntersectionObserver 取代 scroll 事件監聽,避免每次捲動都觸發計算。
 */
export const useActiveHeading = (outline: MarkdownOutlineItem[]) => {
  const [activeId, setActiveId] = useState<string>();

  const anchorIds = useMemo(
    () => outline.map((item) => headingToAnchor(item.title)),
    [outline],
  );

  useEffect(() => {
    if (anchorIds.length === 0) return;

    const headingElements = anchorIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

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
      { rootMargin: "0px 0px -50% 0px" },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [anchorIds]);

  return activeId;
};
