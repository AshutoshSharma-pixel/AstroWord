import type { Metadata } from "next";
import SpouseInitialSEOContent from "./SpouseInitialSEO";

export const metadata: Metadata = {
  title: "Spouse Name Prediction by Astrology | First Letter Calculator",
  description: "Predict your spouse's name first letter using Vedic astrology. Our AI-powered tool uses your Darakaraka nakshatra and Jaimini system for accurate spouse name prediction.",
  keywords: "spouse name initial, future spouse name, nakshatra akshara, jaimini astrology name prediction, marriage astrology, spouse name prediction astrology, predict spouse name, husband name prediction astrology, wife name prediction astrology",
  alternates: { canonical: "https://www.astroword.in/spouse-initial" },
  openGraph: {
    title: "Spouse Name Initial Predictor — Vedic Astrology | AstroWord",
    description: "Predict your future spouse's first name initial using Nakshatra sounds and Vedic astrology. Free AI-powered reading.",
    url: "https://www.astroword.in/spouse-initial",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Spouse Name Prediction" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spouse Name Initial Predictor — Vedic Astrology | AstroWord",
    description: "Predict your future spouse's first name initial using Nakshatra sounds and Vedic astrology. Free AI-powered reading.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does spouse name prediction work in astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your chart has multiple marriage indicators—the 7th lord, the Darakaraka, and Venus. In most cases, these planets occupy different Nakshatras. If two or more point to the same sound, that initial is extremely likely."
      }
    },
    {
      "@type": "Question",
      "name": "Can you predict my spouse's name using Vedic astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Vedic tradition, this calculation refers to the \"calling name\" or the first name, as that is the vibration the individual responds to most frequently."
      }
    },
    {
      "@type": "Question",
      "name": "What if the initial doesn't match my current partner?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Astrology shows potential and destiny. If you are in a relationship that doesn't match the predicted initial, look at the qualities of the planet. Often, the partner will embody the energy of the predicted planet even if the name initial differs."
      }
    }
  ]
};

export default function SpouseInitialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
      <SpouseInitialSEOContent />
    </div>
  );
}

