import { CodeBlock, CodeTokenProps, extractTokenContent } from "c063";
import React, { useMemo } from "react";
import { OverrideProps } from "fanyucomponents";
import { CopyButton } from "./CopyButton";
import { cn } from "@/utils/className";

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
  const content = useMemo(() => {
    return codeLines
      .map((line) => line.map((token) => extractTokenContent(token)).join(""))
      .join("\n");
  }, [codeLines]);
  return (
    <div className={cn(`card flex flex-col p-6 gap-2`, className)} {...rest}>
      <div className="flex items-center">
        <span>{lang}</span>
        <CopyButton
          content={content}
          className="ml-auto btn rounded-sm flex items-center justify-center p-1"
        />
      </div>
      <CodeBlock
        theme="default-dark-modern"
        tokenLines={codeLines}
        className="font-mono"
      />
    </div>
  );
};
CodeCard.displayName = "CodeCard";
