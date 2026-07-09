import Avatar from "@/components/Avatar";
import { about, experience, profile } from "@/lib/content";

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

        {/* Skills — plain grouped lines */}
        <div className="reveal mt-9 max-w-readable space-y-2.5">
          {Object.entries(about.skills).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <div className="w-40 shrink-0 text-[13px] text-dim">{group}</div>
              <div className="text-[14.5px] text-ink">{items.join(", ")}</div>
            </div>
          ))}
        </div>

        {/* Experience — one line each; detail lives in the résumé */}
        <div className="reveal mt-10 max-w-readable">
          {experience.map((e) => (
            <div
              key={e.role}
              className="flex flex-wrap items-baseline justify-between gap-x-4 border-t border-line py-3 text-[14.5px]"
            >
              <span className="text-ink">
                {e.role} <span className="text-muted">· {e.company.replace("Accenture · ", "Accenture, ")}</span>
              </span>
              <span className="text-[12.5px] text-dim">{e.period}</span>
            </div>
          ))}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-dim">
            {about.facts.map((f) => (
              <span key={f.k}>
                {f.k}: <span className="text-muted">{f.v}</span>
              </span>
            ))}
          </div>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[14.5px] text-ink link"
          >
            Full details in my résumé ↗
          </a>
        </div>
      </div>
    </section>
  );
}
