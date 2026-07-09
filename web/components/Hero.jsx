import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="px-5 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-24">
      <div className="mx-auto max-w-content">
        <p className="reveal flex items-center gap-2 text-[13px] text-dim">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.role} · Gurugram · open to senior roles
        </p>

        <h1 className="reveal mt-5 max-w-2xl text-[1.8rem] leading-[1.2] sm:text-[2.3rem] sm:leading-[1.16]">
          I build production AI agents that ship.
        </h1>

        <p className="reveal mt-5 max-w-readable text-[15.5px] leading-relaxed text-muted">
          I&apos;m Ayush. I keep LLM agents reliable in production at Accenture, and build{" "}
          <a
            href="https://github.com/AyushRanjanRoy-01/IncidentIQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink link"
          >
            IncidentIQ
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/AyushRanjanRoy-01/RAG-Project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink link"
          >
            RAGGym
          </a>{" "}
          in the open.
        </p>

        <div className="reveal mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[15px]">
          <a href="#work" className="text-ink link">See my work →</a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">
            Résumé ↗
          </a>
          <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-ink">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
