"use client";

import { experience } from "@/lib/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-page max-w-3xl">
        <Reveal>
          <h2 className="section-title">Experience</h2>
        </Reveal>

        <ol className="space-y-12">
          {experience.map((job, i) => (
            <Reveal key={job.period} delay={i * 40}>
              <li className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-8">
                <p className="font-mono text-[12px] leading-6 text-stone-dim sm:pt-0.5">
                  {job.period}
                </p>
                <div>
                  <h3 className="text-[1.05rem] font-medium text-stone">
                    {job.role}
                    <span className="font-normal text-stone-muted">
                      {" "}
                      ·{" "}
                      {job.href ? (
                        <a
                          href={job.href}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-accent"
                        >
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </span>
                  </h3>
                  {job.group && (
                    <p className="mt-0.5 text-sm text-stone-dim">{job.group}</p>
                  )}
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="text-[0.95rem] leading-7 text-stone-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                  {job.stack?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
