import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marriage Year Predictor — Vedic Accuracy with AI",
  description: "Find out exactly when you will get married. Calculate your Vimsottari Dasha and planet transits to predict your most likely marriage timing.",
  keywords: "marriage year predictor, when will i get married, dasha timing, marriage prediction calculator, vedic dasha analysis",
  alternates: { canonical: "https://www.astroword.in/marriage-year" },
  openGraph: {
    title: "Marriage Year Predictor — Vedic Accuracy with AI",
    description: "Find out exactly when you will get married. Calculate your Vimsottari Dasha and planet transits to predict your most likely marriage timing.",
    url: "https://www.astroword.in/marriage-year",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Marriage Year Predictor" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marriage Year Predictor — Vedic Accuracy with AI",
    description: "Find out exactly when you will get married. Calculate your Vimsottari Dasha and planet transits to predict your most likely marriage timing.",
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
