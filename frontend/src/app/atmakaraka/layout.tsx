import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Atmakaraka Calculator — Your Soul Significator | AstroWord',
    description: 'Find your Atmakaraka — the planet that represents your soul\'s deepest desire in Vedic astrology. Free Jaimini Atmakaraka calculator.',
    keywords: 'atmakaraka calculator, soul planet vedic astrology, jaimini atmakaraka, soul significator, karma astrology, life purpose astrology',
    alternates: { canonical: 'https://astroword.in/atmakaraka' },
    openGraph: {
        title: 'Atmakaraka Calculator — Your Soul Planet | AstroWord',
        description: "Discover your soul's deepest desire and life purpose through Atmakaraka in Jaimini astrology.",
        url: 'https://astroword.in/atmakaraka',
        siteName: 'AstroWord',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Atmakaraka Calculator | AstroWord',
        description: "Discover your soul's deepest desire and life purpose through Atmakaraka.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
