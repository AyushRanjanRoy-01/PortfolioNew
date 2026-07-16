import "./globals.css";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { profile, hero } from "@/lib/content";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(profile.site),
  title: `${profile.name} — ${profile.role}`,
  description: hero.subtitle,
  keywords: [
    "AI Engineer",
    "Multi-Agent Systems",
    "LangGraph",
    "MCP",
    "RAG",
    "LLMOps",
    "Ayush Ranjan Roy",
    "Accenture",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: hero.subtitle,
    type: "website",
    url: profile.site,
    siteName: `${profile.name} · Portfolio`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: hero.subtitle,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport = { themeColor: "#f7f7f5" };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: "Accenture" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressCountry: "IN",
  },
  email: `mailto:${profile.email}`,
  url: profile.site,
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-ink-50 text-ink-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
