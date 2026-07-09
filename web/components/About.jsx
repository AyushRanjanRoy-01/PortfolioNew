import Avatar from "@/components/Avatar";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-content">
        <div className="reveal flex items-center gap-4">
          <div className="hidden h-12 w-12 shrink-0 overflow-hidden rounded-full sm:block">
            <Avatar />
          </div>
          <h2 className="flex items-center gap-2.5 text-[1.3rem] sm:text-[1.5rem]">
            <span className="inline-block h-2 w-2 bg-accent" />About
          </h2>
        </div>

        <div className="reveal mt-6 max-w-readable space-y-4 text-[15.5px] leading-relaxed text-muted">
          {about.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
