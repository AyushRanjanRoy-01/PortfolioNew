"use client";

import { profile } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0d1524] via-[#0b1018] to-[#12081a] px-6 py-12 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

            <p className="section-label">Contact</p>
            <h2 className="relative mt-2 max-w-xl font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">
              Open to senior AI roles — wherever agents meet production.
            </h2>
            <p className="relative mt-4 max-w-lg text-sm leading-7 text-slate-400">
              GenAI, AI engineering, platform/ops, and security — I&apos;m open across the stack.
              Strongest lens: shipping multi-agent systems with security-minded controls (HITL,
              governed tools, audit trails) on solid cloud foundations.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                GitHub ↗
              </a>
              <a href={profile.resume} className="btn btn-ghost">
                Resume PDF
              </a>
            </div>
            <p className="relative mt-8 font-mono text-[11px] text-slate-500">
              Press{" "}
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-slate-300">
                ⌘K
              </kbd>{" "}
              anytime to teleport around this site.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
