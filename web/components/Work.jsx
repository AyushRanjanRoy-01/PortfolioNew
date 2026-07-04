import Icon from "@/components/Icon";
import { projects } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="reveal mb-3 font-mono text-[12.5px] uppercase tracking-[0.2em] text-accent-soft">
          Selected work
        </div>
        <h2 className="reveal max-w-2xl text-3xl font-semibold sm:text-4xl">
          Production systems, not just demos.
        </h2>
        <p className="reveal mt-4 max-w-2xl text-[15.5px] text-muted">
          Enterprise agent infrastructure shipped at Accenture, plus open-source I build in the open.
          Enterprise work is described generically.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/50 transition-all duration-300 hover:-translate-y-1 hover:border-line/40 hover:bg-surface"
            >
              <div className={`relative grid h-32 place-items-center bg-gradient-to-br ${p.accent}`}>
                <div className="grid-texture absolute inset-0 opacity-60" />
                <div className="relative grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-bg/40 text-ink backdrop-blur">
                  <Icon name={p.icon} size={26} />
                </div>
                <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-bg/50 px-2.5 py-1 text-[11px] text-muted backdrop-blur">
                  {p.kind}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[19px] font-semibold text-ink">{p.title}</h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">{p.blurb}</p>

                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-accent/10 px-2.5 py-1 text-[12px] font-medium text-accent-soft">
                  <Icon name="spark" size={13} /> {p.metric}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-dim">
                      {t}
                    </span>
                  ))}
                </div>

                {(p.github || p.live) && (
                  <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-accent-soft"
                      >
                        <Icon name="github" size={16} /> Code
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-accent-soft"
                      >
                        <Icon name="external" size={15} /> Live
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
