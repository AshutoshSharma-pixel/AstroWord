import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birth Tithi Calculator — Find Your Janma Tithi & AI Reading | AstroWord",
  description: "Free Birth Tithi calculator by date of birth. Find your Janma Tithi, Paksha, ruling planet and get an AI-powered personalised Vedic reading based on your exact birth chart. Powered by Swiss Ephemeris.",
  keywords: "birth tithi calculator, janma tithi calculator, what is my birth tithi, birth tithi by date of birth, janma tithi meaning, ekadashi tithi born, purnima tithi birth, amavasya tithi born, shukla paksha birth, krishna paksha birth, tithi personality vedic astrology, birth tithi personality",
  alternates: {
    canonical: "https://www.astroword.in/birth-tithi-calculator"
  },
  openGraph: {
    title: "Birth Tithi Calculator — Find Your Janma Tithi & AI Reading | AstroWord",
    description: "Find your Janma Tithi and Paksha with a personalised AI reading based on your actual birth chart. Free, instant, powered by Swiss Ephemeris.",
    url: "https://www.astroword.in/birth-tithi-calculator",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "Birth Tithi Calculator — AstroWord" }],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Birth Tithi Calculator — Your Janma Tithi & AI Reading | AstroWord",
    description: "Find your Janma Tithi with personalised AI Vedic reading. Free, instant.",
    images: ["https://www.astroword.in/og-image.png"],
    site: "@astroword_in"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Janma Tithi in Vedic astrology?",
      "acceptedAnswer": { "@type": "Answer", "text": "Janma Tithi is the lunar day (Tithi) on which a person is born, determined by the angular relationship between the Sun and Moon at birth. Each Tithi spans 12 degrees of the Moon's movement relative to the Sun. There are 30 Tithis in a lunar month — 15 in Shukla Paksha (waxing moon) and 15 in Krishna Paksha (waning moon). Your Janma Tithi is one of the five key elements of Vedic Panchang and significantly influences personality, emotional patterns, and spiritual life." }
    },
    {
      "@type": "Question",
      "name": "How is birth Tithi calculated?",
      "acceptedAnswer": { "@type": "Answer", "text": "Birth Tithi is calculated by finding the angular difference between the Moon's longitude and the Sun's longitude at the exact time of birth, then dividing by 12. AstroWord uses Swiss Ephemeris with Lahiri Ayanamsa — the same standard used by the Government of India — for precise Sun and Moon position calculations. Tithi number = floor((Moon longitude - Sun longitude) / 12) + 1." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Shukla Paksha and Krishna Paksha birth?",
      "acceptedAnswer": { "@type": "Answer", "text": "Shukla Paksha (Tithis 1-15) is the waxing moon fortnight from New Moon to Full Moon. People born in Shukla Paksha tend to have outward, expressive, building energy — they are naturally oriented toward growth, manifestation, and external achievement. Krishna Paksha (Tithis 16-30) is the waning moon fortnight from Full Moon to New Moon. People born in Krishna Paksha tend to have inward, reflective, releasing energy — they are naturally introspective, spiritual, and oriented toward wisdom and letting go." }
    },
    {
      "@type": "Question",
      "name": "What does being born on Purnima (Full Moon) Tithi mean?",
      "acceptedAnswer": { "@type": "Answer", "text": "Purnima is the 15th Tithi of Shukla Paksha — the Full Moon day. It is the most luminous and complete Tithi. People born on Purnima are associated with abundance, charisma, and a powerful, magnetic personality. The ruling deity is Vishnu and the Tithi falls in the Poorna (complete) category. Purnima births are considered highly auspicious in Vedic tradition and are associated with spiritual completeness, generosity, and the ability to inspire others." }
    },
    {
      "@type": "Question",
      "name": "What does being born on Amavasya (New Moon) Tithi mean?",
      "acceptedAnswer": { "@type": "Answer", "text": "Amavasya is the 30th Tithi — the New Moon day. People born on Amavasya have a deep connection to ancestral energy, intuition, and the unseen realms. Despite popular belief, Amavasya birth is not inauspicious for the individual — rather, it gives strong psychic sensitivity, spiritual depth, and a profound connection to ancestral wisdom. Amavasya natives often have powerful inner lives and may be drawn to meditation, healing, or spiritual practice." }
    },
    {
      "@type": "Question",
      "name": "What does being born on Ekadashi Tithi mean?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ekadashi is the 11th Tithi (in both Shukla and Krishna Paksha), ruled by Mars with Rudra as the presiding deity. People born on Ekadashi are associated with knowledge, wisdom, and spiritual inclination. Ekadashi is one of the most sacred Tithis in Vedic tradition, dedicated to Lord Vishnu. Those born on this day tend to have a natural gift for teaching, sharing knowledge, and spiritual practice. Mars' rulership gives them energy and determination." }
    },
    {
      "@type": "Question",
      "name": "What are the 5 types of Tithis?",
      "acceptedAnswer": { "@type": "Answer", "text": "The 30 Tithis are grouped into 5 categories: Nanda (joyful) — Pratipada, Shashthi, Ekadashi; Bhadra (auspicious) — Dwitiya, Saptami, Dwadashi; Jaya (victorious) — Tritiya, Ashtami, Trayodashi; Rikta (releasing) — Chaturthi, Navami, Chaturdashi; and Poorna (complete) — Panchami, Dashami, Purnima/Amavasya. Each category carries distinct energy and is considered favorable for different types of activities." }
    },
    {
      "@type": "Question",
      "name": "How does birth Tithi affect personality?",
      "acceptedAnswer": { "@type": "Answer", "text": "In Vedic astrology, birth Tithi reflects the Sun-Moon relationship at birth — symbolically the balance of solar (soul, purpose) and lunar (mind, emotions) energies in a person. The Tithi's ruling planet and presiding deity shape personality tendencies, emotional patterns, and spiritual inclinations. Shukla Paksha births tend toward expression and manifestation while Krishna Paksha births tend toward reflection and wisdom. AstroWord combines your Tithi with your Moon sign and nakshatra for a genuinely personalised reading." }
    },
    {
      "@type": "Question",
      "name": "What is the Tithi lord and how does it affect me?",
      "acceptedAnswer": { "@type": "Answer", "text": "Each Tithi is ruled by one of the nine planets (Navagrahas). The Tithi lord acts like a secondary planetary influence on your personality and life — similar to how your Moon sign lord influences your emotional nature. For example, Pratipada is ruled by the Sun (giving leadership and vitality), Dwitiya by the Moon (giving sensitivity and nurturing), Tritiya by Mars (giving courage and passion). AstroWord's reading explains your specific Tithi lord's influence in detail." }
    },
    {
      "@type": "Question",
      "name": "Can birth Tithi predict auspicious timing for my life events?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. In Vedic Muhurta (electional astrology), your Janma Tithi is one of the key factors for timing important life events like marriage, business launches, and ceremonies. The annual return of your Janma Tithi is considered especially powerful for new beginnings and spiritual practices. Many families perform special pujas on the Janma Tithi each year, believing it amplifies the merit of good actions performed on that day." }
    },
    {
      "@type": "Question",
      "name": "What makes AstroWord's Birth Tithi calculator different?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most Tithi calculators simply tell you the Tithi name and its generic meaning. AstroWord goes further — our AI combines your Tithi with your Moon sign, Moon nakshatra, Paksha energy, and current Mahadasha to write a genuinely personalised reading. This means two people born on the same Tithi get different readings based on their unique chart. It's the kind of interpretation a professional Vedic astrologer would provide, available free and instantly." }
    }
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Birth Tithi Calculator",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "description": "Free Birth Tithi calculator that finds your Janma Tithi, Paksha, ruling planet and provides an AI-powered personalised Vedic reading.",
  "url": "https://www.astroword.in/birth-tithi-calculator"
};

export default function BirthTithiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {children}
    </>
  );
}
