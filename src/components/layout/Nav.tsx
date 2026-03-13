"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/#about",    label: "About",    section: "about" },
  { href: "/#projects", label: "Projects", section: "projects" },
  { href: "/#blog",     label: "Blog",     section: "blog" },
  { href: "/#contact",  label: "Contact",  section: "contact" },
];

// IDs to watch on the home page
const SECTION_IDS = links.map((l) => l.section).filter(Boolean) as string[];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Section highlighting via IntersectionObserver (home page only)
  useEffect(() => {
    if (!isHome) return;

    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
          // Pick section with highest intersection ratio
          let best: string | null = null;
          let bestRatio = 0;
          visible.forEach((ratio, sid) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sid;
            }
          });
          setActiveSection(best);
        },
        { threshold: [0, 0.2, 0.5, 1], rootMargin: "-60px 0px -40% 0px" },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  function isActive(link: (typeof links)[0]): boolean {
    if (link.section && isHome) return activeSection === link.section;
    if (!link.section) return pathname === link.href || pathname.startsWith(link.href + "/");
    return false;
  }

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof links)[0],
  ) {
    if (!link.section) return;
    // Smooth scroll if already on home
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(link.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#faf9f7]/80 backdrop-blur-md border-b border-[#ddd8d0]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active ? "text-[#2d2520]" : "text-[#9b8d84] hover:text-[#2d2520]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-[#f0ede8] rounded-lg"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden absolute right-6 p-2 text-[#9b8d84] hover:text-[#2d2520] transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#faf9f7]/95 backdrop-blur-md border-b border-[#ddd8d0]"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleAnchorClick(e, link);
                      setMobileOpen(false);
                    }}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link)
                        ? "bg-[#f0ede8] text-[#2d2520]"
                        : "text-[#9b8d84] hover:text-[#2d2520]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
