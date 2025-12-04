"use client";
import { languageOptions } from "@/libs/language";
import { LanguageOption } from "@/types/language";
import { createContext, useCallback, useContext, useState } from "react";

export type LanguageSwitchProps = React.HTMLAttributes<HTMLButtonElement>;

const LanguageContext = createContext<{
  Switch: React.FC<LanguageSwitchProps>;
  Current: LanguageOption;
} | null>(null);

export const LanguageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [Language, setLanguage] = useState<LanguageOption>("chinese");

  const Switch: React.FC<LanguageSwitchProps> = useCallback(
    ({ onClick, ...rest }: LanguageSwitchProps) => {
      return (
        <button
          onClick={(e) => {
            setLanguage((prev) => {
              const currIdx = languageOptions.indexOf(prev);
              const nextIdx = (currIdx + 1) % languageOptions.length;
              return languageOptions[nextIdx];
            });
            onClick?.(e);
          }}
          {...rest}
        />
      );
    },
    []
  );

  return (
    <LanguageContext.Provider
      value={{
        Current: Language,
        Switch,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage 必須在 LanguageProvider 內使用");
  }
  return context;
};
