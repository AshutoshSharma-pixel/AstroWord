import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nakshatra Calculator — Find Your Birth Star",
  description: "Find your Janma Nakshatra (birth star) free. Discover your ruling deity, planetary lord, gana, and get a personalised AI reading based on your exact nakshatra and pada.",
  keywords: "nakshatra calculator, birth star calculator, janma nakshatra, nakshatra finder, my nakshatra, nakshatra by date of birth, 27 nakshatras calculator, birth star vedic astrology, nakshatra and pada, nakshatra meaning",
  alternates: { canonical: "https://www.astroword.in/nakshatra-calculator" },
  openGraph: {
    title: "Nakshatra Calculator — Find Your Vedic Birth Star",
    description: "Find your Janma Nakshatra (birth star) free. Discover your ruling deity, planetary lord, gana, and get a personalised AI reading based on your exact nakshatra and pada.",
    url: "https://www.astroword.in/nakshatra-calculator",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Nakshatra Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nakshatra Calculator — Find Your Vedic Birth Star",
    description: "Find your Janma Nakshatra (birth star) free. Discover your ruling deity, planetary lord, gana, and get a personalised AI reading based on your exact nakshatra and pada.",
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
      "name": "What is a Nakshatra in Vedic astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Nakshatra is a lunar mansion — one of 27 equal segments of the sky, each spanning 13 degrees and 20 minutes. The Moon travels through all 27 Nakshatras in one month. Your birth Nakshatra (Janma Nakshatra) is the one the Moon occupied at your exact birth time. Each Nakshatra has a ruling planet, deity, symbol, and unique qualities that reveal your deepest personality traits and life path."
      }
    },
    {
      "@type": "Question",
      "name": "How many Nakshatras are there?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There are 27 Nakshatras used in Vedic astrology calculations, each divided into 4 Padas (quarters), giving 108 Padas in total. Some texts mention a 28th Nakshatra called Abhijit, but it is rarely used in standard calculations. Your specific Pada within the Nakshatra adds another layer of precision to your reading."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Nakshatra and Rashi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your Rashi (Moon Sign) is which of the 12 zodiac signs the Moon occupies. Your Nakshatra is which of the 27 lunar mansions within that sign it occupies. Every zodiac sign contains approximately 2.25 Nakshatras. The Nakshatra is more specific — two people with the same Moon Sign can have completely different temperaments based on their Nakshatra."
      }
    },
    {
      "@type": "Question",
      "name": "Why is Nakshatra important for marriage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Vedic marriage matching (Guna Milan), the Nakshatra determines Gana (temperament category), Yoni (compatibility category), Nadi (health compatibility), and Tara (friendship compatibility) — four of the eight compatibility factors. The Nakshatra also determines the starting syllable of your spouse's name in Jaimini astrology."
      }
    }
  ]
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Nakshatra Calculator",
  "operatingSystem": "All",
  "applicationCategory": "AstrologyApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

import NakshatraSEOContent from "./NakshatraSEO";

export default function NakshatraLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {children}
      <NakshatraSEOContent />
    </div>
  );
}
