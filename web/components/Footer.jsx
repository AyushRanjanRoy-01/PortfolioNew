import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 py-8">
      <div className="container-page flex flex-col gap-3 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-ink-400">
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
