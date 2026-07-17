"use client";

import Image from "next/image";
import { hero, profile, certifications } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  const cert = certifications[0];

  return (
    <section className="section pt-16 sm:pt-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="max-w-measure">
          <Reveal>
            <h1 className="text-3xl font-semibold tracking-tight text-stone sm:text-4xl">
              {hero.title}
            </h1>
            <p className="mt-3 text-lg text-stone-muted">{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={40}>
            <p className="mt-6 text-[0.98rem] leading-7 text-stone-muted">{hero.blurb}</p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="link-accent">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" className="link">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.resume} className="link">
                  Resume
                </a>
              </li>
            </ul>
          </Reveal>

          {cert && (
            <Reveal delay={100}>
              <p className="mt-8 text-sm text-stone-dim">
                {cert.name}
                <span className="text-stone-dim/70"> · {cert.issuer}, {cert.when}</span>
              </p>
            </Reveal>
          )}
        </div>

        <Reveal delay={60} className="hidden w-[200px] shrink-0 sm:block lg:w-[220px]">
          <div className="overflow-hidden rounded-lg border border-white/[0.08]">
            <div className="relative aspect-square">
              <Image
                src="/images/profile.jpg"
                alt={profile.name}
                fill
                className="object-cover"
                sizes="220px"
                priority
              />
            </div>
          </div>
          <p className="mt-3 font-mono text-[11px] text-stone-dim">{profile.location}</p>
        </Reveal>
      </div>
    </section>
  );
}
