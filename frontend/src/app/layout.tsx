import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL('https://astroword.in'),
  title: {
    default: "AstroWord — India's First Precision Vedic AI",
    template: "%s | AstroWord",
  },
  description:
    "Get accurate Vedic astrology readings powered by AI. Ask about career, marriage, future and more based on your D1, D9, D10, D7 birth chart. Free 5 questions daily.",
  keywords:
    "vedic astrology, kundli, birth chart, AI astrology, jyotish, marriage prediction, career astrology, darakaraka, atmakaraka, dasha timing, free astrology",
  authors: [{ name: "AstroWord", url: "https://astroword.in" }],
  creator: "AstroWord",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://astroword.in" },
  openGraph: {
    title: "AstroWord — India's First Precision Vedic AI",
    description: "Ask anything about your life. Your birth chart has the answers.",
    url: "https://astroword.in",
    siteName: "AstroWord",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AstroWord — Precision Vedic AI" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroWord — India's First Precision Vedic AI",
    description: "Ask anything about your life. Your birth chart has the answers.",
    site: "@astroword_in",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        "name": "How accurate is Vedic AI astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vedic AI astrology is highly accurate as it processes ancient Jyotish rules, planetary degrees, Dasha periods, and divisional charts (like D9 Navamsa) instantly without human error, providing precise mathematical calculations for predictions."
        }
      },
      {
        "@type": "Question",
        "name": "What is Navamsa chart D9?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Navamsa chart (D9) is the most important divisional chart in Vedic astrology. It acts as the microscopic view of your 9th house, revealing your true inner self, second half of life, and is vital for marriage and spouse predictions."
        }
      },
      {
        "@type": "Question",
        "name": "What is Darakaraka in Vedic astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Darakaraka is the planet with the lowest degree in your birth chart. In Jaimini astrology, it serves as the primary spouse significator, revealing the exact nature, appearance, and characteristics of your future partner."
        }
      },
      {
        "@type": "Question",
        "name": "What is Atmakaraka in Vedic astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atmakaraka is the planet with the highest degree in your birth chart. It acts as the soul significator in Jaimini astrology and points to your soul's deepest desires, primary life purpose, and karmic lessons."
        }
      },
      {
        "@type": "Question",
        "name": "Is AstroWord free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. AstroWord offers 5 free questions per day with deep D1 and D9 chart analysis. All premium calculators (Darakaraka, Atmakaraka, Marriage Year Predictor) are completely free. Paid plans are available for extensive daily readings starting at ₹89."
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
