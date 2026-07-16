import { profile } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="section rule">
      <div className="container-page">
        <div className="rounded-3xl border border-ink-200 bg-ink-900 px-6 py-12 text-ink-50 sm:px-12 sm:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
            Contact
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            Open to senior AI engineering roles and hard production problems.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-ink-300">
            If you&apos;re building agent platforms, LLM gateways, or RAG systems that need to
            survive real traffic — I&apos;d like to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-900 hover:bg-ink-100"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn rounded-full border border-ink-600 px-5 py-2.5 text-sm text-ink-100 hover:border-ink-400"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn rounded-full border border-ink-600 px-5 py-2.5 text-sm text-ink-100 hover:border-ink-400"
            >
              GitHub ↗
            </a>
            <a
              href={profile.resume}
              className="btn rounded-full border border-ink-600 px-5 py-2.5 text-sm text-ink-100 hover:border-ink-400"
            >
              Resume PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
