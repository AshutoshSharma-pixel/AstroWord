import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arudha Lagna Calculator — Free Jaimini Public Image & Maya Lagna",
  description: "Calculate your Arudha Lagna (AL) free — the Jaimini astrology indicator of your public image, social status, and how the world perceives you. Based on your exact birth chart using Swiss Ephemeris with Lahiri ayanamsa.",
  keywords: "arudha lagna calculator, AL calculator jaimini, jaimini arudha lagna free, maya lagna calculator, public image astrology, arudha pada calculator, jaimini astrology tools, social reputation astrology",
  alternates: { canonical: "https://www.astroword.in/arudha-lagna" },
  openGraph: {
    title: "Arudha Lagna Calculator — Jaimini Public Image",
    description: "Free Arudha Lagna calculator. Discover your social image, public reputation, and how others perceive you — with a personalised AI reading from your Jaimini chart.",
    url: "https://www.astroword.in/arudha-lagna",
    siteName: "AstroWord",
    images: [{ url: "https://www.astroword.in/og-image.png", width: 1200, height: 630, alt: "AstroWord Arudha Lagna Calculator" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arudha Lagna Calculator — Jaimini Public Image",
    description: "Free Arudha Lagna calculator with AI reading. Find out how the world sees you from your Jaimini birth chart.",
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
      "name": "What is Arudha Lagna in Jaimini astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arudha Lagna (AL), also called Maya Lagna, is the Arudha Pada of the 1st house in Jaimini astrology. It represents how the world perceives you — your public image, social reputation, and the face you present to society. While the Ascendant shows your true inner nature, the Arudha Lagna shows the external projection that others see and respond to."
      }
    },
    {
      "@type": "Question",
      "name": "How is Arudha Lagna calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To calculate Arudha Lagna: (1) Find the lord of your Ascendant sign. (2) Count signs from your Ascendant to the lord's sign, inclusive. (3) Project the same number of signs from the lord's sign. The resulting sign is your Arudha Lagna. If it falls on the Ascendant or its 7th house, add 10 more signs."
      }
    },
    {
      "@type": "Question",
      "name": "What does Arudha Lagna reveal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Arudha Lagna reveals: (1) How others perceive your personality and character. (2) Your social status and public reputation. (3) The career or life domain you will be associated with publicly. (4) How your image aligns or diverges from your true inner self. Planets in the Arudha Lagna sign add their energy to your public image."
      }
    },
    {
      "@type": "Question",
      "name": "Why is Arudha Lagna called the Maya Lagna?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arudha Lagna is called Maya Lagna because 'Maya' in Sanskrit means illusion or appearance. It represents the image or projection that the world sees — which may or may not reflect your true inner nature (shown by the Ascendant). Jaimini astrology recognises that the social reality we inhabit is shaped by perception as much as by truth."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Arudha Lagna and Ascendant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your Ascendant (Lagna) shows your true inner character, soul nature, and actual personality. Your Arudha Lagna shows the image you project externally — how strangers, colleagues, and society perceive you. Sometimes these align closely (if both signs share qualities), and sometimes there is a notable gap between who you are and who people think you are."
      }
    },
    {
      "@type": "Question",
      "name": "How does Arudha Lagna relate to career and status?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arudha Lagna is one of the strongest indicators of career reputation and public standing in Jaimini astrology. The sign of your AL, its lord, and planets influencing it describe the field in which you will gain recognition, your professional reputation, and the social status you will achieve. The 10th from AL is particularly relevant for career visibility."
      }
    }
  ]
};

export default function ArudhaLayout({ children }: { children: React.ReactNode }) {
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
