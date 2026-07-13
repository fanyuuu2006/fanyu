import { CodeBlock, CodeTokenProps } from "c063";
import React, { useMemo } from "react";
import { OverrideProps } from "fanyucomponents";
import { CopyButton } from "../CopyButton";
import { cn } from "@/utils/className";
import { extractReactNode } from "@/utils/highlight";
import { useTheme } from "@/contexts/ThemeContext";

export type CodeCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    codeLines: CodeTokenProps<React.ElementType>[][];
  }
>;
export const CodeCard = ({
  lang,
  codeLines,
  className,
  ...rest
}: CodeCardProps) => {
  const { theme } = useTheme();
  const content = useMemo(() => {
    return codeLines
      .map((line) =>
        line.map((token) => extractReactNode(token.children)).join(""),
      )
      .join("\n");
  }, [codeLines]);
  return (
    <div
      className={cn(`card rounded-xl flex flex-col p-4 gap-2`, className)}
      {...rest}
    >
      <div className="flex items-center">
        <span className="text-(--muted)">{lang}</span>

        <CopyButton
          content={content}
          className="ml-auto btn rounded-sm flex items-center justify-center p-1"
        />
      </div>
      <CodeBlock
        theme={
          theme === "light" ? "default-light-modern" : "default-dark-modern"
        }
        tokenLines={codeLines}
        className="font-mono"
      />
    </div>
  );
};
CodeCard.displayName = "CodeCard";
