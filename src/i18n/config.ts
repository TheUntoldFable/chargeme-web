import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import bg from "./locales/bg.json";

export const STORAGE_KEY = "chargeme-lang";
export const DEFAULT_LANGUAGE = "en";

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "bg", label: "BG" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

// Initialise once. This module is imported by the client-side provider, so the
// guard protects against re-init during Fast Refresh / repeated imports.
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      bg: { translation: bg },
    },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
