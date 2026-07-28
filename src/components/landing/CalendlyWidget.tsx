"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Colors mirror the site theme: card background, gray-300 text, yellow accent.
const CALENDLY_URL =
  "https://calendly.com/chargem3info/30min?hide_gdpr_banner=1&background_color=1a1a1a&text_color=d9d9d9&primary_color=ffc013";

export default function CalendlyWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);
  const [height, setHeight] = useState(700);

  // The iframe reports its content height via postMessage on every step of
  // the booking flow — track it so the widget never shows an inner scrollbar.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (
        e.origin === "https://calendly.com" &&
        e.data?.event === "calendly.page_height"
      ) {
        const reported = parseInt(e.data.payload?.height, 10);
        if (!Number.isNaN(reported)) setHeight(reported);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Calendly's widget.js only auto-scans on its initial load, which can happen
  // before this component mounts under client-side navigation — so we init
  // explicitly, from whichever happens last: mount or script load.
  const init = () => {
    if (initializedRef.current || !window.Calendly || !containerRef.current) {
      return;
    }
    initializedRef.current = true;
    window.Calendly.initInlineWidget({
      url: CALENDLY_URL,
      parentElement: containerRef.current,
    });
  };

  useEffect(init, []);

  return (
    <>
      <div
        ref={containerRef}
        className="min-w-[320px] transition-[height] duration-300 [&_iframe]:!h-full"
        style={{ height }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={init}
      />
    </>
  );
}
