"use client";

import { useState } from "react";
import { about } from "@/lib/content";
import Reveal from "./Reveal";

const tips = {
  "LangGraph": "Stateful multi-agent graphs with HITL interrupts and continuation.",
  "HITL approvals": "Humans decide when priority, documents, or approvals are uncertain.",
  "MCP": "Governed tool invocation patterns for live operational context.",
  "Terraform (0.11 → 1.x)": "Owned modernization on the MxDR / Common Cache stack.",
  "AWS Secrets Manager": "Automated migration of 64 secrets with IAM + GHA — no prod interruption.",
  "mTLS": "Mutual TLS on synthetic health and SIEM-bound telemetry paths.",
  "SIEM-bound telemetry": "5-min synthetic health into customer SIEMs via BindPlane.",
  "OpenTelemetry": "gRPC/OTLP traces for agents and platform services.",
  "Redis / ElastiCache": "Common Cache — shared device metadata platform ownership.",
  "Squid Proxy automation": "One-click enablement for restricted-egress enterprise customers.",
  "CodeQL / Dependabot": "Supply-chain remediation in GitHub Enterprise security workflows.",
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
              Platform-hardened. Agent-capable.
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
        </div>

        <Reveal delay={100}>
          <div className="glass-strong p-6">
            <p className="section-label mb-2">Stack constellation</p>
            <p className="mb-5 text-sm text-slate-400">
              Hover a chip — small notes for the curious.
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
