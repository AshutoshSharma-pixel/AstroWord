import type { Metadata } from "next";
import AmatyakarakaSEOContent from "./AmatyakarakaSEO";

export const metadata: Metadata = {
  title: "Amatyakaraka Calculator — Free AI Career Reading",
  description: "Discover your Amatyakaraka planet and get a free AI reading about your ideal career, professional strengths, and success path. Authentic Jaimini Vedic astrology.",
  keywords: "amatyakaraka calculator, career astrology, vedic career prediction, professional life jyotish",
  alternates: { canonical: "https://www.astroword.in/amatyakaraka" },
  openGraph: {
    title: "Amatyakaraka Calculator — Free AI Career Reading",
    description: "Discover your Amatyakaraka planet and get a free AI reading about your ideal career, professional strengths, and success path. Authentic Jaimini Vedic astrology.",
    url: "https://www.astroword.in/amatyakaraka",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Amatyakaraka Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amatyakaraka Calculator — Free AI Career Reading",
    description: "Discover your Amatyakaraka planet and get a free AI reading about your ideal career, professional strengths, and success path. Authentic Jaimini Vedic astrology.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in",
  },
};

export default function AmatyakarakaLayout({
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
        "name": "How do I find my Amatyakaraka planet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your Amatyakaraka is the planet that has the second-highest degree in your birth chart, ranging from 0 to 30 degrees. You can find this manually from your Jaimini Karaka list or use our free calculator above to discover it instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Can Amatyakaraka predict my career success?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the Amatyakaraka is the most important planet for professional life in Jaimini astrology. Its placement in the D1 (Birth Chart) and D10 (Dashamsha) charts determines the level of fame, wealth, and authority you will achieve in your career."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if my Amatyakaraka is weak or debilitated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A weak Amatyakaraka may indicate initial struggles or obstacles in finding the right career path. However, because it represents your advisors, seeking mentorship or specialized education can help strengthen its energy and bring success."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Amatyakaraka different for everyone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Depending on the exact time and place of your birth, your second-highest degree planet will vary, making your professional blueprint unique to you."
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
      <AmatyakarakaSEOContent />
    </>
  );
}
