import { CodeBlock, CodeTokenProps, extractTokenContent } from "c063";
import React, { useMemo, useState } from "react";
import { OverrideProps } from "fanyucomponents";
import { CopyButton } from "./CopyButton";
import { cn } from "@/utils/className";
import { themes } from "c063/dist/libs";

export type CodeCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    codeLines: CodeTokenProps<React.ElementType>[][];
  }
>;
type ThemeType = (typeof themes)[number];
export const CodeCard = ({
  lang,
  codeLines,
  className,
  ...rest
}: CodeCardProps) => {
  const [theme, setTheme] = useState<ThemeType>("default-dark-modern");
  const content = useMemo(() => {
    return codeLines
      .map((line) => line.map((token) => extractTokenContent(token)).join(""))
      .join("\n");
  }, [codeLines]);

  return (
    <div
      className={cn(
        "card flex flex-col",
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between px-4 py-1 bg-(--background-color-tertiary) border-b border-(--border-color)">
        <span className="text-xs font-mono text-(--text-color-muted)">
          {lang || "text"}
        </span>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeType)}
              className="appearance-none bg-transparent text-xs text-(--text-color-muted) hover:text-(--text-color) cursor-pointer outline-none transition-colors pr-2 text-right"
              title="Change Theme"
            >
              {themes.map((th) => (
                <option
                  key={th}
                  value={th}
                  className="bg-(--background-color-secondary) text-(--text-color)"
                >
                  {th}
                </option>
              ))}
            </select>
          </div>
          <div className="w-px h-3 bg-(--border-color)" />
          <CopyButton
            content={content}
            className="btn rounded-lg p-1"
          />
        </div>
      </div>
      <div className="p-4 overflow-x-auto text-sm" data-theme={theme}>
        <CodeBlock theme={theme} tokenLines={codeLines} className="font-mono" />
      </div>
    </div>
  );
};
CodeCard.displayName = "CodeCard";
