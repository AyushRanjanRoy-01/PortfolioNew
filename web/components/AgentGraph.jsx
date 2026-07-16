"use client";

import { useEffect, useMemo, useState } from "react";
import { NODES, SCENARIOS, buildRun } from "@/lib/agentSim";
import Reveal from "./Reveal";

const STATUS_STYLE = {
  idle: "border-white/10 bg-white/[0.02] text-slate-500",
  active: "border-cyan-300/50 bg-cyan-300/10 text-cyan-100 shadow-[0_0_24px_rgba(94,234,212,0.15)]",
  ok: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  warn: "border-amber-400/35 bg-amber-400/10 text-amber-100",
  hitl: "border-violet-400/40 bg-violet-400/10 text-violet-100",
  blocked: "border-rose-400/35 bg-rose-400/10 text-rose-100",
  pending: "border-cyan-300/30 bg-cyan-300/5 text-cyan-100",
  done: "border-white/15 bg-white/[0.04] text-slate-300",
};

export default function AgentGraph() {
  const [scenarioId, setScenarioId] = useState("clean");
  const [stepIdx, setStepIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const run = useMemo(() => buildRun(scenarioId), [scenarioId]);
  const steps = run.steps;

  useEffect(() => {
    setStepIdx(-1);
    setPlaying(false);
  }, [scenarioId]);

  useEffect(() => {
    if (!playing) return;
    if (stepIdx >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStepIdx((i) => Math.min(i + 1, steps.length - 1)), 900);
    return () => clearTimeout(t);
  }, [playing, stepIdx, steps.length]);

  const nodeState = (nodeId) => {
    const seen = steps
      .slice(0, stepIdx + 1)
      .filter((s) => s.nodeId === nodeId);
    if (!seen.length) return stepIdx < 0 ? "idle" : "idle";
    const last = seen[seen.length - 1];
    const isCurrent = steps[stepIdx]?.nodeId === nodeId;
    if (isCurrent) return last.status === "ok" ? "active" : last.status;
    return last.status === "hitl" || last.status === "blocked" || last.status === "warn"
      ? last.status
      : "done";
  };

  const current = stepIdx >= 0 ? steps[stepIdx] : null;
  const logLines = steps.slice(0, stepIdx + 1);

  const reset = () => {
    setPlaying(false);
    setStepIdx(-1);
  };

  const stepOnce = () => {
    setPlaying(false);
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  };

  const play = () => {
    if (stepIdx >= steps.length - 1) setStepIdx(-1);
    setPlaying(true);
    if (stepIdx < 0) setStepIdx(0);
  };

  return (
    <section id="lab" className="section">
      <div className="container-page">
        <Reveal>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Interactive lab</p>
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                Play the agent control plane
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Step a generic LangGraph-style path with RAG + HITL. Sample SRE scenarios only —
                no client business processes. No live cluster.
              </p>
            </div>
            <p className="font-mono text-[11px] text-slate-500">client-side · no API key</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="glass-strong overflow-hidden">
            <div className="flex flex-wrap gap-2 border-b border-white/10 p-4">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScenarioId(s.id)}
                  className={`rounded-full px-3 py-1.5 text-left text-xs transition ${
                    scenarioId === s.id
                      ? "bg-cyan-300 text-slate-950"
                      : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <span className="font-medium">{s.label}</span>
                  <span className="mt-0.5 block opacity-80 font-normal">{s.blurb}</span>
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
                <div className="mb-5 flex flex-wrap gap-2">
                  <button type="button" className="btn btn-primary text-xs" onClick={play}>
                    {playing ? "Playing…" : "▶ Play"}
                  </button>
                  <button type="button" className="btn btn-ghost text-xs" onClick={stepOnce}>
                    Step →
                  </button>
                  <button type="button" className="btn btn-ghost text-xs" onClick={reset}>
                    Reset
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-300/40 via-violet-400/25 to-transparent sm:left-1/2 sm:-translate-x-px" />
                  <ol className="relative space-y-3">
                    {NODES.map((n) => {
                      const st = nodeState(n.id);
                      return (
                        <li key={n.id} className="relative flex items-center gap-3 sm:justify-center">
                          <div
                            className={`z-[1] w-full max-w-md rounded-xl border px-4 py-3 transition duration-300 sm:text-center ${STATUS_STYLE[st] || STATUS_STYLE.idle}`}
                          >
                            <div className="flex items-center justify-between gap-2 sm:justify-center sm:gap-3">
                              <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
                                {n.kind}
                              </span>
                              <span className="text-sm font-semibold">{n.label}</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              <div className="flex flex-col bg-black/20 p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  Trace log
                </p>
                <div className="mt-3 min-h-[220px] flex-1 space-y-2 overflow-y-auto font-mono text-xs leading-5">
                  {logLines.length === 0 && (
                    <p className="text-slate-500">Press Play or Step to start the simulation.</p>
                  )}
                  {logLines.map((s, i) => (
                    <div
                      key={`${s.nodeId}-${i}`}
                      className={`rounded-lg border px-3 py-2 ${
                        i === logLines.length - 1
                          ? "border-cyan-300/25 bg-cyan-300/5 text-slate-200"
                          : "border-white/5 bg-white/[0.02] text-slate-400"
                      }`}
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-slate-500">
                        <span>{s.nodeId}</span>
                        <span>·</span>
                        <span>{s.status}</span>
                        {s.confidence != null && (
                          <>
                            <span>·</span>
                            <span>conf {(s.confidence * 100).toFixed(0)}%</span>
                          </>
                        )}
                      </div>
                      <p>{s.log}</p>
                      {s.citation && (
                        <p className="mt-1 text-cyan-300/80">cite: {s.citation}</p>
                      )}
                    </div>
                  ))}
                </div>
                {current && (
                  <p className="mt-4 border-t border-white/10 pt-3 text-[11px] text-slate-500">
                    Step {stepIdx + 1}/{steps.length} · scenario{" "}
                    <span className="text-slate-300">{run.scenario.label}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
