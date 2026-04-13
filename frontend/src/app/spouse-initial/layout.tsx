import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spouse Name Initial Predictor — Ancient Nakshatra Secrets | AstroWord",
  description: "Predict the first letter of your future spouse's name using Vedic Nakshatra Akshara mapping. AI analysis based on your birth chart.",
  keywords: "spouse name initial, future spouse name, nakshatra akshara, jaimini astrology name prediction, marriage astrology",
  alternates: { canonical: "https://astroword.in/spouse-initial" },
};

export default function SpouseInitialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
