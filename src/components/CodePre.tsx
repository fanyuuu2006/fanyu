"use client";
import { cn } from "@/utils/className";
import { parseLangAndCode } from "@/utils/highlight";
import { BundledLanguage, SpecialLanguage, codeToTokens } from "shiki";
import { CopyButton } from "./CopyButton";
import { isValidElement, useMemo } from "react";
import { CodeContainer } from "./CodeContainer";
import { useTheme } from "@/contexts/ThemeContext";

type CodePreProps = React.HTMLAttributes<HTMLPreElement>;

export function CodePre({ className, children, ...preProps }: CodePreProps) {
  const { theme } = useTheme();
  // 從 markdown children 解析語言與原始碼
  const { lang, code } = useMemo(() => parseLangAndCode(children), [children]);
  // 同一份 code/lang 只建立一次 highlight Promise
  const tokensPromise = useMemo(
    () =>
      codeToTokens(code, {
        lang: lang as BundledLanguage | SpecialLanguage,
        theme: theme === "light" ? "github-light-default" : "dark-plus",
      }).then((result) => result.tokens),
    [code, lang, theme],
  );

  // 取出 <code> element 上的 HTML 屬性（如 className、style）
  // 排除 children 避免將巢狀內容重複傳入 CodeContainer
  const inheritedCodeProps = useMemo(() => {
    if (!isValidElement<React.HTMLAttributes<HTMLElement>>(children)) {
      return {} as React.HTMLAttributes<HTMLElement>;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children: _, ...attrs } = children.props;
    return attrs;
  }, [children]);

  return (
    <div
      className={cn(
        "font-mono mb-4 rounded-md",
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
        <div className="flex items-center gap-2 select-none text-(--muted)">
          <span>{lang}</span>
        </div>
        <div>
          <CopyButton content={code} className="btn p-1 rounded-md" />
        </div>
      </div>

      <div className="w-full">
        <pre
          className={cn("overflow-x-auto p-4 leading-6", className)}
          {...preProps}
        >
          <CodeContainer
            tokensPromise={tokensPromise}
            {...inheritedCodeProps}
          />
        </pre>
      </div>
    </div>
  );
}
