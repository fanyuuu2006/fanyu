import { Toast } from "@/components/custom/Toast";
import { CopyOutlined } from "@ant-design/icons";
import { CodeBlock, extractTokenContent } from "c063";
import React, { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { generateCodeLines } from "./codeLines";

export type CodeCardProps = React.HTMLAttributes<HTMLDivElement>;

export const CodeCard = ({ className, ...rest }: CodeCardProps) => {
  const Language = useLanguage();

  const codeLines = useMemo(() => {
    return generateCodeLines(Language.Current);
  }, [Language.Current]);

  return (
    <div className={`card p-6 overflow-auto ${className}`} {...rest}>
      <div className="hint flex items-center">
        <span>TypeScript</span>
        <button
          className="btn flex items-center justify-center ml-auto w-6 h-6 rounded-sm"
          onClick={async () => {
            if (!navigator?.clipboard) {
              Toast.fire({ icon: "error", text: "瀏覽器不支援複製" });
              return;
            }
            const plainText = codeLines
              .map((line) =>
                line.map((token) => extractTokenContent(token)).join("")
              )
              .join("\n");

            await navigator.clipboard
              .writeText(plainText)
              .then(() => {
                Toast.fire({
                  icon: "success",
                  text: "已複製到剪貼簿",
                });
              })
              .catch((err) => {
                console.error("複製代碼失敗", err);
                Toast.fire({ icon: "error", text: "複製代碼失敗" });
              });
          }}
        >
          <CopyOutlined />
        </button>
      </div>
      <CodeBlock
        theme="default-dark-modern"
        tokenLines={codeLines}
        className="note flex flex-col"
      />
    </div>
  );
};
CodeCard.displayName = "CodeCard";
