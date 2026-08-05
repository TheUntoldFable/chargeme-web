import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import I18nProvider from "@/i18n/I18nProvider";
import CookieBanner from "@/components/CookieBanner";
import {
  LANGUAGES,
  isLanguageCode,
  type LanguageCode,
} from "@/i18n/languages";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://chargem3.com";

const seo: Record<LanguageCode, { title: string; description: string }> = {
  en: {
    title: "ChargeM3 — QR Digital Menus & Ordering for Restaurants",
    description:
      "ChargeM3 is a QR-powered digital menu and ordering platform for restaurants. Guests scan, browse, order, and pay from their phones — no app required.",
  },
  bg: {
    title: "ChargeM3 — QR дигитални менюта и поръчки за ресторанти",
    description:
      "ChargeM3 е платформа за дигитални менюта и поръчки чрез QR код. Гостите сканират, разглеждат, поръчват и плащат от телефона си — без инсталиране на приложение.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUAGES.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = seo[isLanguageCode(lang) ? lang : "en"];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | ChargeM3",
    },
    description,
    keywords: [
      "QR menu",
      "digital menu",
      "restaurant ordering system",
      "QR code ordering",
      "contactless ordering",
      "restaurant digitalization",
    ],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        bg: "/bg",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${lang}`,
      siteName: "ChargeM3",
      title,
      description,
      images: [{ url: "/chargeme-logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/chargeme-logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "ChargeM3",
      url: siteUrl,
      logo: `${siteUrl}/chargeme-logo.png`,
      description: seo.en.description,
    },
    {
      "@type": "SoftwareApplication",
      name: "ChargeM3",
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: seo.en.description,
      publisher: { "@id": `${siteUrl}/#organization` },
      offers: {
        "@type": "Offer",
        category: "SaaS",
      },
    },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLanguageCode(lang)) {
    notFound();
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5LLL28LJE9"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;

            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });

            gtag('js', new Date());
            gtag('config', 'G-5LLL28LJE9');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider lang={lang}>
          {children}
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
