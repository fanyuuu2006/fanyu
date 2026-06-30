"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

type ThemeToggleProps = React.HTMLAttributes<HTMLButtonElement>;
export const ThemeToggle = ({ ...rest }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} {...rest}>
      {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
    </button>
  );
};
