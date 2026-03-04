import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Marriage Year Predictor — Vedic Dasha Timing | AstroWord',
    description: 'Predict your most likely marriage years using Vimshottari Dasha, Jupiter transits, and 7th house activation based on your Vedic birth chart. Get specific year-by-year windows.',
    keywords: 'marriage year predictor, when will I get married astrology, marriage timing vedic astrology, dasha marriage, jupiter transit marriage, 7th house marriage',
    alternates: { canonical: 'https://astroword.in/marriage-year' },
    openGraph: {
        title: 'Marriage Year Predictor | AstroWord',
        description: 'Find your most likely marriage years using Vedic Dasha timing and Jupiter transits.',
        url: 'https://astroword.in/marriage-year',
        siteName: 'AstroWord',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Marriage Year Predictor | AstroWord',
        description: 'Find your most likely marriage years using Vedic Dasha timing.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
