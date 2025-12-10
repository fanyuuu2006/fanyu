"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { TranslationOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

export const LanguageSwitchButton = () => {
  const Language = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // SSR 時 & CSR 第一輪 hydration 時都不產生 portal

  return ReactDOM.createPortal(
    <Language.Switch className="btn text-lg text-center fixed bottom-4 right-4 z-9999 w-12 h-12 flex items-center justify-center rounded-full">
      <TranslationOutlined />
    </Language.Switch>,
    document.body
  );
};
