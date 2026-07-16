import { projects } from "@/lib/content";

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section rule">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="font-display text-3xl tracking-tight text-ink-900 sm:text-4xl">
              Production systems & open source
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-ink-500">
            Enterprise work is described generically. Open-source links go to live code and demos.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <article key={p.title} className="card flex flex-col">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="chip">{p.kind}</span>
                <div className="flex gap-3 text-xs font-medium text-ink-500">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent"
                    >
                      Demo ↗
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-ink-900">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{p.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-10 space-y-3">
            <p className="section-label mb-4">More projects</p>
            {rest.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-2 rounded-xl border border-ink-200 bg-white/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-ink-900">{p.title}</h3>
                    <span className="chip">{p.kind}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-500">{p.blurb}</p>
                </div>
                <div className="flex shrink-0 gap-3 text-xs font-medium text-ink-500">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="hover:text-accent">
                      Demo ↗
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
