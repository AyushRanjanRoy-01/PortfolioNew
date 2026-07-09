import Avatar from "@/components/Avatar";
import { about, experience } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-content">
        <div className="reveal flex items-center gap-4">
          <div className="hidden h-12 w-12 shrink-0 overflow-hidden rounded-full sm:block">
            <Avatar />
          </div>
          <h2 className="text-[1.3rem] sm:text-[1.5rem]">About</h2>
        </div>

        <div className="reveal mt-6 max-w-readable space-y-4 text-[15.5px] leading-relaxed text-muted">
          {about.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Skills — plain grouped lines, sentence case */}
        <div className="reveal mt-9 max-w-readable space-y-2.5">
          {Object.entries(about.skills).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <div className="w-40 shrink-0 text-[13px] text-dim">{group}</div>
              <div className="text-[14.5px] text-ink">{items.join(", ")}</div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <h3 className="reveal mt-12 text-[1.15rem] font-semibold text-ink">Experience</h3>
        <div className="mt-5 max-w-2xl space-y-8">
          {experience.map((e) => (
            <div key={e.role} className="reveal">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h4 className="text-[15px] font-semibold text-ink">{e.role}</h4>
                <span className="text-[12.5px] text-dim">{e.period}</span>
              </div>
              <div className="mt-0.5 text-[13.5px] text-muted">{e.company}</div>
              <ul className="mt-3 space-y-2">
                {e.points.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                    <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-dim/70" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Facts */}
        <div className="reveal mt-11 max-w-readable border-t border-line pt-6 text-[13.5px] text-muted">
          {about.facts.map((f) => (
            <div key={f.k} className="flex gap-4 py-1.5">
              <span className="w-28 shrink-0 text-dim">{f.k}</span>
              <span className="text-ink">{f.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
