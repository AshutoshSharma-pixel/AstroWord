import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Love or Arranged Marriage Predictor — AI Vedic Analysis | AstroWord",
  description: "Will you have a love marriage or an arranged marriage? Get an AI-powered prediction based on your 5th house, 7th house, and D9 Navamsa chart.",
  keywords: "love or arranged marriage, marriage astrology, 7th house lord, d9 chart analysis, marriage prediction ai",
  alternates: { canonical: "https://astroword.in/marriage-type" },
};

export default function MarriageTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
