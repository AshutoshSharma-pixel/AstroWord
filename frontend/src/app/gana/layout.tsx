import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gana Calculator — Find if you are Deva, Manushya or Rakshasa | AstroWord",
  description: "Check your Gana compatibility for marriage and find out your innate temperament based on your Moon Nakshatra in Vedic Astrology.",
  keywords: "gana calculator, deva gana, manushya gana, rakshasa gana, kundli matching, guna milan",
  alternates: { canonical: "https://astroword.in/gana" },
};

export default function GanaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
