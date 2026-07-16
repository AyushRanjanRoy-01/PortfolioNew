"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "#brain", label: "Ask" },
  { href: "#lab", label: "Lab" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCmd = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <header
      className={`sticky top-0 z-50 transition duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#05070c]/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between">
        <a href="#" className="group flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-300/90 to-violet-400/90 text-xs text-slate-950 shadow-glow">
            A
          </span>
          <span className="hidden sm:inline">
            {profile.name.split(" ")[0]}
            <span className="text-slate-500 group-hover:text-cyan-300 transition">.ai</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCmd}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400 transition hover:border-cyan-300/30 hover:text-slate-200 sm:inline-flex"
          >
            <span>Explore</span>
            <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
              ⌘K
            </kbd>
          </button>
          <a href={profile.resume} className="btn btn-primary px-3 py-1.5 text-xs">
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
