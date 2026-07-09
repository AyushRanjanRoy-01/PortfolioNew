"use client";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const LINKS = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["work", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-content items-center justify-between px-5 sm:px-6">
        <a href="#top" className="text-[15px] font-semibold tracking-tight text-ink">
          Ayush Roy
        </a>
        <div className="flex items-center gap-6 text-[14px]">
          {LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className={`hidden transition-colors sm:inline ${
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
            className="text-ink link"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
