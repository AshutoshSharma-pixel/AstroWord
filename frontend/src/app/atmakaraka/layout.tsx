import type { Metadata } from "next";
import AtmakarakaSEOContent from "./AtmakarakaSEO";

export const metadata: Metadata = {
  title: "Atmakaraka Calculator — Free AI Soul Purpose Reading",
  description: "Find your Atmakaraka — the most important planet in your chart — and get a free AI reading about your soul's purpose and karmic lessons in this lifetime.",
  keywords: "atmakaraka calculator, soul planet, life purpose astrology, vedic charts, jaimini karakas",
  alternates: { canonical: "https://www.astroword.in/atmakaraka" },
  openGraph: {
    title: "Atmakaraka Calculator — Discover Your Soul Planet",
    description: "Find your Atmakaraka planet and discover your soul's purpose, karmic lessons, and spiritual path using Jaimini Vedic astrology. Free AI-powered calculator.",
    url: "https://www.astroword.in/atmakaraka",
    type: "website",
    locale: "en_IN",
    siteName: "AstroWord",
    images: [{
      url: "https://www.astroword.in/og-image.png",
      width: 1200,
      height: 630,
      alt: "Atmakaraka Calculator — Discover Your Soul Planet"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Atmakaraka Calculator — Discover Your Soul Planet",
    description: "Find your Atmakaraka planet and discover your soul's purpose, karmic lessons, and spiritual path using Jaimini Vedic astrology. Free AI-powered calculator.",
    site: "@astroword_in",
    images: ["https://www.astroword.in/og-image.png"]
  },
};

export default function AtmakarakaLayout({
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
        "name": "How do I find my Atmakaraka planet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find your Atmakaraka, look at the degrees of all seven main planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn). The planet with the highest degree (0° to 30°) is your Atmakaraka. You can use our free Atmakaraka calculator above to get your result instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Atmakaraka and Amatyakaraka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Atmakaraka is the planet with the highest degree and represents the soul. The Amatyakaraka is the planet with the second-highest degree and represents your career, advisors, and how you achieve your soul's goals in the material world."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if my Atmakaraka is retrograde?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A retrograde Atmakaraka suggests deep-seated karmic desires from past lives that are being revisited. It often indicates a very strong, intense soul purpose that requires looking inward rather than outward for fulfillment."
        }
      },
      {
        "@type": "Question",
        "name": "Is Atmakaraka always the highest degree planet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, in the Jaimini 7-Karaka system, the Atmakaraka is always the planet with the highest degree. In the 8-Karaka system, Rahu is also included, but most practitioners prefer the 7-planet system for soul readings."
        }
      }
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
      <AtmakarakaSEOContent />
    </div>
  );
}
