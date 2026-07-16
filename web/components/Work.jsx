"use client";

import { useMemo, useState } from "react";
import { projects } from "@/lib/content";
import Reveal from "./Reveal";

const filters = [
  { id: "all", label: "All" },
  { id: "genai", label: "GenAI" },
  { id: "platform", label: "Platform & security" },
  { id: "oss", label: "Open source" },
];

export default function Work() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);

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
              <p className="section-label">Selected work</p>
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                Systems worth lingering on
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                Click a card to open the story. Filter enterprise vs open source. Links open demos
                and code.
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
                      ? "bg-cyan-300 text-slate-950 shadow-glow"
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
          {list.map((p, i) => {
            const open = active === p.title;
            return (
              <Reveal key={p.title} delay={i * 60}>
                <article
                  className={`glass-strong card-hover group cursor-pointer p-6 ${
                    open ? "border-cyan-300/40 shadow-glow" : ""
                  } ${p.featured ? "md:min-h-[240px]" : ""}`}
                  onClick={() => setActive(open ? null : p.title)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(open ? null : p.title);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="chip">{p.kind}</span>
                    <span className="font-mono text-[10px] text-slate-500 transition group-hover:text-cyan-300">
                      {open ? "close −" : "expand +"}
                    </span>
                  </div>
                  <h3 className="font-display text-xl tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{p.blurb}</p>

                  <div
                    className={`grid transition-all duration-400 ${
                      open ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-300/80">
                          Why it matters
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {p.featured
                            ? "Grounded in real enterprise delivery — production-deployed where stated; benchmarks labeled when internal-only."
                            : "A focused slice of platform, security, or open-source work — readable and interview-defensible."}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium">
                          {p.live && (
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-300 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Live demo ↗
                            </a>
                          )}
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noreferrer"
                              className="text-violet-300 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Source code ↗
                            </a>
                          )}
                          {!p.live && !p.github && (
                            <span className="text-slate-500">Enterprise system — code private</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
