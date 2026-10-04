import type { LanguageCode } from "@/i18n/languages";

export type BlogUiStrings = {
  indexTitle: string;
  indexDescription: string;
  indexHeading: string;
  indexIntro: string;
  searchPlaceholder: string;
  allTag: string;
  sortLabel: string;
  sortNewest: string;
  sortOldest: string;
  sortTitle: string;
  resultCount: (n: number) => string;
  noResults: string;
  clearFilters: string;
  readingTime: (n: number) => string;
  readArticle: string;
  backToBlog: string;
  backHome: string;
  faqHeading: string;
  shareHeading: string;
  shareCopy: string;
  shareCopied: string;
  shareNative: string;
  ctaHeading: string;
  ctaText: string;
  ctaDemo: string;
  ctaPricing: string;
  contactHeading: string;
  otherLanguageLabel: string;
  otherLanguageName: string;
  relatedHeading: string;
  publishedOn: string;
};

export const BLOG_UI: Record<LanguageCode, BlogUiStrings> = {
  en: {
    indexTitle: "Blog — Digital Menus for Restaurants",
    indexDescription:
      "Practical guides on QR digital menus, menu design, pricing, and restaurant operations — answering the questions restaurant owners actually ask.",
    indexHeading: "The ChargeM3 Blog",
    indexIntro:
      "Practical answers to the questions restaurant owners actually ask about digital menus, QR codes, menu design, and running a modern restaurant.",
    searchPlaceholder: "Search articles...",
    allTag: "All",
    sortLabel: "Sort",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    sortTitle: "Title A–Z",
    resultCount: (n) => (n === 1 ? "1 article" : `${n} articles`),
    noResults: "No articles match your search.",
    clearFilters: "Clear filters",
    readingTime: (n) => `${n} min read`,
    readArticle: "Read article",
    backToBlog: "Back to blog",
    backHome: "Back to homepage",
    faqHeading: "Frequently Asked Questions",
    shareHeading: "Share this article",
    shareCopy: "Copy link",
    shareCopied: "Link copied",
    shareNative: "Share",
    ctaHeading: "Ready to modernize your restaurant?",
    ctaText:
      "See a live demo of the menu experience or check the full pricing details.",
    ctaDemo: "View Demo",
    ctaPricing: "See Pricing",
    contactHeading: "Questions? Get in touch",
    otherLanguageLabel: "Read this article in",
    otherLanguageName: "Bulgarian",
    relatedHeading: "Related articles",
    publishedOn: "Published",
  },
  bg: {
    indexTitle: "Блог — Дигитални менюта за ресторанти",
    indexDescription:
      "Практични ръководства за дигитални менюта с QR код, дизайн на менюта, цени и ресторантски операции — отговори на въпросите, които собствениците наистина задават.",
    indexHeading: "Блогът на ChargeM3",
    indexIntro:
      "Практични отговори на въпросите, които собствениците на ресторанти наистина задават за дигиталните менюта, QR кодовете, дизайна на менюто и управлението на модерен ресторант.",
    searchPlaceholder: "Търсене в статиите...",
    allTag: "Всички",
    sortLabel: "Подреждане",
    sortNewest: "Най-нови",
    sortOldest: "Най-стари",
    sortTitle: "Заглавие А–Я",
    resultCount: (n) => (n === 1 ? "1 статия" : `${n} статии`),
    noResults: "Няма статии, отговарящи на търсенето.",
    clearFilters: "Изчисти филтрите",
    readingTime: (n) => `${n} мин. четене`,
    readArticle: "Прочети статията",
    backToBlog: "Обратно към блога",
    backHome: "Обратно към началната страница",
    faqHeading: "Често задавани въпроси",
    shareHeading: "Сподели тази статия",
    shareCopy: "Копирай връзката",
    shareCopied: "Връзката е копирана",
    shareNative: "Сподели",
    ctaHeading: "Готови ли сте да модернизирате своя ресторант?",
    ctaText:
      "Разгледайте демо на изживяването с менюто или проверете пълните детайли за цените.",
    ctaDemo: "Вижте демо",
    ctaPricing: "Вижте цените",
    contactHeading: "Въпроси? Свържете се с нас",
    otherLanguageLabel: "Прочетете тази статия на",
    otherLanguageName: "английски",
    relatedHeading: "Свързани статии",
    publishedOn: "Публикувано",
  },
};
