import { projects } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="border-t border-line px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-content">
        <h2 className="reveal text-[1.3rem] sm:text-[1.5rem]">Work</h2>
        <p className="reveal mt-3 max-w-readable text-[14.5px] leading-relaxed text-muted">
          A few things I&apos;ve shipped and tinkered with. The open-source ones link to code,
          so poke around. (Enterprise work is described generically.)
        </p>

        <div className="mt-9">
          {projects.map((p) => (
            <article key={p.title} className="reveal border-t border-line py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[1.02rem] font-semibold text-ink">
                  {p.github ? (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="link">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <span className="text-[12.5px] text-dim">{p.kind}</span>
              </div>

              <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-muted">{p.blurb}</p>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-dim">
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
