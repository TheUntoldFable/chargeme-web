import type { Metadata } from "next";
import Link from "next/link";
import { isLanguageCode, type LanguageCode } from "@/i18n/languages";
import { getAllPosts } from "@/content/blog";
import { BLOG_UI } from "@/content/blog/ui";
import BlogIndex from "@/components/blog/BlogIndex";

const siteUrl = "https://chargem3.com";
const PAGE_PATH = (lang: LanguageCode) => `/${lang}/blog`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: LanguageCode = isLanguageCode(rawLang) ? rawLang : "en";
  const ui = BLOG_UI[lang];

  return {
    metadataBase: new URL(siteUrl),
    title: ui.indexTitle,
    description: ui.indexDescription,
    alternates: {
      canonical: PAGE_PATH(lang),
      languages: {
        en: PAGE_PATH("en"),
        bg: PAGE_PATH("bg"),
        "x-default": PAGE_PATH("en"),
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}${PAGE_PATH(lang)}`,
      siteName: "ChargeM3",
      title: ui.indexTitle,
      description: ui.indexDescription,
      images: [{ url: "/chargeme-logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: ui.indexTitle,
      description: ui.indexDescription,
      images: ["/chargeme-logo.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: LanguageCode = isLanguageCode(rawLang) ? rawLang : "en";
  const ui = BLOG_UI[lang];
  const posts = getAllPosts(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}${PAGE_PATH(lang)}#blog`,
    name: ui.indexTitle,
    description: ui.indexDescription,
    inLanguage: lang,
    url: `${siteUrl}${PAGE_PATH(lang)}`,
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "ChargeM3",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/chargeme-logo.png`,
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      inLanguage: lang,
      url: `${siteUrl}/${lang}/blog/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteUrl}/${lang}/blog/${post.slug}`,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-6 text-sm">
          <Link href={`/${lang}`} className="text-yellow-400 hover:underline">
            {ui.backHome}
          </Link>
        </p>

        <h1 className="mb-3 text-3xl font-bold md:text-4xl">
          {ui.indexHeading}
        </h1>
        <p className="mb-10 max-w-2xl leading-relaxed text-gray-400">
          {ui.indexIntro}
        </p>

        <BlogIndex lang={lang} posts={posts} />
      </div>
    </main>
  );
}
