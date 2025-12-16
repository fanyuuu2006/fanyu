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
      data-theme={theme}
      className={cn(`card flex flex-col p-6 gap-2`, className)}
      {...rest}
    >
      <div className="flex items-center">
        <span className="text-(--text-color-muted)">{lang}</span>
        <CopyButton
          content={content}
          className="ml-auto btn rounded-sm flex items-center justify-center p-1"
        />
      </div>
      <CodeBlock theme={theme} tokenLines={codeLines} className="font-mono" />
      <div>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemeType)}
          className="bg-(--background-color) border border-(--border-color) rounded-sm p-1"
        >
          {themes.map((th) => (
            <option key={th} value={th}>
              {th}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
CodeCard.displayName = "CodeCard";
