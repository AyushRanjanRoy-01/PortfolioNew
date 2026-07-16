import Image from "next/image";
import { hero, profile } from "@/lib/content";

export default function Hero() {
  return (
    <section className="section pb-12 pt-16 sm:pb-20 sm:pt-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="section-label mb-5">{hero.kicker}</p>
          <h1 className="font-display text-[2.35rem] leading-[1.12] tracking-tight text-ink-900 sm:text-5xl sm:leading-[1.08]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-measure text-[15px] leading-7 text-ink-600 sm:text-base sm:leading-8">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              View selected work
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              Email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <aside className="lg:justify-self-end">
          <div className="overflow-hidden rounded-3xl border border-ink-200 bg-white p-3 shadow-[0_20px_60px_rgba(18,17,16,0.06)]">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-ink-100">
              <Image
                src="/images/profile.jpg"
                alt={profile.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 320px"
                priority
              />
            </div>
            <div className="space-y-1 px-2 pb-2 pt-4">
              <p className="font-medium text-ink-900">{profile.name}</p>
              <p className="text-sm text-ink-500">
                {profile.role} · {profile.company}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
                {profile.location}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
