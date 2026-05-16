import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Love or Arranged Marriage? Free AI Astrology Prediction",
  description: "Find out if your birth chart shows love marriage or arranged marriage. Free AI analysis of your 5th house, 7th house, Venus, and Rahu placements.",
  keywords: "love or arranged marriage, marriage astrology, 7th house lord, d9 chart analysis, marriage prediction ai",
  alternates: { canonical: "https://www.astroword.in/marriage-type" },
  openGraph: {
    title: "Love or Arranged Marriage? Free AI Astrology Prediction",
    description: "Find out if your birth chart shows love marriage or arranged marriage. Free AI analysis of your 5th house, 7th house, Venus, and Rahu placements.",
    url: "https://www.astroword.in/marriage-type",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Marriage Type Predictor" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love or Arranged Marriage? Free AI Astrology Prediction",
    description: "Find out if your birth chart shows love marriage or arranged marriage. Free AI analysis of your 5th house, 7th house, Venus, and Rahu placements.",
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
      "name": "Can a love marriage turn into an arranged one (Love-cum-Arranged)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many charts show strong 5th-7th connections (love) but also have a powerful 9th lord or Jupiter (tradition). This indicates a relationship that starts with love but eventually receives full family blessing and traditional ceremonies."
      }
    },
    {
      "@type": "Question",
      "name": "Is a love marriage successful according to astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success depends on the strength of the 7th house and the D9 Navamsa chart, not the type of marriage. A love marriage with a weak 7th lord may face challenges, while an arranged marriage with a strong Venus can be incredibly romantic and stable."
      }
    },
    {
      "@type": "Question",
      "name": "What if my chart shows mixed indicators?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mixed indicators are common in the modern era. It usually means you will have the freedom to choose, but family values will still play a significant role in the final decision or the wedding process."
      }
    },
    {
      "@type": "Question",
      "name": "Does the Navamsa (D9) chart change the result?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The D9 chart is the \"fruit\" of the tree. If the D1 (Birth Chart) shows love but the D9 is very traditional/Saturnian, there might be initial romance that leads to a very disciplined, traditional marital life."
      }
    }
  ]
};

export default function MarriageTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
