import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gana Compatibility Calculator — Vedic Match Making | AstroWord',
    description: 'Check Deva, Manushya, or Rakshasa Gana compatibility for marriage matching using your Moon nakshatra.',
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
