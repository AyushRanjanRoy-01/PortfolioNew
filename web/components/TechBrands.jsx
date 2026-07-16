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
  const cert = certifications.find((c) => c.highlight) || certifications[0];

  return (
    <section className="relative z-10 pb-4 pt-2">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Claude cert highlight */}
            <div className="glass-strong relative overflow-hidden p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#D4A27F]/12 blur-2xl" />
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8C4A8]">
                Featured certification
              </p>
              <div className="mt-3 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#D4A27F]/35 bg-[#D4A27F]/10 p-2.5">
                  <Image
                    src={BRAND_SRC.claude}
                    alt="Anthropic"
                    width={36}
                    height={36}
                    className="h-9 w-9"
                  />
                </div>
                <div className="min-w-0">
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

            {/* Brand strip — real Simple Icons SVGs */}
            <div className="glass-strong flex flex-col justify-center p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Technologies I ship with
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {techBrands.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-black/25 px-2 py-4 text-center"
                  >
                    <div className="flex h-10 w-10 items-center justify-center">
                      <Image
                        src={BRAND_SRC[b.id]}
                        alt={b.name}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{b.name}</p>
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
