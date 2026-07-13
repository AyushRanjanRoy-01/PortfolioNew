import { profile } from "@/lib/content";
import HeroArt from "@/components/HeroArt";

export default function Hero() {
  return (
    <section id="top" className="px-5 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-24">
      <div className="mx-auto max-w-content">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 className="reveal font-semibold leading-[0.98] tracking-[-0.03em] text-[clamp(2rem,5.5vw,3.25rem)]">
              Ayush Ranjan Roy<span className="ml-1.5 inline-block h-[0.42em] w-[0.42em] bg-accent align-baseline" />
            </h1>
            <p className="reveal mt-4 text-[15px] text-muted">
              AI Engineer at Accenture, based in Gurugram.
            </p>

            <div className="reveal mt-7 max-w-readable space-y-3.5 text-[15.5px] leading-relaxed text-muted">
              <p>
                I build production{" "}
                <span className="font-medium text-accent">multi-agent</span> AI systems: LLM
                orchestration, MCP tool gateways, RAG, and the routing and governance that keep
                them reliable.
              </p>
              <p>
                In the open I build{" "}
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
                .
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

          <div className="reveal hidden justify-self-end lg:block" aria-hidden="true">
            <HeroArt />
          </div>
        </div>
      </div>
    </section>
  );
}
