import { cn } from "@/utils/className";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type CopyButtonProps = OverrideProps<
  React.HTMLAttributes<HTMLButtonElement>,
  {
    content: string;
  }
>;

export const CopyButton = ({
  content,
  onClick,
  children,
  className,
  ...rest
}: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async () => {
    if (!navigator?.clipboard) {
      console.error("瀏覽器不支援 Clipboard API");
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      console.log("複製成功");
    } catch (err) {
      console.error("複製失敗", err);
    }
  }, [content]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      handleCopy();
      onClick?.(event);
    },
    [handleCopy, onClick]
  );

  useEffect(() => {
    if (!copied) return;

    // 清除之前的 timer 避免記憶體洩漏
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setCopied(false);
      timerRef.current = null;
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [copied]);

  const tooltipTitle = copied ? "已複製" : "點擊複製";

  const ariaLabel = tooltipTitle;
  const icon = useMemo(
    () => (copied ? <CheckOutlined /> : <CopyOutlined />),
    [copied]
  );

  return (
    <button
      className={cn("tooltip", className)}
      disabled={copied}
      aria-label={ariaLabel}
      onClick={handleClick}
      data-tooltip={tooltipTitle}
      data-copied={copied ? "true" : "false"}
      {...rest}
    >
      {children || icon}
    </button>
  );
};

CopyButton.displayName = "CopyButton";