"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/className";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

type ThemeToggleProps = React.HTMLAttributes<HTMLButtonElement>;
export const ThemeToggle = ({ className, ...rest }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={cn("tooltip", className)}
      data-tooltip="切換主題"
      onClick={toggleTheme}
      {...rest}
    >
      {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
    </button>
  );
};
