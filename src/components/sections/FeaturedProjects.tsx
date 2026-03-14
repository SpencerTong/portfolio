"use client";

import { useRef } from "react";
import { motion, useInView, type Easing } from "framer-motion";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import type { Project } from "@/types";

const FEATURED = getFeaturedProjects();

// Per-project accent colors
const ACCENTS = [
  { from: "from-[#c47c82]", to: "to-[#a393bf]", glow: "rgba(196,124,130,0.15)" },
  { from: "from-[#d4956a]", to: "to-[#d4736a]", glow: "rgba(212,149,106,0.15)" },
  { from: "from-[#6d9a8a]", to: "to-[#a393bf]", glow: "rgba(109,154,138,0.15)" },
];

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const PLACEHOLDER_COUNT = 3;

function PlaceholderProjectCard({ accent, index }: { accent: typeof ACCENTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as Easing }}
      className="group relative rounded-2xl bg-[#f0ede8] border border-dashed border-[#c8c0b6] overflow-hidden flex flex-col opacity-60"
    >
      {/* Top gradient bar */}
      <div className={`h-px w-full bg-gradient-to-r ${accent.from} ${accent.to} opacity-30`} />

      {/* Placeholder image area */}
      <div className={`relative h-48 bg-gradient-to-br ${accent.from}/5 ${accent.to}/5 flex items-center justify-center overflow-hidden`}>
        <div className="flex flex-col items-center gap-2 text-center px-4">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${accent.from}/20 ${accent.to}/20 flex items-center justify-center`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#b8b0a6]">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-display font-bold text-xl text-[#9b8d84]">
              Something&apos;s brewing
            </h3>
          </div>
          <p className="text-[#b8b0a6] text-sm leading-relaxed">
            Another project is in the works. Check back soon.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["???", "???", "???"].map((t, i) => (
            <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono text-[#c8c0b6] bg-[#faf9f7] border border-[#e8e3dc]">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#b8b0a6] px-3 py-1.5 rounded-lg border border-dashed border-[#ddd8d0]">
            Coming soon
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, accent, index }: { project: Project; accent: typeof ACCENTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as Easing }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl bg-[#f0ede8] border border-[#ddd8d0] overflow-hidden flex flex-col transition-shadow duration-300"
      style={{ boxShadow: `0 0 0 0 ${accent.glow}` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${accent.glow}`;
        (e.currentTarget as HTMLDivElement).style.borderColor = "#c8c0b6";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${accent.glow}`;
        (e.currentTarget as HTMLDivElement).style.borderColor = "#ddd8d0";
      }}
    >
      {/* Top gradient bar */}
      <div className={`h-px w-full bg-gradient-to-r ${accent.from} ${accent.to} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Placeholder image area */}
      <div className={`relative h-48 bg-gradient-to-br ${accent.from}/10 ${accent.to}/10 flex items-center justify-center overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.from}/5 ${accent.to}/5`} />
        <span className="font-mono text-xs text-[#b8b0a6] select-none">{project.year}</span>
        {/* Corner decoration */}
        <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${accent.from}/20 ${accent.to}/20 rounded-tl-full blur-2xl`} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="font-display font-bold text-xl text-[#2d2520] mb-2 group-hover:text-[#2d2520] transition-colors">
            {project.title}
          </h3>
          <p className="text-[#9b8d84] text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-mono text-[#6b5d54] bg-[#faf9f7] border border-[#ddd8d0]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-2 flex-wrap">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#ddd8d0] text-[#6b5d54] hover:text-[#2d2520] hover:border-[#b8b0a6] transition-colors"
          >
            View details →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-gradient-to-r ${accent.from} ${accent.to} text-white hover:opacity-90 transition-opacity`}
            >
              <ExternalLinkIcon />
              Live site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#ddd8d0] text-[#6b5d54] hover:text-[#2d2520] hover:border-[#b8b0a6] transition-colors"
            >
              <GitHubIcon />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#6d9a8a]/6 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#c47c82]/6 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

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
                02 / Work
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as Easing }}
              className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.1]"
            >
              Featured{" "}
              <span className="gradient-text">projects</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/projects"
              className="flex items-center gap-2 text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors group"
            >
              View all projects
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              accent={ACCENTS[i % ACCENTS.length]}
              index={i}
            />
          ))}
          {Array.from({ length: Math.max(0, PLACEHOLDER_COUNT - FEATURED.length) }).map((_, i) => (
            <PlaceholderProjectCard
              key={`placeholder-${i}`}
              accent={ACCENTS[(FEATURED.length + i) % ACCENTS.length]}
              index={FEATURED.length + i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
