"use client";

import Image from "next/image";
import { certifications, techBrands } from "@/lib/content";
import Reveal from "./Reveal";

const BRAND_SRC = {
  claude: "/brands/anthropic.svg",
  azure: "/brands/microsoftazure.svg",
  aws: "/brands/amazonaws.svg",
};

export default function TechBrands() {
  const cert = certifications[0];

  return (
    <section className="relative z-10 pb-6 pt-2">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
            {/* Certification — accent panel, distinct from stack strip */}
            <div className="panel-accent relative flex-1 overflow-hidden px-7 py-7 sm:px-8">
              <div
                className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl"
                aria-hidden
              />
              <p className="section-label mb-4">Certification</p>
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-black/25 p-3">
                  <Image
                    src={BRAND_SRC.claude}
                    alt="Anthropic"
                    width={36}
                    height={36}
                    className="h-9 w-9"
                  />
                </div>
                <div>
                  <h2 className="font-display text-[1.45rem] leading-snug text-stone sm:text-[1.65rem]">
                    {cert.name}
                  </h2>
                  <p className="mt-1.5 font-mono text-[11px] text-accent-bright">
                    {cert.issuer} · {cert.when}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-6 text-stone-muted">{cert.blurb}</p>
                </div>
              </div>
            </div>

            {/* Stack marks — quieter strip, not matching glass-strong */}
            <div className="panel-outline flex min-w-0 flex-[0.85] flex-col justify-center px-6 py-6 sm:px-7">
              <p className="section-label mb-5">Day-to-day stack</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {techBrands.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col items-center gap-2.5 rounded-xl bg-white/[0.025] px-2 py-4 transition hover:bg-white/[0.045]"
                  >
                    <Image
                      src={BRAND_SRC[b.id]}
                      alt={b.name}
                      width={30}
                      height={30}
                      className="h-7 w-7 object-contain opacity-90"
                    />
                    <div className="text-center">
                      <p className="text-[0.8rem] font-semibold text-stone">{b.name}</p>
                      <p className="text-[10px] text-stone-dim">{b.sub}</p>
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
