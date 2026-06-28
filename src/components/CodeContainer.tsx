import { Suspense, use } from "react";
import { ThemedToken } from "shiki";

// ─── 內部：消費 Promise 並渲染 token ────────────────────────
type TokenLinesProps = { tokensPromise: Promise<ThemedToken[][]> };

const TokenLines = ({ tokensPromise }: TokenLinesProps) => {
  const lines = use(tokensPromise);

  return (
    <>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {line.length === 0 ? (
            <br />
          ) : (
            line.map((token, tokenIndex) => (
              <span
                key={tokenIndex}
                className="whitespace-pre"
                style={{ color: token.color }}
              >
                {token.content}
              </span>
            ))
          )}
        </div>
      ))}
    </>
  );
};

// ─── 載入中的佔位符 ──────────────────────────────────────────
const CodeFallback = () => (
  <span
    aria-hidden
    className="block invisible select-none"
    // 撐開至少 3 行高，避免 Suspense 切換時高度跳動
    style={{ minHeight: "4.5em" }}
  />
);

// ─── 公開元件 ────────────────────────────────────────────────
type CodeContainerProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> & {
  tokensPromise: Promise<ThemedToken[][]>;
};

export function CodeContainer({
  tokensPromise,
  ...codeProps
}: CodeContainerProps) {
  return (
    <code {...codeProps}>
      <Suspense fallback={<CodeFallback />}>
        <TokenLines tokensPromise={tokensPromise} />
      </Suspense>
    </code>
  );
}
