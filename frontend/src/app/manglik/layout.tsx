import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manglik Dosha Calculator — Am I Manglik?",
  description: "Free Manglik Dosha calculator. Find out if you are Manglik, your severity level, cancellation factors, and get a personalised AI reading with remedies. Based on your exact birth chart.",
  keywords: "manglik calculator, am I manglik, manglik dosha checker, manglik dosha calculator free, manglik dosha remedies, mars dosha calculator",
  alternates: { canonical: "https://www.astroword.in/manglik" },
  openGraph: {
    title: "Manglik Dosha Calculator — Am I Manglik?",
    description: "Free Manglik calculator. Instant result — Manglik status, severity, cancellations, AI reading and remedies from your exact birth chart.",
    url: "https://www.astroword.in/manglik",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Manglik Dosha Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manglik Dosha Calculator — Am I Manglik?",
    description: "Free Manglik calculator with AI reading and remedies.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function ManglikLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
