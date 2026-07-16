"use client";

import { experience } from "@/lib/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-page">
        <Reveal>
          <p className="section-label">Experience</p>
          <h2 className="mb-12 font-display text-3xl tracking-tight text-white sm:text-4xl">
            From platform firefighting to agent platforms
          </h2>
        </Reveal>

        <div className="relative space-y-0 pl-2 sm:pl-0">
          <div
            className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-cyan-300/50 via-violet-400/30 to-transparent sm:left-[7.35rem]"
            aria-hidden
          />

          {experience.map((job, i) => (
            <Reveal key={job.period} delay={i * 90}>
              <article className="relative grid gap-4 py-8 sm:grid-cols-[9rem_1fr] sm:gap-10">
                <div className="relative pl-8 sm:pl-0">
                  <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(94,234,212,0.8)] sm:left-auto sm:right-[-1.55rem]" />
                  <p className="font-mono text-xs text-slate-500">{job.period}</p>
                </div>
                <div className="glass-strong p-6">
                  <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  <p className="mt-0.5 text-sm text-cyan-200/70">{job.company}</p>
                  <ul className="mt-4 space-y-3">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-sm leading-6 text-slate-400 before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-violet-400"
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
    </section>
  );
}
