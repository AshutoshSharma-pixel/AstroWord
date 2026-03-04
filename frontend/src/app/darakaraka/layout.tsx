import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Darakaraka Calculator — Find Your Spouse Significator Planet | AstroWord',
    description: 'Calculate your Darakaraka — the planet with the lowest degree in your birth chart. It reveals the nature, appearance, and characteristics of your future spouse using Jaimini astrology.',
    keywords: 'darakaraka calculator, spouse significator vedic astrology, jaimini astrology darakaraka, spouse planet birth chart, marriage astrology',
    alternates: { canonical: 'https://astroword.in/darakaraka' },
    openGraph: {
        title: 'Darakaraka Calculator — Spouse Significator | AstroWord',
        description: 'Find the planet that reveals your future spouse nature using Jaimini astrology.',
        url: 'https://astroword.in/darakaraka',
        siteName: 'AstroWord',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Darakaraka Calculator | AstroWord',
        description: 'Find the planet that reveals your future spouse nature using Jaimini astrology.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
