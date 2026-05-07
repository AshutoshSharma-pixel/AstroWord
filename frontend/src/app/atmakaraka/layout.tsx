import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atmakaraka Calculator — Discover Your Soul Planet",
  description: "Identify your Atmakaraka planet to understand your soul's purpose, primary life lessons, and spiritual path in Vedic astrology.",
  keywords: "atmakaraka calculator, soul planet, life purpose astrology, vedic charts, jaimini karakas",
  alternates: { canonical: "https://www.astroword.in/atmakaraka" },
  openGraph: {
    title: "Atmakaraka Calculator — Discover Your Soul Planet",
    description: "Identify your Atmakaraka planet to understand your soul's purpose, primary life lessons, and spiritual path in Vedic astrology.",
    url: "https://www.astroword.in/atmakaraka",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Atmakaraka Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atmakaraka Calculator — Discover Your Soul Planet",
    description: "Identify your Atmakaraka planet to understand your soul's purpose, primary life lessons, and spiritual path in Vedic astrology.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function AtmakarakaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
