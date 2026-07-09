import { profile } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-5 py-8 sm:px-6">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-3 text-[13px] text-dim sm:flex-row sm:items-center">
        <p>© {year} {profile.name}</p>
        <div className="flex gap-5">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-ink">Email</a>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
