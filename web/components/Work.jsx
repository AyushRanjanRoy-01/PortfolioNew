"use client";

import { projects } from "@/lib/content";
import Reveal from "./Reveal";

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container-page max-w-3xl">
        <Reveal>
          <h2 className="section-title">Selected work</h2>
        </Reveal>

        <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 30}>
              <li className="py-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[1.05rem] font-medium text-stone">
                    {p.github || p.live ? (
                      <a
                        href={p.live || p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-accent"
                      >
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <span className="font-mono text-[11px] text-stone-dim">{p.kind}</span>
                </div>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-7 text-stone-muted">
                  {p.blurb}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  {(p.live || p.github) && (
                    <div className="flex gap-3 text-sm">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent hover:text-white"
                        >
                          Demo
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-muted hover:text-stone"
                        >
                          Source
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
