"use client";
import { useState, useRef, useEffect } from "react";
import { projects, profile } from "@/lib/content";

const SUGGESTIONS = [
  "What do you build?",
  "Show me your projects",
  "What is RAGGym?",
  "Experience before GenAI?",
  "How can I reach you?",
];

// Grounded canned answers so the page is interactive even without an API key.
const CANNED = {
  "What do you build?": {
    a: "I'm Ayush — an AI Engineer at Accenture. I build production multi-agent systems: LLM orchestration, MCP tool gateways, RAG, and the routing and governance that keep them reliable.",
    show: ["multi-agent", "mcp"],
  },
  "Show me your projects": {
    a: "A selection — production work at Accenture, and open-source I build in the open.",
    show: "all",
  },
  "What is RAGGym?": {
    a: "RAGGym is an open-source “gym” for practising RAG by coding it: a fully swappable pipeline (LLM, embeddings and vector store hot-configurable) with a self-correcting retrieval loop and an AI-graded practice mode. It has a live demo.",
    show: ["raggym"],
  },
  "Experience before GenAI?": {
    a: "Before GenAI I spent about two years as a Platform Engineer — Terraform IaC, CI/CD, and live-incident debugging across a large microservice fleet. So I build LLM systems like critical infrastructure: observable, governed, hard to break.",
    show: [],
  },
  "How can I reach you?": {
    a: `The fastest way is email: ${profile.email}. I'm also on GitHub and LinkedIn (links below).`,
    show: [],
  },
};

// Keywords per project title, for surfacing cards from an answer.
const KW = {
  "Production Multi-Agent Document Pipeline": ["multi-agent", "document", "pipeline", "classification", "extraction"],
  "Model Gateway & Consensus Routing": ["gateway", "routing", "consensus"],
  "MCP Tool Gateway": ["mcp"],
  "Agent Observability & Governance": ["observability", "governance"],
  "IncidentIQ, AI-SRE Platform": ["incidentiq", "incident", "sre"],
  "RAGGym, Learn RAG by Coding": ["raggym", "rag"],
};

function pickProjects(spec, text) {
  if (spec === "all") return projects;
  const hay = ((Array.isArray(spec) ? spec.join(" ") : "") + " " + (text || "")).toLowerCase();
  return projects.filter((p) => (KW[p.title] || []).some((k) => hay.includes(k)));
}

export default function Console() {
  const [turns, setTurns] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (turns.length) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [turns, busy]);

  async function submit(question) {
    const q = (question ?? input).trim();
    if (!q || busy) return;
    setInput("");

    const canned = CANNED[q];
    if (canned) {
      setTurns((t) => [...t, { q, a: canned.a, projects: pickProjects(canned.show, canned.a) }]);
      return;
    }

    setBusy(true);
    setTurns((t) => [...t, { q, a: null, projects: [] }]);
    try {
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const d = await r.json();
      const a = r.ok
        ? d.answer
        : (d.error || "The live agent isn't reachable yet. Try a suggestion above, or email me.");
      setTurns((t) => t.map((x, i) => (i === t.length - 1 ? { ...x, a, projects: pickProjects([], a) } : x)));
    } catch {
      setTurns((t) => t.map((x, i) => (i === t.length - 1 ? { ...x, a: "Network error — try a suggestion, or email me.", projects: [] } : x)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="top" className="min-h-[92vh] px-5 pt-28 pb-16 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-content">
        <p className="text-[13px] text-dim">
          {profile.name} · AI Engineer · {profile.location}
        </p>
        <h1 className="mt-4 max-w-3xl text-[clamp(1.7rem,4.6vw,2.7rem)] leading-[1.1] tracking-[-0.025em]">
          I build AI agents. <span className="text-accent">Ask mine</span> about my work.
        </h1>

        <form className="mt-7" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 focus-within:border-accent">
            <span className="font-mono text-[15px] text-accent">&gt;</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="ask about my projects, experience, agents…"
              aria-label="Ask about Ayush's work"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-dim"
            />
            <button
              type="submit"
              disabled={busy}
              className="shrink-0 rounded-lg bg-accent px-4 py-1.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "…" : "Ask"}
            </button>
          </div>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              className="rounded-full border border-line px-3 py-1 text-[12.5px] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {s}
            </button>
          ))}
        </div>

        {turns.length === 0 ? (
          <p className="mt-10 max-w-readable text-[14.5px] leading-relaxed text-muted">
            This page answers for me — grounded only in my real work. Ask it something, or tap a
            suggestion. Prefer to browse? Everything's below.
          </p>
        ) : (
          <div className="mt-9 space-y-8">
            {turns.map((t, i) => (
              <div key={i}>
                <p className="font-mono text-[13px] text-dim">&gt; {t.q}</p>
                <p className="mt-2 max-w-readable whitespace-pre-wrap text-[15.5px] leading-relaxed text-ink">
                  {t.a === null ? "thinking…" : t.a}
                </p>
                {t.projects && t.projects.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {t.projects.map((p) => (
                      <a
                        key={p.title}
                        href={p.live || p.github || "#top"}
                        target={p.live || p.github ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/50"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-[14.5px] font-semibold text-ink">{p.title}</h3>
                          <span className="shrink-0 text-[11px] text-dim">{p.kind}</span>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.blurb}</p>
                        {(p.live || p.github) && (
                          <div className="mt-2.5 flex gap-3 text-[12px] text-accent">
                            {p.live && <span>Demo ↗</span>}
                            {p.github && <span>Code ↗</span>}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}
      </div>
    </section>
  );
}
