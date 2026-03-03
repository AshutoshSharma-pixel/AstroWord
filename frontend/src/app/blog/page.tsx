import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vedic Astrology Blog — Learn Jyotish, Dasha, Nakshatra & More | AstroWord',
    description: 'Learn Vedic astrology concepts explained simply. Articles on Darakaraka, Atmakaraka, Dasha timing, marriage prediction, career astrology and more.',
    keywords: 'vedic astrology blog, learn jyotish, dasha explained, nakshatra meaning, karaka planets, atmakaraka, darakaraka',
    alternates: { canonical: 'https://astroword.in/blog' },
    openGraph: {
        title: 'Vedic Astrology Blog — AstroWord',
        description: 'Learn Vedic astrology concepts explained simply. Articles on Darakaraka, Atmakaraka, Dasha timing and more.',
        url: 'https://astroword.in/blog',
        siteName: 'AstroWord',
    }
};

const articles = [
    {
        slug: 'what-is-darakaraka',
        title: 'What is Darakaraka? The Planet That Reveals Your Spouse in Vedic Astrology',
        description: 'Learn how Jaimini astrology uses the Darakaraka planet to predict the nature, appearance and timing of your future spouse.',
        category: 'Jaimini Astrology',
        readTime: '5 min read',
        date: 'Mar 1, 2026',
        emoji: '💑'
    },
    {
        slug: 'atmakaraka-meaning',
        title: 'Atmakaraka — Your Soul Planet and Life Purpose in Vedic Astrology',
        description: 'The Atmakaraka is the most important planet in your chart. Discover what your soul came here to experience and the karmic lessons you must complete.',
        category: 'Soul Astrology',
        readTime: '6 min read',
        date: 'Mar 2, 2026',
        emoji: '☀️'
    },
    {
        slug: 'when-will-i-get-married-astrology',
        title: 'When Will I Get Married? How Vedic Astrology Predicts Marriage Timing',
        description: 'Venus dasha, Jupiter transit, 7th house activation — learn the exact methods Vedic astrologers use to predict marriage year and timing.',
        category: 'Marriage Astrology',
        readTime: '7 min read',
        date: 'Mar 3, 2026',
        emoji: '💍'
    },
    {
        slug: 'love-or-arranged-marriage-astrology',
        title: 'Love or Arranged Marriage? What Your Birth Chart Reveals',
        description: 'The 5th house, Rahu, Venus and 7th lord tell the story of how you will meet your spouse. Learn to read these signs in your own chart.',
        category: 'Marriage Astrology',
        readTime: '5 min read',
        date: 'Mar 4, 2026',
        emoji: '💝'
    },
    {
        slug: 'gana-matching-vedic-astrology',
        title: 'Gana Matching in Vedic Astrology — Deva, Manushya and Rakshasa Explained',
        description: 'One of the 8 factors in Kundli Milan, Gana matching reveals compatibility based on your Moon nakshatra. Learn what your Gana says about you.',
        category: 'Compatibility',
        readTime: '4 min read',
        date: 'Mar 5, 2026',
        emoji: '🔱'
    },
    {
        slug: 'd9-navamsa-chart-explained',
        title: 'The D9 Navamsa Chart — The Most Important Divisional Chart in Vedic Astrology',
        description: 'The Navamsa is used for marriage, spiritual life and the second half of life. Learn how to read your D9 chart and what it reveals about your destiny.',
        category: 'Divisional Charts',
        readTime: '8 min read',
        date: 'Mar 6, 2026',
        emoji: '🌙'
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-bg text-text py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-14 space-y-3">
                    <p className="text-gold font-mono text-xs uppercase tracking-widest">Learn Vedic Astrology</p>
                    <h1 className="text-white font-serif text-4xl sm:text-5xl">AstroWord Blog</h1>
                    <p className="text-muted text-sm max-w-xl mx-auto leading-relaxed">
                        Vedic astrology concepts explained simply. No jargon — just clear, useful knowledge about your chart and your life.
                    </p>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className="bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_24px_rgba(201,168,76,0.07)] rounded-2xl p-6 transition-all group block"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl">{article.emoji}</span>
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono">
                                    {article.category}
                                </span>
                                <span className="text-xs text-muted font-mono ml-auto">{article.readTime}</span>
                            </div>
                            <h2 className="text-white font-serif text-lg mb-2 group-hover:text-gold transition-colors leading-snug">
                                {article.title}
                            </h2>
                            <p className="text-muted text-sm leading-relaxed">
                                {article.description}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-muted/50 text-xs font-mono">{article.date}</span>
                                <span className="text-gold/50 text-xs group-hover:text-gold transition-colors">
                                    Read article →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Back to app */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted text-sm hover:text-white transition-colors"
                    >
                        ← Back to AstroWord
                    </Link>
                </div>
            </div>
        </div>
    );
}
