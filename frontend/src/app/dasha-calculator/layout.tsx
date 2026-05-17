import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vimshottari Dasha Calculator — Find Your Current Mahadasha & Antardasha",
  description: "Free Vimshottari Dasha calculator by date of birth. Find your current Mahadasha, Antardasha and get an AI-powered personalised reading based on your birth chart. Powered by Swiss Ephemeris + Lahiri Ayanamsa.",
  keywords: "vimshottari dasha calculator, mahadasha calculator, current mahadasha, dasha calculator by date of birth, antardasha calculator, what mahadasha am I in, vimshottari dasha prediction, mahadasha antardasha free, vedic dasha calculator, jyotish dasha",
  alternates: {
    canonical: "https://www.astroword.in/dasha-calculator"
  },
  openGraph: {
    title: "Vimshottari Dasha Calculator — Your Current Mahadasha & AI Reading | AstroWord",
    description: "Find your current Mahadasha and Antardasha with personalised AI interpretation based on your actual birth chart positions. Free, instant, no signup.",
    url: "https://www.astroword.in/dasha-calculator",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "Vimshottari Dasha Calculator — AstroWord" }],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vimshottari Dasha Calculator — Your Current Mahadasha | AstroWord",
    description: "Find your current Mahadasha and Antardasha with AI-powered personalised Vedic reading. Free, instant.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Vimshottari Dasha in Vedic astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vimshottari Dasha is a 120-year planetary period system in Vedic astrology that divides life into sequential phases ruled by nine planets. Each planet governs a specific number of years: Ketu (7), Venus (20), Sun (6), Moon (10), Mars (7), Rahu (18), Jupiter (16), Saturn (19), and Mercury (17). Your starting point in this cycle is determined by the nakshatra your Moon occupied at birth."
      }
    },
    {
      "@type": "Question",
      "name": "How do I find out what Mahadasha I am in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter your date of birth, exact time of birth, and place of birth into AstroWord's free Vimshottari Dasha calculator. The tool calculates your Moon's nakshatra using Swiss Ephemeris, determines your starting Dasha, and instantly shows your current Mahadasha, Antardasha, and Pratyantardasha with exact end dates."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Mahadasha and Antardasha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mahadasha is the major planetary period lasting 6 to 20 years, setting the overall theme of that life phase. Antardasha is the sub-period within each Mahadasha, lasting months to a few years, that modifies and focuses the Mahadasha's energy. At any moment, three levels are active simultaneously: Mahadasha, Antardasha, and Pratyantardasha."
      }
    },
    {
      "@type": "Question",
      "name": "Is Saturn Mahadasha always bad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Saturn Mahadasha (19 years) is not inherently bad. Its results depend entirely on Saturn's placement in your birth chart. A well-placed Saturn in its own sign (Capricorn or Aquarius), exalted (Libra), or in a strong house can bring remarkable career growth, discipline, and long-term success. Saturn's Mahadasha does demand patience and hard work, but it rewards karmic efforts."
      }
    },
    {
      "@type": "Question",
      "name": "How long does Rahu Mahadasha last and what happens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rahu Mahadasha lasts 18 years. It is one of the most transformative periods — bringing ambition, unconventional paths, foreign connections, sudden changes, and obsessive focus on material goals. The results depend on Rahu's house placement and sign in your birth chart. Rahu Mahadasha often brings rapid rise followed by a period of recalibration."
      }
    },
    {
      "@type": "Question",
      "name": "What is Dasha Sandhi and why does it matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dasha Sandhi is the transition period between two Mahadashas — typically the last few months of one Dasha and the first few months of the next. It is considered one of the most pivotal windows in a person's life, when old life chapters close and new ones begin. Events during Dasha Sandhi often feel destabilising but are deeply transformative."
      }
    },
    {
      "@type": "Question",
      "name": "Can I calculate my Antardasha using this tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. AstroWord's Vimshottari Dasha calculator shows your current Mahadasha and all nine Antardashas within it, with exact start and end dates for each. You also receive an AI-written personalised reading explaining what your current Mahadasha-Antardasha combination means for your specific birth chart."
      }
    },
    {
      "@type": "Question",
      "name": "What is Jupiter Mahadasha known for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jupiter Mahadasha (16 years) is generally considered the most auspicious planetary period. It brings expansion, wisdom, spiritual growth, children, higher education, prosperity, and good fortune. A strong Jupiter in the birth chart makes this one of the most rewarding periods. Even a moderately placed Jupiter Mahadasha brings learning, optimism, and growth."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the Vimshottari Dasha calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AstroWord uses Swiss Ephemeris with Lahiri Ayanamsa — the same standard used by the Government of India — for all chart calculations. The Dasha calculation is based on the Moon's precise nakshatra position, which requires exact birth time. Even a 5-10 minute difference in birth time can shift the Dasha balance at birth, so accurate birth time is essential for precise results."
      }
    },
    {
      "@type": "Question",
      "name": "What makes AstroWord's Dasha calculator different from others?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most Dasha calculators show only a table of dates. AstroWord's calculator provides an AI-powered personalised reading that interprets your current Mahadasha and Antardasha based on where those planets actually sit in your birth chart — their sign, house, nakshatra, and strength. This is the interpretation a professional Vedic astrologer would give, personalised to your unique chart."
      }
    }
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vimshottari Dasha Calculator",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "description": "Free Vimshottari Dasha calculator that shows your current Mahadasha, Antardasha and provides AI-powered personalised Vedic astrology reading.",
  "url": "https://www.astroword.in/dasha-calculator"
};

export default function DashaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {children}
    </>
  );
}
