"use client";

import { about } from "@/lib/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-page max-w-3xl">
        <Reveal>
          <h2 className="section-title">About</h2>
        </Reveal>

        <Reveal delay={30}>
          <div className="space-y-4 text-[0.98rem] leading-7 text-stone-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        {about.education && (
          <Reveal delay={50}>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-stone">Education</h3>
              <p className="mt-2 text-[0.95rem] text-stone-muted">
                {about.education.degree}
                <span className="text-stone-dim">
                  {" "}
                  · {about.education.school}, {about.education.period}
                </span>
              </p>
              {about.education.coursework?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {about.education.coursework.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        )}

        <Reveal delay={70}>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {Object.entries(about.skills).map(([group, items]) => (
              <div key={group}>
                <h3 className="text-sm font-medium text-stone">{group}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
