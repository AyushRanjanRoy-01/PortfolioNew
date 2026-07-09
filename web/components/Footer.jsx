import { profile } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-5 py-12 sm:px-6">
      <div className="mx-auto max-w-content">
        <a
          href={profile.resume}
          download="Ayush-Ranjan-Roy-Resume.pdf"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-[14px] text-ink transition-colors hover:border-accent/50 hover:text-accent"
        >
          Download résumé ↓
        </a>

        <div className="mt-8 flex flex-col gap-3 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name}</p>
          <div className="flex gap-5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-ink">Email</a>
            <span>Built with Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
