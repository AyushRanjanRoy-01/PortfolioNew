"use client";

import { useMemo, useState } from "react";
import { projects } from "@/lib/content";
import Reveal from "./Reveal";

const filters = [
  { id: "all", label: "All" },
  { id: "genai", label: "AI / agents" },
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

  return (
    <section id="work" className="section">
      <div className="container-page">
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Work</p>
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                Selected projects
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                Impact first. Enterprise work is scoped as contributions on multi-engineer teams.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    filter === f.id
                      ? "bg-cyan-300 text-slate-950"
                      : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 40}>
              <article className="glass-strong flex h-full flex-col p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="chip">{p.kind}</span>
                  {p.impact && (
                    <span className="text-xs font-medium text-cyan-200/90">{p.impact}</span>
                  )}
                </div>
                <h3 className="font-display text-xl tracking-tight text-white">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                {(p.live || p.github) && (
                  <div className="mt-4 flex gap-4 text-xs font-medium">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-300 hover:underline"
                      >
                        Demo
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-300 hover:underline"
                      >
                        Code
                      </a>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
