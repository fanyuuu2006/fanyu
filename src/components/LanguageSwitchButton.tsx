"use client";
import { useLanguage } from "@/context/LanguageContext";
import { GlobalOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const LanguageSwitchButton = () => {
  const Language = useLanguage();

  return (
    <Language.Switch className="btn content text-center fixed bottom-4 right-4 z-[100] w-12 h-12 flex items-center justify-center rounded-full">
      <Tooltip title="切換語言">
        <GlobalOutlined />
      </Tooltip>
    </Language.Switch>
  );
};
