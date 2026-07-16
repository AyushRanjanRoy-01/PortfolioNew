"use client";

import { useMemo, useState } from "react";
import { projects } from "@/lib/content";
import Reveal from "./Reveal";

const filters = [
  { id: "all", label: "All" },
  { id: "genai", label: "AI" },
  { id: "platform", label: "Platform" },
  { id: "oss", label: "Open source" },
];

export default function Work() {
  const [filter, setFilter] = useState("all");

  const list = useMemo(() => {
    if (filter === "genai") return projects.filter((p) => p.kind.includes("GenAI"));
    if (filter === "platform")
      return projects.filter((p) => p.kind.includes("Platform") || p.kind.includes("Security"));
    if (filter === "oss") return projects.filter((p) => p.kind.includes("Open source"));
    return projects;
  }, [filter]);

  const [featured, ...rest] = list;
  const showFeatured = filter === "all" && featured?.featured;

  return (
    <section id="work" className="section-band">
      <div className="container-page">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Selected work</p>
              <h2 className="font-display text-display-lg text-stone">
                Projects with <em className="display-italic text-accent-bright">outcomes</em>
              </h2>
              <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-stone-muted">
                Contributions on multi-engineer teams, plus open source you can open.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 rounded-full border border-white/[0.07] bg-black/20 p-1">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    filter === f.id
                      ? "bg-accent text-ink shadow-sm"
                      : "text-stone-muted hover:text-stone"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Featured lead card — breaks grid monotony */}
        {showFeatured && (
          <Reveal>
            <article className="panel-solid card-hover mb-5 grid gap-0 overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-white/[0.06] p-7 sm:p-9 lg:border-b-0 lg:border-r">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="chip">Featured</span>
                  <span className="chip">{featured.kind.split("·")[0].trim()}</span>
                  {featured.impact && (
                    <span className="text-xs font-semibold text-signal">{featured.impact}</span>
                  )}
                </div>
                <h3 className="font-display text-display-md text-stone sm:text-[1.85rem]">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-7 text-stone-muted">
                  {featured.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {featured.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between bg-gradient-to-br from-accent/[0.07] via-transparent to-signal/[0.05] p-7 sm:p-9">
                <p className="font-display text-[1.35rem] italic leading-snug text-stone/90">
                  Production systems need routing, telemetry, and human review — not just a clever prompt.
                </p>
                <div className="mt-8 flex gap-5 text-sm">
                  {(featured.live || featured.github) ? (
                    <>
                      {featured.live && (
                        <a href={featured.live} target="_blank" rel="noreferrer" className="link-soft">
                          Live demo →
                        </a>
                      )}
                      {featured.github && (
                        <a
                          href={featured.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-muted underline-offset-4 hover:text-stone hover:underline"
                        >
                          Source
                        </a>
                      )}
                    </>
                  ) : (
                    <span className="font-mono text-[11px] text-stone-dim">Enterprise delivery · contributor</span>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {(showFeatured ? rest : list).map((p, i) => {
            const isOss = p.kind.includes("Open source");
            return (
              <Reveal key={p.title} delay={i * 40}>
                <article
                  className={`card-hover flex h-full flex-col p-6 sm:p-7 ${
                    isOss ? "panel-outline" : "glass-strong"
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="chip">{p.kind.split("·")[0].trim()}</span>
                    {p.impact && (
                      <span className="text-[11px] font-semibold text-signal">{p.impact}</span>
                    )}
                  </div>
                  <h3 className="font-display text-[1.35rem] leading-snug text-stone transition group-hover:text-accent-bright">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-7 text-stone-muted">{p.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  {(p.live || p.github) && (
                    <div className="mt-5 flex gap-5 text-sm">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="link-soft">
                          Live demo
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-muted underline-offset-4 hover:text-stone hover:underline"
                        >
                          Source
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
