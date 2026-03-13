"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Anchors moved inward — closer to center but still clear of the headline
const ANCHORS = [
  { xf: 0.17, yf: 0.23 }, // top-left
  { xf: 0.86, yf: 0.32 }, // top-right
  { xf: 0.17, yf: 0.75 }, // bottom-left
  { xf: 0.86, yf: 0.75 }, // bottom-right
];

const FADE_S = 1.1;     // animation duration for both fade-out and fade-in
const HOLD_MIN = 7000;
const HOLD_MAX = 12000;

const FLOAT_Y = [10, 8, 12, 9];
const FLOAT_DUR = [5.2, 6.1, 4.8, 6.6];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pickImage(pool: string[], exclude: Set<string>): string {
  const avail = pool.filter((s) => !exclude.has(s));
  const list = avail.length > 0 ? avail : pool;
  return list[Math.floor(Math.random() * list.length)];
}

// True two-layer crossfade: both layers have explicit opacity so old fades OUT
// while new fades IN simultaneously — no sudden snap.
interface Layer {
  src: string;
  opacity: number; // 0 or 1
}

interface Slot {
  id: number;
  left: number;
  top: number;
  width: number;
  rotation: number;
  ready: boolean;
  a: Layer;
  b: Layer;
  active: "a" | "b"; // which layer is currently the "foreground"
}

