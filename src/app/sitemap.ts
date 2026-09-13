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
    {
      url: "https://chargem3.com/en/blog/what-is-a-qr-digital-menu",
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          en: "https://chargem3.com/en/blog/what-is-a-qr-digital-menu",
          bg: "https://chargem3.com/bg/blog/what-is-a-qr-digital-menu",
        },
      },
    },
    {
      url: "https://chargem3.com/bg/blog/what-is-a-qr-digital-menu",
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          en: "https://chargem3.com/en/blog/what-is-a-qr-digital-menu",
          bg: "https://chargem3.com/bg/blog/what-is-a-qr-digital-menu",
        },
      },
    },
  ];
}
