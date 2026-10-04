import type { MetadataRoute } from "next";
import { LANGUAGES } from "@/i18n/languages";
import { getAllPosts } from "@/content/blog";

const siteUrl = "https://chargem3.com";

const alternatesFor = (path: (lang: string) => string) => ({
  languages: Object.fromEntries(
    LANGUAGES.map((l) => [l.code, `${siteUrl}${path(l.code)}`]),
  ),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const home = LANGUAGES.map((l) => ({
    url: `${siteUrl}/${l.code}`,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: alternatesFor((lang) => `/${lang}`),
  }));

  const blogIndex = LANGUAGES.map((l) => ({
    url: `${siteUrl}/${l.code}/blog`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: alternatesFor((lang) => `/${lang}/blog`),
  }));

  const posts = LANGUAGES.flatMap((l) =>
    getAllPosts(l.code).map((post) => ({
      url: `${siteUrl}/${l.code}/blog/${post.slug}`,
      lastModified: post.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: alternatesFor((lang) => `/${lang}/blog/${post.slug}`),
    })),
  );

  return [...home, ...blogIndex, ...posts];
}
