import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Spouse Name Initial Predictor — Vedic Astrology | AstroWord',
    description: 'Discover the likely first letter of your future spouse\'s name using 7th lord, Darakaraka, and Venus karaka methods.',
    keywords: 'spouse name initial predictor, future spouse name astrology, nakshatra name letter, 7th lord nakshatra, darakaraka nakshatra name',
    alternates: { canonical: 'https://astroword.in/spouse-initial' },
    openGraph: {
        title: 'Spouse Name Initial Predictor | AstroWord',
        description: 'Predict the first letter of your future spouse name using three Vedic astrology methods.',
        url: 'https://astroword.in/spouse-initial',
        siteName: 'AstroWord',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Spouse Name Initial Predictor | AstroWord',
        description: 'Predict the first letter of your future spouse name using Vedic astrology.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
