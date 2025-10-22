import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { OverrideProps } from "fanyucomponents";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Toast } from "./Toast";
import { useLanguage } from "@/contexts/LanguageContext";

const COPYBUTTON_CONTENT = {
  chinese: {
    copied: "已複製",
    copy: "複製",
    success: "已複製到剪貼簿",
    failed: "複製失敗",
    notSupport: "瀏覽器不支援複製",
  },
  english: {
    copied: "Copied",
    copy: "Copy",
    success: "Copied to clipboard",
    failed: "Copy failed",
    notSupport: "Browser does not support copy",
  },
} as const;

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
  ...rest
}: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const Language = useLanguage();

  const copyButtonContent = useMemo(
    () => COPYBUTTON_CONTENT[Language.Current],
    [Language.Current]
  );

  const handleCopy = useCallback(async () => {
    if (!navigator?.clipboard) {
      Toast.fire({ icon: "error", text: copyButtonContent.notSupport });
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      Toast.fire({
        icon: "success",
        text: copyButtonContent.success,
      });
    } catch (err) {
      console.error("複製失敗", err);
      Toast.fire({ icon: "error", text: copyButtonContent.failed });
    }
  }, [content, copyButtonContent]);

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

  const tooltipTitle = useMemo(
    () => (copied ? copyButtonContent.copied : copyButtonContent.copy),
    [copied, copyButtonContent.copied, copyButtonContent.copy]
  );

  const ariaLabel = tooltipTitle;
  const icon = useMemo(
    () => (copied ? <CheckOutlined /> : <CopyOutlined />),
    [copied]
  );

  return (
    <Tooltip title={tooltipTitle}>
      <button
        disabled={copied}
        aria-label={ariaLabel}
        onClick={handleClick}
        {...rest}
      >
        {children || icon}
      </button>
    </Tooltip>
  );
};

CopyButton.displayName = "CopyButton";
