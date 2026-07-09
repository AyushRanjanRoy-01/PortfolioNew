import { hero, stats, profile } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="px-5 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-20">
      <div className="mx-auto max-w-content">
        <p className="reveal flex items-center gap-2 text-[13.5px] text-dim">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.role} · {profile.location} · available for senior roles
        </p>

        <h1 className="reveal mt-6 max-w-3xl text-[2.15rem] leading-[1.12] sm:text-[3.1rem] sm:leading-[1.1]">
          I build production Gen&nbsp;AI systems that ship — and survive real data.
        </h1>

        <p className="reveal mt-6 max-w-readable text-[17px] leading-relaxed text-muted">
          {hero.sub}
        </p>

        <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
          <a href="#work" className="text-ink link">See my work →</a>
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

        <p className="reveal mt-12 max-w-readable text-[14px] leading-relaxed text-dim">
          {stats.map((s, i) => (
            <span key={s.label}>
              {i > 0 && <span className="mx-2 text-line">·</span>}
              <span className="text-muted">{s.value}</span> {s.label}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
