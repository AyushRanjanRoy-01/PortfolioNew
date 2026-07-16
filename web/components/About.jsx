import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="section rule">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-label">About</p>
          <h2 className="mb-6 font-display text-3xl tracking-tight text-ink-900 sm:text-4xl">
            LLM systems as critical infrastructure
          </h2>
          <div className="prose-tight space-y-4">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-ink-200 bg-white px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                  {f.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="section-label">Stack</p>
          <div className="space-y-6">
            {Object.entries(about.skills).map(([group, items]) => (
              <div key={group}>
                <h3 className="mb-2 text-sm font-semibold text-ink-800">{group}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
