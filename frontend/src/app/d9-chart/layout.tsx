import type { Metadata } from "next";
import D9ChartSEO from './D9ChartSEO';

export const metadata: Metadata = {
  title: "Navamsa Chart Calculator (D9) — Free AI Reading, Vargottama & Karakamsha",
  description: "Generate your free Navamsa D9 chart instantly. Discover your Vargottama planets, Karakamsha sign, D9 ascendant, and get a personalised AI reading about your marriage, spouse, and soul purpose. Based on Jaimini Vedic astrology.",
  keywords: ["navamsa chart calculator", "D9 chart calculator", "navamsa chart free online", "vargottama calculator", "karakamsha calculator", "navamsa chart marriage", "D9 navamsa reading", "D9 chart analysis", "navamsa lagna calculator", "D9 chart vedic astrology", "navamsa chart free", "vargottama planets"],
  alternates: { canonical: "https://www.astroword.in/d9-chart" },
  openGraph: {
    title: "Navamsa Chart Calculator (D9) — Free AI Reading, Vargottama & Karakamsha",
    description: "Generate your free Navamsa D9 chart instantly. Discover your Vargottama planets, Karakamsha sign, D9 ascendant, and get a personalised AI reading about your marriage, spouse, and soul purpose. Based on Jaimini Vedic astrology.",
    url: 'https://www.astroword.in/d9-chart',
    type: 'website',
    locale: 'en_IN',
    siteName: 'AstroWord',
    images: [{ url: 'https://www.astroword.in/og-image.png', width: 1200, height: 630, alt: 'Navamsa Chart Calculator — AstroWord' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Navamsa Chart Calculator (D9) — Free AI Reading, Vargottama & Karakamsha",
    description: 'Generate your Navamsa D9 chart and get a free AI reading about your marriage and soul purpose.',
    site: '@astroword_in',
    images: ['https://www.astroword.in/og-image.png']
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Navamsa chart (D9 chart)?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Navamsa chart, also called the D9 chart, is the most important divisional chart in Vedic astrology after the birth chart. It divides each zodiac sign into 9 equal parts of 3°20' each, revealing the deeper strength of planets, the quality of your marriage, and your soul's dharmic purpose." }
    },
    {
      "@type": "Question",
      "name": "What is Vargottama in Navamsa?",
      "acceptedAnswer": { "@type": "Answer", "text": "A planet is Vargottama when it occupies the same zodiac sign in both the birth chart (D1) and the Navamsa chart (D9). Vargottama planets are exceptionally strong and deliver their full results during their Dasha periods." }
    },
    {
      "@type": "Question",
      "name": "What is Karakamsha in Jaimini astrology?",
      "acceptedAnswer": { "@type": "Answer", "text": "Karakamsha is the sign occupied by your Atmakaraka (soul planet) in the Navamsa chart. This sign reveals your soul's deepest desires, your Ishta Devata (personal deity), and the spiritual direction of your life." }
    },
    {
      "@type": "Question",
      "name": "How is the D9 chart used for marriage prediction?",
      "acceptedAnswer": { "@type": "Answer", "text": "The 7th house from your Navamsa ascendant reveals the inner nature and qualities of your spouse. Planets placed there and the sign of the 7th house in D9 give detailed insights about your future partner that the birth chart alone cannot reveal." }
    },
    {
      "@type": "Question",
      "name": "What is the Navamsa ascendant (D9 Lagna)?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Navamsa Lagna is the ascendant of your D9 chart. It reflects your inner nature, soul character, and how your life unfolds in its deeper karmic dimension. It is calculated from the exact degree of your birth chart ascendant." }
    },
    {
      "@type": "Question",
      "name": "Can the D9 chart predict spouse appearance?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The sign of the 7th house in the Navamsa chart and planets placed there describe the physical and inner characteristics of your spouse. For example, Venus in the 7th house of D9 often indicates a charming, artistic spouse." }
    }
  ]
};

export default function D9ChartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
      <D9ChartSEO />
    </div>
  );
}
