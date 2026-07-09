import { profile } from "@/lib/content";

export default function Contact() {
  const links = [
    { name: "GitHub", href: profile.github },
    { name: "LinkedIn", href: profile.linkedin },
    { name: "Résumé", href: profile.resume },
  ];
  return (
    <section id="contact" className="border-t border-line px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-content">
        <h2 className="reveal text-[1.6rem] sm:text-[1.9rem]">Contact</h2>
        <p className="reveal mt-4 max-w-readable text-[16px] leading-relaxed text-muted">
          Open to senior Gen AI / full-stack roles and interesting collaborations.
          The fastest way to reach me is email.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="reveal mt-5 inline-block font-display text-[1.35rem] text-ink link"
        >
          {profile.email}
        </a>
        <div className="reveal mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-ink"
            >
              {l.name} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
