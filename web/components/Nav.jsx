"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
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
          ? "border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-[3.75rem] items-center justify-between">
        <a href="#" className="group flex items-baseline gap-1.5">
          <span className="font-display text-[1.2rem] tracking-tight text-stone transition group-hover:text-accent-bright">
            {profile.name.split(" ")[0]}
          </span>
          <span className="hidden font-sans text-[0.8rem] font-medium tracking-wide text-stone-dim sm:inline">
            {profile.name.split(" ").slice(1).join(" ")}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-[0.85rem] font-medium text-stone-muted transition hover:bg-white/[0.04] hover:text-stone"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            className="btn btn-primary hidden !px-4 !py-1.5 !text-xs sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            className="btn btn-ghost !px-3 !py-1.5 !text-xs md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-ink/95 px-5 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block rounded-lg px-3 py-2.5 text-sm text-stone-muted"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
