import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLanguageCode, type LanguageCode } from "@/i18n/languages";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/content/blog";
import { BLOG_UI } from "@/content/blog/ui";
import { TAG_LABELS } from "@/content/blog/tags";
import { formatPostDate } from "@/components/blog/formatDate";
import ShareButtons from "@/components/blog/ShareButtons";

const siteUrl = "https://chargem3.com";
const PAGE_PATH = (lang: LanguageCode, slug: string) =>
  `/${lang}/blog/${slug}`;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang: LanguageCode = isLanguageCode(rawLang) ? rawLang : "en";
  const post = getPostBySlug(slug, lang);
  if (!post) return {};

  return {
    metadataBase: new URL(siteUrl),
    title: post.title,
    description: post.description,
    alternates: {
      canonical: PAGE_PATH(lang, slug),
      languages: {
        en: PAGE_PATH("en", slug),
        bg: PAGE_PATH("bg", slug),
        "x-default": PAGE_PATH("en", slug),
      },
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}${PAGE_PATH(lang, slug)}`,
      siteName: "ChargeM3",
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [{ url: "/chargeme-logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/chargeme-logo.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang: LanguageCode = isLanguageCode(rawLang) ? rawLang : "en";
  const post = getPostBySlug(slug, lang);
  if (!post) notFound();

  const otherLang: LanguageCode = lang === "en" ? "bg" : "en";
  const ui = BLOG_UI[lang];
  const related = getRelatedPosts(slug, lang);
  const canonicalUrl = `${siteUrl}${PAGE_PATH(lang, slug)}`;

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
        headline: post.title,
        description: post.description,
        inLanguage: lang,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        keywords: post.tags.map((t) => TAG_LABELS[t][lang]).join(", "),
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        image: `${siteUrl}/chargeme-logo.png`,
        url: canonicalUrl,
        author: organization,
        publisher: organization,
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ChargeM3",
            item: `${siteUrl}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: ui.indexHeading,
            item: `${siteUrl}/${lang}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-6 text-sm">
          <Link
            href={`/${lang}/blog`}
            className="text-yellow-400 hover:underline"
          >
            {ui.backToBlog}
          </Link>
        </p>

        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-gray-300"
            >
              {TAG_LABELS[t][lang]}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>

        <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          <time dateTime={post.datePublished}>
            {ui.publishedOn} {formatPostDate(post.datePublished, lang)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{ui.readingTime(post.readingMinutes)}</span>
        </div>

        {post.intro.map((paragraph, i) => (
          <p key={i} className="mb-4 leading-relaxed text-gray-300">
            {paragraph}
          </p>
        ))}

        {post.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">{section.heading}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed text-gray-300">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">{ui.faqHeading}</h2>
          <div className="space-y-6">
            {post.faq.map((entry) => (
              <div key={entry.question}>
                <h3 className="mb-1 text-lg font-medium text-yellow-400">
                  {entry.question}
                </h3>
                <p className="leading-relaxed text-gray-300">{entry.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-white/10 pt-8">
          <ShareButtons url={canonicalUrl} title={post.title} lang={lang} />
        </section>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="mb-3 text-2xl font-semibold">{ui.ctaHeading}</h2>
          <p className="mb-4 leading-relaxed text-gray-300">{ui.ctaText}</p>
          <div className="mb-6 flex flex-wrap gap-4">
            <Link
              href={`/${lang}#demo`}
              className="inline-block rounded bg-yellow-400 px-5 py-2 font-semibold text-black transition hover:bg-yellow-300"
            >
              {ui.ctaDemo}
            </Link>
            <Link
              href={`/${lang}#pricing`}
              className="inline-block rounded border border-yellow-400 px-5 py-2 font-semibold text-yellow-400 transition hover:bg-yellow-400/10"
            >
              {ui.ctaPricing}
            </Link>
          </div>

          <h3 className="mb-2 text-lg font-medium">{ui.contactHeading}</h3>
          <p className="leading-relaxed text-gray-300">
            <a
              href="mailto:chargem3info@gmail.com"
              className="transition hover:text-yellow-400"
            >
              chargem3info@gmail.com
            </a>
            {" · "}
            <a
              href="tel:+359884011730"
              className="transition hover:text-yellow-400"
            >
              +359 88 401 1730
            </a>
            {" · Sofia, Bulgaria"}
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="mb-4 text-2xl font-semibold">{ui.relatedHeading}</h2>
            <ul className="space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${lang}/blog/${item.slug}`}
                    className="group block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-yellow-400/40"
                  >
                    <span className="block font-medium text-white group-hover:text-yellow-400">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-gray-400">
                      {item.excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 text-sm text-gray-400">
          {ui.otherLanguageLabel}{" "}
          <Link
            href={PAGE_PATH(otherLang, slug)}
            className="text-yellow-400 hover:underline"
          >
            {ui.otherLanguageName}
          </Link>
        </p>
      </article>
    </main>
  );
}
