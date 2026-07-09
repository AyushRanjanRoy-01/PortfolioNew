import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="px-5 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-20">
      <div className="mx-auto max-w-content">
        <p className="reveal flex items-center gap-2 text-[13.5px] text-dim">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.role} · {profile.location} · open to senior roles
        </p>

        <h1 className="reveal mt-6 max-w-3xl text-[2.15rem] leading-[1.12] sm:text-[3.1rem] sm:leading-[1.1]">
          I build production Gen&nbsp;AI systems that ship — and survive real data.
        </h1>

        <div className="reveal mt-7 max-w-readable space-y-4 text-[17px] leading-relaxed text-muted">
          <p>
            I&apos;m Ayush. At Accenture I teach crews of LLM agents to read messy, real-world
            documents and act on them — without falling over in production.
          </p>
          <p>
            I like the unglamorous parts that make agents trustworthy: tool gateways, model routing,
            and human-in-the-loop guardrails. In the open I build things like{" "}
            <a
              href="https://github.com/AyushRanjanRoy-01/IncidentIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink link"
            >
              IncidentIQ
            </a>
            , an AI-SRE that investigates its own incidents, and{" "}
            <a
              href="https://github.com/AyushRanjanRoy-01/RAG-Project"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink link"
            >
              RAGGym
            </a>
            , a gym for practising RAG by actually coding it.
          </p>
          <p className="text-dim">
            Off-screen: coffee, chess, and a stubborn belief that good AI should be boring and reliable.
          </p>
        </div>

        <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[16px]">
          <a href="#work" className="text-ink link">See what I&apos;ve built →</a>
          <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-ink">
            Email
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-ink"
          >
            Résumé ↗
          </a>
        </div>
      </div>
    </section>
  );
}
