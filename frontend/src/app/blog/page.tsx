import Link from 'next/link';
import type { Metadata } from 'next';
import TopToolsStrip from '@/components/TopToolsStrip';

export const metadata: Metadata = {
    title: 'Vedic Astrology Blog — Learn Jyotish, Dasha, Nakshatra & More',
    description: 'Learn Vedic astrology concepts explained simply. Articles on Darakaraka, Atmakaraka, Dasha timing, marriage prediction, career astrology and more.',
    keywords: 'vedic astrology blog, learn jyotish, dasha explained, nakshatra meaning, karaka planets, atmakaraka, darakaraka',
    alternates: { canonical: 'https://www.astroword.in/blog' },
    openGraph: {
        title: 'Vedic Astrology Blog — AstroWord',
        description: 'Learn Vedic astrology concepts explained simply. Articles on Darakaraka, Atmakaraka, Dasha timing and more.',
        url: 'https://www.astroword.in/blog',
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
    {
        slug: 'what-is-amatyakaraka',
        title: 'Amatyakaraka: The Planet That Decides Your Career in Vedic Astrology',
        description: 'Discover which planet is your Amatyakaraka and what it reveals about your ideal career and professional strengths. Free Jaimini astrology calculator included.',
        category: 'Jaimini Astrology',
        readTime: '6 min read',
        date: 'May 1, 2026',
        emoji: '💼'
    },
    {
        slug: 'gana-matching-marriage',
        title: 'Gana Matching for Marriage — Deva, Manushya and Rakshasa Explained',
        description: 'One of the 8 Ashtakoot factors, Gana matching reveals deep compatibility based on your Moon nakshatra. Learn what your Gana says about you and your partner.',
        category: 'Compatibility',
        readTime: '5 min read',
        date: 'May 2, 2026',
        emoji: '🔱'
    },
    {
        slug: 'spouse-name-initial-nakshatra',
        title: 'How to Find Your Spouse\'s Name Initial Using Nakshatra Akshara',
        description: 'Ancient Vedic astrology maps each nakshatra to specific syllables. Learn how your Darakaraka nakshatra can reveal the first letter of your future spouse\'s name.',
        category: 'Marriage Astrology',
        readTime: '5 min read',
        date: 'May 3, 2026',
        emoji: '🔤'
    },
    {
        slug: 'what-is-jaimini-astrology',
        title: 'What is Jaimini Astrology? The Ancient System Behind Chara Karakas',
        description: 'Jaimini astrology is a 2000-year-old system that uses Chara Karakas — changing significators — to reveal soul purpose, career, and marriage destiny with remarkable precision.',
        category: 'Vedic Basics',
        readTime: '7 min read',
        date: 'May 4, 2026',
        emoji: '📿'
    },
    {
        slug: 'mars-7th-house-marriage',
        title: 'Mars in the 7th House — Mangal Dosha, Marriage Delay and What It Really Means',
        description: 'Mars in the 7th house is one of the most misunderstood placements in Vedic astrology. Learn what Mangal Dosha actually means and when it affects marriage timing.',
        category: 'Marriage Astrology',
        readTime: '6 min read',
        date: 'May 5, 2026',
        emoji: '🔴'
    },
    {
        slug: 'venus-in-vedic-astrology',
        title: 'Venus in Vedic Astrology — Love, Marriage and the Karaka of Desire',
        description: 'Venus (Shukra) is the natural karaka of marriage in Vedic astrology. Learn how Venus sign, house, and dasha influence your love life, marriage timing, and relationship quality.',
        category: 'Planets',
        readTime: '6 min read',
        date: 'May 6, 2026',
        emoji: '✨'
    },
    {
        slug: 'rahu-in-7th-house',
        title: 'Rahu in the 7th House — Unconventional Love, Foreign Spouse and Marriage Karma',
        description: 'Rahu in the 7th house is one of the strongest indicators of a love marriage or inter-caste relationship. Learn what this placement means for your marriage destiny.',
        category: 'Marriage Astrology',
        readTime: '5 min read',
        date: 'May 7, 2026',
        emoji: '🌑'
    },
    {
        slug: 'what-is-manglik-dosha',
        title: "Manglik Dosha: What It Is, What It Isn't, and What It Means for Your Marriage",
        description: "Find out if you are Manglik, what Mars placement actually means for marriage, the real cancellations, and whether Manglik Dosha should actually worry you. Free calculator.",
        category: "Vedic Astrology",
        readTime: "6 min read",
        date: "May 20, 2026",
        emoji: "🔴"
    },
    {
        slug: 'vimshottari-dasha-explained',
        title: "Vimshottari Dasha: The 120-Year System That Times Every Event in Your Life",
        description: "Understand how Vimshottari Dasha works, what your current Mahadasha means, and how to use planetary periods to predict career, marriage, and major life events. Free calculator.",
        category: "Vedic Astrology",
        readTime: "7 min read",
        date: "May 20, 2026",
        emoji: "⏳"
    },
    {
        slug: 'birth-tithi-astrology',
        title: "Birth Tithi in Vedic Astrology: What Your Lunar Birthday Reveals About You",
        description: "Discover what your birth Tithi means in Vedic astrology — your personality, relationships, karma, and the deity that governs your lunar day. Free birth Tithi calculator.",
        category: "Vedic Astrology",
        readTime: "5 min read",
        date: "May 20, 2026",
        emoji: "🌙"
    },
    {
        slug: 'marriage-timing-astrology',
        title: "When Will I Get Married? How Vedic Astrology Predicts Your Marriage Year",
        description: "Learn how Vedic astrology predicts marriage timing using Dasha periods, Jupiter transits, and the 7th house. Discover your personal marriage window with our free calculator.",
        category: "Marriage Astrology",
        readTime: "6 min read",
        date: "May 20, 2026",
        emoji: "💍"
    },
    {
        slug: 'upapada-lagna-marriage',
        title: "Upapada Lagna: The Real Marriage Indicator Most Astrologers Miss",
        description: "Learn how Upapada Lagna reveals your spouse's true nature, marriage quality, and in-laws — beyond what the 7th house shows. Free UL calculator included.",
        category: "Marriage Astrology",
        readTime: "6 min read",
        date: "May 22, 2026",
        emoji: "💒"
    },
    {
        slug: 'arudha-lagna-public-image',
        title: "Arudha Lagna: Why the World Sees You Differently Than You See Yourself",
        description: "Discover how Arudha Lagna reveals your public image, social reputation, and how the world perceives you — separate from your true self. Free AL calculator included.",
        category: "Jaimini Astrology",
        readTime: "6 min read",
        date: "May 22, 2026",
        emoji: "🪞"
    },
    {
        slug: 'kaal-sarp-dosha-explained',
        title: "Kaal Sarp Dosha: The 12 Serpent Yogas & Their Real Remedies",
        description: "Understand the 12 types of Kaal Sarp Dosha, from Anant to Sheshnag. Discover how this planetary hemming shapes your destiny and key Vedic remedies.",
        category: "Vedic Astrology",
        readTime: "7 min read",
        date: "May 22, 2026",
        emoji: "🐍"
    },
    {
        slug: 'sade-sati-guide',
        title: "Shani Sade Sati: A Complete Survival Guide for Saturn's Transit",
        description: "Demystify Shani Sade Sati's 3 phases and Shani Dhaiya. Learn how Saturn's transit affects your Moon sign and simple Saturday remedies.",
        category: "Vedic Astrology",
        readTime: "6 min read",
        date: "May 22, 2026",
        emoji: "🔵"
    },
    {
        slug: 'moon-sign-meaning',
        title: "What is My Moon Sign? The Rashi That Governs Your Mind & Emotions",
        description: "Discover the significance of your Janma Rashi or Moon Sign in Jyotish, how it shapes your psychology, and why it is more important than your Sun Sign.",
        category: "Vedic Astrology",
        readTime: "5 min read",
        date: "May 23, 2026",
        emoji: "🌙"
    },
    {
        slug: 'nakshatra-secrets',
        title: "Secrets of the 27 Nakshatras: How Lunar Mansions Reveal Your Destiny",
        description: "Go beyond zodiac signs. Learn how the 27 Nakshatras add highly specific layers to your personality, emotional landscape, and future timing.",
        category: "Vedic Astrology",
        readTime: "6 min read",
        date: "May 23, 2026",
        emoji: "✨"
    },
    {
        slug: 'rising-sign-astrology',
        title: "Vedic Rising Sign: How Your Lagna Shapes Your Appearance & Purpose",
        description: "Your Lagna (Ascendant) is the starting point of your chart. Learn how it determines your physical look, self-identity, and the houses of your life path.",
        category: "Vedic Astrology",
        readTime: "6 min read",
        date: "May 23, 2026",
        emoji: "🌅"
    },
    {
        slug: 'find-ishta-devata',
        title: "How to Find Your Ishta Devata: The Soul's Guiding Divine Force",
        description: "Use Jaimini astrology to calculate the planet 12th from your Karakamsha. Find your personal guiding deity and their sacred mantra for spiritual protection.",
        category: "Soul Astrology",
        readTime: "5 min read",
        date: "May 23, 2026",
        emoji: "🕉️"
    },
    {
        slug: 'pitra-dosha-remedies',
        title: "Pitra Dosha Remedies: Healing Ancestral Karma in Your Birth Chart",
        description: "Find out how Sun-Rahu conjunctions, 9th house afflictions, and ancestral debt manifest in life, and the classic acts of charity to resolve them.",
        category: "Vedic Astrology",
        readTime: "6 min read",
        date: "May 23, 2026",
        emoji: "🌳"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-[100dvh] bg-bg text-text py-16">
            <TopToolsStrip currentTool="blog" />
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
