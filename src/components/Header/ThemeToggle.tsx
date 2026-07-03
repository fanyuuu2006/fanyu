import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/className";
import MoonOutlinedSvg from "../svgs/MoonOutlinedSvg";
import SunOutlinedSvg from "../svgs/SunOutlinedSvg";

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
      {theme === "light" ? <MoonOutlinedSvg /> : <SunOutlinedSvg />}
    </button>
  );
};
