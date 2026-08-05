"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CONSENT_KEY = "cookie-consent";

type Consent = "granted" | "denied";

function applyConsent(consent: Consent) {
  window.gtag?.("consent", "update", { analytics_storage: consent });
}

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  // Consent Mode defaults to denied on every page load, so a previously
  // granted choice has to be re-applied here.
  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === "granted" || stored === "denied") {
      applyConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const choose = (consent: Consent) => {
    window.localStorage.setItem(CONSENT_KEY, consent);
    applyConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookieBanner.title")}
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl bg-[#111214] border border-white/10 rounded-xl p-5 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)]">
        <h2 className="text-sm font-semibold text-yellow-400 mb-2">
          {t("cookieBanner.title")}
        </h2>
        <p className="text-sm text-white/70 mb-4">{t("cookieBanner.body")}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex items-center justify-center rounded-md border border-yellow-400/40 text-yellow-400 font-semibold px-5 py-2.5 text-sm hover:bg-yellow-400/10 transition"
          >
            {t("cookieBanner.decline")}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex items-center justify-center rounded-md bg-yellow-400 text-black font-semibold px-5 py-2.5 text-sm hover:brightness-95 transition"
          >
            {t("cookieBanner.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
