"use client";

import { useRef } from "react";
import { motion, useInView, type Easing } from "framer-motion";

const skills = [
  {
    category: "Frontend",
    color: "from-[#c47c82] to-[#a393bf]",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    color: "from-[#6d9a8a] to-[#7fb8a8]",
    items: ["Node.js", "Python", "PostgreSQL", "Prisma", "REST", "GraphQL"],
  },
  {
    category: "DevOps & Cloud",
    color: "from-[#d4956a] to-[#d4736a]",
    items: ["Docker", "Vercel", "AWS", "CI/CD", "Git"],
  },
  {
    category: "Tooling",
    color: "from-[#d4736a] to-[#d4969b]",
    items: ["Figma", "VS Code", "Postman", "Linear", "Notion"],
  },
];

const stats = [
  { value: "5+", label: "Years building" },
  { value: "30+", label: "Projects shipped" },
  { value: "∞", label: "Cups of coffee" },
];

function SkillPill({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
      className="inline-block px-3 py-1.5 rounded-lg text-xs font-mono text-[#6b5d54] bg-[#f0ede8] border border-[#ddd8d0] hover:border-[#b8b0a6] hover:text-[#2d2520] transition-colors duration-200 cursor-default"
    >
      {name}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as Easing },
  });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c47c82]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#6d9a8a]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-6">
          <span className="font-mono text-xs text-[#9b8d84] tracking-widest uppercase">
            01 / About
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fadeUp(0.1)}
          className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-16 leading-[1.1]"
        >
          I turn ideas into{" "}
          <span className="gradient-text">production-ready</span>
          <br />
          software.
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio + stats */}
          <div>
            <motion.div {...fadeUp(0.2)} className="space-y-5 mb-12">
              <p className="text-[#6b5d54] text-lg leading-relaxed">
                I&apos;m a full stack engineer who cares about the full picture
                — from pixel-perfect UIs to the infrastructure running beneath
                them. I love working at the intersection of design and
                engineering, building products that feel as good as they
                perform.
              </p>
              <p className="text-[#6b5d54] text-lg leading-relaxed">
                My background spans startups and side projects, giving me a bias
                toward shipping quickly without cutting corners on quality. When
                I&apos;m not writing code, I&apos;m usually reading about
                distributed systems, tinkering with new frameworks, or
                convincing myself I need another mechanical keyboard.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-[#ddd8d0]"
            >
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-[#f0ede8] px-6 py-7 flex flex-col gap-1"
                >
                  <span className="font-display font-bold text-3xl gradient-text">
                    {value}
                  </span>
                  <span className="text-[#9b8d84] text-xs font-mono uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — skills */}
          <motion.div {...fadeUp(0.25)} className="space-y-7">
            {skills.map((group, gi) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`h-px flex-1 bg-gradient-to-r ${group.color} opacity-40`}
                  />
                  <span
                    className={`font-mono text-xs font-semibold bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}
                  >
                    {group.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, si) => (
                    <SkillPill
                      key={skill}
                      name={skill}
                      delay={isInView ? 0.3 + gi * 0.08 + si * 0.04 : 0}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
