import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gana Calculator — Find if you are Deva, Manushya or Rakshasa",
  description: "Check your Gana compatibility for marriage and find out your innate temperament based on your Moon Nakshatra in Vedic Astrology.",
  keywords: "gana calculator, deva gana, manushya gana, rakshasa gana, kundli matching, guna milan",
  alternates: { canonical: "https://www.astroword.in/gana" },
  openGraph: {
    title: "Gana Calculator — Find if you are Deva, Manushya or Rakshasa",
    description: "Check your Gana compatibility for marriage and find out your innate temperament based on your Moon Nakshatra in Vedic Astrology.",
    url: "https://www.astroword.in/gana",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Gana Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gana Calculator — Find if you are Deva, Manushya or Rakshasa",
    description: "Check your Gana compatibility for marriage and find out your innate temperament based on your Moon Nakshatra in Vedic Astrology.",
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
