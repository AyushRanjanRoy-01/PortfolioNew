"use client";
import { useEffect, useState } from "react";

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
        <div className="flex items-center gap-5 text-[14px] sm:gap-6">
          {LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className={`transition-colors ${
                active === l.href.slice(1) ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {l.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
