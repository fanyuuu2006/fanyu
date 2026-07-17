"use client";
import { cn } from "@/utils/className";
import { parseLangAndCode } from "@/utils/highlight";
import { BundledLanguage, SpecialLanguage, codeToTokens } from "shiki";
import { CopyButton } from "./CopyButton";
import { isValidElement, useMemo } from "react";
import { CodePreBody } from "./CodePreBody";
import { useTheme } from "@/contexts/ThemeContext";
import { MermaidRenderer } from "./MermaidRenderer";

type CodePreProps = React.HTMLAttributes<HTMLPreElement>;

export function CodePre({ className, children, ...preProps }: CodePreProps) {
  const { theme } = useTheme();
  // 從 markdown children 解析語言與原始碼
  const { lang, code } = useMemo(() => parseLangAndCode(children), [children]);

  const isMermaid = lang === "mermaid";

  // 同一份 code/lang 只建立一次 highlight Promise
  // 注意：即使是 mermaid，這個 hook 也必須被呼叫（避免違反 hooks 規則），
  // 但用 isMermaid 短路，避免真的送出不必要的 codeToTokens 請求。
  const tokensPromise = useMemo(() => {
    if (isMermaid) {
      // 回傳一個 resolve 成空陣列的 Promise，型別對齊但不會被實際渲染使用
      return Promise.resolve([]);
    }
    return codeToTokens(code, {
      lang: lang as BundledLanguage | SpecialLanguage,
      theme: theme === "light" ? "github-light-default" : "dark-plus",
    }).then((result) => result.tokens);
  }, [code, lang, theme, isMermaid]);

  // 取出 <code> element 上的 HTML 屬性（如 className、style）
  // 排除 children 避免將巢狀內容重複傳入 CodePreBody
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
        {isMermaid ? (
          // mermaid 圖表：不用 <pre>，避免 monospace/overflow-x 樣式套用在 SVG 上
          <MermaidRenderer className="p-4 flex justify-center" theme={theme}>
            {code}
          </MermaidRenderer>
        ) : (
          <pre
            className={cn("overflow-x-auto p-4 leading-6", className)}
            {...preProps}
          >
            <CodePreBody
              tokensPromise={tokensPromise}
              {...inheritedCodeProps}
            />
          </pre>
        )}
      </div>
    </div>
  );
}
