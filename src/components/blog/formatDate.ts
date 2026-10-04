import type { LanguageCode } from "@/i18n/languages";

const EN_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Formatted without Intl so server-rendered and hydrated output always match,
// regardless of the ICU data available in each environment.
export function formatPostDate(iso: string, lang: LanguageCode): string {
  const [year, month, day] = iso.split("-");
  if (lang === "bg") return `${day}.${month}.${year}`;
  return `${EN_MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}
