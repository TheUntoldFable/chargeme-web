// Thin wrapper over gtag so components can fire GA4 events without caring
// whether analytics is loaded or consented — events silently no-op otherwise
// (Consent Mode still applies to anything that does go out).
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
