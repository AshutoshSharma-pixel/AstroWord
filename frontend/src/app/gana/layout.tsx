import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gana Calculator — Free Vedic Soul Type Reading | AstroWord",
  description: "Find your Gana (Deva, Manushya or Rakshasa) from your Moon nakshatra. Free AI reading about your nature, temperament, and marriage compatibility.",
  keywords: "gana calculator, deva gana, manushya gana, rakshasa gana, kundli matching, guna milan",
  alternates: { canonical: "https://www.astroword.in/gana" },
  openGraph: {
    title: "Gana Calculator — Free Vedic Soul Type Reading",
    description: "Find your Gana (Deva, Manushya or Rakshasa) from your Moon nakshatra. Free AI reading about your nature, temperament, and marriage compatibility.",
    url: "https://www.astroword.in/gana",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Gana Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gana Calculator — Free Vedic Soul Type Reading",
    description: "Find your Gana (Deva, Manushya or Rakshasa) from your Moon nakshatra. Free AI reading about your nature, temperament, and marriage compatibility.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function GanaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
