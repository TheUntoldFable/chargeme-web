"use client";

import { useTranslation } from "react-i18next";

import { LANGUAGES } from "./config";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div
      role="group"
      aria-label={t("nav.languageAria")}
      className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5"
    >
      {LANGUAGES.map((lng) => {
        const active = current === lng.code;
        return (
          <button
            key={lng.code}
            type="button"
            onClick={() => i18n.changeLanguage(lng.code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-widest transition ${
              active
                ? "bg-yellow-400 text-black"
                : "text-gray-300 hover:text-yellow-400"
            }`}
          >
            {lng.label}
          </button>
        );
      })}
    </div>
  );
}
