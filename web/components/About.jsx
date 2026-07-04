import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import { about, experience } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="reveal mb-3 font-mono text-[12.5px] uppercase tracking-[0.2em] text-accent-soft">
          About
        </div>

        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          {/* Left: photo + facts */}
          <div className="reveal">
            <div className="mx-auto max-w-[260px] lg:sticky lg:top-24">
              <Avatar />
              <dl className="mt-6 space-y-3">
                {about.facts.map((f) => (
                  <div key={f.k} className="text-[13.5px]">
                    <dt className="text-dim">{f.k}</dt>
                    <dd className="text-ink">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right: bio + skills + experience */}
          <div>
            <h2 className="reveal max-w-2xl text-3xl font-semibold sm:text-4xl">
              I build LLM systems like critical infrastructure.
            </h2>
            <div className="reveal mt-5 space-y-4 text-[15.5px] leading-relaxed text-muted">
              {about.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Skills */}
            <div className="reveal mt-10 grid gap-5 sm:grid-cols-2">
              {Object.entries(about.skills).map(([group, items]) => (
                <div key={group}>
                  <h4 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-dim">{group}</h4>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {items.map((s) => (
                      <span key={s} className="rounded-md border border-line bg-surface/60 px-2.5 py-1 text-[12.5px] text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            <h3 className="reveal mt-12 font-display text-xl font-semibold text-ink">Experience</h3>
            <div className="mt-5 space-y-8">
              {experience.map((e) => (
                <div key={e.role} className="reveal border-l border-line pl-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h4 className="text-[16px] font-semibold text-ink">{e.role}</h4>
                    <span className="font-mono text-[12px] text-dim">{e.period}</span>
                  </div>
                  <div className="mt-0.5 text-[13.5px] text-accent-soft">{e.company}</div>
                  <ul className="mt-3 space-y-2">
                    {e.points.map((pt, i) => (
                      <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                        <Icon name="arrowRight" size={15} className="mt-1 shrink-0 text-accent/70" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
