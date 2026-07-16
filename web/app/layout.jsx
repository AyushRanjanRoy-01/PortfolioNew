import "./globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile, hero } from "@/lib/content";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
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
    "AI Security Engineer",
    "AI Security",
    "Agent Governance",
    "Multi-Agent Systems",
    "LangGraph",
    "MCP",
    "Human-in-the-Loop",
    "Policy Enforcement",
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
    images: ["/images/profile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: hero.subtitle,
    images: ["/images/profile.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport = { themeColor: "#05070c" };

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
      <body className="min-h-screen bg-void-950 text-slate-100 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
