import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lagna Calculator — Find Your Ascendant Rising Sign",
  description: "Find your Lagna (Ascendant) free. Discover your rising sign, personality, physical traits, and get a personalised AI reading based on your exact birth chart.",
  keywords: "lagna calculator, ascendant calculator, rising sign calculator, janma lagna calculator, what is my lagna, lagna by date of birth, ascendant vedic astrology, rising sign vedic, lagna meaning astrology, ascendant sign free",
  alternates: { canonical: "https://www.astroword.in/lagna-calculator" },
  openGraph: {
    title: "Lagna Calculator — Find Your Vedic Ascendant",
    description: "Find your Lagna (Ascendant) free. Discover your rising sign, personality, physical traits, and get a personalised AI reading based on your exact birth chart.",
    url: "https://www.astroword.in/lagna-calculator",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Lagna Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lagna Calculator — Find Your Vedic Ascendant",
    description: "Find your Lagna (Ascendant) free. Discover your rising sign, personality, physical traits, and get a personalised AI reading based on your exact birth chart.",
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
      "name": "What is Lagna in Vedic astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lagna (also called Ascendant or Rising Sign) is the zodiac sign rising on the eastern horizon at the exact moment and place of your birth. It forms the first house of your birth chart and is considered the most important point in Vedic astrology — more important than the Sun or Moon sign for physical appearance, personality, and overall life direction."
      }
    },
    {
      "@type": "Question",
      "name": "How often does the Lagna change?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Lagna changes approximately every 2 hours as Earth rotates. This means two people born on the same day but 2 hours apart can have completely different Lagnas. This is why accurate birth time is essential for Lagna calculation — even a 5-minute error can shift the Lagna degree significantly."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Lagna and Moon Sign?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your Lagna represents your physical body, outer personality, and how you approach life. Your Moon Sign represents your inner emotional world and subconscious mind. In Vedic astrology, both are important — the Lagna shows your external reality, while the Moon Sign shows your internal experience."
      }
    },
    {
      "@type": "Question",
      "name": "What is Lagna lord and why is it important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Lagna lord is the ruling planet of your Ascendant sign. Its placement in your birth chart — which house and sign it occupies — tells you where your life's energy and focus is directed. A strong Lagna lord indicates good health, clear purpose, and overall wellbeing."
      }
    }
  ]
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lagna Calculator",
  "operatingSystem": "All",
  "applicationCategory": "AstrologyApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

import LagnaSEOContent from "./LagnaSEO";

export default function LagnaLayout({ children }: { children: React.ReactNode }) {
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
      <LagnaSEOContent />
    </div>
  );
}
