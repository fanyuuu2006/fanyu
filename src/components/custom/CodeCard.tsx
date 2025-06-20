import { CodeBlock, CodeTokenProps, extractTokenContent } from "c063";
import React, { useMemo } from "react";
import { OverrideProps } from "fanyucomponents";
import { CopyButton } from "./CopyButton";

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
    <div className={`card p-6 overflow-auto ${className}`} {...rest}>
      <div className="flex items-center">
        <span>{lang}</span>
        <CopyButton content={content} />
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
