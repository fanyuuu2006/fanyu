"use client";
import OutlineSvg from "@/components/svgs/OutlineSvg";
import { cn } from "@/utils/className";
import {
  getMarkdownOutline,
  headingToAnchor,
  type MarkdownOutlineItem,
} from "@/utils/markdown";
import { useEffect, useId, useRef, useState } from "react";

type ReadMeOutlineProps = React.HTMLAttributes<HTMLDivElement> & {
  content: string;
};

export const ReadMeOutline = ({
  content,
  className,
  ...rest
}: ReadMeOutlineProps) => {
  const [open, setOpen] = useState(false);
  const outline = getMarkdownOutline(content);
  const outlineId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (outline.length === 0) return null;

  return (
    <div ref={containerRef} className={cn(className)} {...rest}>
      <div className="relative">
        <button
          className="btn p-1.5 rounded-md"
          aria-label="文件大綱"
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={outlineId}
          onClick={() => setOpen((prev) => !prev)}
        >
          <OutlineSvg />
        </button>
        {open && (
          <OutlineCard
            id={outlineId}
            className="absolute top-full right-0 mt-2"
            outline={outline}
            onNavigate={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

type OutlineCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & {
  id: string;
  outline: MarkdownOutlineItem[];
  onNavigate: () => void;
};

const OutlineCard = ({
  id,
  outline,
  onNavigate,
  className,
  ...rest
}: OutlineCardProps) => {
  return (
    <div
      id={id}
      role="menu"
      className={cn(
        "card w-64 max-h-96 overflow-y-auto rounded-lg p-4 z-50",
        className,
      )}
      {...rest}
    >
      <ul className="space-y-1">
        {outline.map((item, index) => {
          const href = headingToAnchor(item.title);
          return (
            <li
              key={index}
              style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
            >
              <a
                href={`#${href}`}
                role="menuitem"
                className="text-(--muted) hover:text-(--foreground)"
                onClick={onNavigate}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
