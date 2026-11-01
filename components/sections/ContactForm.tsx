"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/Icons";
import { contactPage, site } from "@/data/site";
import { EASE } from "@/lib/motion";

/** `fallback`: the send itself failed, so offer the direct email address */
type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string; fallback: boolean };

const field =
  "w-full rounded-sm border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-neon/60 focus:bg-white/[0.05]";
const label = "mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [subject, setSubject] = useState(contactPage.subjects[0]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ state: "error", message: json.error || "Something went wrong.", fallback: res.status >= 500 });
        return;
      }
      form.reset();
      setSubject(contactPage.subjects[0]);
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Network error — check your connection and try again, or email me at", fallback: true });
    }
  }

  return (
    <div className="relative rounded-md border border-white/10 bg-white/[0.02] p-6 backdrop-blur sm:p-10">
      <AnimatePresence mode="wait">
        {status.state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(160deg,#FF2D55,#2F6BFF)] shadow-[0_0_40px_rgba(255,45,85,0.4)]">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                <path d="M5 12.5 10 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="mt-6 text-3xl font-light">
              Message <span className="font-serif italic">sent!</span>
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Thanks for reaching out — I&apos;ll reply to your email within 24 hours.
            </p>
            <button
              onClick={() => setStatus({ state: "idle" })}
              className="mt-8 rounded-full border border-white/25 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors hover:border-white/60 hover:bg-white/5"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <span className={label}>I&apos;m reaching out about</span>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Subject">
                {contactPage.subjects.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={subject === s}
                    onClick={() => setSubject(s)}
                    className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                      subject === s
                        ? "force-dark border-transparent bg-[linear-gradient(90deg,#FF2D55,#2F6BFF)] text-white"
                        : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>
                  Your Name
                </label>
                <input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="John Doe" className={field} />
              </div>
              <div>
                <label htmlFor="email" className={label}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="john@company.com"
                  className={field}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={6}
                placeholder="Tell me about your project, timeline, and goals…"
                className={`${field} resize-none`}
              />
            </div>

            {/* Honeypot — hidden from people, irresistible to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            {status.state === "error" && (
              <p role="alert" className="rounded-sm border border-neon/30 bg-neon/10 px-4 py-3 text-sm text-white/90">
                {status.message}
                {status.fallback && (
                  <>
                    {" "}
                    <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                      {site.email}
                    </a>
                  </>
                )}
              </p>
            )}

            <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/40">Usually replies within 24 hours.</p>
              <button
                type="submit"
                disabled={status.state === "sending"}
                className="glow-pill group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] disabled:cursor-wait disabled:opacity-60"
              >
                {status.state === "sending" ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
