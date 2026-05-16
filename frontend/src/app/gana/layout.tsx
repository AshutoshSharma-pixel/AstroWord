import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gana Calculator — Free Vedic Soul Type Reading",
  description: "Find your Gana (Deva, Manushya or Rakshasa) from your Moon nakshatra. Free AI reading about your nature, temperament, and marriage compatibility.",
  keywords: "gana calculator, deva gana, manushya gana, rakshasa gana, kundli matching, guna milan",
  alternates: { canonical: "https://www.astroword.in/gana" },
  openGraph: {
    title: "Gana Calculator — Free Vedic Soul Type Reading",
    description: "Find your Gana (Deva, Manushya or Rakshasa) from your Moon nakshatra. Free AI reading about your nature, temperament, and marriage compatibility.",
    url: "https://www.astroword.in/gana",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Gana Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gana Calculator — Free Vedic Soul Type Reading",
    description: "Find your Gana (Deva, Manushya or Rakshasa) from your Moon nakshatra. Free AI reading about your nature, temperament, and marriage compatibility.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function GanaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I find my Gana?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your Gana is determined solely by your Moon Nakshatra. Each of the 27 Nakshatras is assigned to one of the three Ganas. You can use our Gana calculator above to find your Nakshatra and Gana instantly by entering your birth details."
        }
      },
      {
        "@type": "Question",
        "name": "Can a Deva Gana person marry a Rakshasa Gana person?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While traditionally considered a \"challenging\" match in Guna Milan (receiving 0 out of 6 points), it is not a deal-breaker. If other factors like Bhakoot and Nadi are strong, or if the couple is aware of their differing temperaments, the marriage can still be successful."
        }
      },
      {
        "@type": "Question",
        "name": "Is Rakshasa Gana bad or \"evil\"?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at all. In modern Vedic astrology, Rakshasa Gana represents someone with high energy, strong willpower, and an ability to see through deception. They make excellent detectives, leaders, and entrepreneurs who aren't afraid of challenges."
        }
      },
      {
        "@type": "Question",
        "name": "What is the most compatible Gana match?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The highest compatibility score (6/6) is achieved when both partners belong to the same Gana (Deva-Deva, Manushya-Manushya, or Rakshasa-Rakshasa). This indicates that their fundamental temperaments are in sync."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
