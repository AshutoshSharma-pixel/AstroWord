import Link from 'next/link';

export default function UpapadaSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Upapada Lagna in Vedic Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">Upapada Lagna (UL) is one of the most important concepts in Jaimini astrology — a 2,000-year-old branch of Vedic astrology developed by the sage Jaimini. While most people are familiar with the 7th house as the marriage indicator in Parashari astrology, Jaimini astrology uses a completely different and more nuanced system of Arudha Padas to analyse marriage.</p>
        <p className="text-muted text-sm leading-relaxed">The Upapada Lagna is the Arudha Pada of the 12th house — meaning it is the mirror reflection of the 12th house projected outward into social reality. The 12th house in Vedic astrology governs bed pleasures, the spouse&apos;s family (as the 6th from the 7th), and the hidden dimensions of intimate life. The Arudha of this house — the Upapada — shows the external, manifested, and socially visible reality of your marriage partnership.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How Upapada Lagna is Calculated</h2>
        <p className="text-muted text-sm leading-relaxed">The calculation follows classical Jaimini rules in four precise steps:</p>
        <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
          <li>• <span className="text-white">Step 1:</span> Identify the sign of the 12th house from your Ascendant (Lagna). If your Ascendant is Aries, the 12th house is Pisces.</li>
          <li>• <span className="text-white">Step 2:</span> Find the lord of that 12th house sign. For Pisces, the lord is Jupiter. AstroWord uses the Jaimini rulership system where Mars rules both Aries and Scorpio.</li>
          <li>• <span className="text-white">Step 3:</span> Count the number of signs from the 12th house sign to the lord&apos;s current sign (inclusive). If the 12th house is Pisces and Jupiter is in Gemini, count Pisces→Aries→Taurus→Gemini = 4 signs.</li>
          <li>• <span className="text-white">Step 4:</span> Project the same count (4 signs) from Jupiter&apos;s sign (Gemini). Gemini→Cancer→Leo→Virgo = Virgo. Virgo is the Upapada Lagna.</li>
        </ul>
        <p className="text-muted text-sm leading-relaxed">The critical exception rule: if the calculated Upapada falls on the 12th house sign itself, or on its 7th sign (counted from the 12th house), then add 10 more signs to the result. This exception prevents the Arudha from neutralising itself.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What Each Upapada Lagna Sign Means</h2>
        <p className="text-muted text-sm leading-relaxed">The sign of your Upapada Lagna describes the quality and nature of your marriage relationship:</p>
        <div className="space-y-3">
          {[
            { sign: "Aries UL", meaning: "Dynamic, pioneering marriage. Spouse tends to be independent, energetic, and action-oriented. Marriage often happens relatively early or with a strong sense of initiative." },
            { sign: "Taurus UL", meaning: "Stable, sensual, materially comfortable marriage. Spouse values security, beauty, and loyalty. Strong emphasis on shared resources and pleasures in married life." },
            { sign: "Gemini UL", meaning: "Intellectual, communicative partnership. Spouse may be witty, versatile, and younger in spirit. Multiple significant relationships or a relationship built on mental compatibility." },
            { sign: "Cancer UL", meaning: "Emotionally nurturing, family-focused marriage. Deep bonds with spouse&apos;s family. Spouse tends to be caring, sensitive, and deeply attached to home." },
            { sign: "Leo UL", meaning: "Proud, dignified, status-conscious marriage. Spouse tends to have a commanding presence. Marriage is often visible and admired in the social circle." },
            { sign: "Virgo UL", meaning: "Practical, service-oriented partnership. Spouse is detail-oriented, analytical, and health-conscious. Marriage is built on shared routines and mutual support." },
            { sign: "Libra UL", meaning: "Balanced, aesthetic, harmony-seeking marriage. Strong partnership orientation. Spouse values beauty, fairness, and elegance. High emphasis on social life together." },
            { sign: "Scorpio UL", meaning: "Intense, transformative, deeply bonded marriage. Strong karmic connection with spouse. Relationship goes through deep changes and emerges stronger." },
            { sign: "Sagittarius UL", meaning: "Philosophical, adventurous, expansive marriage. Spouse may be from a different culture, city, or background. Marriage involves growth, travel, and shared ideals." },
            { sign: "Capricorn UL", meaning: "Mature, disciplined, structured marriage. Spouse tends to be responsible and serious. Marriage is stable and long-lasting, often built on mutual ambition." },
            { sign: "Aquarius UL", meaning: "Unconventional, friendship-based marriage. Spouse may be unique, intellectual, or involved in progressive fields. Marriage has an element of social purpose." },
            { sign: "Pisces UL", meaning: "Spiritual, compassionate, deeply intuitive marriage. Strong karmic bond with spouse. Marriage has a dreamy, idealistic quality with deep emotional and spiritual connection." },
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-white text-sm font-medium mb-1">{item.sign}</p>
              <p className="text-muted text-sm leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The Upapada Lord and Marriage Timing</h2>
        <p className="text-muted text-sm leading-relaxed">The lord of your Upapada Lagna sign is equally important. Its placement in the chart — which house it occupies, whether it is well-placed or challenged — determines the sustainability and quality of your marriage. A well-placed Upapada lord in an upachaya house (3rd, 6th, 10th, 11th) or a Kendra (1st, 4th, 7th, 10th) generally indicates a stable, fulfilling marriage.</p>
        <p className="text-muted text-sm leading-relaxed">For marriage timing, the Dasha (planetary period) of the Upapada lord or planets strongly connected to the UL often triggers marriage events. The 2nd from the Upapada (the sustaining house) is equally important — if the 2nd from UL has benefic planets, the marriage tends to be long-lasting and deeply fulfilling.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Planets in Upapada Lagna — What Each Planet Means for Your Marriage</h2>
        <p className="text-muted text-sm leading-relaxed">
          When planets are placed directly in your Upapada Lagna sign, they powerfully color the quality, character, and experience of your marriage. This is one of the most specific marriage indicators in all of Jaimini astrology — more revealing than even Venus in the 7th house for predicting the lived reality of your partnership.
        </p>
        <div className="space-y-3">
          {[
            { planet: "Jupiter in Upapada Lagna", meaning: "One of the most auspicious placements. The marriage is dharmic, expansive, and deeply blessed. The spouse is wise, educated, generous, and acts as a guide and protector. The marriage brings overall good fortune, social elevation, and children who do well. If Jupiter is strong and unafflicted, this is one of the clearest indicators of a happy, lasting marriage in Jaimini astrology." },
            { planet: "Venus in Upapada Lagna", meaning: "A beautiful, loving, and harmonious marriage. The spouse is charming, artistic, refined, and physically attractive. Strong mutual affection defines the relationship. The marriage has a pleasurable, aesthetic quality — the couple tends to be admired socially. This is one of the best indicators of genuine marital happiness and romantic fulfillment." },
            { planet: "Saturn in Upapada Lagna", meaning: "A serious, disciplined, and exceptionally long-lasting marriage. The spouse may be older, more mature, or highly career-focused and responsible. The marriage is built on duty, structure, and shared work rather than romance. It requires patience in early years but becomes deeply stable and enduring. Saturn here gives one of the most reliable, committed marriages." },
            { planet: "Mars in Upapada Lagna", meaning: "A passionate, energetic, and action-oriented marriage. The spouse is ambitious, assertive, physically active, and direct. Strong physical chemistry defines the attraction. However, Mars also brings potential for ego clashes, impatience, and short-temper in the partner. The marriage thrives when both partners have independent outlets for their energy and drive." },
            { planet: "Sun in Upapada Lagna", meaning: "A dignified, status-conscious marriage. The spouse has a commanding presence, strong sense of self-respect, and natural authority. The marriage is visible and respected in the social circle. There may be ego dynamics — the spouse needs to feel respected and recognized. The marriage elevates the native's social standing when the Sun is well-placed." },
            { planet: "Moon in Upapada Lagna", meaning: "A nurturing, emotionally rich, and family-centred marriage. The spouse is sensitive, caring, and deeply attached to home and family. Strong emotional bond and intuitive connection define the relationship. The marriage may go through emotional cycles but the underlying care is genuine and consistent. Spouse likely to be attractive, gentle, and highly family-oriented." },
            { planet: "Mercury in Upapada Lagna", meaning: "An intellectually stimulating, communicative, and adaptable marriage. The spouse is witty, business-minded, communicative, and youthful in nature. The relationship thrives on mental compatibility, shared ideas, and constant conversation. The couple may work together or share intellectual interests. Spouse likely to be in business, media, writing, or technology." },
            { planet: "Rahu in Upapada Lagna", meaning: "An unconventional, intense, and often karmic marriage. The spouse may be from a very different background, culture, religion, or even nationality. The marriage arrives through unusual circumstances — often surprising to the family. There is intense initial attraction with a complex karmic dimension. The relationship may be non-traditional in some significant way." },
            { planet: "Ketu in Upapada Lagna", meaning: "A spiritually significant, detached, and past-life marriage. The bond with the spouse carries deep karmic weight — a feeling of having known each other before this lifetime. The marriage may have a quality of inevitable destiny. There can be periods of emotional detachment or the spiritual path taking priority over domestic life. A profound but sometimes otherworldly union." },
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-white text-sm font-medium mb-1">{item.planet}</p>
              <p className="text-muted text-sm leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The 2nd from Upapada — Will Your Marriage Last?</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Jaimini astrology, the 2nd house from the Upapada Lagna is called the sustaining house of marriage. While the UL sign itself shows what the marriage looks like and who the spouse is, the 2nd from UL shows whether the marriage will be long-lasting and fulfilling — or whether it will face challenges, separation, or end prematurely.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          This is one of the most important and least-known rules in Jaimini marriage analysis:
        </p>
        <div className="space-y-3">
          {[
            { condition: "Benefic planets in 2nd from UL (Jupiter, Venus, Mercury, Moon)", result: "The marriage is long-lasting, deeply fulfilling, and emotionally nourishing. The relationship sustains through difficulties and grows stronger over time. These are the clearest indicators of a stable, happy long-term marriage." },
            { condition: "Malefic planets in 2nd from UL (Saturn, Mars, Sun, Rahu, Ketu)", result: "The marriage faces sustained pressure or challenges in its sustaining dimension. This does not automatically mean divorce — but requires more conscious effort, communication, and patience to maintain. Saturn here often means the marriage is stable but feels heavy; Mars can indicate conflict; Rahu can indicate unconventional dynamics." },
            { condition: "Empty 2nd from UL (no planets)", result: "Look at the lord of the 2nd from UL sign. Its placement and strength determines the sustainability of the marriage. A well-placed 2nd lord in a Kendra or Trikona indicates good sustenance. A poorly placed 2nd lord in Dusthana houses (6th, 8th, 12th) needs careful analysis." },
            { condition: "Jupiter aspecting the 2nd from UL", result: "Even if malefics are present in the 2nd from UL, Jupiter's full aspect (5th, 7th, or 9th aspect) on this house brings protection, wisdom, and the ability to navigate marital challenges with grace. This is one of the most powerful modifiers." },
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-gold text-sm font-medium mb-1">✦ {item.condition}</p>
              <p className="text-muted text-sm leading-relaxed">{item.result}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">UL2 — Upapada Lagna for Second Marriage</h2>
        <p className="text-muted text-sm leading-relaxed">
          Classical Jaimini astrology provides a method for calculating the second Upapada Lagna (UL2) — the indicator for a second marriage or significant long-term relationship after the first. This is one of the most advanced and least-known techniques in Jaimini marriage analysis.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          UL2 is calculated by counting 8 signs forward from your first Upapada Lagna. The sign you reach becomes the second Upapada Lagna. The same rules of analysis apply — the sign character, planets placed there, and the 2nd from UL2 all describe the nature of the second marriage.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Indicators that UL2 may activate in a chart include: Rahu in or aspecting the first UL, the first UL lord placed in the 6th or 8th house, strong malefic influence on the 2nd from UL with no Jupiter protection, or the 7th lord of the D9 Navamsa being severely afflicted. However, activating UL2 requires specific Dasha conditions — a strong UL2 in the chart does not automatically mean a second marriage will occur. It is a potential, not a certainty.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          For a complete marriage analysis combining Upapada Lagna with your{' '}
          <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Darakaraka planet</Link>
          {', your '}
          <Link href="/d9-chart" className="text-gold/70 hover:text-gold underline underline-offset-2">D9 Navamsa chart</Link>
          {', and your '}
          <Link href="/marriage-year" className="text-gold/70 hover:text-gold underline underline-offset-2">marriage year prediction</Link>
          {' — AstroWord provides all three free, each with a personalised AI reading based on your exact birth chart.'}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: "What is Upapada Lagna in Jaimini astrology?", a: "Upapada Lagna (UL) is the Arudha Pada of the 12th house. It represents the external, manifested reality of your marriage — the sign describes the nature of the spouse and the quality of the marital bond." },
            { q: "Is Upapada Lagna more important than the 7th house?", a: "Both are important and serve different purposes. The 7th house (Parashari) shows your inner orientation toward partnership and the nature of desire. The Upapada (Jaimini) shows what the marriage actually looks like externally and how it manifests in real life. Most experienced Jaimini astrologers use both." },
            { q: "What if my Upapada Lagna is the same as my 7th house sign?", a: "When the UL and 7th house share the same sign (or have aligned energies), there is strong clarity in your marriage destiny. Your inner desire (7th house) aligns with the outer manifestation (UL), which typically indicates a marriage that feels both fulfilling internally and stable externally." },
            { q: "Can the Upapada Lagna indicate more than one marriage?", a: "Specific planetary influences — particularly Rahu in or aspecting the Upapada, or a heavily afflicted UL lord — can indicate relationship complexity or multiple significant relationships. However, this should be read alongside other marriage indicators in the full chart before drawing conclusions." },
            { q: "How does AstroWord calculate Upapada Lagna?", a: "AstroWord uses the Swiss Ephemeris with Lahiri ayanamsa and follows classical Jaimini rules: counting signs from 12th house to its lord, projecting equal signs forward, and applying the exception rule when the result falls on the 12th house or its 7th sign." },
          ].map((faq, i) => (
            <div key={i} className="border-b border-border/40 pb-5">
              <h3 className="text-white text-sm font-medium mb-2">{faq.q}</h3>
              <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Related Jaimini Astrology Tools</h2>
        <p className="text-muted text-sm leading-relaxed">Upapada Lagna works best when analysed alongside other Jaimini indicators. Explore these related calculators:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/arudha-lagna', emoji: '🪞', label: 'Arudha Lagna', desc: 'Your public image and social persona' },
            { href: '/darakaraka', emoji: '💑', label: 'Darakaraka', desc: 'The planet that signifies your spouse' },
            { href: '/atmakaraka', emoji: '☀️', label: 'Atmakaraka', desc: 'Your soul planet and life purpose' },
            { href: '/marriage-year', emoji: '💍', label: 'Marriage Year', desc: 'When will you get married?' },
          ].map((tool, i) => (
            <Link key={i} href={tool.href} className="bg-surface border border-border hover:border-gold/30 rounded-xl p-4 flex items-start gap-3 transition-all group">
              <span className="text-2xl">{tool.emoji}</span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">{tool.label}</p>
                <p className="text-muted text-xs">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
