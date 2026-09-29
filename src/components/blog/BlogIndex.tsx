"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LanguageCode } from "@/i18n/languages";
import { BLOG_TAGS, type BlogTag, type ResolvedPost } from "@/content/blog/types";
import { TAG_LABELS } from "@/content/blog/tags";
import { BLOG_UI } from "@/content/blog/ui";
import { formatPostDate } from "./formatDate";

type SortKey = "newest" | "oldest" | "title";

export default function BlogIndex({
  lang,
  posts,
}: {
  lang: LanguageCode;
  posts: ResolvedPost[];
}) {
  const ui = BLOG_UI[lang];
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<BlogTag | null>(null);
  const [sort, setSort] = useState<SortKey>("newest");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = posts.filter((post) => {
      if (tag && !post.tags.includes(tag)) return false;
      if (!needle) return true;
      return (
        post.title.toLowerCase().includes(needle) ||
        post.excerpt.toLowerCase().includes(needle) ||
        post.description.toLowerCase().includes(needle)
      );
    });

    const sorted = [...filtered];
    if (sort === "newest") {
      sorted.sort((a, b) => b.datePublished.localeCompare(a.datePublished));
    } else if (sort === "oldest") {
      sorted.sort((a, b) => a.datePublished.localeCompare(b.datePublished));
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title, lang));
    }
    return sorted;
  }, [posts, query, tag, sort, lang]);

  const hasFilters = query.trim() !== "" || tag !== null;

  // Only offer tag chips that actually match at least one post.
  const usedTags = useMemo(
    () => BLOG_TAGS.filter((t) => posts.some((p) => p.tags.includes(t))),
    [posts],
  );

  return (
    <div>
      <div className="relative mb-4">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="6" />
          <path d="m14 14 4 4" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ui.searchPlaceholder}
          aria-label={ui.searchPlaceholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:border-yellow-400/60 focus:outline-none"
        />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setTag(null)}
          aria-pressed={tag === null}
          className={`rounded-full px-4 py-1.5 text-sm transition ${
            tag === null
              ? "bg-yellow-400 font-medium text-black"
              : "border border-white/10 bg-white/5 text-gray-300 hover:border-white/25 hover:text-white"
          }`}
        >
          {ui.allTag}
        </button>

        {usedTags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(tag === t ? null : t)}
            aria-pressed={tag === t}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              tag === t
                ? "bg-yellow-400 font-medium text-black"
                : "border border-white/10 bg-white/5 text-gray-300 hover:border-white/25 hover:text-white"
            }`}
          >
            {TAG_LABELS[t][lang]}
          </button>
        ))}

        <label className="ml-auto flex items-center gap-2 text-sm text-gray-400">
          <span className="sr-only sm:not-sr-only">{ui.sortLabel}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 focus:border-yellow-400/60 focus:outline-none"
          >
            <option value="newest">{ui.sortNewest}</option>
            <option value="oldest">{ui.sortOldest}</option>
            <option value="title">{ui.sortTitle}</option>
          </select>
        </label>
      </div>

      <div className="mb-4 flex items-center gap-3 text-sm text-gray-400">
        <span>{ui.resultCount(visible.length)}</span>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTag(null);
            }}
            className="text-yellow-400 hover:underline"
          >
            {ui.clearFilters}
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 px-5 py-10 text-center text-gray-400">
          {ui.noResults}
        </p>
      ) : (
        <ul className="space-y-3">
          {visible.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="group block rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-yellow-400/40 hover:bg-white/[0.07]"
              >
                <div className="mb-2 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-gray-300"
                    >
                      {TAG_LABELS[t][lang]}
                    </span>
                  ))}
                </div>

                <h2 className="mb-1.5 text-lg font-semibold text-white group-hover:text-yellow-400 md:text-xl">
                  {post.title}
                </h2>

                <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-400">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                  <time dateTime={post.datePublished}>
                    {formatPostDate(post.datePublished, lang)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{ui.readingTime(post.readingMinutes)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
