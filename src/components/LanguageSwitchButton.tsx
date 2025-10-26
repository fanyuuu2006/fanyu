"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslationOutlined } from "@ant-design/icons";

export const LanguageSwitchButton = () => {
  const Language = useLanguage();

  return (
    <Language.Switch className="btn text-lg text-center fixed bottom-4 right-4 z-[9999] w-12 h-12 flex items-center justify-center rounded-full">
      <TranslationOutlined />
    </Language.Switch>
  );
};
