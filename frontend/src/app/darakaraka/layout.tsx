import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Darakaraka Calculator — Free AI Spouse Reading",
  description: "Find your Darakaraka planet and get a free AI-powered reading about your future spouse's personality, appearance, and career. Based on authentic Jaimini astrology.",
  keywords: "darakaraka calculator, future spouse prediction, vedic astrology spouse, jaimini astrology, marriage prediction",
  alternates: { canonical: "https://www.astroword.in/darakaraka" },
  openGraph: {
    title: "Darakaraka Calculator — Free AI Spouse Reading",
    description: "Find your Darakaraka planet and get a free AI-powered reading about your future spouse's personality, appearance, and career. Based on authentic Jaimini astrology.",
    url: "https://www.astroword.in/darakaraka",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Darakaraka Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darakaraka Calculator — Free AI Spouse Reading",
    description: "Find your Darakaraka planet and get a free AI-powered reading about your future spouse's personality, appearance, and career. Based on authentic Jaimini astrology.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function DarakarakaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
