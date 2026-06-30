"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const FALLBACK_THEME: Theme = "dark";

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return FALLBACK_THEME;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const DEFAULT_THEME_STATE: (() => Theme) | Theme = "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME_STATE);

  // 初始化 theme
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;

    const initial = stored ?? DEFAULT_THEME_STATE;

    Promise.resolve().then(() => setTheme(initial));
  }, []);

  // 套用 theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
