import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const articles: Record<string, {
    title: string;
    description: string;
    category: string;
    date: string;
    readTime: string;
    relatedCalculator?: { label: string; href: string; emoji: string };
    content: React.ReactNode;
}> = {
    'what-is-darakaraka': {
        title: 'What is Darakaraka? The Planet That Reveals Your Spouse in Vedic Astrology',
        description: 'Learn how Jaimini astrology uses the Darakaraka planet to predict the nature, appearance and timing of your future spouse.',
        category: 'Jaimini Astrology',
        date: 'March 1, 2026',
        readTime: '5 min read',
        relatedCalculator: { label: 'Calculate My Darakaraka', href: '/darakaraka', emoji: '💑' },
        content: (
            <>
                <p>
                    In Jaimini astrology — one of the two major branches of Vedic astrology — every planet in your birth chart takes on a specific role based on its degree. The system is called <strong>Chara Karaka</strong>, meaning "movable significators." Each planet becomes the significator of a particular area of life. The planet with the lowest degree among all seven planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) is called the <strong>Darakaraka</strong>.
                </p>
                <p>
                    "Dara" means spouse in Sanskrit. So the Darakaraka is quite literally your spouse significator — the planet that holds the key to understanding who your partner will be, what they will look like, what profession they will have, and even when marriage is likely for you.
                </p>

                <h2>Why is Darakaraka More Important Than the 7th House?</h2>
                <p>
                    Most people familiar with Vedic astrology know that the 7th house represents marriage and partnerships. The traditional Parashari system analyzes the 7th lord, its placement, aspects, and the planets sitting in the 7th house to understand marriage.
                </p>
                <p>
                    Jaimini's Darakaraka goes deeper. Rather than looking at a fixed house, it identifies a specific planet that becomes the living symbol of your future spouse. This planet's own nature, its sign, its nakshatra, and where it is placed in the Navamsa (D9) chart all paint a detailed picture of the person you will marry.
                </p>
                <p>
                    Many astrologers use both systems together — the 7th house for the structure of the marriage and the Darakaraka for the nature of the spouse.
                </p>

                <h2>How to Calculate Your Darakaraka</h2>
                <p>
                    The calculation is straightforward but requires an accurate birth chart:
                </p>
                <ol>
                    <li>Note the degree each planet occupies within its sign (from 0° to 30°)</li>
                    <li>List all seven planets: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn</li>
                    <li>Do not include Rahu or Ketu in this calculation</li>
                    <li>The planet with the <strong>lowest degree</strong> is your Darakaraka</li>
                </ol>
                <p>
                    For example, if Sun is at 3°12&apos; in Leo, Moon is at 14°05&apos; in Scorpio, Mars is at 1°28&apos; in Aries — Mars would be the Darakaraka because 1°28&apos; is lower than the other planets.
                </p>

                <h2>Darakaraka in the Navamsa Chart</h2>
                <p>
                    Once you know your Darakaraka planet, the real analysis begins in the D9 Navamsa chart. Look at where your Darakaraka sits in the Navamsa. The sign it occupies, the planets aspecting it, and the nakshatra it falls in all give additional layers of meaning about your future partner.
                </p>
                <p>
                    The 7th house of the Navamsa chart also shows the nature of the spouse. When the Darakaraka and the 7th lord of the Navamsa are related — by conjunction, aspect, or sign exchange — this creates a strong and clear picture of the person you will marry.
                </p>

                <h2>Darakaraka by Planet — What Each Planet Means for Your Spouse</h2>
                <div className="space-y-3 my-4">
                    {[
                        { planet: '☀️ Sun as Darakaraka', meaning: 'Your spouse will have a commanding, authoritative presence. They may work in government, leadership, or at a senior level in their field. They care deeply about reputation and self-respect. They come from a family with status or social standing.' },
                        { planet: '🌙 Moon as Darakaraka', meaning: 'Your spouse will be emotionally sensitive, nurturing, and connected to family. They may work in healthcare, hospitality, food, real estate, or any field that involves caring for others. There is often physical attractiveness and a changeable, fluid nature.' },
                        { planet: '🔴 Mars as Darakaraka', meaning: 'Your spouse will be energetic, driven, and action-oriented. They may be in sports, the military, engineering, surgery, or real estate. There will be strong physical energy and a direct, sometimes blunt personality.' },
                        { planet: '🟢 Mercury as Darakaraka', meaning: 'Your spouse will be highly intelligent, communicative, and witty. They may work in media, writing, technology, commerce, or education. They tend to be youthful in appearance and quick in their thinking.' },
                        { planet: '🟡 Jupiter as Darakaraka', meaning: 'Your spouse will be wise, educated, spiritual, and generous. They may be a teacher, mentor, lawyer, priest, or work in fields related to knowledge and growth. They often come from a traditional or religious family.' },
                        { planet: '💗 Venus as Darakaraka', meaning: 'Your spouse will be artistic, charming, and beautiful. They may work in arts, fashion, beauty, entertainment, or luxury goods. There is a strong emphasis on aesthetics, pleasure, and refinement in their personality.' },
                        { planet: '🪐 Saturn as Darakaraka', meaning: 'Your spouse will be disciplined, hardworking, and serious. They may be older than you, or simply more mature. They are reliable and responsible. Their field may involve structure, law, administration, or service.' },
                    ].map((item) => (
                        <div key={item.planet} className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-white text-sm font-medium mb-1">{item.planet}</p>
                            <p className="text-muted text-sm leading-relaxed">{item.meaning}</p>
                        </div>
                    ))}
                </div>

                <h2>When Does Darakaraka Activate for Marriage?</h2>
                <p>
                    Knowing your Darakaraka is one thing. Knowing <em>when</em> it will bring marriage is another. In Vedic astrology, events are timed through the Dasha system. Marriage is most likely to occur during:
                </p>
                <ul>
                    <li>The Mahadasha or Antardasha of your Darakaraka planet</li>
                    <li>The Mahadasha or Antardasha of the 7th lord in D1 or D9</li>
                    <li>When Jupiter transits your 7th house or conjuncts your natal Venus</li>
                    <li>During Venus Mahadasha (Venus is the natural Darakaraka for all charts)</li>
                </ul>
                <p>
                    AstroWord analyzes all of these factors together — your Darakaraka, your current Dasha periods, and Jupiter&apos;s position — to give you a personalized reading about your spouse and marriage timing.
                </p>
            </>
        ),
    },

    'atmakaraka-meaning': {
        title: 'Atmakaraka — Your Soul Planet and Life Purpose in Vedic Astrology',
        description: 'The Atmakaraka is the most important planet in your chart. Discover what your soul came here to experience and the karmic lessons you must complete.',
        category: 'Soul Astrology',
        date: 'March 2, 2026',
        readTime: '6 min read',
        relatedCalculator: { label: 'Find My Atmakaraka', href: '/atmakaraka', emoji: '☀️' },
        content: (
            <>
                <p>
                    Among all the concepts in Vedic astrology, none is more profound than the <strong>Atmakaraka</strong>. In Sanskrit, Atma means soul and Karaka means significator. The Atmakaraka is literally the planet that most closely represents your soul — its desires, its wounds, and its evolutionary direction in this lifetime.
                </p>
                <p>
                    While most people are familiar with their rising sign (Ascendant) or their Sun sign, Vedic astrology considers the Atmakaraka to carry more karmic weight than either. It is the single most important planet in your entire birth chart, according to Jaimini astrology.
                </p>

                <h2>How is Atmakaraka Calculated?</h2>
                <p>
                    Like the Darakaraka, the Atmakaraka comes from the Jaimini Chara Karaka system. The calculation is the opposite of Darakaraka:
                </p>
                <ol>
                    <li>Note the degree each planet occupies within its sign (0° to 30°)</li>
                    <li>Include only the seven classical planets: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn</li>
                    <li>Some schools also include Rahu in this calculation — both approaches are valid</li>
                    <li>The planet with the <strong>highest degree</strong> is your Atmakaraka</li>
                </ol>
                <p>
                    So if Venus is at 28°43&apos; in its sign, and no other planet exceeds that degree, Venus becomes your Atmakaraka — the planet that represents your soul in this incarnation.
                </p>

                <h2>What Does Your Atmakaraka Reveal?</h2>
                <p>
                    The Atmakaraka tells you two things simultaneously: what your soul most deeply desires, and what lesson your soul must master before this desire can be fulfilled. This is the karmic paradox of the Atmakaraka — it represents both our greatest longing and our most important lesson.
                </p>
                <p>
                    For example, if your Atmakaraka is Venus, your soul longs for love, beauty, and connection. But the lesson is to move from attachment and desire toward devotion and higher love. The soul must learn to love without possessing before it can truly experience what it seeks.
                </p>

                <h2>Atmakaraka by Planet</h2>
                <div className="space-y-3 my-4">
                    {[
                        { planet: '☀️ Sun as Atmakaraka', meaning: "The soul seeks to express itself fully, to be seen, recognized, and to lead. The lesson is ego — specifically, learning to serve rather than to dominate. The Sun Atmakaraka person often struggles with authority and self-image before finding their true path of inspired leadership." },
                        { planet: '🌙 Moon as Atmakaraka', meaning: "The soul seeks emotional completeness, family, belonging, and nurturing connections. The lesson is attachment — the mind's ceaseless craving for security. The Moon Atmakaraka person must learn that true peace can only come from within, not from external relationships or circumstances." },
                        { planet: '🔴 Mars as Atmakaraka', meaning: "The soul seeks to act, achieve, and overcome challenges. There is a warrior energy here — courageous, competitive, and driven. The lesson is to channel this force toward dharmic (righteous) action and away from aggression, impatience, and conflict." },
                        { planet: '🟢 Mercury as Atmakaraka', meaning: "The soul seeks knowledge, understanding, and expression. The mind is the primary vehicle for growth in this lifetime. The lesson is to use intelligence in service of truth rather than for personal advantage. Mercury Atmakaraka people are often gifted communicators with a deep need for intellectual honesty." },
                        { planet: '🟡 Jupiter as Atmakaraka', meaning: "The soul seeks wisdom, expansion, and spiritual growth. There is a natural pull toward teaching, philosophy, and religion. The lesson is humility — sharing knowledge without pride, and recognizing that wisdom flows through us, not from us." },
                        { planet: '💗 Venus as Atmakaraka', meaning: "The soul seeks love, beauty, and harmony in all things. There is deep sensitivity to aesthetics and relationships. The lesson is to transform desire into devotion — to love unconditionally and to seek the divine in all beauty, transcending mere pleasure." },
                        { planet: '🪐 Saturn as Atmakaraka', meaning: "The soul seeks to serve, to build, and to do things with discipline and integrity. The lesson involves karma directly — facing the consequences of past actions with acceptance and working selflessly without expectation of reward. Saturn Atmakaraka often indicates a soul with deep responsibilities in this lifetime." },
                    ].map((item) => (
                        <div key={item.planet} className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-white text-sm font-medium mb-2">{item.planet}</p>
                            <p className="text-muted text-sm leading-relaxed">{item.meaning}</p>
                        </div>
                    ))}
                </div>

                <h2>The Atmakaraka in the Navamsa Chart</h2>
                <p>
                    The Atmakaraka&apos;s placement in the Navamsa (D9) chart — specifically in the Karakamsa — is considered one of the most powerful indicators of life purpose in all of Vedic astrology. The Karakamsa is the sign in the Navamsa where your Atmakaraka is placed.
                </p>
                <p>
                    The house from the Karakamsa that receives the strongest influence tells you about your career, spiritual path, and ultimate life direction. Classical texts like Brihat Parashara Hora Shastra and Jaimini Sutras provide extensive analysis of this placement.
                </p>
                <p>
                    AstroWord uses your Atmakaraka as a central element in generating your AI reading — analyzing it alongside your current Dasha to give you insights about where your soul is in its journey right now.
                </p>
            </>
        ),
    },

    'when-will-i-get-married-astrology': {
        title: 'When Will I Get Married? How Vedic Astrology Predicts Marriage Timing',
        description: 'Venus dasha, Jupiter transit, 7th house activation — learn the exact methods Vedic astrologers use to predict marriage year and timing.',
        category: 'Marriage Astrology',
        date: 'March 3, 2026',
        readTime: '7 min read',
        relatedCalculator: { label: 'Predict My Marriage Year', href: '/marriage-year', emoji: '💍' },
        content: (
            <>
                <p>
                    One of the most common questions people bring to a Vedic astrologer is: "When will I get married?" And unlike Western astrology, Vedic astrology has a remarkably precise and systematic method for answering this — one that has been tested and refined over thousands of years.
                </p>
                <p>
                    The short answer is that Vedic astrology predicts marriage through a combination of three things: your <strong>Dasha periods</strong> (planetary time cycles), <strong>Jupiter&apos;s transit</strong> through your chart, and the <strong>activation of your 7th house</strong>. When all three align, marriage is most likely.
                </p>

                <h2>The Dasha System — Planetary Time Cycles</h2>
                <p>
                    The Vimshottari Dasha system divides your life into periods ruled by different planets, each lasting a specific number of years. The full cycle is 120 years:
                </p>
                <div className="overflow-x-auto rounded-xl border border-border my-4">
                    <table className="w-full text-sm text-muted">
                        <thead>
                            <tr className="border-b border-border bg-surface">
                                <th className="text-left py-3 px-4 text-gold font-mono">Planet</th>
                                <th className="text-left py-3 px-4 text-gold font-mono">Years</th>
                                <th className="text-left py-3 px-4 text-gold font-mono">Marriage Potential</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Venus', '20 years', 'Very High — natural karaka of marriage'],
                                ['Jupiter', '16 years', 'High — especially for females'],
                                ['Mercury', '17 years', 'Moderate — if connected to 7th house'],
                                ['Moon', '10 years', 'High — emotional activation, family focus'],
                                ['Mars', '7 years', 'High — if Mars rules 7th or is Darakaraka'],
                                ['Saturn', '19 years', 'Moderate — can bring delayed but stable marriage'],
                                ['Rahu', '18 years', 'High — especially for love/unconventional marriages'],
                            ].map(([planet, years, potential]) => (
                                <tr key={planet} className="border-b border-border/30">
                                    <td className="py-3 px-4 text-white">{planet}</td>
                                    <td className="py-3 px-4">{years}</td>
                                    <td className="py-3 px-4">{potential}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2>The 5 Key Conditions for Marriage in Vedic Astrology</h2>
                <p>
                    Experienced astrologers look for the following conditions when predicting marriage timing:
                </p>

                <div className="space-y-3 my-4">
                    {[
                        {
                            title: '1. Venus Dasha or Antardasha',
                            desc: 'Venus is the natural significator (karaka) of marriage, love, and relationships for all charts. When Venus runs its Mahadasha (20 years) or appears as an Antardasha within another planet\'s period, marriage is very likely if other indicators support it.'
                        },
                        {
                            title: '2. 7th Lord Dasha',
                            desc: 'The lord of the 7th house in your birth chart (D1) is the primary house of marriage. When this planet\'s Mahadasha or Antardasha is running, it activates your marriage house directly. This is often the most reliable timing indicator.'
                        },
                        {
                            title: '3. Darakaraka Dasha',
                            desc: 'Your Darakaraka planet — the planet with the lowest degree in your chart — represents your spouse in Jaimini astrology. When its Dasha period runs, it activates the spouse energy powerfully and often coincides with meeting a significant partner or getting married.'
                        },
                        {
                            title: '4. Jupiter Transit over the 7th House',
                            desc: 'Jupiter, the great benefic, acts as a trigger when it transits over important points in your chart. When Jupiter transits your 7th house, conjuncts your 7th lord, or aspects your natal Venus, it often brings marriage opportunity. Jupiter takes about 12 years to complete one cycle around the zodiac.'
                        },
                        {
                            title: '5. Saturn\'s Transit and Sade Sati',
                            desc: 'Saturn can delay marriage but also confirms it. Many people get married just after Sade Sati ends (Saturn\'s 7.5 year transit over your Moon sign). Once Saturn\'s pressure lifts and a favorable dasha begins, marriage often follows quickly.'
                        },
                    ].map((item) => (
                        <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-gold text-sm font-medium mb-2">✦ {item.title}</p>
                            <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2>Why Vedic Timing Is More Precise Than Western Astrology</h2>
                <p>
                    Western astrology primarily uses transits for timing — planetary movements over your natal chart. Vedic astrology uses both transits AND the Dasha system, which gives a two-layer confirmation. When the Dasha says "marriage period" and the transit of Jupiter confirms it, the prediction becomes very reliable.
                </p>
                <p>
                    The Dasha system is calculated from your exact birth time and the position of the Moon at birth. The Moon's nakshatra (lunar mansion) determines which Dasha you start with at birth, and the sequence flows from there throughout your life. This is why the exact birth time is crucial in Vedic astrology — even a 30-minute difference can shift which Dasha is running and when.
                </p>

                <h2>What AstroWord Does for You</h2>
                <p>
                    Rather than making you analyze all of this manually, AstroWord&apos;s Marriage Year Predictor does the calculation automatically. It identifies your current Mahadasha and Antardasha, finds the most likely marriage windows based on Dasha patterns, and uses AI to generate a personalized reading explaining your specific timing indicators.
                </p>
            </>
        ),
    },

    'love-or-arranged-marriage-astrology': {
        title: 'Love or Arranged Marriage? What Your Birth Chart Reveals',
        description: 'The 5th house, Rahu, Venus and 7th lord tell the story of how you will meet your spouse. Learn to read these signs in your own chart.',
        category: 'Marriage Astrology',
        date: 'March 4, 2026',
        readTime: '5 min read',
        relatedCalculator: { label: 'Check My Marriage Type', href: '/marriage-type', emoji: '💝' },
        content: (
            <>
                <p>
                    Vedic astrology offers a fascinating perspective on one of the most significant decisions of your life — will you find love on your own, or will your partner come through family and circumstances? While free will always plays a role, your birth chart contains powerful indicators that point strongly in one direction or the other.
                </p>

                <h2>The Key Houses for Marriage Type</h2>
                <p>
                    Two houses are central to this analysis:
                </p>
                <ul>
                    <li><strong>5th House</strong> — governs romance, attraction, dating, and love affairs. It represents the heart&apos;s desire and the experience of falling in love.</li>
                    <li><strong>7th House</strong> — governs legal marriage, long-term partnerships, and commitment. It represents the formal bond.</li>
                </ul>
                <p>
                    When these two houses are strongly connected — through their lords being in conjunction or aspect, or through planets crossing between them — it indicates that romance will lead to marriage. When the 7th house is strong but disconnected from the 5th, arranged marriage is more likely.
                </p>

                <h2>Love Marriage Indicators</h2>
                <div className="space-y-2 my-4">
                    {[
                        { indicator: 'Rahu in the 7th house', explanation: 'Rahu represents unconventional, boundary-breaking experiences. In the 7th house, it often brings a non-traditional marriage — a partner from a different culture, background, or religion, and frequently a self-chosen partner.' },
                        { indicator: 'Venus conjunct Rahu anywhere', explanation: 'This combination creates an intense, obsessive quality to romantic attraction. There is often a strong love marriage, sometimes controversial or against family wishes.' },
                        { indicator: '5th lord and 7th lord connected', explanation: 'When the ruler of the romance house (5th) and the marriage house (7th) aspect each other or are placed together, romance directly leads to marriage. This is one of the strongest love marriage indicators.' },
                        { indicator: 'Mars and Venus together', explanation: 'This combination creates powerful physical and romantic attraction. When these two planets conjunct or mutually aspect, relationships often begin with strong romantic chemistry.' },
                        { indicator: 'Venus in the 1st, 5th, or 7th house', explanation: 'Venus in angular or trine positions from the ascendant amplifies the potential for self-initiated romantic connections that lead to marriage.' },
                    ].map((item) => (
                        <div key={item.indicator} className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-gold text-sm font-medium mb-1">✦ {item.indicator}</p>
                            <p className="text-muted text-sm leading-relaxed">{item.explanation}</p>
                        </div>
                    ))}
                </div>

                <h2>Arranged Marriage Indicators</h2>
                <div className="space-y-2 my-4">
                    {[
                        { indicator: 'Jupiter in the 7th house', explanation: 'Jupiter in the 7th brings a traditional, auspicious marriage often facilitated through the family. This is especially common for women. The spouse is often wise, educated, and from a good family.' },
                        { indicator: 'Saturn aspecting the 7th house', explanation: 'Saturn delays but ultimately brings a stable, responsible marriage. Arranged marriages often occur during Saturn Mahadasha or when Saturn aspects the 7th house.' },
                        { indicator: 'Strong Moon with no Rahu influence', explanation: 'A strong, unafflicted Moon indicates emotional alignment with family values and traditional processes. Such individuals often feel comfortable with the arranged marriage process.' },
                        { indicator: '7th lord in the 2nd or 12th house', explanation: 'When the 7th lord moves toward houses of family (2nd) or foreign lands/spiritual matters (12th), it often indicates a marriage arranged through family connections or social networks.' },
                        { indicator: 'No connection between 5th and 7th lords', explanation: 'When romance and marriage are clearly separated in the chart, the person is more likely to have casual relationships separately from the person they ultimately marry through a more formal process.' },
                    ].map((item) => (
                        <div key={item.indicator} className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-gold text-sm font-medium mb-1">✦ {item.indicator}</p>
                            <p className="text-muted text-sm leading-relaxed">{item.explanation}</p>
                        </div>
                    ))}
                </div>

                <h2>Most Charts Show a Mix</h2>
                <p>
                    In practice, most birth charts do not show a pure love marriage or purely arranged marriage. What is more common is something in between — meeting someone through a social or professional situation (arranged-adjacent), but developing genuine feelings before committing (love-adjacent). The chart shows the primary tendency, not an absolute outcome.
                </p>
                <p>
                    What AstroWord&apos;s calculator does is analyze the strength of indicators on both sides and tell you which tendency is stronger in your specific chart, along with an AI-generated reading that explains which specific planets are influencing your marriage pattern.
                </p>
            </>
        ),
    },

    'gana-matching-vedic-astrology': {
        title: 'Gana Matching in Vedic Astrology — Deva, Manushya and Rakshasa Explained',
        description: 'One of the 8 factors in Kundli Milan, Gana matching reveals compatibility based on your Moon nakshatra. Learn what your Gana says about you.',
        category: 'Compatibility',
        date: 'March 5, 2026',
        readTime: '4 min read',
        relatedCalculator: { label: 'Find My Gana', href: '/gana', emoji: '🔱' },
        content: (
            <>
                <p>
                    When two people consider marriage in the Vedic tradition, one of the first things their families check is <strong>Kundli Milan</strong> — the matching of birth charts. This system uses 8 different factors (called Ashtakoot) to assign compatibility points, for a maximum of 36 points total. A score of 18 or above is generally considered acceptable for marriage.
                </p>
                <p>
                    <strong>Gana</strong> is one of these 8 factors, worth up to 6 points. It is also one of the most misunderstood — and one of the most psychologically insightful.
                </p>

                <h2>What is Gana?</h2>
                <p>
                    Gana means "nature" or "temperament." Every person is born under one of 27 nakshatras (lunar mansions), and each nakshatra belongs to one of three Ganas:
                </p>
                <div className="space-y-3 my-4">
                    {[
                        {
                            gana: '✨ Deva Gana (Divine Nature)',
                            nakshatras: 'Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati',
                            desc: 'Deva Gana people are generally idealistic, spiritual, gentle, and cooperative. They tend to be soft-spoken, harmonious, and oriented toward peace and higher values. They may seem naive to some, but their nature is fundamentally aligned with Dharma (righteous living).'
                        },
                        {
                            gana: '🤝 Manushya Gana (Human Nature)',
                            nakshatras: 'Bharani, Rohini, Ardra, Purva Phalguni, Uttara Phalguni, Purva Ashadha, Uttara Ashadha, Purva Bhadrapada, Uttara Bhadrapada',
                            desc: 'Manushya Gana people are balanced — they have both spiritual and material ambitions. They understand both worldly responsibilities and higher values. They can adapt to different environments and relate to both Deva and Rakshasa Gana people.'
                        },
                        {
                            gana: '⚡ Rakshasa Gana (Fierce Nature)',
                            nakshatras: 'Krittika, Ashlesha, Magha, Chitra, Vishakha, Jyeshtha, Mula, Dhanishta, Shatabhisha',
                            desc: 'Rakshasa Gana people are intense, driven, independent, and sometimes unconventional. They do not easily follow social norms and can be stubborn or rebellious. They have a powerful survival instinct and are often highly ambitious. "Rakshasa" does not mean evil — it simply indicates a fierce, self-directed energy.'
                        },
                    ].map((item) => (
                        <div key={item.gana} className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-white text-sm font-semibold mb-1">{item.gana}</p>
                            <p className="text-gold/70 text-xs mb-2 font-mono">{item.nakshatras}</p>
                            <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2>Gana Compatibility Scoring</h2>
                <div className="overflow-x-auto rounded-xl border border-border my-4">
                    <table className="w-full text-sm text-muted">
                        <thead>
                            <tr className="border-b border-border bg-surface">
                                <th className="text-left py-3 px-4 text-gold font-mono">Your Gana</th>
                                <th className="text-left py-3 px-4 text-gold font-mono">Partner</th>
                                <th className="text-left py-3 px-4 text-gold font-mono">Score</th>
                                <th className="text-left py-3 px-4 text-gold font-mono">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Deva', 'Deva', '6/6', 'Excellent — same values, harmonious life'],
                                ['Deva', 'Manushya', '5/6', 'Good — mostly aligned with minor adjustments'],
                                ['Deva', 'Rakshasa', '0/6', 'Challenging — very different approaches to life'],
                                ['Manushya', 'Manushya', '6/6', 'Excellent — well balanced partnership'],
                                ['Manushya', 'Rakshasa', '0/6', 'Moderate — can work with understanding'],
                                ['Rakshasa', 'Rakshasa', '6/6', 'Excellent — mutual intensity and drive'],
                            ].map(([g1, g2, score, result]) => (
                                <tr key={`${g1}-${g2}`} className="border-b border-border/30">
                                    <td className="py-3 px-4">{g1}</td>
                                    <td className="py-3 px-4">{g2}</td>
                                    <td className="py-3 px-4 text-gold font-mono">{score}</td>
                                    <td className="py-3 px-4 text-xs">{result}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2>Should You Reject a Partner Because of Gana?</h2>
                <p>
                    Gana is one factor among many. A Deva-Rakshasa couple with strong scores in other categories (particularly Rashi, Nadi, and Bhakoot) can have a successful marriage. Modern astrologers typically advise against using any single factor as a dealbreaker.
                </p>
                <p>
                    What Gana does tell you is the fundamental temperament difference between two people — and that awareness itself is valuable. A Deva Gana person who knows they are marrying a Rakshasa Gana partner can prepare for their partner&apos;s driven, independent nature rather than being surprised by it.
                </p>
            </>
        ),
    },

    'd9-navamsa-chart-explained': {
        title: 'The D9 Navamsa Chart — The Most Important Divisional Chart in Vedic Astrology',
        description: 'The Navamsa is used for marriage, spiritual life and the second half of life. Learn how to read your D9 chart and what it reveals about your destiny.',
        category: 'Divisional Charts',
        date: 'March 6, 2026',
        readTime: '8 min read',
        relatedCalculator: { label: 'Ask About My D9 Chart', href: '/', emoji: '🌙' },
        content: (
            <>
                <p>
                    In Vedic astrology, the birth chart (D1 or Rashi chart) is just the beginning. Once you have your D1 chart, you can generate a series of <strong>divisional charts</strong> that zoom into specific areas of life with much greater detail. Among all these divisional charts, none is more important than the <strong>D9 Navamsa chart</strong>.
                </p>
                <p>
                    Navamsa literally means "ninth division." Each sign of 30° is divided into 9 equal parts of 3°20' each. The Navamsa chart is built from where each planet falls within these divisions. The result is a completely different chart that works alongside the D1 to give a fuller picture of your life.
                </p>

                <h2>Why is the Navamsa So Important?</h2>
                <p>
                    Classical Vedic texts state that the D1 chart shows potential, while the D9 chart shows how that potential actually manifests. A planet that is strong in D1 but weak in D9 will struggle to deliver its full promise. A planet weak in D1 but strong in D9 may still deliver good results, especially in the second half of life.
                </p>
                <p>
                    The Navamsa is specifically important for three areas:
                </p>
                <ul>
                    <li><strong>Marriage and spouse</strong> — The D9 is the primary chart for understanding the spouse, the quality of marriage, and timing of relationship events</li>
                    <li><strong>Spiritual life</strong> — The 9th division is inherently connected to dharma, spirituality, and higher purpose</li>
                    <li><strong>Second half of life</strong> — Many astrologers believe the D9 becomes the dominant chart after around age 35-40</li>
                </ul>

                <h2>Key Indicators in the Navamsa Chart</h2>
                <div className="space-y-3 my-4">
                    {[
                        {
                            title: 'Navamsa Ascendant (D9 Lagna)',
                            desc: 'The rising sign of the Navamsa gives you another lens to understand personality — particularly the deeper self that emerges in committed relationships. What you show in marriage is often more aligned with your Navamsa ascendant than your D1 ascendant.'
                        },
                        {
                            title: 'Venus in the Navamsa',
                            desc: 'Venus in a good sign or well-placed in the Navamsa (especially in its own sign Taurus or Libra, or in exaltation in Pisces) indicates a beautiful, harmonious marriage. Venus in its fall (Virgo) or debilitation may indicate friction in relationships despite outward compatibility.'
                        },
                        {
                            title: '7th House of Navamsa',
                            desc: 'The 7th house of the Navamsa shows the nature of the spouse even more precisely than the 7th house in D1. Planets here, the sign on the cusp, and the 7th lord\'s placement all describe your partner in detail.'
                        },
                        {
                            title: 'Atmakaraka in Navamsa — Karakamsa',
                            desc: 'The sign in the Navamsa where your Atmakaraka falls is called the Karakamsa. This is one of the most profound points in all of Jaimini astrology, indicating your soul\'s dharma, career, and spiritual direction.'
                        },
                        {
                            title: 'Vargottama Planets',
                            desc: 'A planet is Vargottama when it occupies the same sign in both D1 and D9. Vargottama planets carry double strength and tend to deliver results very reliably. If your ascendant lord or Atmakaraka is Vargottama, it is a very auspicious sign.'
                        },
                    ].map((item) => (
                        <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                            <p className="text-gold text-sm font-medium mb-2">✦ {item.title}</p>
                            <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h2>Reading D1 and D9 Together</h2>
                <p>
                    The correct way to use the Navamsa is never in isolation — always in conjunction with the D1. The process looks like this:
                </p>
                <ol>
                    <li>Identify the key planet in D1 (7th lord, Venus, Darakaraka)</li>
                    <li>Find where that same planet falls in D9</li>
                    <li>Assess its strength in D9 — sign position, exaltation, debilitation, aspects received</li>
                    <li>Check if it is Vargottama (same sign in both charts) for extra strength</li>
                    <li>Look at the 7th house of D9 and its lord for spouse description</li>
                </ol>
                <p>
                    AstroWord generates both your D1 and D9 charts from your birth details. When you ask questions through the AI chat, the system analyzes both charts together to give you readings that account for the full depth of your astrological picture — not just the surface-level D1.
                </p>
            </>
        ),
    },
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const article = articles[slug];
    if (!article) return { title: 'Article Not Found' };
    return {
        title: `${article.title} | AstroWord`,
        description: article.description,
        alternates: { canonical: `https://astroword.in/blog/${slug}` },
        openGraph: {
            title: article.title,
            description: article.description,
            url: `https://astroword.in/blog/${slug}`,
            siteName: 'AstroWord',
        }
    };
}

export function generateStaticParams() {
    return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Params }) {
    const { slug } = await params;
    const article = articles[slug];
    if (!article) notFound();

    return (
        <div className="min-h-screen bg-bg text-text py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-muted mb-8 font-mono">
                    <Link href="/" className="hover:text-white transition-colors">AstroWord</Link>
                    <span>›</span>
                    <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                    <span>›</span>
                    <span className="text-text/60 truncate">{article.category}</span>
                </div>

                {/* Header */}
                <header className="mb-10 space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-full font-mono">
                            {article.category}
                        </span>
                        <span className="text-xs text-muted font-mono">{article.readTime}</span>
                        <span className="text-xs text-muted font-mono ml-auto">{article.date}</span>
                    </div>
                    <h1 className="text-white font-serif text-3xl sm:text-4xl leading-tight">
                        {article.title}
                    </h1>
                    <p className="text-muted text-base leading-relaxed border-l-2 border-gold/30 pl-4">
                        {article.description}
                    </p>
                </header>

                {/* Article Content */}
                <div className="prose-astro">
                    <style>{`
                        .prose-astro p { color: rgb(180 170 150); font-size: 0.9rem; line-height: 1.8; margin-bottom: 1.2rem; }
                        .prose-astro h2 { color: #c9a84c; font-family: serif; font-size: 1.4rem; font-weight: 500; margin-top: 2rem; margin-bottom: 0.8rem; }
                        .prose-astro h3 { color: #fff; font-size: 1.1rem; font-weight: 500; margin-top: 1.5rem; margin-bottom: 0.5rem; }
                        .prose-astro ul { list-style: none; padding: 0; margin: 1rem 0; }
                        .prose-astro ul li { color: rgb(180 170 150); font-size: 0.9rem; padding: 0.3rem 0 0.3rem 1.5rem; position: relative; line-height: 1.6; }
                        .prose-astro ul li::before { content: '✦'; color: #c9a84c; position: absolute; left: 0; font-size: 0.65rem; top: 0.45rem; }
                        .prose-astro ol { padding-left: 1.5rem; margin: 1rem 0; }
                        .prose-astro ol li { color: rgb(180 170 150); font-size: 0.9rem; padding: 0.2rem 0; line-height: 1.6; }
                        .prose-astro strong { color: #fff; font-weight: 500; }
                        .prose-astro em { color: #c9a84c; font-style: italic; }
                        .prose-astro a { color: #c9a84c; }
                    `}</style>
                    {article.content}
                </div>

                {/* Related Calculator CTA */}
                {article.relatedCalculator && (
                    <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 text-center mt-12">
                        <p className="text-2xl mb-3">{article.relatedCalculator.emoji}</p>
                        <p className="text-gold font-serif text-xl mb-2">Try It Yourself</p>
                        <p className="text-muted text-sm mb-5">
                            Calculate your result instantly using your exact birth details. Get a personalized AI reading.
                        </p>
                        <Link
                            href={article.relatedCalculator.href}
                            className="inline-block bg-gradient-to-r from-gold to-amber text-bg font-medium px-8 py-3 rounded-xl hover:opacity-90 transition-all"
                        >
                            {article.relatedCalculator.label} →
                        </Link>
                    </div>
                )}

                {/* Back to blog */}
                <div className="text-center mt-10">
                    <Link href="/blog" className="text-muted text-sm hover:text-white transition-colors">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
