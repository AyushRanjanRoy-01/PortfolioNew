"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { hero, profile } from "@/lib/content";
import Reveal from "./Reveal";

const ORBIT = ["LangGraph", "MCP", "RAG", "LLMOps", "FastAPI", "AKS", "Terraform", "Claude"];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const full = "multi-agent systems that ship.";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(full);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section pb-10 pt-14 sm:pb-16 sm:pt-20">
      <div className="container-page">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 font-mono text-[11px] text-cyan-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              Available for senior AI roles
            </span>
            <span className="chip">{hero.kicker}</span>
          </div>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.85fr]">
          <div>
            <Reveal delay={80}>
              <h1 className="font-display text-[2.4rem] font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                I build{" "}
                <span className="gradient-text">
                  {typed}
                  <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-cyan-300 align-middle animate-pulse" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-measure text-[15px] leading-7 text-slate-400 sm:text-base sm:leading-8">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#work" className="btn btn-primary">
                  Explore the work
                  <span aria-hidden>→</span>
                </a>
                <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                  Start a conversation
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  GitHub ↗
                </a>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                {[
                  { k: "Agents", v: "Production" },
                  { k: "Focus", v: "LLMOps" },
                  { k: "Base", v: "Gurugram" },
                ].map((s) => (
                  <div key={s.k} className="glass px-3 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {s.k}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">{s.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-square">
              <div className="orbit-ring slow" />
              <div className="orbit-ring" />
              {ORBIT.map((label, i) => {
                const angle = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2;
                const r = 46;
                const x = 50 + r * Math.cos(angle);
                const y = 50 + r * Math.sin(angle);
                return (
                  <span
                    key={label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#0b1018]/85 px-2 py-1 font-mono text-[10px] text-cyan-100/90 shadow-lg backdrop-blur"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {label}
                  </span>
                );
              })}
              <div className="absolute inset-[18%] overflow-hidden rounded-[2rem] border border-white/15 bg-void-900 shadow-[0_0_80px_rgba(94,234,212,0.12)]">
                <Image
                  src="/images/profile.jpg"
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-medium text-white">{profile.name}</p>
                  <p className="font-mono text-[10px] text-cyan-200/80">
                    {profile.role} · {profile.company}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-page mt-14">
        <div className="ticker overflow-hidden rounded-full border border-white/10 bg-white/[0.02] py-2.5">
          <div className="ticker-track font-mono text-[11px] text-slate-400">
            {[...Array(2)].map((_, loop) => (
              <div key={loop} className="flex gap-8 px-4">
                {[
                  "LangGraph multi-agent orchestration",
                  "MCP tool gateways",
                  "Model routing & cost control",
                  "HITL governance",
                  "RAG + evaluation",
                  "Azure AKS · Terraform · OpenTelemetry",
                  "HelixOps · RAGGym",
                ].map((t) => (
                  <span key={`${loop}-${t}`} className="whitespace-nowrap">
                    <span className="mr-2 text-cyan-300/70">◆</span>
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
