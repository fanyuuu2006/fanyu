import { LanguageOptions } from "@/lib/language";

export type LanguageOption = (typeof LanguageOptions)[number];

export type LanguageContent<T> = {
  [key in LanguageOption]: T;
};
