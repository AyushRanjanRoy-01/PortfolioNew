"use client";

import { useState } from "react";
import { about } from "@/lib/content";
import Reveal from "./Reveal";

const tips = {
  "Multi-agent systems": "Orchestrated workflows with review gates.",
  "RAG / retrieval": "Ground answers in documents, not model memory alone.",
  LangGraph: "Stateful agent graphs used in production paths.",
  "Claude & GPT": "Multi-model inference and routing.",
  "Azure AI": "Cloud model / document intelligence paths.",
  "Human-in-the-loop": "People approve uncertain or high-impact steps.",
  FastAPI: "Async APIs for agent services.",
  PostgreSQL: "Workflow state and persistence.",
  AWS: "MxDR / AMxDR cloud platform work.",
  Terraform: "Infrastructure as code across environments.",
  "Secrets & IAM": "Credential migration and access control.",
  "CI/CD": "Jenkins to GitHub Actions migrations.",
  Observability: "OpenTelemetry, Datadog, SIEM health checks.",
  Docker: "Runtime and image hardening.",
};

export default function About() {
  const [tip, setTip] = useState(null);

  return (
    <section id="about" className="section">
      <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="section-label">About</p>
            <h2 className="mb-6 font-display text-3xl tracking-tight text-white sm:text-4xl">
              About
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <div className="space-y-4 text-[15px] leading-7 text-slate-400 sm:text-base sm:leading-8">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.facts.map((f) => (
                <div key={f.label} className="glass px-4 py-3">
                  <dt className="text-[11px] uppercase tracking-wide text-slate-500">{f.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-100">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {about.education?.coursework?.length > 0 && (
            <Reveal delay={140}>
              <div className="mt-8">
                <p className="mb-2 text-[11px] uppercase tracking-wide text-slate-500">
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

        <Reveal delay={80}>
          <div className="glass-strong p-6">
            <p className="section-label mb-2">Stack</p>
            <p className="mb-5 text-sm text-slate-400">Prioritized. Hover for a short note.</p>
            {tip && (
              <div className="mb-4 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-300">
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
                        className="chip transition hover:border-white/25 hover:text-white"
                        onMouseEnter={() => setTip(tips[item] || item)}
                        onMouseLeave={() => setTip(null)}
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
