import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moon Sign Calculator — Find Your Rashi by Date of Birth",
  description: "Find your Moon Sign (Chandra Rashi) free. Discover your emotional nature, nakshatra, and get a personalised AI reading based on your exact birth chart.",
  keywords: "moon sign calculator, rashi calculator, chandra rashi calculator, what is my moon sign, rashi by date of birth, moon sign vedic astrology, find my rashi, janma rashi calculator, moon sign meaning, rashi finder free",
  alternates: { canonical: "https://www.astroword.in/moon-sign" },
  openGraph: {
    title: "Moon Sign Calculator — Find Your Chandra Rashi",
    description: "Find your Moon Sign (Chandra Rashi) free. Discover your emotional nature, nakshatra, and get a personalised AI reading based on your exact birth chart.",
    url: "https://www.astroword.in/moon-sign",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Moon Sign Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moon Sign Calculator — Find Your Chandra Rashi",
    description: "Find your Moon Sign (Chandra Rashi) free. Discover your emotional nature, nakshatra, and get a personalised AI reading based on your exact birth chart.",
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
      "name": "What is Moon Sign in Vedic astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Vedic astrology, your Moon Sign (Chandra Rashi) is the zodiac sign the Moon was placed in at your exact birth moment. Unlike Western astrology which focuses on Sun Sign, Vedic astrology considers the Moon Sign as the primary indicator of your mind, emotions, and inner world. Your Moon Sign determines your Vimshottari Dasha starting point, making it the foundation of all Vedic timing calculations."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Moon Sign and Sun Sign?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your Sun Sign is determined by the date of birth and represents your outer personality, ego, and life purpose. Your Moon Sign is determined by the Moon's exact position at birth and represents your emotional nature, subconscious patterns, and inner self. In Vedic astrology, the Moon Sign (Rashi) is considered far more important than the Sun Sign for psychological analysis and predictions."
      }
    },
    {
      "@type": "Question",
      "name": "How is Moon Sign different from Nakshatra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your Moon Sign is the zodiac sign (one of 12) the Moon occupies. Your Nakshatra is the lunar mansion (one of 27) within that sign. Every Moon Sign contains approximately 2.25 Nakshatras. The Nakshatra adds a deeper layer — two people with Moon in Scorpio can have very different emotional natures if one has Moon in Vishakha and the other in Anuradha."
      }
    },
    {
      "@type": "Question",
      "name": "Can my Moon Sign change if my birth time is slightly off?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Moon moves through a sign in about 2.5 days — roughly 0.5 degrees per hour. A birth time error of even 30 minutes can shift the Moon's degree significantly, and near sign boundaries it can change your Moon Sign entirely. Always use the most accurate birth time available."
      }
    }
  ]
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Moon Sign Calculator",
  "operatingSystem": "All",
  "applicationCategory": "AstrologyApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

import MoonSignSEOContent from "./MoonSignSEO";

export default function MoonSignLayout({ children }: { children: React.ReactNode }) {
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
      <MoonSignSEOContent />
    </div>
  );
}
