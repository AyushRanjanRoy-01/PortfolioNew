import Icon from "@/components/Icon";
import { profile } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: profile.github, icon: "github", label: "GitHub" },
    { href: profile.linkedin, icon: "linkedin", label: "LinkedIn" },
    { href: `mailto:${profile.email}`, icon: "mail", label: "Email" },
  ];
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-[13px] text-dim">
          © {year} {profile.name} · Built with Next.js
        </p>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-muted transition-colors hover:text-accent-soft"
            >
              <Icon name={s.icon} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
