"use client";

import React from "react";
import { cn } from "@/utils/className";
import { CopyButton } from "./CopyButton";

type CodePreProps = React.HTMLAttributes<HTMLPreElement>;

function getText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getText).join("");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getText(node.props.children);
  }

  return "";
}

export const CodePre = ({
  className,
  children,
  ...rest
}: CodePreProps) => {
  const child = React.Children.toArray(children)[0];

  let lang = "plain text";
  let code = "";

  if (
    React.isValidElement<{
      className?: string;
      children?: React.ReactNode;
    }>(child)
  ) {
    const match = child.props.className?.match(/language-([\w-]+)/);

    lang = match?.[1] ?? "plain text";
    code = getText(child.props.children);
  }

  return (
    <div
      className={cn(
        'font-mono',
        "mb-4 rounded-md",
        "border border-(--border)",
        "bg-(--foreground)/5",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "border-b border-(--border)",
          "px-4 py-2",
        )}
      >
        <span className="select-none">{lang}</span>

        <CopyButton content={code} />
      </div>

      <pre
        className={cn("overflow-x-auto p-4 leading-6", className)}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
};
