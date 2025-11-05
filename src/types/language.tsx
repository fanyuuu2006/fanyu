import { languageOptions } from "@/libs/language";

export type LanguageOption = (typeof languageOptions)[number];

export type LanguageContent<T> = Record<LanguageOption, T>;