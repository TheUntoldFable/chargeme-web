import type { LanguageCode } from "@/i18n/languages";
import type { BlogTag } from "./types";

export const TAG_LABELS: Record<BlogTag, Record<LanguageCode, string>> = {
  "getting-started": { en: "Getting Started", bg: "Първи стъпки" },
  pricing: { en: "Cost & Pricing", bg: "Цени и разходи" },
  comparisons: { en: "Comparisons", bg: "Сравнения" },
  design: { en: "Menu Design", bg: "Дизайн на менюто" },
  operations: { en: "Operations", bg: "Операции" },
  customers: { en: "Customer Experience", bg: "Клиентско изживяване" },
  growth: { en: "Growth & Analytics", bg: "Растеж и анализи" },
};
