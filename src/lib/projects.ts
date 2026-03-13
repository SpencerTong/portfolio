import type { Project } from "@/types";

export const ALL_PROJECTS: Project[] = [
  {
    slug: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description:
      "Real-time analytics platform for tracking user behavior, revenue metrics, and funnel performance. Built for a B2B SaaS startup handling 50k+ daily active users.",
    longDescription:
      "Designed and built the full analytics stack from scratch — from the event ingestion pipeline to the frontend dashboard. The platform processes millions of events per day, aggregates them into time-series metrics, and presents them in a responsive, real-time UI. Integrated Stripe webhooks for revenue tracking and built a custom funnel builder that non-technical stakeholders could use without engineering support.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Recharts", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    image: "",
    featured: true,
    year: 2024,
  },
  {
    slug: "ai-content-tool",
    title: "AI Content Generator",
    description:
      "Full-stack tool that leverages LLMs to generate, edit, and schedule long-form content. Includes a custom rich-text editor and multi-workspace support.",
    longDescription:
      "Built an end-to-end content platform where teams can prompt, refine, and publish long-form articles with LLM assistance. The editor is built on top of Tiptap and supports inline AI suggestions, version history, and collaborative editing. Multi-workspace architecture allows agencies to manage multiple client brands from a single account.",
    techStack: ["React", "Node.js", "OpenAI", "Redis", "Tailwind CSS", "Tiptap"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    image: "",
    featured: true,
    year: 2024,
  },
  {
    slug: "devops-platform",
    title: "Internal DevOps Platform",
    description:
      "Self-hosted deployment platform with GitHub Actions integration, environment management, and one-click rollbacks for a team of 12 engineers.",
    longDescription:
      "Replaced a patchwork of shell scripts and manual Heroku deploys with a unified internal platform. Engineers can trigger deploys, manage environment variables, view build logs, and roll back to any previous release from a single UI. Built a GitHub App integration that posts deploy status directly to PRs.",
    techStack: ["Docker", "Python", "FastAPI", "React", "AWS", "PostgreSQL"],
    githubUrl: "https://github.com",
    image: "",
    featured: true,
    year: 2023,
  },
  {
    slug: "open-source-form-builder",
    title: "Open Source Form Builder",
    description:
      "Drag-and-drop form builder with conditional logic, file uploads, and webhook delivery. 400+ GitHub stars.",
    longDescription:
      "A self-hostable alternative to Typeform and Jotform. Supports complex conditional branching, multi-step flows, file uploads to S3, and webhook delivery to any endpoint. Ships as a single Docker container with a Postgres backend.",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS S3", "Docker"],
    githubUrl: "https://github.com",
    image: "",
    featured: false,
    year: 2023,
  },
  {
    slug: "portfolio-website",
    title: "This Portfolio",
    description:
      "The site you're on. Built with Next.js App Router, Tailwind CSS v4, Framer Motion, and MDX for the blog.",
    longDescription:
      "Designed and built from scratch with a focus on performance and aesthetics. Uses the Next.js App Router, Tailwind CSS v4 with custom design tokens, Framer Motion for scroll-triggered animations, and MDX with a custom series-based blog architecture.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MDX", "Resend"],
    githubUrl: "https://github.com",
    image: "",
    featured: false,
    year: 2024,
  },
  {
    slug: "cli-tool",
    title: "dev — Personal CLI Toolkit",
    description:
      "A collection of shell utilities for spinning up projects, managing dotfiles, and automating repetitive dev tasks.",
    longDescription:
      "A personal CLI built in Python with Click. Includes commands for scaffolding new projects from templates, syncing dotfiles across machines, managing local SSL certs, and running project-specific scripts without remembering their exact paths.",
    techStack: ["Python", "Click", "Shell", "Docker"],
    githubUrl: "https://github.com",
    image: "",
    featured: false,
    year: 2022,
  },
];

export function getFeaturedProjects(): Project[] {
  return ALL_PROJECTS.filter((p) => p.featured);
}

export function getProject(slug: string): Project | null {
  return ALL_PROJECTS.find((p) => p.slug === slug) ?? null;
}

// All unique tech tags across all projects
export function getAllTechTags(): string[] {
  const tags = new Set<string>();
  ALL_PROJECTS.forEach((p) => p.techStack.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
