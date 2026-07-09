import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="px-5 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-24">
      <div className="mx-auto max-w-content">
        <h1 className="reveal text-[1.7rem] sm:text-[2rem]">Ayush Ranjan Roy</h1>
        <p className="reveal mt-2 text-[15px] text-muted">
          AI Engineer at Accenture, based in Gurugram.
        </p>

        <div className="reveal mt-7 max-w-readable space-y-3.5 text-[15.5px] leading-relaxed text-muted">
          <p>
            I build AI agents that do real work. I care more about making them boring and
            dependable than making them impressive.
          </p>
          <p>
            In the open I tinker with{" "}
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
            </a>
            . Off the clock: coffee and chess.
          </p>
        </div>

        <div className="reveal mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[15px]">
          <a href="#work" className="text-ink link">Work →</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-ink">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
