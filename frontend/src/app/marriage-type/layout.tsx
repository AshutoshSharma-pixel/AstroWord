import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Love or Arranged Marriage Predictor — Vedic Astrology | AstroWord',
    description: "Find out if your birth chart indicates a love marriage, arranged marriage, or a combination. AI analyzes Rahu, Venus, 5th lord, 7th lord connections from your Vedic chart.",
    keywords: 'love marriage or arranged marriage, marriage type predictor, vedic astrology marriage, rahu 7th house love marriage, venus marriage astrology',
    alternates: { canonical: 'https://astroword.in/marriage-type' },
    openGraph: {
        title: 'Love or Arranged Marriage Predictor | AstroWord',
        description: "Your birth chart reveals whether you're destined for love marriage, arranged marriage, or both.",
        url: 'https://astroword.in/marriage-type',
        siteName: 'AstroWord',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Love or Arranged Marriage Predictor | AstroWord',
        description: "Your birth chart reveals whether you're destined for love or arranged marriage.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
