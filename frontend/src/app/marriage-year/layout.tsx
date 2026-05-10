import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "When Will I Get Married? Free AI Vedic Prediction | AstroWord",
  description: "Get a free AI-powered Vedic astrology prediction for your marriage year. Based on Vimsottari Dasha, Jupiter transits, and 7th house activation in your birth chart.",
  keywords: "marriage year predictor, when will i get married, dasha timing, marriage prediction calculator, vedic dasha analysis",
  alternates: { canonical: "https://www.astroword.in/marriage-year" },
  openGraph: {
    title: "When Will I Get Married? Free AI Vedic Prediction",
    description: "Get a free AI-powered Vedic astrology prediction for your marriage year. Based on Vimsottari Dasha, Jupiter transits, and 7th house activation in your birth chart.",
    url: "https://www.astroword.in/marriage-year",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Marriage Year Predictor" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "When Will I Get Married? Free AI Vedic Prediction",
    description: "Get a free AI-powered Vedic astrology prediction for your marriage year. Based on Vimsottari Dasha, Jupiter transits, and 7th house activation in your birth chart.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function MarriageYearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
