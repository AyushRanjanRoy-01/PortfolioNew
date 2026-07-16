"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#lab", label: "Demo" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#03050a]/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between">
        <a href="#" className="text-sm font-semibold tracking-tight text-white">
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={profile.resume} className="btn btn-primary hidden px-3 py-1.5 text-xs sm:inline-flex">
            Resume
          </a>
          <button
            type="button"
            className="btn btn-ghost px-3 py-1.5 text-xs md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#03050a]/95 px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-slate-300"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href={profile.resume} className="rounded-md px-3 py-2 text-sm text-cyan-200">
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
