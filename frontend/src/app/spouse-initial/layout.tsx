import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spouse Name Initial Predictor — Free Nakshatra Reading",
  description: "Predict the first letter of your future spouse's name using ancient Vedic nakshatra akshara mapping. Free AI analysis based on your Darakaraka and 7th lord.",
  keywords: "spouse name initial, future spouse name, nakshatra akshara, jaimini astrology name prediction, marriage astrology",
  alternates: { canonical: "https://www.astroword.in/spouse-initial" },
  openGraph: {
    title: "Spouse Name Initial Predictor — Free Nakshatra Reading",
    description: "Predict the first letter of your future spouse's name using ancient Vedic nakshatra akshara mapping. Free AI analysis based on your Darakaraka and 7th lord.",
    url: "https://www.astroword.in/spouse-initial",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Spouse Name Initial Predictor" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spouse Name Initial Predictor — Free Nakshatra Reading",
    description: "Predict the first letter of your future spouse's name using ancient Vedic nakshatra akshara mapping. Free AI analysis based on your Darakaraka and 7th lord.",
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
      "name": "Why does it show multiple possible initials?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your chart has multiple marriage indicators—the 7th lord, the Darakaraka, and Venus. In most cases, these planets occupy different Nakshatras. If two or more point to the same sound, that initial is extremely likely."
      }
    },
    {
      "@type": "Question",
      "name": "Is the initial for the first name or surname?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Vedic tradition, this calculation refers to the \"calling name\" or the first name, as that is the vibration the individual responds to most frequently."
      }
    },
    {
      "@type": "Question",
      "name": "What if the initial doesn't match my current partner?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Astrology shows potential and destiny. If you are in a relationship that doesn't match the predicted initial, look at the qualities of the planet. Often, the partner will embody the energy of the predicted planet even if the name initial differs."
      }
    }
  ]
};

export default function SpouseInitialLayout({
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
