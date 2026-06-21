"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n, { STORAGE_KEY } from "./config";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server and first client render both use the default language (see config),
  // so hydration matches. After mount we apply the stored preference and keep
  // localStorage + <html lang> in sync with every change.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    } else {
      document.documentElement.lang = i18n.language;
    }

    const handleChange = (lng: string) => {
      localStorage.setItem(STORAGE_KEY, lng);
      document.documentElement.lang = lng;
    };

    i18n.on("languageChanged", handleChange);
    return () => {
      i18n.off("languageChanged", handleChange);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
