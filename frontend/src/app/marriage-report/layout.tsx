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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is this different from a generic horoscope?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This report is generated from your exact birth details — date, time and place. Every section is calculated from your personal planetary positions, not sun sign generalisations. The AI runs all 7 Vedic calculators on your chart and then writes a 1200+ word personalised reading."
      }
    },
    {
      "@type": "Question",
      "name": "What birth details do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You need your date of birth, exact time of birth (from birth certificate or family records), and place of birth. Time accuracy matters — even 15 minutes off can change your ascendant and house placements."
      }
    },
    {
      "@type": "Question",
      "name": "Which ayanamsa does AstroWord use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AstroWord uses the Lahiri ayanamsa with Swiss Ephemeris — the same standard used by most professional Vedic astrologers in India."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to generate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "About 30-60 seconds after payment. The AI analyses your chart and writes the full report in one pass. You get an instant PDF download link."
      }
    },
    {
      "@type": "Question",
      "name": "Is the payment secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Payments are processed by Razorpay, India's most trusted payment gateway. AstroWord never sees or stores your card details."
      }
    }
  ]
};

export default function MarriageReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
