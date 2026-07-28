import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import bg from "./locales/bg.json";

export {
  LOCALE_COOKIE,
  DEFAULT_LANGUAGE,
  LANGUAGES,
  type LanguageCode,
} from "./languages";

import { DEFAULT_LANGUAGE } from "./languages";

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
