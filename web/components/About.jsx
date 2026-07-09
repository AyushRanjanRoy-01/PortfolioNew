import Avatar from "@/components/Avatar";
import { about, experience } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-content">
        <div className="flex items-start gap-5">
          <div className="reveal hidden shrink-0 sm:block">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <Avatar />
            </div>
          </div>
          <div>
            <h2 className="reveal text-[1.6rem] sm:text-[1.9rem]">About</h2>
          </div>
        </div>

        <div className="reveal mt-6 max-w-readable space-y-4 text-[16px] leading-relaxed text-muted">
          {about.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Skills — plain grouped lines, no pills */}
        <div className="reveal mt-10 max-w-readable space-y-3">
          {Object.entries(about.skills).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <div className="w-44 shrink-0 text-[13px] uppercase tracking-wide text-dim">{group}</div>
              <div className="text-[15px] text-ink">{items.join(", ")}</div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <h3 className="reveal mt-14 font-display text-[1.3rem] text-ink">Experience</h3>
        <div className="mt-6 max-w-2xl space-y-9">
          {experience.map((e) => (
            <div key={e.role} className="reveal">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h4 className="text-[16px] font-semibold text-ink">{e.role}</h4>
                <span className="text-[13px] text-dim">{e.period}</span>
              </div>
              <div className="mt-0.5 text-[14px] text-muted">{e.company}</div>
              <ul className="mt-3 space-y-2.5">
                {e.points.map((pt, i) => (
                  <li key={i} className="pl-4 text-[15px] leading-relaxed text-muted [text-indent:-0.9rem]">
                    <span className="text-dim">—</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Facts */}
        <div className="reveal mt-12 max-w-readable border-t border-line pt-6 text-[14px] text-muted">
          {about.facts.map((f, i) => (
            <div key={f.k} className={`flex gap-4 py-1.5 ${i ? "" : ""}`}>
              <span className="w-28 shrink-0 text-dim">{f.k}</span>
              <span className="text-ink">{f.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
