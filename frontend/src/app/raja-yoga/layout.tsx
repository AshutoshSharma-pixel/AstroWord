import type { Metadata } from "next";
import RajaYogaSEO from './RajaYogaSEO';

export const metadata: Metadata = {
  title: "Raja Yoga Calculator — Find All Raj Yogas in Your Kundli Free",
  description: "Discover all Raja Yogas in your birth chart — Gaja Kesari, Panch Mahapurusha, Dharma Karmadhipati, Neecha Bhanga, Vipreet Raja Yoga and more. Free AI-powered personalised reading with Dasha timing.",
  keywords: "raja yoga calculator, raj yoga in kundli, do i have raja yoga, panch mahapurusha yoga, gaja kesari yoga calculator, dharma karmadhipati yoga, neecha bhanga raja yoga, vipreet raja yoga, yogakaraka planet, raja yoga astrology free",
  alternates: { canonical: "https://www.astroword.in/raja-yoga" },
  openGraph: {
    title: "Raja Yoga Calculator — Find All Raj Yogas in Your Kundli Free",
    description: "Discover all Raja Yogas in your birth chart with AI-powered analysis. Find your Gaja Kesari, Panch Mahapurusha, Dharma Karmadhipati yoga and when they activate.",
    url: "https://www.astroword.in/raja-yoga",
    type: "website",
    locale: "en_IN",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "Raja Yoga Calculator — AstroWord" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Raja Yoga Calculator — Find All Raj Yogas in Your Kundli Free",
    description: "Discover all Raja Yogas in your birth chart. Free AI-powered reading with Dasha activation timing.",
    site: "@astroword_in",
    images: ["https://www.astroword.in/og-image.png"]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is Raja Yoga in Vedic astrology?", "acceptedAnswer": { "@type": "Answer", "text": "Raja Yoga is a powerful planetary combination in Vedic astrology formed when lords of Kendra houses (1st, 4th, 7th, 10th) and Trikona houses (1st, 5th, 9th) are connected through conjunction, mutual aspect, or exchange. It indicates success, authority, wealth, and high social status. There are over 30 types of Raja Yogas including Dharma Karmadhipati, Panch Mahapurusha, Gaja Kesari, and Neecha Bhanga." } },
    { "@type": "Question", "name": "How do I know if I have Raja Yoga in my kundli?", "acceptedAnswer": { "@type": "Answer", "text": "Enter your exact birth date, time, and place in AstroWord's free Raja Yoga calculator. It automatically detects all Raja Yogas in your chart — including Gaja Kesari, Panch Mahapurusha, Dharma Karmadhipati, Neecha Bhanga, and Vipreet Raja Yoga — and rates each yoga's strength based on planetary dignity and combustion." } },
    { "@type": "Question", "name": "What is the most powerful Raja Yoga?", "acceptedAnswer": { "@type": "Answer", "text": "Dharma Karmadhipati Yoga — formed by the connection of the 9th lord (Dharma) and 10th lord (Karma) — is considered the most powerful Raja Yoga for career and recognition. Panch Mahapurusha Yogas are the most powerful personality yogas. A single strong Panch Mahapurusha Yoga outperforms multiple weak Kendra-Trikona yogas." } },
    { "@type": "Question", "name": "What is Gaja Kesari Yoga?", "acceptedAnswer": { "@type": "Answer", "text": "Gaja Kesari Yoga forms when Jupiter is in a Kendra house (1st, 4th, 7th, or 10th) from the Moon. 'Gaja' means elephant (wisdom) and 'Kesari' means lion (courage). This yoga grants intelligence, wealth, fame, and a respected social position. For full effect, Jupiter must not be debilitated or combust." } },
    { "@type": "Question", "name": "When does Raja Yoga give results?", "acceptedAnswer": { "@type": "Answer", "text": "Raja Yogas primarily activate during the Mahadasha and Antardasha of the planets forming the yoga. A Gaja Kesari Yoga formed by Jupiter and Moon will most powerfully manifest during Jupiter Mahadasha (16 years) or Moon Mahadasha (10 years). Jupiter transiting over the yoga-forming planets can also trigger results." } },
    { "@type": "Question", "name": "What are Panch Mahapurusha Yogas?", "acceptedAnswer": { "@type": "Answer", "text": "Panch Mahapurusha Yogas are five special Raja Yogas formed when Mars, Mercury, Jupiter, Venus, or Saturn occupies a Kendra house in its own or exalted sign: Ruchaka (Mars) grants courage and leadership; Bhadra (Mercury) grants intelligence; Hamsa (Jupiter) grants wisdom; Malavya (Venus) grants charm and luxury; Shasha (Saturn) grants discipline and authority." } }
  ]
};

export default function RajaYogaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
      <RajaYogaSEO />
    </div>
  );
}
