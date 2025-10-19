import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { OverrideProps } from "fanyucomponents";
import { useEffect, useMemo, useState } from "react";
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
};

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
  const Language = useLanguage();

  const copyButtonContent = COPYBUTTON_CONTENT[Language.Current];

  const handleCopy = useMemo(() => {
    return async () => {
      if (!navigator?.clipboard) {
        Toast.fire({ icon: "error", text: copyButtonContent.notSupport });
        return;
      }
      await navigator.clipboard
        .writeText(content)
        .then(() => {
          setCopied(true);
          Toast.fire({
            icon: "success",
            text: copyButtonContent.success,
          });
        })
        .catch((err) => {
          console.error("複製失敗", err);
          Toast.fire({ icon: "error", text: copyButtonContent.failed });
        });
    };
  }, [
    content,
    copyButtonContent.failed,
    copyButtonContent.notSupport,
    copyButtonContent.success,
  ]);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <Tooltip title={copied ? copyButtonContent.copied : copyButtonContent.copy}>
      <button
        disabled={copied}
        aria-label={copied ? copyButtonContent.copied : copyButtonContent.copy}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          handleCopy();
          onClick?.(event);
        }}
        {...rest}
      >
        {children || (copied ? <CheckOutlined /> : <CopyOutlined />)}
      </button>
    </Tooltip>
  );
};

CopyButton.displayName = "CopyButton";
