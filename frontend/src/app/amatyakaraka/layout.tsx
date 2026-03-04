import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Amatyakaraka Calculator — Career & Profession Planet | AstroWord',
    description: 'Calculate your Amatyakaraka planet for career and professional life insights using Jaimini Vedic astrology.',
    keywords: 'amatyakaraka calculator, career planet vedic astrology, jaimini amatyakaraka, profession astrology, career path birth chart',
    alternates: { canonical: 'https://astroword.in/amatyakaraka' },
    openGraph: {
        title: 'Amatyakaraka Calculator — Career Planet | AstroWord',
        description: 'Find your career significator planet and understand your professional destiny through Jaimini astrology.',
        url: 'https://astroword.in/amatyakaraka',
        siteName: 'AstroWord',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Amatyakaraka Calculator | AstroWord',
        description: 'Find your career significator planet through Jaimini astrology.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
