import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Love or Arranged Marriage Predictor — AI Vedic Analysis",
  description: "Will you have a love marriage or an arranged marriage? Get an AI-powered prediction based on your 5th house, 7th house, and D9 Navamsa chart.",
  keywords: "love or arranged marriage, marriage astrology, 7th house lord, d9 chart analysis, marriage prediction ai",
  alternates: { canonical: "https://www.astroword.in/marriage-type" },
  openGraph: {
    title: "Love or Arranged Marriage Predictor — AI Vedic Analysis",
    description: "Will you have a love marriage or an arranged marriage? Get an AI-powered prediction based on your 5th house, 7th house, and D9 Navamsa chart.",
    url: "https://www.astroword.in/marriage-type",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Marriage Type Predictor" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love or Arranged Marriage Predictor — AI Vedic Analysis",
    description: "Will you have a love marriage or an arranged marriage? Get an AI-powered prediction based on your 5th house, 7th house, and D9 Navamsa chart.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function MarriageTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
