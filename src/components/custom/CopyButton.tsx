import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { OverrideProps } from "fanyucomponents";
import { useEffect, useMemo, useState } from "react";
import { Toast } from "./Toast";

export type CopyButtonProps = OverrideProps<
  React.HTMLAttributes<HTMLButtonElement>,
  {
    content: string;
  }
>;

export const CopyButton = ({
  className = "",
  content,
  onClick,
  ...rest
}: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useMemo(() => {
    return async () => {
      if (!navigator?.clipboard) {
        Toast.fire({ icon: "error", text: "瀏覽器不支援複製" });
        return;
      }
      await navigator.clipboard
        .writeText(content)
        .then(() => {
          setCopied(true);
          Toast.fire({
            icon: "success",
            text: "已複製到剪貼簿",
          });
        })
        .catch((err) => {
          console.error("複製失敗", err);
          Toast.fire({ icon: "error", text: "複製失敗" });
        });
    };
  }, [content]);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <Tooltip title={copied ? "已複製" : "複製"}>
      <button
        aria-label={copied ? "已複製" : "複製"}
        title={copied ? "已複製" : "複製"}
        className={`${className} btn flex items-center justify-center ml-auto p-1 rounded-sm`}
        onClick={(...args) => {
          handleCopy();
          onClick?.(...args);
        }}
        {...rest}
      >
        {copied ? <CheckOutlined /> : <CopyOutlined />}
      </button>
    </Tooltip>
  );
};
