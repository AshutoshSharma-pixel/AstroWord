import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upapada Lagna Calculator — Free Jaimini Marriage Sign Calculator",
  description: "Calculate your Upapada Lagna (UL) free — the Jaimini astrology indicator for marriage destiny, spouse character, and marital karma. Based on your exact birth chart using Swiss Ephemeris with Lahiri ayanamsa.",
  keywords: "upapada lagna calculator, upapada lagna free, UL calculator jaimini, jaimini marriage lagna, arudha 12th house, upapada lagna meaning, marriage karma astrology, jaimini astrology calculator",
  alternates: { canonical: "https://www.astroword.in/upapada-lagna" },
  openGraph: {
    title: "Upapada Lagna Calculator — Jaimini Marriage Sign",
    description: "Free Upapada Lagna calculator. Find your UL sign, interpret your marriage destiny, and get a personalised AI reading based on your exact birth chart.",
    url: "https://www.astroword.in/upapada-lagna",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Upapada Lagna Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upapada Lagna Calculator — Jaimini Marriage Sign",
    description: "Free Upapada Lagna calculator with AI reading. Discover your marriage destiny from your Jaimini chart.",
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
      "name": "What is Upapada Lagna in Jaimini astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upapada Lagna (UL) is the Arudha Pada of the 12th house in Jaimini astrology. It reveals the nature of your marriage, the character of your spouse, and the karmic patterns surrounding your marital destiny. Unlike the 7th house in Parashari astrology, the UL shows the external, manifested reality of marriage."
      }
    },
    {
      "@type": "Question",
      "name": "How is Upapada Lagna calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To calculate Upapada Lagna: (1) Find the sign of the 12th house from your Ascendant. (2) Find the lord of that sign. (3) Count signs from the 12th house to the lord's position, inclusive. (4) Project the same number of signs from the lord. The resulting sign is your Upapada Lagna. If it falls on the 12th house itself or its 7th, add 10 more signs."
      }
    },
    {
      "@type": "Question",
      "name": "What does Upapada Lagna reveal about marriage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Upapada Lagna sign reveals the character and quality of your marriage. The sign itself describes the nature of the spouse and the marriage dynamic. The lord of the UL shows where and how the marriage will sustain. Planets in the UL sign add their energy to the marriage. The 2nd from UL (sustaining house) shows whether the marriage will be long-lasting."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Upapada Lagna and the 7th house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Parashari astrology, the 7th house shows the inner nature of partnerships and desire for union. The Upapada Lagna in Jaimini shows the external, manifested, and socially visible reality of marriage — what the marriage actually looks and feels like in the real world. Most Jaimini astrologers use both together for a complete marriage analysis."
      }
    },
    {
      "@type": "Question",
      "name": "Can Upapada Lagna indicate marriage timing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Periods (Dashas) of the Upapada lord or planets associated with the UL often coincide with marriage events. If the current Mahadasha or Antardasha lord has a connection to your Upapada Lagna — either by being the UL lord, aspecting the UL, or being placed in the UL sign — that period is often significant for marriage."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is AstroWord's Upapada Lagna calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AstroWord calculates Upapada Lagna using the Swiss Ephemeris with Lahiri ayanamsa — the standard used by professional Vedic astrologers in India. The calculation follows classical Jaimini rules including the exception rule (adding 10 signs when the Arudha falls on the house or its 7th). The AI reading interprets your specific UL sign, lord, and associated planets."
      }
    }
  ]
};

import UpapadaSEOContent from './UpapadaSEO';

export default function UpapadaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
      <UpapadaSEOContent />
    </div>
  );
}
