import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-9">
      <div className="container-page flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-dim">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-stone-muted">{profile.name}</span>
        </p>
        <p className="font-display text-[1.05rem] italic tracking-tight text-stone-muted">
          {profile.site.replace("https://", "")}
        </p>
      </div>
    </footer>
  );
}
