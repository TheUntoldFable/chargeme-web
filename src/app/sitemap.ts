import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://chargem3.com/en",
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://chargem3.com/en",
          bg: "https://chargem3.com/bg",
        },
      },
    },
    {
      url: "https://chargem3.com/bg",
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://chargem3.com/en",
          bg: "https://chargem3.com/bg",
        },
      },
    },
  ];
}
