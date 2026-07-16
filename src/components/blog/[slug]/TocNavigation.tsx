"use client";
import TocSvg from "@/components/svgs/TocSvg";
import { cn } from "@/utils/className";
import { headingToAnchor, MarkdownOutlineItem } from "@/utils/markdown";
import { useActiveHeading } from "@/hooks/useActiveHeading";

type TocNavigationProps = {
  outline: MarkdownOutlineItem[];
};

export const TocNavigation = ({ outline }: TocNavigationProps) => {
  const activeId = useActiveHeading(outline);

  if (outline.length === 0) return null;

  return (
    <>
      <aside className="hidden xl:block fixed z-500 top-24 left-[calc(50%+25rem)] w-72 max-h-[calc(100vh-7rem)] overflow-y-auto p-4">
        <TableOfContents outline={outline} activeId={activeId} />
      </aside>
    </>
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
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
        <TocSvg />
        <span>本文目錄</span>
      </h3>
      <ul className="space-y-2 border-l border-(--muted)/40 pr-3">
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
          "block border-l-2 -ml-px py-1 pl-4 leading-5 text-sm transition-all",
          {
            "border-(--primary) text-(--foreground)": isActive,
            " border-transparent text-(--muted) hover:border-(--primary)/40 hover:text-(--foreground)":
              !isActive,
          },
        )}
      >
        {item.title}
      </a>
    </li>
  );
};
