import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gana Calculator — Nakshatra Compatibility for Kundli Milan | AstroWord',
    description: 'Check your Gana (Deva, Manushya, or Rakshasa) based on Moon nakshatra and calculate compatibility with your partner. Gana matching is worth 6 out of 36 points in Ashtakoot Kundli Milan.',
    keywords: 'gana calculator, kundli milan, nakshatra compatibility, ashtakoot matching, deva manushya rakshasa gana, marriage compatibility astrology',
    alternates: { canonical: 'https://astroword.in/gana' },
    openGraph: {
        title: 'Gana Calculator — Marriage Compatibility | AstroWord',
        description: 'Find your Gana (Deva, Manushya or Rakshasa) and check compatibility with your partner for Kundli Milan.',
        url: 'https://astroword.in/gana',
        siteName: 'AstroWord',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gana Calculator | AstroWord',
        description: 'Find your Gana and check nakshatra compatibility for marriage.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
