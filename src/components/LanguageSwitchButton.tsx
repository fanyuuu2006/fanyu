"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslationOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const LanguageSwitchButton = () => {
  const Language = useLanguage();

  return (
    <Language.Switch className="btn text-lg text-center fixed bottom-4 right-4 z-[9999] w-12 h-12 flex items-center justify-center rounded-full">
      <Tooltip
        title={
          {
            chinese: "切換語言",
            english: "Switch Language",
          }[Language.Current]
        }
      >
        <TranslationOutlined />
      </Tooltip>
    </Language.Switch>
  );
};
