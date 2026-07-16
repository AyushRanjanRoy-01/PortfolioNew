"use client";

import { profile } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section pb-24 sm:pb-32">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-accent/20 bg-gradient-to-br from-ink-card via-ink-soft to-[#121820] px-8 py-14 sm:px-14 sm:py-16">
            {/* Lively but restrained color washes */}
            <div
              className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-signal/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-blush/10 blur-3xl"
              aria-hidden
            />

            <div className="relative max-w-xl">
              <p className="section-label">Contact</p>
              <h2 className="mt-2 font-display text-display-xl text-stone">
                Let&apos;s <em className="display-italic text-accent-bright">talk</em>
              </h2>
              <p className="mt-5 max-w-md text-[1.02rem] leading-7 text-stone-muted">
                Available for senior AI roles. Email is best; LinkedIn works too.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href={`mailto:${profile.email}`} className="btn btn-primary">
                  {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  GitHub
                </a>
              </div>

              <p className="mt-8 font-mono text-[11px] text-stone-dim">
                Prefer a one-pager?{" "}
                <a href={profile.resume} className="link-soft">
                  Download resume PDF
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
