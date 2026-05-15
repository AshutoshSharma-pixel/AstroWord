import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manglik Dosha Calculator — Am I Manglik?",
  description: "Free Manglik Dosha calculator. Find out instantly if you are Manglik, your severity level, cancellation factors and get a personalised AI reading with Vedic remedies. Based on your exact birth chart using Swiss Ephemeris.",
  keywords: "manglik calculator, am I manglik, manglik dosha checker, manglik dosha calculator free, manglik dosha remedies, kuja dosha calculator, chevvai dosham calculator, mars dosha, manglik dosha cancellation",
  alternates: { canonical: "https://www.astroword.in/manglik" },
  openGraph: {
    title: "Manglik Dosha Calculator — Am I Manglik?",
    description: "Free Manglik calculator. Instant result — Manglik status, severity, cancellations, AI reading and remedies from your exact birth chart.",
    url: "https://www.astroword.in/manglik",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Manglik Dosha Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manglik Dosha Calculator — Am I Manglik?",
    description: "Free Manglik Dosha calculator with AI reading and Vedic remedies. Instant result.",
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
      "name": "Am I Manglik if Mars is in the 2nd house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Manglik Dosha applies to Mars in houses 1, 4, 7, 8, and 12 from the Ascendant according to classical Vedic tradition."
      }
    },
    {
      "@type": "Question",
      "name": "Can a Manglik marry a non-Manglik?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many Manglik people marry non-Mangliks and have happy marriages. If cancellation rules apply, the dosha may not be significant at all."
      }
    },
    {
      "@type": "Question",
      "name": "Does Manglik Dosha go away after 28?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is a popular folk belief but not universally accepted in classical Vedic astrology. The planetary placement in your chart remains the same regardless of age."
      }
    },
    {
      "@type": "Question",
      "name": "What are the best remedies for Manglik Dosha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common remedies include Mangal Puja on Tuesdays, reciting the Mangal Beej Mantra, wearing red coral after consulting a Jyotishi, and donating red lentils on Tuesdays."
      }
    },
    {
      "@type": "Question",
      "name": "Is Manglik Dosha really that serious?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most experienced Jyotishis treat Manglik Dosha as one factor among many. Many Manglik individuals have excellent, long-lasting marriages."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is AstroWord's Manglik calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AstroWord uses the Swiss Ephemeris with Lahiri ayanamsa — the same standard used by professional Vedic astrologers in India."
      }
    }
  ]
};

export default function ManglikLayout({ children }: { children: React.ReactNode }) {
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
