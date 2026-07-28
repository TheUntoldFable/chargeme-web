"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n, { LOCALE_COOKIE, type LanguageCode } from "./config";

export default function I18nProvider({
  lang,
  children,
}: {
  lang: LanguageCode;
  children: React.ReactNode;
}) {
  // The language is derived from the URL segment. Resources are bundled, so
  // changeLanguage applies synchronously — server render and hydration both
  // produce markup in the requested language.
  if (i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(lang);
  }

  // Persist the active language so the middleware can pick the right locale
  // when someone lands on a bare URL like "/".
  useEffect(() => {
    document.cookie = `${LOCALE_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
