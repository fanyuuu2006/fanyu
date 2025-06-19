import { Toast } from "@/components/custom/Toast";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { CodeBlock, CodeTokenProps, extractTokenContent } from "c063";
import React, { useEffect, useMemo, useState } from "react";
import { OverrideProps } from "fanyucomponents";

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
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useMemo(() => {
    return async () => {
      if (!navigator?.clipboard) {
        Toast.fire({ icon: "error", text: "瀏覽器不支援複製" });
        return;
      }
      const plainText = codeLines
        .map((line) => line.map((token) => extractTokenContent(token)).join(""))
        .join("\n");

      await navigator.clipboard
        .writeText(plainText)
        .then(() => {
          setCopied(true);
          Toast.fire({
            icon: "success",
            text: "已複製到剪貼簿",
          });
        })
        .catch((err) => {
          console.error("複製代碼失敗", err);
          Toast.fire({ icon: "error", text: "複製代碼失敗" });
        });
    };
  }, [codeLines]);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <div className={`card p-6 overflow-auto ${className}`} {...rest}>
      <div className="note flex items-center">
        <span>{lang}</span>
        <button
          aria-label={copied ? "已複製" : "複製代碼"}
          title={copied ? "已複製" : "複製代碼"}
          className="btn flex items-center justify-center ml-auto p-1 rounded-sm"
          onClick={handleCopy}
        >
          {copied ? <CheckOutlined /> : <CopyOutlined />}
        </button>
      </div>
      <CodeBlock
        theme="default-dark-modern"
        tokenLines={codeLines}
        className="note flex flex-col font-mono"
      />
    </div>
  );
};
CodeCard.displayName = "CodeCard";
