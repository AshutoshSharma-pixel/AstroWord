import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atmakaraka Calculator — Free AI Soul Purpose Reading | AstroWord",
  description: "Find your Atmakaraka — the most important planet in your chart — and get a free AI reading about your soul's purpose and karmic lessons in this lifetime.",
  keywords: "atmakaraka calculator, soul planet, life purpose astrology, vedic charts, jaimini karakas",
  alternates: { canonical: "https://www.astroword.in/atmakaraka" },
  openGraph: {
    title: "Atmakaraka Calculator — Free AI Soul Purpose Reading",
    description: "Find your Atmakaraka — the most important planet in your chart — and get a free AI reading about your soul's purpose and karmic lessons in this lifetime.",
    url: "https://www.astroword.in/atmakaraka",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Atmakaraka Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atmakaraka Calculator — Free AI Soul Purpose Reading",
    description: "Find your Atmakaraka — the most important planet in your chart — and get a free AI reading about your soul's purpose and karmic lessons in this lifetime.",
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
