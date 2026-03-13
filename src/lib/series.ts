export interface SeriesConfig {
  slug: string;
  title: string;
  description: string;
  from: string; // Tailwind gradient-from class
  to: string;   // Tailwind gradient-to class
  textColor: string; // Tailwind text color for label
}

export const SERIES: SeriesConfig[] = [
  {
    slug: "company-spotlights",
    title: "Company Spotlights",
    description:
      "Things I admire about companies I'm excited about — and what I'd change.",
    from: "from-purple-500",
    to: "to-cyan-500",
    textColor: "text-purple-400",
  },
  {
    slug: "book-reviews",
    title: "Book Reviews",
    description:
      "Notes and takeaways from books that shaped how I think about engineering and product.",
    from: "from-amber-500",
    to: "to-rose-500",
    textColor: "text-amber-400",
  },
  {
    slug: "misc",
    title: "Misc",
    description: "Technical deep-dives, opinions, and everything else.",
    from: "from-cyan-500",
    to: "to-teal-500",
    textColor: "text-cyan-400",
  },
];

export const SERIES_MAP = Object.fromEntries(SERIES.map((s) => [s.slug, s]));

// Posts without a series (or with an unknown series) land here
export const MISC_SERIES: SeriesConfig = SERIES.find((s) => s.slug === "misc")!;
