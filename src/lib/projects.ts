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
