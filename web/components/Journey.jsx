"use client";

import { journey } from "@/lib/content";
import Reveal from "./Reveal";

export default function Journey() {
  return (
    <section id="journey" className="section-band">
      <div className="container-page">
        <Reveal>
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Background</p>
              <h2 className="font-display text-display-lg text-stone">
                The <em className="display-italic text-accent-bright">path</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-stone-muted sm:text-right">
              Systems coursework → platform engineering → production GenAI.
            </p>
          </div>
        </Reveal>

        {/* Connected steps — horizontal narrative, not identical cards */}
        <div className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent lg:block"
            aria-hidden
          />
          {journey.map((step, i) => (
            <Reveal key={step.year} delay={i * 55}>
              <div
                className={`relative h-full px-1 py-2 lg:px-3 ${
                  i % 2 === 1 ? "lg:pt-10" : "lg:pt-0"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/35 bg-ink font-mono text-[10px] font-medium text-accent-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] text-stone-dim">{step.year}</span>
                </div>
                <h3 className="font-display text-[1.2rem] leading-snug text-stone">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-muted">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
