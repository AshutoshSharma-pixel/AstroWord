import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "When Will I Get Married? Free AI Vedic Prediction",
  description: "Get a free AI-powered Vedic astrology prediction for your marriage year. Based on Vimsottari Dasha, Jupiter transits, and 7th house activation in your birth chart.",
  keywords: "marriage year predictor, when will i get married, dasha timing, marriage prediction calculator, vedic dasha analysis",
  alternates: { canonical: "https://www.astroword.in/marriage-year" },
  openGraph: {
    title: "When Will I Get Married? Free AI Vedic Prediction",
    description: "Get a free AI-powered Vedic astrology prediction for your marriage year. Based on Vimsottari Dasha, Jupiter transits, and 7th house activation in your birth chart.",
    url: "https://www.astroword.in/marriage-year",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Marriage Year Predictor" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "When Will I Get Married? Free AI Vedic Prediction",
    description: "Get a free AI-powered Vedic astrology prediction for your marriage year. Based on Vimsottari Dasha, Jupiter transits, and 7th house activation in your birth chart.",
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
      "name": "How accurate is the marriage year prediction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Astrology shows the most auspicious \"window\" for marriage. While the AI analyzes your Dasha and transits with high precision, individual free will and societal factors also play a role."
      }
    },
    {
      "@type": "Question",
      "name": "What if my current Dasha doesn't support marriage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Even if the main Mahadasha is not marriage-oriented, the Antardasha (sub-period) or a favorable Jupiter transit over the 7th house can often trigger a wedding."
      }
    },
    {
      "@type": "Question",
      "name": "Does the 7th house lord in the 8th house delay marriage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It can indicate a delay or a transformation-led marriage, but it certainly doesn't deny it. Often, it points to a spouse from a different background or a sudden union."
      }
    },
    {
      "@type": "Question",
      "name": "Why is the Navamsa (D9) chart important for timing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The D1 chart shows the promise, but the D9 shows the strength. A planet might look weak in D1 but if it is strong in D9, the marriage will happen during that planet's period."
      }
    }
  ]
};

export default function MarriageYearLayout({
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
