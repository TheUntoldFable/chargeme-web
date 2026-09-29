"use client";

import { useEffect, useState } from "react";
import type { LanguageCode } from "@/i18n/languages";
import { BLOG_UI } from "@/content/blog/ui";

const linkClass =
  "rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 transition hover:border-yellow-400/40 hover:text-yellow-400";

export default function ShareButtons({
  url,
  title,
  lang,
}: {
  url: string;
  title: string;
  lang: LanguageCode;
}) {
  const ui = BLOG_UI[lang];
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // Resolved after mount: navigator is not available during prerender, and
  // branching on it during render would desync hydration.
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // Dismissed by the user, or sharing unavailable — nothing to report.
    }
  }

  return (
    <div>
      <h3 className="mb-3 text-lg font-medium">{ui.shareHeading}</h3>
      <div className="flex flex-wrap gap-2">
        {canShare && (
          <button type="button" onClick={nativeShare} className={linkClass}>
            {ui.shareNative}
          </button>
        )}

        <button type="button" onClick={copyLink} className={linkClass}>
          {copied ? ui.shareCopied : ui.shareCopy}
        </button>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Facebook
        </a>
        <a
          href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          LinkedIn
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          WhatsApp
        </a>
        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          className={linkClass}
        >
          Email
        </a>
      </div>
    </div>
  );
}
