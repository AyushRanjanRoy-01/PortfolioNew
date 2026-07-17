"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled ? "border-b border-white/[0.06] bg-ink/90 backdrop-blur-md" : ""
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between">
        <a href="#" className="text-sm font-medium tracking-tight text-stone">
          {profile.name}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-stone-muted hover:text-stone">
              {l.label}
            </a>
          ))}
          <a
            href={profile.resume}
            className="text-sm text-accent hover:text-white"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="text-sm text-stone-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-ink px-6 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-2 text-sm text-stone-muted"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href={profile.resume} className="block py-2 text-sm text-accent">
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
