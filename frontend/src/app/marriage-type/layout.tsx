import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Love or Arranged Marriage? Free AI Astrology Prediction",
  description: "Find out if your birth chart shows love marriage or arranged marriage. Free AI analysis of your 5th house, 7th house, Venus, and Rahu placements.",
  keywords: "love or arranged marriage, marriage astrology, 7th house lord, d9 chart analysis, marriage prediction ai",
  alternates: { canonical: "https://www.astroword.in/marriage-type" },
  openGraph: {
    title: "Love or Arranged Marriage? Free AI Astrology Prediction",
    description: "Find out if your birth chart shows love marriage or arranged marriage. Free AI analysis of your 5th house, 7th house, Venus, and Rahu placements.",
    url: "https://www.astroword.in/marriage-type",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Marriage Type Predictor" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love or Arranged Marriage? Free AI Astrology Prediction",
    description: "Find out if your birth chart shows love marriage or arranged marriage. Free AI analysis of your 5th house, 7th house, Venus, and Rahu placements.",
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
