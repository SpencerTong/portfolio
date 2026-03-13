import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost } from "@/types";
import { SERIES_MAP, MISC_SERIES, type SeriesConfig } from "./series";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function slugFromFilename(filename: string) {
  return filename.replace(/\.mdx?$/, "");
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    const slug = slugFromFilename(filename);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ? String(data.date) : "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      series: data.series ?? undefined,
      readingTime: readingTime(content).text,
    } satisfies BlogPost;
  });

  // Sort newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string): (BlogPost & { rawContent: string }) | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? String(data.date) : "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    series: data.series ?? undefined,
    readingTime: readingTime(content).text,
    rawContent: content,
  };
}

export interface SeriesGroup {
  series: SeriesConfig;
  posts: BlogPost[];
}

export function getPostsGroupedBySeries(): SeriesGroup[] {
  const posts = getAllPosts();

  // Group posts: known series first, then misc
  const groups = new Map<string, BlogPost[]>();

  for (const post of posts) {
    const key = post.series && SERIES_MAP[post.series] ? post.series : MISC_SERIES.slug;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(post);
  }

  // Build ordered result: follow SERIES order, skip empty groups
  const result: SeriesGroup[] = [];
  for (const seriesConfig of Object.values(SERIES_MAP)) {
    const seriesPosts = groups.get(seriesConfig.slug);
    if (seriesPosts?.length) {
      result.push({ series: seriesConfig, posts: seriesPosts });
    }
  }

  return result;
}
