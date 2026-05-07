import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amatyakaraka Calculator — Your Career Planet in Vedic Astrology",
  description: "Find your Amatyakaraka planet and learn what it reveals about your professional life, career success, and potential work fields.",
  keywords: "amatyakaraka calculator, career astrology, vedic career prediction, professional life jyotish",
  alternates: { canonical: "https://www.astroword.in/amatyakaraka" },
  openGraph: {
    title: "Amatyakaraka Calculator — Your Career Planet in Vedic Astrology",
    description: "Find your Amatyakaraka planet and learn what it reveals about your professional life, career success, and potential work fields.",
    url: "https://www.astroword.in/amatyakaraka",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Amatyakaraka Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amatyakaraka Calculator — Your Career Planet in Vedic Astrology",
    description: "Find your Amatyakaraka planet and learn what it reveals about your professional life, career success, and potential work fields.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function AmatyakarakaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
