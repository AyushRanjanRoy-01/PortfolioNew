import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="container-page flex flex-col gap-1 text-sm text-stone-dim sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-[11px]">{profile.site.replace("https://", "")}</p>
      </div>
    </footer>
  );
}
