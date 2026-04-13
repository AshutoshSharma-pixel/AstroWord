import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Darakaraka Calculator — Who is your Future Spouse? | AstroWord",
  description: "Find your Darakaraka planet and discover details about your spouse's personality, appearance, and career using Vedic Jaimini astrology.",
  keywords: "darakaraka calculator, future spouse prediction, vedic astrology spouse, jaimini astrology, marriage prediction",
  alternates: { canonical: "https://astroword.in/darakaraka" },
};

export default function DarakarakaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
