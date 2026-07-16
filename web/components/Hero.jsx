"use client";

import Image from "next/image";
import { hero, profile } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="section pb-12 pt-16 sm:pb-20 sm:pt-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.25fr_0.85fr]">
        <div>
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                Available for senior AI roles
              </span>
              <span className="rounded-full border border-[#D4A27F]/30 bg-[#D4A27F]/10 px-3 py-1 text-xs text-[#E8C4A8]">
                Claude Certified Architect
              </span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <p className="mb-3 text-sm text-slate-500">{hero.kicker}</p>
            <h1 className="max-w-xl font-display text-[2.15rem] font-medium leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {hero.title}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-400 sm:text-base sm:leading-8">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                View work
              </a>
              <a href={profile.resume} className="btn btn-ghost">
                Resume
              </a>
              <a href="#contact" className="btn btn-ghost">
                Contact
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                GitHub
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="mx-auto w-full max-w-xs sm:max-w-sm">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-void-900 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/profile.jpg"
                alt={profile.name}
                fill
                className="object-cover"
                sizes="320px"
                priority
              />
            </div>
            <div className="border-t border-white/10 px-4 py-3">
              <p className="font-medium text-white">{profile.name}</p>
              <p className="mt-0.5 text-sm text-slate-400">
                {profile.role} · {profile.company}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{profile.location}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
