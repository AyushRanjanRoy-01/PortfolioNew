import { profile } from "@/lib/content";
import ResumeButton from "@/components/ResumeButton";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-5 py-12 sm:px-6">
      <div className="mx-auto max-w-content">
        <ResumeButton />

        <div className="mt-8 flex flex-col gap-3 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {year}</p>
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
