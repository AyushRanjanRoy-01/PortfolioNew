import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" className="section rule">
      <div className="container-page">
        <p className="section-label">Experience</p>
        <h2 className="mb-10 font-display text-3xl tracking-tight text-ink-900 sm:text-4xl">
          Where I&apos;ve built systems
        </h2>

        <div className="space-y-0">
          {experience.map((job, i) => (
            <article
              key={job.period}
              className={`grid gap-4 py-8 sm:grid-cols-[11rem_1fr] sm:gap-10 ${
                i !== experience.length - 1 ? "border-b border-ink-200" : ""
              }`}
            >
              <div>
                <p className="font-mono text-xs text-ink-500">{job.period}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink-900">{job.role}</h3>
                <p className="mt-0.5 text-sm text-ink-500">{job.company}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-4 text-sm leading-6 text-ink-600 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
