import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amatyakaraka Calculator — Free AI Career Reading | AstroWord",
  description: "Discover your Amatyakaraka planet and get a free AI reading about your ideal career, professional strengths, and success path. Authentic Jaimini Vedic astrology.",
  keywords: "amatyakaraka calculator, career astrology, vedic career prediction, professional life jyotish",
  alternates: { canonical: "https://www.astroword.in/amatyakaraka" },
  openGraph: {
    title: "Amatyakaraka Calculator — Free AI Career Reading",
    description: "Discover your Amatyakaraka planet and get a free AI reading about your ideal career, professional strengths, and success path. Authentic Jaimini Vedic astrology.",
    url: "https://www.astroword.in/amatyakaraka",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Amatyakaraka Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amatyakaraka Calculator — Free AI Career Reading",
    description: "Discover your Amatyakaraka planet and get a free AI reading about your ideal career, professional strengths, and success path. Authentic Jaimini Vedic astrology.",
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
