import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Darakaraka Calculator — Find Your Future Spouse (Free AI Reading)",
  description: "Find your Darakaraka planet and get a free AI-powered reading about your future spouse's personality, appearance, and career. Based on authentic Jaimini astrology.",
  keywords: "darakaraka calculator, future spouse prediction, vedic astrology spouse, jaimini astrology, marriage prediction",
  alternates: { canonical: "https://www.astroword.in/darakaraka" },
  openGraph: {
    title: 'Darakaraka Calculator — Find Your Future Spouse',
    description: 'Find your Darakaraka planet and discover your future spouse personality, appearance, and career using Jaimini Vedic astrology. Free AI-powered calculator.',
    url: 'https://www.astroword.in/darakaraka',
    type: 'website',
    locale: 'en_IN',
    siteName: 'AstroWord',
    images: [{
      url: 'https://www.astroword.in/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Darakaraka Calculator — AstroWord'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darakaraka Calculator — Find Your Future Spouse',
    description: 'Find your Darakaraka planet and discover your future spouse personality, appearance, and career using Jaimini Vedic astrology.',
    site: '@astroword_in',
    images: ['https://www.astroword.in/og-image.png']
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Darakaraka planet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Jaimini Astrology, the Darakaraka is the planet that has the lowest degree in your birth chart (excluding Rahu and Ketu). This planet represents your soulmate or spouse and reveals their nature, physical appearance, and temperament."
      }
    },
    {
      "@type": "Question",
      "name": "Can Rahu or Ketu be Darakaraka?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In the standard 7-karaka system used by AstroWord, Rahu and Ketu are not considered for Darakaraka. Only the 7 main planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) are used."
      }
    },
    {
      "@type": "Question",
      "name": "What if my Darakaraka is Sun?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Sun Darakaraka indicates a spouse who is authoritative, confident, and potentially comes from a respected family. They may have a regal bearing and a strong sense of self."
      }
    },
    {
      "@type": "Question",
      "name": "What if my Darakaraka is Moon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Moon Darakaraka suggests a spouse who is nurturing, emotional, and very caring. They are likely to be family-oriented and have a soft, attractive appearance."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the Darakaraka for spouse prediction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Darakaraka is one of the most reliable indicators for spouse personality in Vedic astrology. However, for a complete picture, one should also analyze the 7th house and the Navamsa (D9) chart."
      }
    }
  ]
};

import DarakarakaSEOContent from './DarakarakaSEO';

export default function DarakarakaLayout({
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
      <DarakarakaSEOContent />
    </div>
  );
}
