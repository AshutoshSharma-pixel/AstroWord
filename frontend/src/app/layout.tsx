import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, DM_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Script from "next/script";

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
  metadataBase: new URL('https://www.astroword.in'),
  icons: {
    icon: '/astroword-logo.png',
  },
  title: {
    default: "Free AI Vedic Astrologer — Ask Your Birth Chart Anything",
    template: "%s | AstroWord",
  },
  description:
    "India's first AI Vedic astrologer. Enter your birth details and ask anything — career, marriage, timing, relationships. Free 5 questions daily based on your exact D1 and D9 chart.",
  keywords:
    "vedic astrology, kundli, birth chart, AI astrology, jyotish, marriage prediction, career astrology, darakaraka, atmakaraka, dasha timing, free astrology",
  authors: [{ name: "AstroWord", url: "https://www.astroword.in" }],
  creator: "AstroWord",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://www.astroword.in/" },
  openGraph: {
    title: "Free AI Vedic Astrologer — Ask Your Birth Chart Anything",
    description: "India's first AI Vedic astrologer. Ask anything about career, marriage, timing, and relationships — based on your exact birth chart. Free 5 questions daily.",
    url: "https://www.astroword.in/",
    siteName: "AstroWord",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AstroWord — Precision Vedic AI" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Vedic Astrologer — Ask Your Birth Chart Anything",
    description: "India's first AI Vedic astrologer. Ask anything about career, marriage, timing, and relationships — based on your exact birth chart. Free 5 questions daily.",
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
  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorant.variable} ${outfit.variable} ${dmMono.variable} antialiased bg-bg text-text`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AstroWord",
            "url": "https://www.astroword.in",
            "description": "India's first AI-powered Vedic astrology platform. Free Jaimini calculators for Darakaraka, Atmakaraka, Mahadasha, Manglik Dosha and more.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.astroword.in/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }) }}
        />
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wr4iajwz04");
          `}
        </Script>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
