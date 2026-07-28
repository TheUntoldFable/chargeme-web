// Language constants only — safe to import from server components and
// middleware (no i18next / react dependencies).
export const LOCALE_COOKIE = "chargeme-lang";
export const DEFAULT_LANGUAGE = "en";

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "bg", label: "BG" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const isLanguageCode = (lang: string): lang is LanguageCode =>
  LANGUAGES.some((l) => l.code === lang);
