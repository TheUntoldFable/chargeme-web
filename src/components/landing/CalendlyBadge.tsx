"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useTranslation } from "react-i18next";

const CALENDLY_URL =
  "https://calendly.com/chargem3info/30min?hide_gdpr_banner=1&background_color=1a1a1a&text_color=d9d9d9&primary_color=ffc013";

export default function CalendlyBadge() {
  const { t, i18n } = useTranslation();
  const initializedRef = useRef(false);

  const init = () => {
    if (initializedRef.current || !window.Calendly?.initBadgeWidget) return;
    initializedRef.current = true;
    window.Calendly.initBadgeWidget({
      url: CALENDLY_URL,
      text: t("bookingSection.title"),
      color: "#ffc013",
      textColor: "#000000",
      branding: true,
    });
  };

  useEffect(init, []);

  // Re-create the badge when the language changes so its label follows along.
  useEffect(() => {
    if (!initializedRef.current || !window.Calendly?.destroyBadgeWidget) return;
    window.Calendly.destroyBadgeWidget();
    initializedRef.current = false;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  useEffect(() => {
    if (document.querySelector('link[href*="assets/external/widget.css"]')) {
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="lazyOnload"
      onLoad={init}
    />
  );
}
