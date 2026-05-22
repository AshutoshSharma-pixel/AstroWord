import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaal Sarp Dosha Calculator — Am I Affected? Check Free",
  description: "Free Kaal Sarp Dosha calculator. Find out instantly if you have Kaal Sarp Dosha in your birth chart, your specific type, severity level, and get a personalised AI reading with Vedic remedies.",
  keywords: "kaal sarp dosha calculator, kaal sarp dosha check, kaal sarp dosha remedies, anant kaal sarp dosha, kulik kaal sarp dosha, sheshnag kaal sarp dosha, rahu ketu dosha, vedic astrology calculator, kaal sarp dosha types",
  alternates: { canonical: "https://www.astroword.in/kaal-sarp-dosha" },
  openGraph: {
    title: "Kaal Sarp Dosha Calculator — Am I Affected? Check Free",
    description: "Free Kaal Sarp Dosha calculator. Discover if you have Kaal Sarp Dosha, its type, severity, and get a personalised AI reading with remedies based on your birth chart.",
    url: "https://www.astroword.in/kaal-sarp-dosha",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Kaal Sarp Dosha Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaal Sarp Dosha Calculator — Am I Affected? Check Free",
    description: "Free Kaal Sarp Dosha calculator with AI reading and Vedic remedies. Instant result.",
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
      "name": "What is Kaal Sarp Dosha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kaal Sarp Dosha occurs when all seven main planets (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn) are hemmed between the shadow planets Rahu (North Node) and Ketu (South Node) in a birth chart."
      }
    },
    {
      "@type": "Question",
      "name": "What are the 12 types of Kaal Sarp Dosha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 12 types are Anant, Kulik, Vasuki, Shankhpal, Padma, Mahapadma, Takshak, Karkotak, Shankhnaad, Ghatak, Vishdhar, and Sheshnag. They are determined by the house placement of Rahu and Ketu."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Anulom and Vilom Kaal Sarp Dosha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anulom Kaal Sarp Dosha occurs when planets are hemmed going clockwise from Rahu to Ketu. Vilom Kaal Sarp Dosha occurs when they are hemmed from Ketu to Rahu. Vilom is generally considered less intense or severe."
      }
    },
    {
      "@type": "Question",
      "name": "Does Kaal Sarp Dosha cause delays in marriage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, depending on the house placement (specifically if Rahu or Ketu is in the 1st, 2nd, 7th, or 8th house), it can cause relationship obstacles, communication gaps, or delays in marriage."
      }
    },
    {
      "@type": "Question",
      "name": "What are effective remedies for Kaal Sarp Dosha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common remedies include reciting the Maha Mrityunjaya Mantra daily, performing Rudrabhishek, visiting Shiva temples on Mondays, and chanting Rahu and Ketu Beej mantras."
      }
    }
  ]
};

import KaalSarpSEOContent from './KaalSarpSEO';

export default function KaalSarpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
      <KaalSarpSEOContent />
    </div>
  );
}
