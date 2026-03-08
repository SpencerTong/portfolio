"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Placeholder slides — swap image paths once you have photos
const slides = [
  {
    id: 0,
    gradient: "from-purple-900/60 via-indigo-900/40 to-cyan-900/60",
    bg: "bg-gradient-to-br from-[#1a0533] via-[#0a0a2e] to-[#001a2e]",
  },
  {
    id: 1,
    gradient: "from-rose-900/60 via-orange-900/40 to-amber-900/60",
    bg: "bg-gradient-to-br from-[#2e0a0a] via-[#1a0e00] to-[#1a1000]",
  },
  {
    id: 2,
    gradient: "from-emerald-900/60 via-teal-900/40 to-cyan-900/60",
    bg: "bg-gradient-to-br from-[#001a0f] via-[#001a1a] to-[#001a2e]",
  },
];

const SLIDE_DURATION = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className={`absolute inset-0 ${slides[current].bg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block font-mono text-xs text-[#71717a] tracking-widest uppercase border border-[#1f1f1f] bg-[#0a0a0a]/60 backdrop-blur-sm px-4 py-2 rounded-full">
            Full Stack Engineer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 leading-[1.05]"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Spencer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I build fast, modern web applications — from polished frontends to
          robust APIs and scalable infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="px-8 py-3.5 rounded-xl font-medium text-sm bg-white text-black hover:bg-white/90 transition-all duration-200 hover:scale-[1.02]"
          >
            View my work
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl font-medium text-sm border border-[#1f1f1f] bg-[#0a0a0a]/60 backdrop-blur-sm text-white hover:border-[#71717a] transition-all duration-200 hover:scale-[1.02]"
          >
            Get in touch
          </Link>
        </motion.div>

        {/* Slide indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 mt-16"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#71717a]"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#71717a] to-transparent"
        />
      </motion.div>
    </section>
  );
}
