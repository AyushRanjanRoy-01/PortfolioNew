"use client";

import { about } from "@/lib/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="section-label">About</p>
              <h2 className="mb-6 max-w-lg font-display text-display-lg text-stone">
                Agents on a{" "}
                <em className="display-italic text-accent-bright">platform foundation</em>
              </h2>
            </Reveal>

            {/* Pull quote — unique voice block */}
            <Reveal delay={40}>
              <blockquote className="mb-9 border-l-2 border-accent/50 pl-5">
                <p className="font-display text-[1.35rem] italic leading-snug text-stone/90 sm:text-[1.5rem]">
                  &ldquo;Ship agents the way you ship platforms — measurable, observable, fail-closed.&rdquo;
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={70}>
              <div className="space-y-5 text-[1.02rem] leading-[1.8] text-stone-muted">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <dl className="mt-10 grid gap-3 sm:grid-cols-2">
                {about.facts.map((f, i) => (
                  <div
                    key={f.label}
                    className={`px-4 py-3.5 ${i === 0 ? "panel-accent" : "glass"}`}
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-label text-stone-dim">
                      {f.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-snug text-stone">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {about.education?.coursework?.length > 0 && (
              <Reveal delay={130}>
                <div className="mt-10">
                  <p className="section-label mb-3">Coursework</p>
                  <div className="flex flex-wrap gap-2">
                    {about.education.coursework.map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={80}>
            <aside className="panel-solid sticky top-24 p-7 sm:p-8">
              <p className="section-label">Toolkit</p>
              <p className="mb-7 font-display text-[1.25rem] italic text-stone/85">
                What I reach for most
              </p>
              <div className="space-y-8">
                {Object.entries(about.skills).map(([group, items], gi) => (
                  <div key={group}>
                    <h3
                      className={`mb-3 text-sm font-semibold tracking-wide ${
                        gi === 0 ? "text-accent-bright" : "text-signal"
                      }`}
                    >
                      {group}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
