import type { Metadata } from "next";
import KundaliMatchingSEO from './KundaliMatchingSEO';

export const metadata: Metadata = {
  title: "Kundali Matching — Free Ashtakoota & Jaimini Compatibility Calculator",
  description: "Check your Kundali Matching Guna Milan score out of 36 for free. AstroWord's free compatibility calculator includes Ashtakoota, Jaimini, Mangal Dosha, and D9 Navamsa details.",
  keywords: "kundali matching, jaimini kundali matching, navamsa kundali matching, kundali matching with AI, kundali matching darakaraka, free kundli milan, online kundali matching",
  alternates: { canonical: "https://www.astroword.in/kundali-matching" },
  openGraph: {
    title: "Kundali Matching — Free Ashtakoota & Jaimini Compatibility Calculator",
    description: "Compare birth charts using Ashtakoota, Jaimini Darakaraka, and D9 Navamsa parameters. Get an instant compatibility score out of 36.",
    url: "https://www.astroword.in/kundali-matching",
    type: "website",
    locale: "en_IN",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "Kundali Matching — AstroWord" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kundali Matching — Free Ashtakoota & Jaimini Compatibility Calculator",
    description: "Compare birth charts using Ashtakoota, Jaimini, and D9 Navamsa. Get an instant Guna Milan score out of 36.",
    site: "@astroword_in",
    images: ["https://www.astroword.in/og-image.png"]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is a good score in Kundali matching?", "acceptedAnswer": { "@type": "Answer", "text": "Out of 36 Gunas, a score of 18 or above is considered the threshold for an auspicious match. A score between 18 and 24 is good, indicating stable compatibility. A score of 25 to 32 is excellent, showing exceptional mental and behavioral alignment. Scores below 18 require careful analysis of Jaimini placements, Navamsa details, and specific remedies to mitigate challenges." } },
    { "@type": "Question", "name": "How does Jaimini compatibility improve standard matching?", "acceptedAnswer": { "@type": "Answer", "text": "Standard Ashtakoota matching only analyzes the Moon’s placement, leaving out 90% of your birth chart's details. Jaimini compatibility evaluates the actual degrees of the planets, utilizing the Darakaraka (spouse signifier) and Upapada Lagna (marriage contract) to check compatibility at a deeper, soul level. This helps explain why couples with low Guna scores can have extremely successful marriages, and vice versa." } },
    { "@type": "Question", "name": "What happens if there is Nadi Dosha in our matching?", "acceptedAnswer": { "@type": "Answer", "text": "Nadi Dosha indicates that both partners share the same physiological temperament (Vata, Pitta, Kapha). This is believed to affect progeny and biological health. However, Nadi Dosha has many classical cancellations (e.g., sharing the same Moon sign but having different Nakshatras). If the dosha is active, performing specific remedies such as reciting mantras, engaging in charity, and maintaining a healthy lifestyle helps mitigate the energies." } },
    { "@type": "Question", "name": "Can we marry if our Guna score is below 18?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Guna Milan is only a behavioral check. If your Guna score is below 18, but your Jaimini Darakaraka alignment is strong, the Upapada Lagnas are compatible, and your Navamsa D9 charts show spiritual harmony, the marriage can be highly successful. Astrological compatibility is multi-dimensional, and a low Guna score is not an absolute barrier if other factors are favorable." } },
    { "@type": "Question", "name": "What is the significance of the D9 Navamsa in matching?", "acceptedAnswer": { "@type": "Answer", "text": "The D9 Navamsa chart is the blueprint of your marriage destiny. The main D1 chart shows your initial attraction and outer life, but the D9 chart shows how your relationship will evolve over time. Checking Navamsa Ascendant alignment, Venus placements, and the strength of the 7th house in the D9 chart ensures that the inner spiritual core of both partners is aligned for long-term harmony." } },
    { "@type": "Question", "name": "How does AstroWord combine Vedic astrology with AI?", "acceptedAnswer": { "@type": "Answer", "text": "AstroWord uses the highly accurate Swiss Ephemeris library to calculate the exact degree of all planets, houses, and divisionals for both partners. These precise astronomical coordinates are then passed to our advanced AI engine, which acts as a master astrologer, synthesizing traditional Guna Milan, Jaimini Darakaraka parameters, D9 Navamsa alignments, and Dasha timing to generate a deeply personalized compatibility verdict." } }
  ]
};

export default function KundaliMatchingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
      <KundaliMatchingSEO />
    </div>
  );
}
