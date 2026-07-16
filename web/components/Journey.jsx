"use client";

import { journey } from "@/lib/content";
import Reveal from "./Reveal";

export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container-page">
        <Reveal>
          <p className="section-label">Career map</p>
          <h2 className="mb-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
            How the story connects
          </h2>
          <p className="mb-10 max-w-xl text-sm leading-6 text-slate-400">
            From ECE → secure cloud platform engineering → production GenAI agents. Same
            discipline: production first, demos later.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, i) => (
            <Reveal key={step.year} delay={i * 70}>
              <div className="glass-strong card-hover relative h-full p-5">
                <span className="font-mono text-[11px] text-cyan-300/80">{step.year}</span>
                <h3 className="mt-2 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.detail}</p>
                <span className="absolute right-4 top-4 font-mono text-xs text-slate-600">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
