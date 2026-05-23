import type { Metadata } from "next";
import IshtaDevataSEOContent from "./IshtaDevataSEO";

export const metadata: Metadata = {
  title: "Ishta Devata Calculator — Find Your Personal Deity in Astrology",
  description: "Find your Ishta Devata (personal deity) free using Jaimini Karakamsha calculations. Discover your soul's guiding deity, mantra, and how to connect.",
  keywords: "ishta devata calculator, find my ishta devata, personal deity astrology, jaimini ishta devata, atmakaraka deity, karakamsha 12th house, kul devata vs ishta devata, ishta devata mantra, vedic deity finder, ishta devata test",
  alternates: { canonical: "https://www.astroword.in/ishta-devata" },
  openGraph: {
    title: "Ishta Devata Calculator — Find Your Personal Deity",
    description: "Find your Ishta Devata (personal deity) free using Jaimini Karakamsha calculations. Discover your soul's guiding deity, mantra, and how to connect.",
    url: "https://www.astroword.in/ishta-devata",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Ishta Devata Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishta Devata Calculator — Find Your Personal Deity",
    description: "Find your Ishta Devata (personal deity) free using Jaimini Karakamsha calculations. Discover your soul's guiding deity, mantra, and how to connect.",
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
      "name": "What is an Ishta Devata?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An Ishta Devata (literally 'cherished divinity') is your personal guiding deity in Vedic astrology. It represents the specific form of the Divine that is closest to your soul and is uniquely suited to guide you toward spiritual liberation (Moksha) and provide protection in this life."
      }
    },
    {
      "@type": "Question",
      "name": "How is Ishta Devata calculated in Vedic astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Jaimini astrology, the Ishta Devata is calculated by first identifying your Atmakaraka (the planet with the highest degree in your chart). You then find this planet's position in the D9 Navamsa chart, which is called the Karakamsha. The 12th house from the Karakamsha represents liberation (Moksha), and the ruling planet of that 12th house indicates your Ishta Devata."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Ishta Devata and Kul Devata?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your Kul Devata is the family deity, passed down through generations, representing ancestral lineage protection and biological roots. Your Ishta Devata is individual to you, calculated from your birth chart, representing your soul's spiritual affinity and path to liberation."
      }
    },
    {
      "@type": "Question",
      "name": "Can my Ishta Devata change over time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Because your birth chart represents the static energetic blueprint of your current incarnation, your Ishta Devata remains constant throughout your life. However, your awareness of and devotion to them may evolve."
      }
    }
  ]
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Ishta Devata Calculator",
  "operatingSystem": "All",
  "applicationCategory": "AstrologyApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function IshtaDevataLayout({ children }: { children: React.ReactNode }) {
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
      <IshtaDevataSEOContent />
    </div>
  );
}
