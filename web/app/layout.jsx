import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile, hero } from "@/lib/content";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL(profile.site),
  title: `${profile.name} — ${profile.role}`,
  description: hero.blurb,
  keywords: [
    "AI Engineer",
    "Platform Engineer",
    "Multi-Agent Systems",
    "RAG",
    "Accenture",
    "Ayush Ranjan Roy",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: hero.blurb,
    type: "website",
    url: profile.site,
    siteName: profile.name,
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: hero.blurb,
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport = { themeColor: "#0b1220" };

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
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-ink text-stone antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
