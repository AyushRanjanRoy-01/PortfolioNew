import Icon from "@/components/Icon";
import { hero, stats, profile } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="relative px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-content">
        <div className="reveal mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-[12.5px] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for senior Gen AI roles
        </div>

        <h1 className="reveal max-w-4xl text-[2.6rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
          I build{" "}
          <span className="bg-gradient-to-r from-accent to-[#4C9BFF] bg-clip-text text-transparent">
            production Gen&nbsp;AI
          </span>{" "}
          systems that ship — and survive real data.
        </h1>

        <p className="reveal mt-7 max-w-2xl text-[17px] leading-relaxed text-muted">
          {hero.sub}
        </p>

        <div className="reveal mt-9 flex flex-wrap items-center gap-3.5">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-bg transition-transform hover:-translate-y-0.5 hover:bg-accent-soft"
          >
            See my work <Icon name="arrowRight" size={17} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-accent/60"
          >
            Get in touch
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-2 py-3 text-[15px] text-muted transition-colors hover:text-accent-soft"
          >
            <Icon name="download" size={16} /> Résumé
          </a>
        </div>

        <dl className="reveal mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-2xl font-semibold text-ink sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-[13px] text-dim">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
