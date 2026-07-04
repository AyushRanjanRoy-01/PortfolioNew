"use client";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { profile } from "@/lib/content";

const LINKS = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["work", "about", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line/80 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-[#4C9BFF] text-[13px] font-bold text-bg">
            A
          </span>
          Ayush Roy
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className={`text-[13.5px] transition-colors ${
                active === l.href.slice(1) ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {l.name}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-accent/60 hover:text-accent-soft"
          >
            <Icon name="download" size={15} /> Résumé
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="p-1 text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg/98 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-content flex-col px-5 py-2">
            {LINKS.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3.5 text-[15px] text-muted"
              >
                {l.name}
              </a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3.5 text-[15px] font-medium text-accent-soft"
            >
              <Icon name="download" size={16} /> Résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
