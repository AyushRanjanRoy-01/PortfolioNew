import "./globals.css";
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { profile, hero } from "@/lib/content";

/** Body — modern, clear, professional */
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Display — editorial serif with distinctive character */
const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

/** Labels / technical crumbs */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL(profile.site),
  title: `${profile.name} — ${profile.role}`,
  description: hero.subtitle,
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
    description: hero.subtitle,
    type: "website",
    url: profile.site,
    siteName: profile.name,
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: hero.subtitle,
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport = { themeColor: "#0a0c10" };

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
