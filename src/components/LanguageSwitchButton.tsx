"use client";
import { useLanguage } from "@/context/LanguageContext";
import { GlobalOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const LanguageSwitchButton = () => {
  const Language = useLanguage();

  return (
    <Language.Switch
      className="btn text-center label"
      style={{
        position: "fixed",
        bottom: "1em",
        right: "1em",
        width: "1.5em",
        height: "1.5em",
        borderRadius: "100%",
      }}
    >
      <Tooltip title="切換語言">
        <GlobalOutlined />
      </Tooltip>
    </Language.Switch>
  );
};
