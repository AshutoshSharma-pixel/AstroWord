import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amatyakaraka Calculator — Your Career Planet in Vedic Astrology | AstroWord",
  description: "Find your Amatyakaraka planet and learn what it reveals about your professional life, career success, and potential work fields.",
  keywords: "amatyakaraka calculator, career astrology, vedic career prediction, professional life jyotish",
  alternates: { canonical: "https://astroword.in/amatyakaraka" },
};

export default function AmatyakarakaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
