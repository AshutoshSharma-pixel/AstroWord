import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marriage Year Predictor — Vedic Accuracy with AI | AstroWord",
  description: "Find out exactly when you will get married. Calculate your Vimsottari Dasha and planet transits to predict your most likely marriage timing.",
  keywords: "marriage year predictor, when will i get married, dasha timing, marriage prediction calculator, vedic dasha analysis",
  alternates: { canonical: "https://astroword.in/marriage-year" },
};

export default function MarriageYearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
