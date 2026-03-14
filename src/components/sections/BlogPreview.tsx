"use client";

import { useRef } from "react";
import { motion, useInView, type Easing } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/types";


const TAG_COLORS: Record<string, string> = {
  "Next.js": "text-purple-500 bg-purple-400/10",
  React: "text-cyan-600 bg-cyan-400/10",
  Architecture: "text-indigo-500 bg-indigo-400/10",
  PostgreSQL: "text-amber-600 bg-amber-400/10",
  Performance: "text-orange-500 bg-orange-400/10",
  Backend: "text-teal-600 bg-teal-400/10",
  Animation: "text-rose-500 bg-rose-400/10",
  UI: "text-pink-500 bg-pink-400/10",
};

const DEFAULT_TAG = "text-[#9b8d84] bg-[#ddd8d0]";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as Easing }}
      className="group flex flex-col gap-4 p-6 rounded-2xl bg-[#f0ede8] border border-[#ddd8d0] hover:border-[#c8c0b6] transition-all duration-300 hover:bg-[#ece9e3]"
    >
      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-[#9b8d84] font-mono">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg text-[#2d2520] leading-snug group-hover:text-[#2d2520] transition-colors">
        {post.title}
        <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
          →
        </span>
      </h3>

      {/* Description */}
      <p className="text-[#9b8d84] text-sm leading-relaxed line-clamp-2">
        {post.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-md text-xs font-mono ${TAG_COLORS[tag] ?? DEFAULT_TAG}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function ComingSoonCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as Easing }}
      className="flex flex-col gap-4 p-8 rounded-2xl bg-[#f0ede8] border border-dashed border-[#c8c0b6]"
    >
      <p className="font-mono text-xs text-[#b8b0a6] tracking-widest uppercase">
        First article
      </p>
      <h3 className="font-display font-bold text-xl text-[#9b8d84] leading-snug">
        Something is being written.
      </h3>
      <p className="text-[#b8b0a6] text-sm leading-relaxed max-w-sm">
        I write about full-stack engineering, systems design, and things I learn
        building products. First piece drops soon.
      </p>
    </motion.div>
  );
}

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="blog" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-64 bg-[#6d9a8a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="font-mono text-xs text-[#9b8d84] tracking-widest uppercase">
                03 / Writing
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as Easing }}
              className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.1]"
            >
              Things I&apos;ve{" "}
              <span className="gradient-text-warm">written</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors group"
            >
              All posts
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Post cards */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <ComingSoonCard />
        )}
      </div>
    </section>
  );
}
