import { projects } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="border-t border-line px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-content">
        <h2 className="reveal text-[1.6rem] sm:text-[1.9rem]">Work</h2>
        <p className="reveal mt-3 max-w-readable text-[15px] text-muted">
          Production agent infrastructure shipped at Accenture, and open-source I build in the open.
          Enterprise work is described generically.
        </p>

        <div className="mt-10">
          {projects.map((p) => (
            <article key={p.title} className="reveal border-t border-line py-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-[1.2rem] text-ink">
                  {p.github ? (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="link">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <span className="text-[13px] text-dim">{p.kind}</span>
              </div>

              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted">{p.blurb}</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-dim">
                <span className="text-muted">{p.metric}</span>
                <span className="text-line">·</span>
                <span>{p.stack.join(" · ")}</span>
                {p.github && (
                  <>
                    <span className="text-line">·</span>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-ink link">
                      Code ↗
                    </a>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
