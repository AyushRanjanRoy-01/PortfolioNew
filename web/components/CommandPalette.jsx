"use client";

import { useEffect, useMemo, useState } from "react";
import { experience, profile, projects } from "@/lib/content";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) setQ("");
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = useMemo(() => {
    const base = [
      { group: "Navigate", label: "Site brain (ask)", href: "#brain", hint: "RAG" },
      { group: "Navigate", label: "Agent lab", href: "#lab", hint: "Simulate" },
      { group: "Navigate", label: "Career path", href: "#journey", hint: "Map" },
      { group: "Navigate", label: "Work", href: "#work", hint: "Projects" },
      { group: "Navigate", label: "Experience", href: "#experience", hint: "Career" },
      { group: "Navigate", label: "About", href: "#about", hint: "Stack" },
      { group: "Navigate", label: "Contact", href: "#contact", hint: "Say hi" },
      {
        group: "Actions",
        label: "Open resume",
        href: profile.resume,
        hint: "PDF",
        external: true,
      },
      {
        group: "Actions",
        label: "Email Ayush",
        href: `mailto:${profile.email}`,
        hint: "Mail",
      },
      {
        group: "Actions",
        label: "GitHub",
        href: profile.github,
        hint: "Code",
        external: true,
      },
      {
        group: "Actions",
        label: "LinkedIn",
        href: profile.linkedin,
        hint: "Profile",
        external: true,
      },
      ...projects.map((p) => ({
        group: "Projects",
        label: p.title,
        href: p.github || p.live || "#work",
        hint: p.kind,
        external: !!(p.github || p.live),
      })),
      ...experience.map((e) => ({
        group: "Experience",
        label: `${e.role} · ${e.company}`,
        href: "#experience",
        hint: e.period,
      })),
    ];
    const query = q.trim().toLowerCase();
    if (!query) return base;
    return base.filter(
      (i) =>
        i.label.toLowerCase().includes(query) ||
        i.group.toLowerCase().includes(query) ||
        (i.hint || "").toLowerCase().includes(query)
    );
  }, [q]);

  if (!open) return null;

  const go = (item) => {
    setOpen(false);
    if (item.external) {
      window.open(item.href, "_blank", "noreferrer");
      return;
    }
    if (item.href.startsWith("mailto:")) {
      window.location.href = item.href;
      return;
    }
    const el = document.querySelector(item.href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const groups = [...new Set(items.map((i) => i.group))];

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)} role="presentation">
      <div
        className="cmdk-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="font-mono text-xs text-cyan-300/80">⌘K</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, experience, actions…"
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
          <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
            esc
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {items.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-slate-500">No matches. Try “HelixOps”.</p>
          )}
          {groups.map((g) => (
            <div key={g} className="mb-2">
              <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                {g}
              </p>
              {items
                .filter((i) => i.group === g)
                .map((item) => (
                  <button
                    key={`${g}-${item.label}`}
                    type="button"
                    onClick={() => go(item)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-white/[0.06]"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-slate-500">{item.hint}</span>
                  </button>
                ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] text-slate-500">
          Tip: type a project name · press Enter-like click to jump
        </div>
      </div>
    </div>
  );
}

export function openCommandPaletteHint() {
  return null;
}
