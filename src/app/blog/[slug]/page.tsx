import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { SERIES_MAP } from "@/lib/series";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Spencer Tong`,
    description: post.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const series = post.series ? SERIES_MAP[post.series] : null;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors mb-12 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
          All posts
        </Link>

        {/* Series badge */}
        {series && (
          <div className="mb-4">
            <span
              className={`font-mono text-xs font-semibold bg-gradient-to-r ${series.from} ${series.to} bg-clip-text text-transparent`}
            >
              {series.title}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.15] mb-6">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <time dateTime={post.date} className="font-mono text-xs text-[#9b8d84]">
            {formatDate(post.date)}
          </time>
          <span className="text-[#ddd8d0]">·</span>
          <span className="font-mono text-xs text-[#9b8d84]">{post.readingTime}</span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded-md text-xs font-mono ${TAG_COLORS[tag] ?? DEFAULT_TAG}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-[#ddd8d0] mb-10" />

        {/* MDX content */}
        <article className="prose-custom">
          <MDXRemote source={post.rawContent} />
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#ddd8d0]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}
