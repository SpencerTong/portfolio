import fs from "fs";
import path from "path";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";
import { getAllPosts } from "@/lib/blog";

function getHeroImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/hero");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f))
      .map((f) => `/images/hero/${f}`);
  } catch {
    return [];
  }
}

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const heroImages = getHeroImages();

  return (
    <>
      <Hero images={heroImages} />
      <About />
      <FeaturedProjects />
      <BlogPreview posts={recentPosts} />
      <Contact />
    </>
  );
}
