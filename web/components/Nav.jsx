import { profile } from "@/lib/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/80 bg-ink-50/85 backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between">
        <a href="#" className="font-medium tracking-tight text-ink-900">
          {profile.name.split(" ")[0]}
          <span className="text-ink-400">.</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-ink-600 sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink-900">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost hidden px-3 py-1.5 text-xs sm:inline-flex"
          >
            GitHub
          </a>
          <a href={profile.resume} className="btn btn-primary px-3 py-1.5 text-xs">
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
