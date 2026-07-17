"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { Theme } from "@/contexts/ThemeContext";

type MermaidRendererProps = React.HTMLAttributes<HTMLElement> & {
  children: string;
  theme: Theme;
};

/**
 * MermaidRenderer
 *
 * 用來將 Markdown 中的 Mermaid 語法轉換成 SVG 圖表。
 *
 * 使用情境：
 * ```md
 * ```mermaid
 * graph TD
 *   A[Start] --> B[End]
 * ```
 * ```
 *
 * ReactMarkdown 解析後，
 * 將 language-mermaid 的 code block 交給此 component 處理。
 *
 * 效能與正確性考量：
 * - mermaid.render 是非同步的，若 children/theme 變動過快（例如串流輸出時），
 *   需避免「舊的渲染結果」晚於「新的渲染」完成後才寫入 DOM（race condition）。
 * - 語法錯誤時 mermaid.render 會 throw，需捕捉並顯示錯誤訊息，
 *   避免畫面空白且 console 出現 unhandled rejection。
 */
export function MermaidRenderer({
  children,
  theme,
  ...rest
}: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 用來標記「這次 effect 是否已經過期」。
    // 若 children/theme 在渲染完成前又變了，或元件卸載了，
    // cancelled 會變成 true，避免用過期的結果去操作 DOM。
    let cancelled = false;

    async function renderMermaid() {
      if (!containerRef.current) return;

      setError(null);

      mermaid.initialize({
        startOnLoad: false,
        theme: theme === "dark" ? "dark" : "default",
      });

      // mermaid 需要一個不重複的 id 來渲染圖表；
      // 用 crypto.randomUUID 確保同時存在多個圖表時不會互相衝突。
      const id = `mermaid-${crypto.randomUUID()}`;

      try {
        const { svg } = await mermaid.render(id, children);

        // 若在等待 render 的過程中，
        // children/theme 已被新的 effect 取代，或元件已卸載，
        // 就不要再寫入 DOM，避免畫面閃回舊內容。
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;
      } catch (err) {
        if (cancelled) return;

        // 常見情境：使用者輸入中、Markdown 尚未串流完整，
        // Mermaid 語法暫時不合法，這裡不 throw，只顯示錯誤訊息。
        console.error("Mermaid render failed:", err);
        setError(err instanceof Error ? err.message : "圖表渲染失敗");
      }
    }

    renderMermaid();

    return () => {
      cancelled = true;
    };
  }, [children, theme]);

  if (error) {
    return (
      <div {...rest} role="alert">
        Mermaid 圖表渲染失敗：{error}
      </div>
    );
  }

  return <div ref={containerRef} {...rest} />;
}
