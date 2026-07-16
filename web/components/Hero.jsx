"use client";

import Image from "next/image";
import { hero, profile } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="section pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="mb-7 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal-soft px-3 py-1 text-[11px] font-semibold tracking-wide text-signal">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                Open to senior AI roles
              </span>
              <span className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-bright">
                Claude Certified Architect
              </span>
            </div>
          </Reveal>

          <Reveal delay={40}>
            <p className="mb-5 font-mono text-[10px] font-medium uppercase tracking-label text-stone-dim">
              {hero.kicker}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="max-w-[18ch] font-display text-display-2xl text-stone">
              I build multi-agent systems{" "}
              <em className="display-italic text-accent-bright">that hold up</em>{" "}
              in production.
            </h1>
          </Reveal>

          <Reveal delay={110}>
            <p className="mt-7 max-w-measure text-[1.05rem] leading-[1.75] text-stone-muted sm:text-[1.1rem]">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                View selected work
              </a>
              <a href={profile.resume} className="btn btn-ghost">
                Resume PDF
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-medium text-stone-muted underline-offset-4 transition hover:text-accent-bright hover:underline"
              >
                {profile.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.06] pt-6 text-sm text-stone-dim">
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wide text-stone-dim/80">
                  Platform
                </span>
                <br />
                <span className="text-stone-muted">MxDR → AMxDR on AWS</span>
              </p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wide text-stone-dim/80">
                  GenAI
                </span>
                <br />
                <span className="text-stone-muted">Agents · retrieval · review gates</span>
              </p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-wide text-stone-dim/80">
                  Side work
                </span>
                <br />
                <span className="text-stone-muted">HelixOps · RAGGym</span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={90} className="mx-auto w-full max-w-[270px] sm:max-w-[290px] lg:ml-auto">
          <figure className="relative">
            {/* Asymmetric frame — not a centered double border */}
            <div
              className="absolute -left-3 -top-3 h-16 w-16 rounded-tl-2xl border-l border-t border-accent/40"
              aria-hidden
            />
            <div
              className="absolute -bottom-3 -right-3 h-16 w-16 rounded-br-2xl border-b border-r border-signal/30"
              aria-hidden
            />
            <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-ink-card shadow-lift">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/profile.jpg"
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="290px"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              </div>
              <figcaption className="border-t border-white/[0.07] px-5 py-4">
                <p className="font-display text-[1.35rem] leading-tight text-stone">
                  {profile.name}
                </p>
                <p className="mt-1 text-[0.85rem] text-stone-muted">
                  {profile.role}
                  <span className="text-stone-dim"> · </span>
                  {profile.company}
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-wide text-stone-dim">
                  {profile.location}
                </p>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
