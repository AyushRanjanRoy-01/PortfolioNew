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
          <p className="section-label">Q&amp;A</p>
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Ask about my work
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Answers come from a fixed set of notes about this site. If something isn’t written
            here, you’ll get an honest “not covered.”
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="glass-strong mt-8 p-5 sm:p-6">
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                ask();
              }}
            >
              <input
                className="input-dark flex-1"
                placeholder="e.g. What did you do on MxDR?"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button type="submit" className="btn btn-primary shrink-0">
                Search
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTED_QUERIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400 transition hover:border-white/20 hover:text-slate-200"
                >
                  {s}
                </button>
              ))}
            </div>

            {result && (
              <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
                <div
                  className={`rounded-xl border p-4 sm:p-5 ${
                    result.refused
                      ? "border-amber-400/20 bg-amber-400/5"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <p className="text-xs text-slate-500">
                    {result.refused ? "Not covered" : "Answer"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{result.answer}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <p className="text-xs text-slate-500">Sources</p>
                  {result.citations.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-500">None</p>
                  ) : (
                    <ul className="mt-3 space-y-2 text-xs text-slate-300">
                      {result.citations.map((c, i) => (
                        <li key={c.id} className="rounded-lg border border-white/10 px-3 py-2">
                          [{i + 1}] {c.title}
                          <div className="text-slate-500">{c.source}</div>
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
