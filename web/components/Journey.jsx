"use client";

import { journey } from "@/lib/content";
import Reveal from "./Reveal";

export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container-page">
        <Reveal>
          <p className="section-label">Background</p>
          <h2 className="mb-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
            Path
          </h2>
          <p className="mb-10 max-w-lg text-sm leading-6 text-slate-400">
            Platform engineering first, then production GenAI — same bar: ship what you can operate.
          </p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, i) => (
            <Reveal key={step.year} delay={i * 50}>
              <div className="glass h-full p-5">
                <p className="text-xs text-slate-500">{step.year}</p>
                <h3 className="mt-2 text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
