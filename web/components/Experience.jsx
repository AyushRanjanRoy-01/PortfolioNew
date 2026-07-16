"use client";

import { experience } from "@/lib/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-page">
        <Reveal>
          <div className="mb-14 max-w-xl">
            <p className="section-label">Experience</p>
            <h2 className="font-display text-display-lg text-stone">
              Where I&apos;ve <em className="display-italic text-accent-bright">worked</em>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline rail — desktop */}
          <div
            className="absolute bottom-4 left-[5.5rem] top-4 hidden w-px bg-gradient-to-b from-accent/40 via-white/10 to-signal/30 sm:block"
            aria-hidden
          />

          <div className="space-y-0">
            {experience.map((job, i) => (
              <Reveal key={job.period} delay={i * 70}>
                <article className="relative grid gap-5 py-10 sm:grid-cols-[11rem_1fr] sm:gap-14 first:pt-0 last:pb-0">
                  <div className="sm:pt-1">
                    <p className="font-mono text-[11px] font-medium text-accent-bright">
                      {job.period}
                    </p>
                    {/* Timeline node */}
                    <span
                      className="absolute left-[5.35rem] top-[2.85rem] hidden h-2.5 w-2.5 rounded-full border-2 border-accent bg-ink sm:block"
                      aria-hidden
                    />
                  </div>
                  <div className={`${i === 0 ? "panel-accent" : "panel-solid"} p-6 sm:p-8`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-[1.45rem] text-stone">{job.role}</h3>
                      {i === 0 && (
                        <span className="rounded-full bg-signal-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-signal">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-stone-muted">{job.company}</p>
                    <ul className="mt-6 space-y-3.5">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="relative pl-4 text-[0.93rem] leading-7 text-stone-muted before:absolute before:left-0 before:top-[0.75em] before:h-1 before:w-1 before:rounded-full before:bg-accent/80"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
