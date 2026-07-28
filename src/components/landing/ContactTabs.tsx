"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DemoRequestForm from "./DemoRequestForm";
import CalendlyWidget from "./CalendlyWidget";

type Tab = "demo" | "booking";

export default function ContactTabs() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("demo");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectTab = (next: Tab) => {
    setTab(next);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    wrapperRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  // Nav and footer link to #demo / #booking within this one section — follow
  // the hash so those links also select the matching tab.
  useEffect(() => {
    const syncWithHash = () => {
      if (window.location.hash === "#booking") setTab("booking");
      else if (window.location.hash === "#demo") setTab("demo");
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  const tabs: { key: Tab; label: string }[] = [
    { key: "demo", label: t("demoSection.title") },
    { key: "booking", label: t("bookingSection.title") },
  ];

  return (
    <div id="booking" ref={wrapperRef} className="scroll-mt-16">
      {/* Tab switcher */}
      <div className="flex justify-center mb-8" role="tablist">
        <div className="inline-flex rounded-lg border border-white/10 bg-[#0e0f11] p-1">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => selectTab(key)}
              className={`px-5 py-2 text-sm font-semibold rounded-md transition ${
                tab === key
                  ? "bg-yellow-400 text-black"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Both panels stay mounted so the Calendly iframe keeps its state
          across tab switches; the inactive one is just hidden. */}
      <div className={tab === "demo" ? "" : "hidden"}>
        <div className="max-w-xl mx-auto bg-[#111214]/90 border border-white/5 rounded-xl p-6 shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]">
          <DemoRequestForm />
        </div>
      </div>

      <div className={tab === "booking" ? "" : "hidden"}>
        <p className="text-center text-gray-400 text-sm mb-6">
          {t("bookingSection.subtitle")}
        </p>
        <div className="bg-[#111214]/90 border border-white/5 rounded-xl overflow-hidden shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]">
          <CalendlyWidget />
        </div>
      </div>
    </div>
  );
}
