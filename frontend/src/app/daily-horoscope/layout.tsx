import type { Metadata } from "next";
import DailyHoroscopeSEOContent from './DailyHoroscopeSEO';

export const metadata: Metadata = {
  title: "Daily Planetary Transits — Today's Astrology Reading",
  description: "Check today's planetary transits and get a personalised AI reading of how they affect your life. Accurate Vedic astrology transits using Swiss Ephemeris.",
  keywords: "daily transit, planetary transits today, today's planetary positions, vedic astrology transit reading, daily horoscope today, transit moon today, planet positions now",
  alternates: { canonical: "https://www.astroword.in/daily-horoscope" },
  openGraph: {
    title: "Daily Planetary Transits — Today's Astrology Reading",
    description: "Personalised daily astrology reading based on today's planetary transits and your birth chart.",
    url: "https://www.astroword.in/daily-horoscope",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Daily Transits" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Planetary Transits — Today's Astrology Reading",
    description: "Personalised daily astrology reading based on today's planetary transits.",
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
      "name": "What are planetary transits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Planetary transits refer to the continuous movement of planets through the zodiac signs as seen from Earth. In Vedic astrology (Jyotish), these transits are compared with your birth chart to predict current life events."
      }
    },
    {
      "@type": "Question",
      "name": "Which transit is most important for daily readings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Moon's transit is considered the most significant for daily emotional states and events, as it changes signs approximately every 2.25 days."
      }
    },
    {
      "@type": "Question",
      "name": "How does AstroWord calculate transits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AstroWord uses the professional-grade Swiss Ephemeris with the Lahiri Ayanamsa to ensure the highest degree of astronomical accuracy."
      }
    }
  ]
};

export default function TransitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
      <DailyHoroscopeSEOContent />
    </div>
  );
}
