import { LanguageOptions } from "@/lib/language";

export type LanguageOption = (typeof LanguageOptions)[number];

export type LanguageContent<T> = Record<LanguageOption, T>;
