import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sade Sati Calculator — Am I in Shani Sade Sati?",
  description: "Free Sade Sati calculator. Find out instantly if you are going through Shani Sade Sati or Shani Dhaiya, your current phase, timeline, and get a personalised AI reading with Vedic remedies.",
  keywords: "sade sati calculator, shani sade sati check, sade sati status, shani dhaiya calculator, ashtama shani, kantaka shani, saturn transit calculator, sade sati timeline, sade sati remedies",
  alternates: { canonical: "https://www.astroword.in/sade-sati" },
  openGraph: {
    title: "Sade Sati Calculator — Am I in Shani Sade Sati?",
    description: "Free Sade Sati calculator. Discover if you are under Sade Sati or Dhaiya, identify your phase, view your timeline, and get a personalised AI reading with remedies.",
    url: "https://www.astroword.in/sade-sati",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Sade Sati Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sade Sati Calculator — Am I in Shani Sade Sati?",
    description: "Free Sade Sati calculator with AI reading and Vedic remedies. Instant result.",
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
      "name": "What is Shani Sade Sati?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sade Sati is a 7.5-year transit of Saturn (Shani) over the natal Moon. It begins when Saturn enters the 12th house from the natal Moon, continues through the 1st house (conjoining the Moon), and ends when Saturn leaves the 2nd house from the Moon."
      }
    },
    {
      "@type": "Question",
      "name": "What are the three phases of Sade Sati?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The three phases are: 1. Rising Phase (12th house transit, affecting finances and mental stress), 2. Peak Phase (1st house transit, affecting health, career, and personal decisions), and 3. Setting Phase (2nd house transit, affecting family, speech, and financial consolidation)."
      }
    },
    {
      "@type": "Question",
      "name": "What is Shani Dhaiya?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shani Dhaiya is a 2.5-year transit of Saturn. It occurs when Saturn transits the 4th house (Kantaka Shani) or 8th house (Ashtama Shani) from your natal Moon sign."
      }
    },
    {
      "@type": "Question",
      "name": "Which Moon signs are under Sade Sati in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In 2026, with Saturn transiting through Pisces, the signs under Sade Sati are Aquarius (Setting Phase), Pisces (Peak Phase), and Aries (Rising Phase)."
      }
    },
    {
      "@type": "Question",
      "name": "What are effective remedies for Sade Sati?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective remedies include reciting the Shani Beej Mantra, chanting Hanuman Chalisa on Saturdays, offering mustard oil to Shani Dev, and donating black sesame seeds, iron, or black clothes to the underprivileged."
      }
    }
  ]
};

import SadeSatiSEOContent from './SadeSatiSEO';

export default function SadeSatiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
      <SadeSatiSEOContent />
    </div>
  );
}
