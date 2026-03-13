import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_PROJECTS, getProject } from "@/lib/projects";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Spencer Tong`,
    description: project.description,
  };
}

const ACCENTS = [
  { from: "from-[#c47c82]", to: "to-[#a393bf]", glow: "rgba(196,124,130,0.12)" },
  { from: "from-[#d4956a]", to: "to-[#d4736a]", glow: "rgba(212,149,106,0.12)" },
  { from: "from-[#6d9a8a]", to: "to-[#a393bf]", glow: "rgba(109,154,138,0.12)" },
  { from: "from-[#d4736a]", to: "to-[#d4969b]", glow: "rgba(212,115,106,0.12)" },
  { from: "from-[#a393bf]", to: "to-[#c47c82]", glow: "rgba(163,147,191,0.12)" },
  { from: "from-[#6d9a8a]", to: "to-[#7fb8a8]", glow: "rgba(109,154,138,0.12)" },
];

function accentFor(slug: string) {
  const idx = [...slug].reduce((acc, c) => acc + c.charCodeAt(0), 0) % ACCENTS.length;
  return ACCENTS[idx];
}

function ExternalLinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const accent = accentFor(slug);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors mb-12 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
          All projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#b8b0a6]">{project.year}</span>
            {project.featured && (
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${accent.from} ${accent.to} text-white`}>
                Featured
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.15] mb-6">
            {project.title}
          </h1>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r ${accent.from} ${accent.to} text-white hover:opacity-90 transition-opacity`}
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[#ddd8d0] text-[#6b5d54] hover:text-[#2d2520] hover:border-[#b8b0a6] transition-colors"
              >
                <GitHubIcon />
                Source code
              </a>
            )}
          </div>
        </div>

        {/* Gradient divider */}
        <div className={`h-px w-full bg-gradient-to-r ${accent.from} ${accent.to} opacity-30 mb-10`} />

        {/* Description */}
        <div className="mb-10">
          <p className="text-[#6b5d54] text-lg leading-relaxed">
            {project.longDescription ?? project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div>
          <h2 className="font-mono text-xs text-[#9b8d84] uppercase tracking-widest mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-sm font-mono text-[#6b5d54] bg-[#f0ede8] border border-[#ddd8d0]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#ddd8d0] flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#9b8d84] hover:text-[#2d2520] transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            All projects
          </Link>
        </div>
      </div>
    </main>
  );
}
