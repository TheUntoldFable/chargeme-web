import type { Metadata } from "next";
import Link from "next/link";
import { isLanguageCode, type LanguageCode } from "@/i18n/languages";

const siteUrl = "https://chargem3.com";
const SLUG = "what-is-a-qr-digital-menu";
const PAGE_PATH = (lang: LanguageCode) => `/${lang}/blog/${SLUG}`;
const DATE_PUBLISHED = "2026-09-10"; // fixed ISO date, do not derive from Date.now()

type BlogSection = { heading: string; paragraphs: string[] };
type FaqEntry = { question: string; answer: string };

type BlogContent = {
  title: string;
  description: string;
  intro: string[];
  sections: BlogSection[];
  faqHeading: string;
  faq: FaqEntry[];
  ctaHeading: string;
  ctaText: string;
  ctaDemo: string;
  ctaPricing: string;
  backHome: string;
  otherLanguageLabel: string;
  otherLanguageName: string;
  contactHeading: string;
};

const content: Record<LanguageCode, BlogContent> = {
  en: {
    title: "What Is a QR Digital Menu? A Guide for Restaurants",
    description:
      "A plain-language guide to QR digital menus: how they work, what features to expect, typical pricing, and who they're for.",
    intro: [
      "A QR digital menu replaces printed menus with a webpage guests open by scanning a QR code at their table. There's no app to install — the menu, and often ordering and payment, run directly in the guest's phone browser.",
      "ChargeM3 is a QR-powered digital menu and ordering platform for restaurants. Guests scan, browse, order, and pay from their phones, and the restaurant manages everything from one dashboard.",
    ],
    sections: [
      {
        heading: "How a QR digital menu works",
        paragraphs: [
          "The experience is built around three steps. First, the customer scans the QR code placed on their table using their smartphone camera — no app download required.",
          "Second, a digital menu opens instantly on their device, showing items, descriptions, and prices in a mobile-friendly layout.",
          "Third, the customer can view items, see prices, and place an order directly from their phone, without waiting to flag down staff.",
        ],
      },
      {
        heading: "Key features to expect",
        paragraphs: [
          "A digital menu platform typically covers more than just showing a menu on a screen. On ChargeM3 that includes: QR code integration so customers can instantly access the menu, a mobile-optimized layout that works well on any screen, and easy menu updates — adding, editing, or removing items in minutes without app-store resubmits.",
          "It also includes an analytics dashboard for order trends and best-sellers, real-time availability so items can be marked sold-out instantly, contactless ordering that reduces physical contact, custom branding to match colors, fonts, and logos, and multi-language support so guests can be served in their own language.",
        ],
      },
      {
        heading: "Typical pricing",
        paragraphs: [
          "ChargeM3 offers one all-in-one plan: €50 per month before VAT, with the first month completely free and no installation fee.",
          "The plan includes an unlimited number of connected workstations, a mobile app for monitoring and statistics, a mobile app for taking orders on the go, automatic cloud backup and database storage, automatic updates to the latest version, 24/7 support, staff training, guidance for setting up the product catalog, and remote access.",
          "Restaurants that sign a 2-year contract get a 15% discount on the monthly price.",
        ],
      },
      {
        heading: "Who a QR digital menu is for",
        paragraphs: [
          "A QR digital menu is for restaurants that want to modernize their menu experience — replacing paper menus with something guests can browse and order from on their own phones.",
          "It suits any restaurant that wants a single, all-in-one system to run and grow the business, rather than juggling separate printed menus, ordering, and reporting tools.",
        ],
      },
    ],
    faqHeading: "Frequently Asked Questions",
    faq: [
      {
        question: "How much does it cost?",
        answer:
          "€50 per month (before VAT), with no installation fee. Your first month is completely free and no credit card is required to get started.",
      },
      {
        question: "Is there really a free trial?",
        answer:
          "Yes — your first month is on us, so you can test everything risk-free. No card required, and you can cancel anytime.",
      },
      {
        question: "Do my customers need to download an app?",
        answer:
          "No. Guests scan the QR code on their table and browse, order, and pay straight from their phone's browser — no app required.",
      },
      {
        question: "Is my data safe and backed up?",
        answer:
          "Yes. Your database is automatically backed up and stored in the cloud, so your menu, orders, and statistics are always protected.",
      },
      {
        question: "Can I manage my restaurant remotely?",
        answer:
          "Yes. With remote access and our mobile apps you can monitor sales and statistics — and even take orders — from your phone, wherever you are.",
      },
    ],
    ctaHeading: "Ready to modernize your restaurant?",
    ctaText:
      "See a live demo of the menu experience or check the full pricing details.",
    ctaDemo: "View Demo",
    ctaPricing: "See Pricing",
    backHome: "Back to homepage",
    otherLanguageLabel: "Read this article in",
    otherLanguageName: "Bulgarian",
    contactHeading: "Questions? Get in touch",
  },
  bg: {
    title: "Какво е дигитално меню с QR код? Ръководство за ресторанти",
    description:
      "Разбираемо ръководство за дигиталните менюта с QR код: как работят, какви функции да очаквате, типично ценообразуване и за кого са подходящи.",
    intro: [
      "Дигиталното меню с QR код заменя печатните менюта с уеб страница, която гостите отварят, сканирайки QR код на масата си. Не се налага инсталиране на приложение — менюто, а често и поръчването и плащането, се извършват директно в браузъра на телефона на госта.",
      "ChargeM3 е платформа за дигитални менюта и поръчки чрез QR код за ресторанти. Гостите сканират, разглеждат, поръчват и плащат от телефоните си, а ресторантът управлява всичко от едно табло.",
    ],
    sections: [
      {
        heading: "Как работи дигиталното меню с QR код",
        paragraphs: [
          "Изживяването се изгражда около три стъпки. Първо, клиентът сканира QR кода на масата си с камерата на смартфона си — без нужда от изтегляне на приложение.",
          "Второ, дигитално меню се отваря мигновено на устройството му, показвайки артикули, описания и цени в удобен за мобилни устройства изглед.",
          "Трето, клиентът може да разглежда артикулите, да вижда цените и да прави поръчка директно от телефона си, без да чака да привлече вниманието на персонала.",
        ],
      },
      {
        heading: "Основни функции, които да очаквате",
        paragraphs: [
          "Платформата за дигитално меню обикновено включва повече от просто показване на меню на екран. При ChargeM3 това включва: интеграция с QR код, за да отворят клиентите менюто мигновено, оптимизиран за мобилни устройства изглед, който работи добре на всеки екран, и лесни промени в менюто — добавяне, редактиране или премахване на артикули за минути, без повторно одобрение в магазина за приложения.",
          "Включва още табло с анализи за тенденциите в поръчките и най-продаваните артикули, наличност в реално време, така че артикулите могат да бъдат маркирани като изчерпани мигновено, безконтактно поръчване, което намалява физическия контакт, персонализиран бранд с цветове, шрифтове и лога, и поддръжка на много езици, така че гостите да бъдат обслужвани на своя език.",
        ],
      },
      {
        heading: "Типично ценообразуване",
        paragraphs: [
          "ChargeM3 предлага един всеобхватен план: 50 евро на месец без ДДС, като първият месец е напълно безплатен и без такса за инсталация.",
          "Планът включва неограничен брой свързани работни станции, мобилно приложение за наблюдение и статистика, мобилно приложение за приемане на поръчки в движение, автоматичен облачен бекъп и съхранение на база данни, автоматични обновявания до най-новата версия, поддръжка 24/7, обучение на персонала, помощ при настройка на продуктовия каталог и отдалечен достъп.",
          "Ресторанти, които сключат 2-годишен договор, получават 15% отстъпка от месечната цена.",
        ],
      },
      {
        heading: "За кого е дигиталното меню с QR код",
        paragraphs: [
          "Дигиталното меню с QR код е за ресторанти, които искат да модернизират менюто си — заменяйки хартиените менюта с нещо, което гостите могат да разглеждат и от което да поръчват от собствените си телефони.",
          "Подходящо е за всеки ресторант, който иска една всеобхватна система, за да управлява и развива бизнеса си, вместо да жонглира с отделни печатни менюта, поръчки и инструменти за отчитане.",
        ],
      },
    ],
    faqHeading: "Често задавани въпроси",
    faq: [
      {
        question: "Колко струва?",
        answer:
          "50 евро на месец (без ДДС), без такса за инсталация. Първият месец е напълно безплатен и не е необходима кредитна карта, за да започнете.",
      },
      {
        question: "Наистина ли има безплатен пробен период?",
        answer:
          "Да — първият месец е от нас, за да изпробвате всичко без риск. Не е нужна карта и можете да се откажете по всяко време.",
      },
      {
        question: "Трябва ли клиентите ми да свалят приложение?",
        answer:
          "Не. Гостите сканират QR кода на масата си и разглеждат, поръчват и плащат директно от браузъра на телефона — без нужда от приложение.",
      },
      {
        question: "Данните ми защитени ли са и архивирани ли са?",
        answer:
          "Да. Базата ви данни се архивира автоматично и се съхранява в облака, така че менюто, поръчките и статистиката ви са винаги защитени.",
      },
      {
        question: "Мога ли да управлявам ресторанта си дистанционно?",
        answer:
          "Да. С отдалечен достъп и нашите мобилни приложения можете да следите продажбите и статистиката — и дори да приемате поръчки — от телефона си, където и да сте.",
      },
    ],
    ctaHeading: "Готови ли сте да модернизирате своя ресторант?",
    ctaText:
      "Разгледайте демо на изживяването с менюто или проверете пълните детайли за цените.",
    ctaDemo: "Вижте демо",
    ctaPricing: "Вижте цените",
    backHome: "Обратно към началната страница",
    otherLanguageLabel: "Прочетете тази статия на",
    otherLanguageName: "английски",
    contactHeading: "Въпроси? Свържете се с нас",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: LanguageCode = isLanguageCode(rawLang) ? rawLang : "en";
  const { title, description } = content[lang];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: PAGE_PATH(lang),
      languages: {
        en: PAGE_PATH("en"),
        bg: PAGE_PATH("bg"),
        "x-default": PAGE_PATH("en"),
      },
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}${PAGE_PATH(lang)}`,
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

export default async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: LanguageCode = isLanguageCode(rawLang) ? rawLang : "en";
  const otherLang: LanguageCode = lang === "en" ? "bg" : "en";
  const c = content[lang];

  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "ChargeM3",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/chargeme-logo.png`,
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: c.title,
        description: c.description,
        inLanguage: lang,
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_PUBLISHED,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}${PAGE_PATH(lang)}`,
        },
        image: `${siteUrl}/chargeme-logo.png`,
        url: `${siteUrl}${PAGE_PATH(lang)}`,
        author: organization,
        publisher: organization,
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-sm mb-6">
          <Link href={`/${lang}`} className="text-yellow-400 hover:underline">
            {c.backHome}
          </Link>
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">{c.title}</h1>

        {c.intro.map((paragraph, i) => (
          <p key={i} className="text-gray-300 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}

        {c.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">{c.faqHeading}</h2>
          <div className="space-y-6">
            {c.faq.map((entry) => (
              <div key={entry.question}>
                <h3 className="text-lg font-medium text-yellow-400 mb-1">
                  {entry.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">{entry.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-semibold mb-3">{c.ctaHeading}</h2>
          <p className="text-gray-300 leading-relaxed mb-4">{c.ctaText}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <Link
              href={`/${lang}#demo`}
              className="inline-block bg-yellow-400 text-black font-semibold px-5 py-2 rounded hover:bg-yellow-300 transition"
            >
              {c.ctaDemo}
            </Link>
            <Link
              href={`/${lang}#pricing`}
              className="inline-block border border-yellow-400 text-yellow-400 font-semibold px-5 py-2 rounded hover:bg-yellow-400/10 transition"
            >
              {c.ctaPricing}
            </Link>
          </div>

          <h3 className="text-lg font-medium mb-2">{c.contactHeading}</h3>
          <p className="text-gray-300 leading-relaxed">
            <a
              href="mailto:chargem3info@gmail.com"
              className="hover:text-yellow-400 transition"
            >
              chargem3info@gmail.com
            </a>
            {" · "}
            <a
              href="tel:+359884011730"
              className="hover:text-yellow-400 transition"
            >
              +359 88 401 1730
            </a>
            {" · Sofia, Bulgaria"}
          </p>
        </section>

        <p className="mt-10 text-sm text-gray-400">
          {c.otherLanguageLabel}{" "}
          <Link
            href={PAGE_PATH(otherLang)}
            className="text-yellow-400 hover:underline"
          >
            {c.otherLanguageName}
          </Link>
        </p>
      </article>
    </main>
  );
}
