"use client";

import { certifications, techBrands } from "@/lib/content";
import Reveal from "./Reveal";

/** Simple monochrome brand marks — respectful, non-official glyphs */
function BrandMark({ id }) {
  if (id === "aws") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <path
          fill="#FF9900"
          d="M6.8 14.2c0 .3.3.4.5.2 1.7-1.1 4-1.4 5.9-.7.2.1.4-.1.3-.3-1-3.4-5.5-4.5-8.1-2.4-.2.1-.2.3-.1.5.5.9 1.5 1.7 1.5 2.7zm11.5-1.3c-.2-.2-.1-.5.2-.5 1.1.1 2 .4 2.8.9.2.1.1.4-.1.4-.2.1-.4.2-.7.3-1.1.4-2.2.4-3.3.1-.3-.1-.5-.2-.6-.4.4-.3.9-.6 1.7-.8zm1.9 2.1c-.1-.2 0-.4.2-.5 2.4-1.1 3.9.3 4.1.5.2.1.1.3 0 .5-.8 1.1-2.1 2.1-4 2.4-.2 0-.4-.1-.5-.3.4-.9 1.1-1.6 2.2-2.1z"
        />
        <path
          fill="#FF9900"
          d="M13.2 6.4c.9 1.1.7 2.6.4 3.5-.1.3-.5.4-.7.2-.1-.1-.2-.3-.1-.4.4-1 .3-2.1-.4-2.9-.7-.8-1.8-1.1-2.9-.9-.3 0-.5-.3-.4-.5.5-1.3 2.4-1.5 4.1 1z"
        />
      </svg>
    );
  }
  if (id === "azure") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <path fill="#0078D4" d="M13.05 4.2 5.4 19.8h4.05l1.95-4.2h6.15l-4.5-11.4zm1.05 2.55 2.85 7.2H11.7l2.4-7.2zM3.6 19.8l6.3-10.95L8.55 4.2 1.5 19.8h2.1z" />
      </svg>
    );
  }
  // Claude — abstract mark (not official logo)
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="#D97757" strokeWidth="1.6" />
      <path
        d="M8 13.5c1.2 1.6 2.6 2.4 4 2.4s2.8-.8 4-2.4"
        fill="none"
        stroke="#D97757"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9.2" cy="10" r="1" fill="#D97757" />
      <circle cx="14.8" cy="10" r="1" fill="#D97757" />
    </svg>
  );
}

export default function TechBrands() {
  const cert = certifications.find((c) => c.highlight) || certifications[0];

  return (
    <section className="relative z-10 pb-4 pt-2">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Claude cert highlight */}
            <div className="glass-strong relative overflow-hidden p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#D97757]/15 blur-2xl" />
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8A88A]">
                Certification
              </p>
              <div className="mt-3 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D97757]/30 bg-[#D97757]/10">
                  <BrandMark id="claude" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {cert.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {cert.issuer} · {cert.when}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{cert.blurb}</p>
                </div>
              </div>
            </div>

            {/* Brand strip */}
            <div className="glass-strong flex flex-col justify-center p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Cloud & model stack
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Names for orientation — not official partnership marks.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {techBrands.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-2 py-3 text-center"
                  >
                    <BrandMark id={b.id} />
                    <div>
                      <p className="text-sm font-medium text-slate-100">{b.name}</p>
                      <p className="font-mono text-[10px] text-slate-500">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
