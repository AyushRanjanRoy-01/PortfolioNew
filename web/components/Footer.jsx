import { profile } from "@/lib/content";
import ResumeButton from "@/components/ResumeButton";

export default function Footer() {
  const year = new Date().getFullYear();
  const sha = (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7);

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
          </div>
        </div>

        {/* Provenance — this page as an artifact */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-5 font-mono text-[11.5px] text-dim">
          <span>build {sha || "dev"}</span>
          <span className="text-line">·</span>
          <span>answers by gpt-4o-mini</span>
          <span className="text-line">·</span>
          <a href="/api/mcp" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
            MCP endpoint ↗
          </a>
          <span className="text-line">·</span>
          <span>Next.js on Vercel</span>
        </div>
      </div>
    </footer>
  );
}
