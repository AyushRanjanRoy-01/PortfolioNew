"use client";

import { useState } from "react";
import { about } from "@/lib/content";
import Reveal from "./Reveal";

const tips = {
  LangGraph: "Stateful multi-agent graphs with HITL interrupts and continuation.",
  "Multi-agent workflows": "Order-to-Cash / Dispute & Deduction agents at industry-domain level.",
  MCP: "Governed tool invocation for live operational context.",
  "HITL orchestration": "Humans gate uncertain or high-impact agent steps.",
  "RAG & retrieval": "Retrieval that grounds agent answers in knowledge sources.",
  "Claude · GPT-4o/5": "Multi-model orchestration in production agent stacks.",
  "Ensemble / confidence routing": "Escalate when model confidence is weak.",
  "Agent observability": "Operator-facing state and decision traces.",
  Terraform: "MxDR → AMxDR AWS architecture modernization.",
  "AWS (Lambda, EC2, ASG, S3)": "Cloud platform for MxDR/AMxDR — runtimes, ASG, multi-env.",
  "Secrets Manager · IAM": "Bulk secret migration with automation and IAM updates.",
  "mTLS · SIEM telemetry": "Synthetic health over mTLS into enterprise SIEMs.",
  "OpenTelemetry · Datadog": "Traces for agents and platform services.",
  "Production incident response": "Multi-tenant production debugging experience.",
};

export default function About() {
  const [tip, setTip] = useState(null);

  return (
    <section id="about" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="section-label">About</p>
            <h2 className="mb-6 font-display text-3xl tracking-tight text-white sm:text-4xl">
              Agent-first. Platform-backed.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-4 text-[15px] leading-7 text-slate-400 sm:text-base sm:leading-8">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.facts.map((f) => (
                <div key={f.label} className="glass px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-slate-100">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {about.education?.coursework?.length > 0 && (
            <Reveal delay={180}>
              <div className="mt-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  Relevant coursework
                </p>
                <div className="flex flex-wrap gap-1.5">
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

        <Reveal delay={100}>
          <div className="glass-strong p-6">
            <p className="section-label mb-2">Stack · 60% AI · 40% foundations</p>
            <p className="mb-5 text-sm text-slate-400">
              Hover a chip — short notes for the curious.
            </p>
            {tip && (
              <div className="mb-4 rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 font-mono text-xs text-cyan-100">
                {tip}
              </div>
            )}
            <div className="space-y-6">
              {Object.entries(about.skills).map(([group, items]) => (
                <div key={group}>
                  <h3 className="mb-2 text-sm font-semibold text-slate-200">{group}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="chip transition hover:border-cyan-300/40 hover:text-cyan-100"
                        onMouseEnter={() =>
                          setTip(tips[item] || `${item} — part of the production toolkit.`)
                        }
                        onMouseLeave={() => setTip(null)}
                        onFocus={() =>
                          setTip(tips[item] || `${item} — part of the production toolkit.`)
                        }
                        onBlur={() => setTip(null)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
