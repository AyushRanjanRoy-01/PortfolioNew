import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8">
      <div className="container-page flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-slate-600">
          Minimal · Futuristic · Built to explore
        </p>
      </div>
    </footer>
  );
}