export default function Hero({ images }: { images: string[] }) {
  const hasImages = images.length > 0;

  const [slots, setSlots] = useState<Slot[]>(() =>
    Array.from({ length: ANCHORS.length }, (_, i) => ({
      id: i,
      left: 0,
      top: 0,
      width: 210,
      rotation: 0,
      ready: false,
      a: { src: "", opacity: 1 },
      b: { src: "", opacity: 0 },
      active: "a" as const,
    }))
  );

  const imagesRef = useRef(images);
  const mountedRef = useRef(false);
  const inUse = useRef(new Set<string>());

  useEffect(() => {
    if (!hasImages) return;
    mountedRef.current = true;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Compute stable positions and pick first images
    const init: Slot[] = ANCHORS.map((anchor, i) => {
      const width = rand(185, 220);
      const hw = width / 2;
      const hh = (width * 1.45) / 2;
      const left = Math.max(
        hw,
        Math.min(vw - hw, anchor.xf * vw + rand(-vw * 0.025, vw * 0.025))
      );
      const top = Math.max(
        hh,
        Math.min(vh - hh, anchor.yf * vh + rand(-vh * 0.025, vh * 0.025))
      );
      const src = pickImage(imagesRef.current, inUse.current);
      inUse.current.add(src);
      return {
        id: i,
        left,
        top,
        width,
        rotation: rand(-9, 9),
        ready: true,
        a: { src, opacity: 1 },
        b: { src: "", opacity: 0 },
        active: "a" as const,
      };
    });

    setSlots(init);

    // Per-slot sequential fade: fade OUT current → fade IN next
    init.forEach((slot, i) => {
      const cycle = (currentActive: "a" | "b", currentSrc: string) => {
        if (!mountedRef.current) return;

        const nextSrc = pickImage(imagesRef.current, inUse.current);
        inUse.current.add(nextSrc);
        const incoming = currentActive === "a" ? "b" : "a";

        // Preload the next image while fading out the current one
        let fadeOutDone = false;
        let loadDone = false;

        const startFadeIn = () => {
          if (!fadeOutDone || !loadDone || !mountedRef.current) return;

          // Step 1: remove old layer and snap to new rotation while slot is
          // empty — the snap is invisible so the photo appears pre-rotated.
          setSlots((prev) =>
            prev.map((s) =>
              s.id !== i
                ? s
                : {
                    ...s,
                    rotation: rand(-9, 9),
                    [currentActive]: { src: "", opacity: 0 },
                    active: incoming,
                  }
            )
          );

          // Step 2: one frame later, mount the new photo (already at new angle)
          timers.push(
            setTimeout(() => {
              if (!mountedRef.current) return;
              setSlots((prev) =>
                prev.map((s) =>
                  s.id !== i ? s : { ...s, [incoming]: { src: nextSrc, opacity: 1 } }
                )
              );
              timers.push(
                setTimeout(() => {
                  if (!mountedRef.current) return;
                  inUse.current.delete(currentSrc);
                  timers.push(
                    setTimeout(() => cycle(incoming, nextSrc), rand(HOLD_MIN, HOLD_MAX))
                  );
                }, FADE_S * 1000)
              );
            }, 32)
          );
        };

        // Phase 1: fade out current photo — wait the full animation duration
        // (+100ms buffer) before removing the element so it doesn't snap away.
        setSlots((prev) =>
          prev.map((s) =>
            s.id !== i ? s : { ...s, [currentActive]: { ...s[currentActive], opacity: 0 } }
          )
        );
        timers.push(
          setTimeout(() => {
            fadeOutDone = true;
            startFadeIn();
          }, FADE_S * 1000 + 100)
        );

        // Preload next image concurrently with the fade-out
        const imgEl = new window.Image();
        imgEl.onload = () => { loadDone = true; startFadeIn(); };
        imgEl.onerror = () => { loadDone = true; startFadeIn(); };
        imgEl.src = nextSrc;
      };

      // Stagger each slot's first swap
      timers.push(
        setTimeout(
          () => cycle("a", slot.a.src),
          i * 2200 + rand(4000, 7000)
        )
      );
    });

    return () => {
      mountedRef.current = false;
      timers.forEach(clearTimeout);
    };
  }, [hasImages]);

  const shadow =
    "0 8px 32px rgba(45,37,32,0.18), 0 2px 6px rgba(45,37,32,0.09)";

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f0] via-[#faf9f7] to-[#eff5f2]" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Photo slots */}
      {hasImages &&
        slots.map((slot, i) => {
          if (!slot.ready) return null;
          return (
            <motion.div
              key={slot.id}
              className="absolute pointer-events-none select-none"
              style={{
                left: slot.left,
                top: slot.top,
                x: "-50%",
                y: "-50%",
                rotate: slot.rotation,
                width: slot.width,
              }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.4,
                delay: i * 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Gentle continuous float */}
              <motion.div
                animate={{ y: [0, -FLOAT_Y[i], 0] }}
                transition={{
                  duration: FLOAT_DUR[i],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.3,
                }}
              >
                {/* Grid stacking: both layers occupy the same cell so the active
                    image sets the container height naturally — no forced crop.
                    Background fills any gap during crossfade so it never looks blank. */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ display: "grid", width: slot.width }}
                >
                  {slot.a.src && (
                    <motion.img
                      src={slot.a.src}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="w-full h-auto block"
                      style={{ gridArea: "1/1", boxShadow: shadow }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: slot.a.opacity }}
                      transition={{ duration: FADE_S, ease: "easeInOut" }}
                    />
                  )}
                  {slot.b.src && (
                    <motion.img
                      src={slot.b.src}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="w-full h-auto block"
                      style={{ gridArea: "1/1", boxShadow: shadow }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: slot.b.opacity }}
                      transition={{ duration: FADE_S, ease: "easeInOut" }}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}

      {/* Lighter vignette — just enough to frame the center text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 48% 52% at 50% 50%, transparent 15%, rgba(250,249,247,0.5) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block font-mono text-xs text-[#9b8d84] tracking-widest uppercase border border-[#ddd8d0] bg-[#faf9f7]/70 backdrop-blur-sm px-4 py-2 rounded-full">
            Full Stack Engineer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 leading-[1.05] text-[#2d2520]"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Spencer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-[#6b5d54] max-w-2xl mx-auto mb-10 leading-relaxed"
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
            className="px-8 py-3.5 rounded-xl font-medium text-sm bg-[#2d2520] text-[#faf9f7] hover:bg-[#2d2520]/90 transition-all duration-200 hover:scale-[1.02]"
          >
            View my work
          </Link>
          <Link
            href="/#contact"
            className="px-8 py-3.5 rounded-xl font-medium text-sm border border-[#ddd8d0] bg-[#faf9f7]/70 backdrop-blur-sm text-[#2d2520] hover:border-[#9b8d84] transition-all duration-200 hover:scale-[1.02]"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9b8d84]"
      >
        <span className="font-mono text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#9b8d84] to-transparent"
        />
      </motion.div>
    </section>
  );
}
