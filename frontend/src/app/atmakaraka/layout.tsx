import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atmakaraka Calculator — Discover Your Soul Planet | AstroWord",
  description: "Identify your Atmakaraka planet to understand your soul's purpose, primary life lessons, and spiritual path in Vedic astrology.",
  keywords: "atmakaraka calculator, soul planet, life purpose astrology, vedic charts, jaimini karakas",
  alternates: { canonical: "https://astroword.in/atmakaraka" },
};

export default function AtmakarakaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
