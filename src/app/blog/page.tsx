import Link from "next/link";
import { getPostsGroupedBySeries } from "@/lib/blog";
import type { SeriesGroup } from "@/lib/blog";
import type { BlogPost } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Spencer Tong",
  description: "Writing on software engineering, product, and books.",
};

const TAG_COLORS: Record<string, string> = {
  "Next.js": "text-purple-500 bg-purple-400/10",
  React: "text-cyan-600 bg-cyan-400/10",
  Architecture: "text-indigo-500 bg-indigo-400/10",
  PostgreSQL: "text-amber-600 bg-amber-400/10",
  Performance: "text-orange-500 bg-orange-400/10",
  Backend: "text-teal-600 bg-teal-400/10",
  Animation: "text-rose-500 bg-rose-400/10",
  UI: "text-pink-500 bg-pink-400/10",
  Product: "text-violet-500 bg-violet-400/10",
  Design: "text-fuchsia-500 bg-fuchsia-400/10",
  Books: "text-amber-600 bg-amber-400/10",
  "Developer Experience": "text-sky-500 bg-sky-400/10",
  "Developer Tools": "text-sky-500 bg-sky-400/10",
  Fintech: "text-emerald-600 bg-emerald-400/10",
  Career: "text-rose-500 bg-rose-400/10",
  "Software Engineering": "text-cyan-600 bg-cyan-400/10",
};

const DEFAULT_TAG = "text-[#9b8d84] bg-[#ddd8d0]";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 py-5 border-b border-[#ddd8d0] last:border-0 hover:bg-[#f0ede8]/50 -mx-4 px-4 rounded-xl transition-colors duration-200"
    >
      {/* Date */}
      <time
        dateTime={post.date}
        className="shrink-0 font-mono text-xs text-[#b8b0a6] pt-0.5 w-24"
      >
        {formatDate(post.date)}
      </time>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display font-semibold text-[#4a3c35] group-hover:text-[#2d2520] transition-colors leading-snug">
            {post.title}
            <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
              →
            </span>
          </h3>
          <span className="shrink-0 font-mono text-xs text-[#b8b0a6] pt-0.5">
            {post.readingTime}
          </span>
        </div>
        <p className="text-[#9b8d84] text-sm mt-1.5 leading-relaxed line-clamp-2">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded-md text-xs font-mono ${TAG_COLORS[tag] ?? DEFAULT_TAG}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function SeriesSection({ group }: { group: SeriesGroup }) {
  const { series, posts } = group;
  return (
    <section>
      {/* Series header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`h-px flex-1 bg-gradient-to-r ${series.from} ${series.to} opacity-30`} />
        <div className="flex flex-col items-end gap-0.5 text-right">
          <span
            className={`font-mono text-xs font-semibold bg-gradient-to-r ${series.from} ${series.to} bg-clip-text text-transparent`}
          >
            {series.title}
          </span>
          <span className="text-[#b8b0a6] text-xs max-w-xs">{series.description}</span>
        </div>
      </div>

      {/* Posts */}
      <div>{posts.map((post) => <PostRow key={post.slug} post={post} />)}</div>
    </section>
  );
}

export default function BlogPage() {
  const groups = getPostsGroupedBySeries();

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#9b8d84] tracking-widest uppercase mb-4">
            Writing
          </p>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight leading-[1.1] mb-4">
            Things I&apos;ve{" "}
            <span className="gradient-text-warm">written</span>
          </h1>
          <p className="text-[#9b8d84] text-lg leading-relaxed max-w-xl">
            Thoughts on engineering, product, and whatever else I&apos;m
            thinking about. Organized by theme, newest first within each group.
          </p>
        </div>

        {/* Series groups */}
        {groups.length === 0 ? (
          <p className="text-[#b8b0a6] text-sm font-mono">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-16">
            {groups.map((group) => (
              <SeriesSection key={group.series.slug} group={group} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
