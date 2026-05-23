import type { Metadata } from "next";
import PitraDoshaSEOContent from "./PitraDoshaSEO";

export const metadata: Metadata = {
  title: "Pitra Dosha Calculator — Check Ancestral Karma Affliction",
  description: "Check if you have Pitra Dosha in your birth chart. Discover ancestral karma planetary configurations, effects, and classical remedies.",
  keywords: "pitra dosha calculator, check pitra dosha free, pitru dosha remedies, sun conjunct rahu, 9th house affliction, ancestral karma in astrology, pitra dosha test, pitru paksha remedies, pitra dosha effects",
  alternates: { canonical: "https://www.astroword.in/pitra-dosha" },
  openGraph: {
    title: "Pitra Dosha Calculator — Check Ancestral Karma",
    description: "Check if you have Pitra Dosha in your birth chart. Discover ancestral karma planetary configurations, effects, and classical remedies.",
    url: "https://www.astroword.in/pitra-dosha",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Pitra Dosha Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pitra Dosha Calculator — Check Ancestral Karma",
    description: "Check if you have Pitra Dosha in your birth chart. Discover ancestral karma planetary configurations, effects, and classical remedies.",
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
      "name": "What is Pitra Dosha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pitra Dosha (or Pitru Dosha) is an astrological configuration in Vedic astrology indicating unresolved ancestral karma or debts. It occurs when key planetary significators of ancestors (primarily the Sun, the 9th house, or the 9th house lord) are afflicted by malefic shadow planets like Rahu or Ketu."
      }
    },
    {
      "@type": "Question",
      "name": "How is Pitra Dosha calculated in a birth chart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pitra Dosha is calculated by checking: 1) Sun conjunct Rahu or Ketu (within 10 degrees), 2) Sun in the 9th house afflicted by Rahu, Ketu, or Saturn, 3) The 9th house or 9th house lord aspected/conjoined by Rahu/Ketu, 4) Rahu or Ketu placed in the 9th house, or 5) Moon conjunct Rahu/Ketu (Grahan Yoga)."
      }
    },
    {
      "@type": "Question",
      "name": "What are the common symptoms of Pitra Dosha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common symptoms include delays or obstacles in career growth, frequent health issues or lack of vitality, difficulties in conceiving or obstacles related to children, constant friction in family relationships, and feeling a heavy weight of responsibility or obstacles that have no clear physical explanation."
      }
    },
    {
      "@type": "Question",
      "name": "Can Pitra Dosha be completely resolved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. In Vedic tradition, Pitra Dosha is resolved through ancestor-gratitude rituals. These include performing Pind Daan, organizing Shradh ceremonies during Pitru Paksha, donating food to the needy, feeding crows/cows, and chanting sacred mantras like the Gayatri Mantra or Sun mantras to strengthen the solar energy in the chart."
      }
    }
  ]
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pitra Dosha Calculator",
  "operatingSystem": "All",
  "applicationCategory": "AstrologyApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function PitraDoshaLayout({ children }: { children: React.ReactNode }) {
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
      <PitraDoshaSEOContent />
    </div>
  );
}
