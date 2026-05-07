import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spouse Name Initial Predictor — Ancient Nakshatra Secrets",
  description: "Predict the first letter of your future spouse's name using Vedic Nakshatra Akshara mapping. AI analysis based on your birth chart.",
  keywords: "spouse name initial, future spouse name, nakshatra akshara, jaimini astrology name prediction, marriage astrology",
  alternates: { canonical: "https://www.astroword.in/spouse-initial" },
  openGraph: {
    title: "Spouse Name Initial Predictor — Ancient Nakshatra Secrets",
    description: "Predict the first letter of your future spouse's name using Vedic Nakshatra Akshara mapping. AI analysis based on your birth chart.",
    url: "https://www.astroword.in/spouse-initial",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Spouse Name Initial Predictor" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spouse Name Initial Predictor — Ancient Nakshatra Secrets",
    description: "Predict the first letter of your future spouse's name using Vedic Nakshatra Akshara mapping. AI analysis based on your birth chart.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function SpouseInitialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
