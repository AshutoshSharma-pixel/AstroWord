import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Marriage Report — AI-Powered Kundli Marriage Prediction",
  description: "Get your complete Vedic marriage report in minutes. AI analyses your birth chart to predict your future spouse, marriage timing, love or arranged, spouse name initial and 2026-2027 forecast. ₹199 instant PDF.",
  keywords: "vedic marriage report, kundli marriage prediction, AI marriage astrology, future spouse prediction, marriage timing astrology, vedic astrology report",
  alternates: { canonical: "https://www.astroword.in/marriage-report" },
  openGraph: {
    title: "Vedic Marriage Report — AI-Powered Kundli Marriage Prediction",
    description: "Complete AI Vedic marriage report. Spouse profile, marriage timing, love or arranged prediction, 2026-2027 forecast. Instant PDF ₹199.",
    url: "https://www.astroword.in/marriage-report",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/Marriage%20Report%20Image%20.png", width: 1200, height: 630, alt: "AstroWord Vedic Marriage Report" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Marriage Report — AI-Powered Kundli Marriage Prediction",
    description: "Complete AI Vedic marriage report. Spouse profile, marriage timing, 2026-2027 forecast. Instant PDF ₹199.",
    images: ["https://www.astroword.in/Marriage%20Report%20Image%20.png"],
    site: "@astroword_in",
  },
};

export default function MarriageReportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
