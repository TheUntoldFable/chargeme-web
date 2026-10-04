import type { LanguageCode } from "@/i18n/languages";

export const BLOG_TAGS = [
  "getting-started",
  "pricing",
  "comparisons",
  "design",
  "operations",
  "customers",
  "growth",
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];

export type BlogSection = { heading: string; paragraphs: string[] };

export type FaqEntry = { question: string; answer: string };

export type BlogPostContent = {
  title: string;
  description: string;
  excerpt: string;
  intro: string[];
  sections: BlogSection[];
  faq: FaqEntry[];
};

export type BlogPost = {
  slug: string;
  tags: BlogTag[];
  datePublished: string;
  dateModified?: string;
  content: Record<LanguageCode, BlogPostContent>;
};

/** Post plus per-locale fields resolved for rendering and filtering. */
export type ResolvedPost = {
  slug: string;
  tags: BlogTag[];
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
} & BlogPostContent;
