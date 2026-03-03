import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, DM_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "AstroWord — India's First Precision Vedic AI",
  description:
    "Get accurate Vedic astrology readings powered by AI. Ask about career, marriage, future and more based on your D1, D9, D10 birth chart.",
  keywords:
    "vedic astrology, kundli, birth chart, AI astrology, jyotish, marriage prediction, career astrology",
  openGraph: {
    title: "AstroWord — India's First Precision Vedic AI",
    description: "Ask anything about your life. Your birth chart has the answers.",
    url: "https://astroword.in",
    siteName: "AstroWord",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroWord — India's First Precision Vedic AI",
    description: "Ask anything about your life. Your birth chart has the answers.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Darakaraka in Vedic astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Darakaraka is the planet with the lowest degree in your birth chart (among 7 planets). It is the spouse significator in Jaimini astrology and reveals the nature, appearance, and characteristics of your future partner."
        }
      },
      {
        "@type": "Question",
        "name": "How can AI predict marriage timing in astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI analyzes your Vimshottari Dasha periods, Jupiter transits, 7th house activation, and Venus placements to identify the most auspicious years for marriage based on traditional Vedic astrology rules."
        }
      },
      {
        "@type": "Question",
        "name": "What is Atmakaraka in Vedic astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atmakaraka is the planet with the highest degree in your birth chart. It is the soul significator in Jaimini astrology and reveals your soul's deepest desire, life purpose, and the karmic lessons you must complete in this lifetime."
        }
      },
      {
        "@type": "Question",
        "name": "What is Gana in Vedic astrology compatibility?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gana is one of the 8 factors in Kundli Milan (Ashtakoot matching). Every person belongs to one of three Ganas — Deva, Manushya or Rakshasa — based on their Moon nakshatra. Gana matching is worth 6 out of 36 points in compatibility scoring."
        }
      },
      {
        "@type": "Question",
        "name": "Is AstroWord free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. AstroWord offers 5 free questions per day with D1 and D9 chart analysis. All calculator tools (Darakaraka, Atmakaraka, Gana, Marriage Year, etc.) are always free. Paid plans start at ₹69 for 7 days with more daily questions."
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorant.variable} ${outfit.variable} ${dmMono.variable} antialiased bg-bg text-text`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
