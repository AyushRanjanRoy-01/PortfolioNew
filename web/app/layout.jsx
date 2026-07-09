import "./globals.css";
import { Inter } from "next/font/google";
import { profile, hero } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "AI Engineer at Accenture — production multi-agent systems, MCP tool gateways, RAG, and the routing, governance and eval that keep LLMs reliable in production.",
  keywords: [
    "AI Engineer", "Multi-Agent Systems", "LangGraph", "MCP", "RAG",
    "LLMOps", "Full Stack", "Ayush Ranjan Roy",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: hero.sub,
    type: "website",
    siteName: `${profile.name} · Portfolio`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: hero.sub,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport = { themeColor: "#FBFBF9" };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: "Accenture" },
  address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressCountry: "IN" },
  email: `mailto:${profile.email}`,
  url: profile.github,
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
