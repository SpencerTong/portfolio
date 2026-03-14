"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ALL_PROJECTS } from "@/lib/projects";
import type { Project } from "@/types";

const DISPLAY_COUNT = 3;

const ACCENTS = [
  { from: "from-[#c47c82]", to: "to-[#a393bf]", glow: "rgba(196,124,130,0.12)" },
  { from: "from-[#d4956a]", to: "to-[#d4736a]", glow: "rgba(212,149,106,0.12)" },
  { from: "from-[#6d9a8a]", to: "to-[#a393bf]", glow: "rgba(109,154,138,0.12)" },
];

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative rounded-2xl bg-[#f0ede8] border border-[#ddd8d0] overflow-hidden flex flex-col hover:border-[#c8c0b6] transition-all duration-300"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${accent.glow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div className={`h-px w-full bg-gradient-to-r ${accent.from} ${accent.to} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex flex-col flex-1 p-6 gap-4">
        <span className="font-mono text-xs text-[#b8b0a6]">{project.year}</span>

        <div>
          <h3 className="font-display font-bold text-lg text-[#2d2520] mb-2 leading-snug">
            {project.title}
          </h3>
          <p className="text-[#9b8d84] text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

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

function PlaceholderCard({ index }: { index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-2xl bg-[#f0ede8] border border-dashed border-[#c8c0b6] overflow-hidden flex flex-col opacity-55"
    >
      <div className={`h-px w-full bg-gradient-to-r ${accent.from} ${accent.to} opacity-25`} />

      <div className="flex flex-col flex-1 p-6 gap-4">
        <span className="font-mono text-xs text-[#c8c0b6]">—</span>

        <div>
          <h3 className="font-display font-bold text-lg text-[#b8b0a6] mb-2 leading-snug">
            Something&apos;s brewing
          </h3>
          <p className="text-[#c8c0b6] text-sm leading-relaxed">
            Another project is in the works. Check back soon.
          </p>
        </div>

        <div className="mt-auto pt-2">
          <span className="inline-flex items-center text-xs font-mono text-[#c8c0b6] px-3 py-1.5 rounded-lg border border-dashed border-[#ddd8d0]">
            Coming soon
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const placeholderCount = Math.max(0, DISPLAY_COUNT - ALL_PROJECTS.length);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="fixed top-1/3 left-0 w-64 h-64 bg-[#c47c82]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-2/3 right-0 w-64 h-64 bg-[#6d9a8a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors mb-8 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            Home
          </Link>
          <p className="font-mono text-xs text-[#9b8d84] tracking-widest uppercase mb-4">Work</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight leading-[1.1] mb-4">
            All <span className="gradient-text">projects</span>
          </h1>
          <p className="text-[#9b8d84] text-lg max-w-xl">
            Things I&apos;ve built — side projects, client work, and open source. More on the way.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <PlaceholderCard key={`placeholder-${i}`} index={ALL_PROJECTS.length + i} />
          ))}
        </div>
      </div>
    </main>
  );
}
