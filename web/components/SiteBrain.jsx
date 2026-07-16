"use client";

import { useMemo, useState } from "react";
import { SUGGESTED_QUERIES, answerFromCorpus } from "@/lib/corpus";
import Reveal from "./Reveal";

export default function SiteBrain() {
  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState("");

  const result = useMemo(() => {
    if (!submitted.trim()) return null;
    return answerFromCorpus(submitted);
  }, [submitted]);

  const ask = (text) => {
    const t = (text || q).trim();
    if (!t) return;
    setQ(t);
    setSubmitted(t);
  };

  return (
    <section id="brain" className="section">
      <div className="container-page">
        <Reveal>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Site brain · grounded only</p>
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                Ask — citations required
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                No free-form LLM. Answers are ranked from a fixed corpus about this site. If it
                isn&apos;t written here, the brain refuses.
              </p>
            </div>
            <p className="font-mono text-[11px] text-slate-500">RAG-style · local retrieval</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="glass-strong p-5 sm:p-6">
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                ask();
              }}
            >
              <input
                className="input-dark flex-1"
                placeholder="e.g. What do you build with RAG?"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button type="submit" className="btn btn-primary shrink-0">
                Retrieve
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTED_QUERIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400 transition hover:border-cyan-300/30 hover:text-cyan-100"
                >
                  {s}
                </button>
              ))}
            </div>

            {result && (
              <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    result.refused
                      ? "border-amber-400/25 bg-amber-400/5"
                      : "border-white/10 bg-black/25"
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    {result.refused ? "Refusal" : "Grounded answer"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{result.answer}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    Citations
                  </p>
                  {result.citations.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-500">None — query outside corpus.</p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {result.citations.map((c, i) => (
                        <li
                          key={c.id}
                          className="rounded-lg border border-cyan-300/15 bg-cyan-300/5 px-3 py-2 text-xs text-slate-300"
                        >
                          <span className="font-mono text-cyan-300/90">[{i + 1}]</span> {c.title}
                          <div className="mt-0.5 text-slate-500">{c.source}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
