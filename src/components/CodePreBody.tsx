import { cn } from "@/utils/className";
import { Suspense, use } from "react";
import { ThemedToken } from "shiki";

/**
 * 判斷某行是否為「空行」。
 * shiki 輸出的最後一行通常是尾隨換行產生的空陣列，不需補 <br>。
 */
const isEmptyLine = (line: ThemedToken[], index: number, total: number) =>
  line.length === 0 && index < total - 1;

type TokenLineProps = {
  line: ThemedToken[];
  isEmpty: boolean;
};
const TokenLine = ({ line, isEmpty }: TokenLineProps) => {
  if (isEmpty)
    return (
      <div>
        <br />
      </div>
    );

  return (
    <div>
      {line.map((token, i) => (
        <span key={i} style={{ color: token.color }}>
          {token.content}
        </span>
      ))}
    </div>
  );
};

type TokenLinesProps = { tokensPromise: Promise<ThemedToken[][]> };
const TokenLines = ({ tokensPromise }: TokenLinesProps) => {
  const lines = use(tokensPromise);
  const total = lines.length;

  return lines.map((line, i) => (
    <TokenLine key={i} line={line} isEmpty={isEmptyLine(line, i, total)} />
  ));
};

const SKELETON_WIDTHS = ["72%", "88%", "55%", "80%", "65%"] as const;
const CodeSkeleton = () => (
  <div aria-hidden role="presentation" className="flex flex-col gap-2 py-0.5">
    {SKELETON_WIDTHS.map((w, i) => (
      <div key={i} className="skeleton h-[1em] rounded" style={{ width: w }} />
    ))}
  </div>
);
// ─── 公開元件 ────────────────────────────────────────────────
type CodePreBodyProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> & {
  tokensPromise: Promise<ThemedToken[][]>;
};

/**
 * 程式碼容器，整合 shiki 高亮 + Suspense 串流。
 *
 * 樣式採用 GitHub 深色風格語意，
 * 但顏色與圓角變數來自網站 CSS custom properties，維持品牌一致性。
 *
 * @example
 * <pre>
 *   <CodePreBody tokensPromise={highlight(code, lang)} />
 * </pre>
 */
export const CodePreBody = ({
  tokensPromise,
  className,
  ...rest
}: CodePreBodyProps) => {
  return (
    <code {...rest} className={cn("block", className)}>
      <Suspense fallback={<CodeSkeleton />}>
        <TokenLines tokensPromise={tokensPromise} />
      </Suspense>
    </code>
  );
};
