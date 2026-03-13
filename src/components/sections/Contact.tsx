"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Easing } from "framer-motion";
import type { ContactFormData } from "@/types";

const INITIAL: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono text-[#9b8d84] uppercase tracking-wider">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-[#d4736a]">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-[#faf9f7] border border-[#ddd8d0] rounded-xl px-4 py-3 text-sm text-[#2d2520] placeholder-[#b8b0a6] outline-none focus:border-[#c47c82] focus:ring-1 focus:ring-[#c47c82]/20 transition-all duration-200";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<ContactFormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  function validate(): boolean {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  function set(field: keyof ContactFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as Easing },
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#c47c82]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-64 h-64 bg-[#6d9a8a]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-4">
          <span className="font-mono text-xs text-[#9b8d84] tracking-widest uppercase">
            04 / Contact
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.1] mb-6"
            >
              Let&apos;s build something{" "}
              <span className="gradient-text">together</span>
            </motion.h2>
            <motion.p
              {...fadeUp(0.2)}
              className="text-[#6b5d54] text-lg leading-relaxed mb-10"
            >
              Have a project in mind, a role to fill, or just want to say hi?
              Drop me a message and I&apos;ll get back to you within a day or
              two.
            </motion.p>

            {/* Contact details */}
            <motion.div {...fadeUp(0.25)} className="flex flex-col gap-4">
              <a
                href="mailto:stong225@gmail.com"
                className="flex items-center gap-3 text-[#9b8d84] hover:text-[#2d2520] transition-colors group w-fit"
              >
                <span className="w-9 h-9 rounded-xl bg-[#f0ede8] border border-[#ddd8d0] flex items-center justify-center group-hover:border-[#b8b0a6] transition-colors">
                  <EmailIcon />
                </span>
                <span className="text-sm">stong225@gmail.com</span>
              </a>
              <a
                href="https://github.com/spencertong"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#9b8d84] hover:text-[#2d2520] transition-colors group w-fit"
              >
                <span className="w-9 h-9 rounded-xl bg-[#f0ede8] border border-[#ddd8d0] flex items-center justify-center group-hover:border-[#b8b0a6] transition-colors">
                  <GitHubIcon />
                </span>
                <span className="text-sm">github.com/spencertong</span>
              </a>
              <a
                href="https://www.linkedin.com/in/spencert225/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#9b8d84] hover:text-[#2d2520] transition-colors group w-fit"
              >
                <span className="w-9 h-9 rounded-xl bg-[#f0ede8] border border-[#ddd8d0] flex items-center justify-center group-hover:border-[#b8b0a6] transition-colors">
                  <LinkedInIcon />
                </span>
                <span className="text-sm">linkedin.com/in/spencert225</span>
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div {...fadeUp(0.15)}>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-[#f0ede8] border border-[#ddd8d0] p-10 flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c47c82] to-[#6d9a8a] flex items-center justify-center">
                  <CheckIcon />
                </div>
                <h3 className="font-display font-bold text-xl text-[#2d2520]">
                  Message sent!
                </h3>
                <p className="text-[#9b8d84] text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs text-[#9b8d84] hover:text-[#2d2520] underline underline-offset-2 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl bg-[#f0ede8] border border-[#ddd8d0] p-8 flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" error={errors.name}>
                    <input
                      type="text"
                      placeholder="Spencer Tong"
                      value={form.name}
                      onChange={set("name")}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set("email")}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Subject" error={errors.subject}>
                  <input
                    type="text"
                    placeholder="Project idea, job opportunity…"
                    value={form.subject}
                    onChange={set("subject")}
                    className={inputClass}
                  />
                </Field>

                <Field label="Message" error={errors.message}>
                  <textarea
                    rows={5}
                    placeholder="Tell me what you're working on…"
                    value={form.message}
                    onChange={set("message")}
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                {status === "error" && (
                  <p className="text-sm text-[#d4736a]">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl font-medium text-sm bg-gradient-to-r from-[#c47c82] to-[#6d9a8a] text-white hover:opacity-90 disabled:opacity-50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {status === "loading" ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
