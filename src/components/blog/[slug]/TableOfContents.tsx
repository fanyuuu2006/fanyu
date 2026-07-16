"use client";
import TocSvg from "@/components/svgs/TocSvg";
import { cn } from "@/utils/className";
import { headingToAnchor, MarkdownOutlineItem } from "@/utils/markdown";
import { useActiveHeading } from "@/hooks/useActiveHeading";

type TableOfContentsProps = React.HTMLAttributes<HTMLElement> & {
  outline: MarkdownOutlineItem[];
};

export const TableOfContents = ({ outline, ...rest }: TableOfContentsProps) => {
  const activeId = useActiveHeading(outline);

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
      className={cn(
        "border-l-2 -ml-px transition-all duration-300",
        {
          "border-(--primary) text-(--foreground)": isActive,
          "border-transparent text-(--muted) hover:border-(--primary)/40 hover:text-(--foreground)":
            !isActive,
        },
        className,
      )}
      style={{ paddingLeft: depth * 16, ...style }}
      {...rest}
    >
      <a
        href={`#${id}`}
        aria-current={isActive ? "location" : undefined}
        className={cn("block py-1 pl-4 leading-5", {
          // depth 0(最上層標題):字級較大、字重較粗,作為視覺錨點
          "text-sm font-semibold": depth === 0,
          // depth 1:中間層級,字級不變但字重降回 normal
          "text-sm font-medium": depth === 1,
          // depth 2 以上:視為次要層級,縮小字級並降低不透明度,拉開與上層的距離
          "text-xs font-normal opacity-80": depth >= 2,
        })}
      >
        {item.title}
      </a>
    </li>
  );
};
