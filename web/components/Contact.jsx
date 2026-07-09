import { profile } from "@/lib/content";

export default function Contact() {
  const links = [
    { name: "GitHub", href: profile.github },
    { name: "LinkedIn", href: profile.linkedin },
  ];
  return (
    <section id="contact" className="border-t border-line px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-content">
        <h2 className="reveal text-[1.3rem] sm:text-[1.5rem]">Contact</h2>
        <p className="reveal mt-3 max-w-readable text-[15.5px] leading-relaxed text-muted">
          Open to senior roles and interesting work.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="reveal mt-4 inline-block text-[1.05rem] text-ink link"
        >
          {profile.email}
        </a>
        <div className="reveal mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
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
