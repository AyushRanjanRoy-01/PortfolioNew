"use client";
import { useState } from "react";

const SUGGESTIONS = [
  "What has Ayush built with multi-agent systems?",
  "Explain RAGGym in one line.",
  "What did he do before GenAI?",
];

export default function Ask() {
  const [q, setQ] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [answer, setAnswer] = useState("");
  const [meta, setMeta] = useState(null);

  async function ask(question) {
    const text = (question ?? q).trim();
    if (!text || state === "loading") return;
    setQ(text);
    setState("loading");
    setAnswer("");
    setMeta(null);
    try {
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const d = await r.json();
      if (!r.ok) {
        setAnswer(d?.error || "Something went wrong.");
        setState("error");
        return;
      }
      setAnswer(d.answer);
      setMeta({ model: d.model, ms: d.ms });
      setState("done");
    } catch {
      setAnswer("Network error — try emailing instead.");
      setState("error");
    }
  }

  return (
    <section id="ask" className="border-t border-line px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-content">
        <h2 className="reveal flex items-center gap-2.5 text-[1.3rem] sm:text-[1.5rem]">
          <span className="inline-block h-2 w-2 bg-accent" />Ask my work
        </h2>
        <p className="reveal mt-3 max-w-readable text-[14.5px] leading-relaxed text-muted">
          A small agent grounded only in this site — my projects and experience. Ask it something.
        </p>

        <form
          className="reveal mt-5 flex max-w-readable gap-2"
          onSubmit={(e) => { e.preventDefault(); ask(); }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. What has Ayush built with agents?"
            aria-label="Ask a question about Ayush's work"
            maxLength={500}
            className="flex-1 rounded-lg border border-line bg-surface px-4 py-2.5 text-[14.5px] text-ink placeholder:text-dim focus:border-accent"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-lg bg-accent px-5 py-2.5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {state === "loading" ? "…" : "Ask"}
          </button>
        </form>

        <div className="reveal mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="rounded-full border border-line px-3 py-1 text-[12.5px] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {s}
            </button>
          ))}
        </div>

        {state !== "idle" && (
          <div className="reveal mt-6 max-w-readable rounded-lg border border-line bg-surface p-5">
            {state === "loading" ? (
              <p className="text-[14.5px] text-dim">Thinking…</p>
            ) : (
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">{answer}</p>
            )}
            {meta && (
              <p className="mt-3 font-mono text-[11.5px] text-dim">
                answered by {meta.model} · {meta.ms}ms · grounded in this site
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
