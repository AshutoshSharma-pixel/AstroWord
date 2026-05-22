import Link from 'next/link';

export default function MarriageTypeSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Love or Arranged Marriage? Deciphering Your Marriage Destiny</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic Astrology, the nature of your union—whether it is a &quot;Love Marriage&quot; (Swayamvara) or an &quot;Arranged Marriage&quot;—is intricately woven into the planetary positions of your birth chart. While modern life has blurred these lines, the cosmic blueprint still identifies the primary force that will bring two souls together. 
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Our AI-powered analyzer looks beyond surface-level placements, examining the subtle connections between the houses of desire (Kama) and the houses of commitment (Dharma) to provide a probability-based reading of your marital path.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Key Indicators for Love Marriage (Gandharva Vivaha)</h2>
        <p className="text-muted text-sm leading-relaxed">
          A love marriage is usually indicated when the planets governing romance and individual will overpower traditional family-centric houses.
        </p>
        <div className="space-y-3">
          {[
            { t: '5th and 7th House Connection', d: 'The strongest indicator. When the lord of the 5th (romance) and the 7th (marriage) exchange houses, conjunct, or aspect each other, a love-based union is highly likely.' },
            { t: 'Rahu\'s Influence', d: 'Rahu represents unconventional paths. Rahu in the 7th house, or conjunct Venus/7th lord, often indicates a marriage that breaks traditional boundaries or happens outside one\'s immediate community.' },
            { t: 'Venus-Mars Interaction', d: 'Venus (love) and Mars (passion) together create strong physical and emotional attraction, often leading to relationships that culminate in marriage.' },
            { t: 'The Moon\'s Role', d: 'A Moon connected to the 7th house or its lord indicates a marriage based on deep emotional compatibility and personal choice.' }
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3">
              <span className="text-gold text-xs mt-1 flex-shrink-0">✦</span>
              <p className="text-muted text-sm"><strong className="text-text">{item.t}:</strong> {item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Indicators for Arranged Marriage (Traditional Union)</h2>
        <p className="text-muted text-sm leading-relaxed">
          An arranged marriage is indicated when the chart shows a strong influence of tradition, family values, and &quot;Dharma&quot; over personal impulse.
        </p>
        <div className="space-y-3">
          {[
            { t: 'Jupiter\'s Dominance', d: 'Jupiter is the planet of tradition and wisdom. A strong Jupiter aspecting the 7th house or its lord suggests a marriage approved by elders and based on shared values.' },
            { t: '2nd, 4th, and 9th House Involvement', d: 'When the 7th lord is connected to the 2nd (family), 4th (home), or 9th (tradition), the family plays a pivotal role in choosing the spouse.' },
            { t: 'Sun and Saturn Influence', d: 'Sun represents the father/authority and Saturn represents duty. Their influence on the 7th house often points toward a conventional, socially accepted marriage.' }
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3">
              <span className="text-gold text-xs mt-1 flex-shrink-0">✦</span>
              <p className="text-muted text-sm"><strong className="text-text">{item.t}:</strong> {item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The 5 Key Planets for Love Marriage in Astrology</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { planet: 'Venus', desc: 'Natural significator of romance and attraction. Strong Venus in 5th or 7th house strongly indicates love marriage. Venus-Rahu conjunction is the classic love marriage combination.' },
            { planet: 'Rahu', desc: 'The planet of unconventional choices. Rahu in 5th, 7th, or 11th house — especially with Venus or 5th lord — indicates attraction outside traditional boundaries, intercaste or inter-religion relationships.' },
            { planet: '5th House Lord', desc: 'The 5th house governs romance and pre-marital relationships. 5th lord connecting with 7th lord creates a direct link between love affairs and marriage — the relationship converts.' },
            { planet: '7th House Lord', desc: 'The 7th house is the house of marriage itself. Its strength and associations determine the nature of the marital relationship — love or arranged, early or late, harmonious or conflicted.' },
            { planet: 'Moon', desc: 'Governs emotions and the mind. A strong Moon connected to Venus or the 5th house creates emotional depth in relationships. Moon-Venus conjunction often indicates romantic, emotionally rich partnerships.' }
          ].map((item) => (
            <div key={item.planet} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-white text-sm font-medium mb-1">{item.planet}</p>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Why the D9 Navamsa Chart Matters</h2>
        <p className="text-muted text-sm leading-relaxed">
          The birth chart (D1) shows the potential for love or arranged marriage. The Navamsa (D9) chart confirms it. If the same indicators appear in both D1 and D9 — Venus strong, Rahu in 7th, 5th-7th lord connection — the prediction is highly reliable. If they contradict each other, the outcome is mixed or the situation evolves over time.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What if Your Chart Shows Both?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Many charts show a combination — the relationship may start as love but proceed through family approval (semi-arranged), or an arranged match may develop deep romantic feelings. AstroWord&apos;s AI reads all indicators together and gives you the most likely outcome for your specific planetary combination — not a binary yes/no.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Timing: When Does the Marriage Happen?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Knowing the type is one thing. Knowing when is another. The marriage will manifest during the Dasha of the relevant planets — Venus, 7th lord, or Darakaraka. <Link href="/marriage-year" className="text-gold/70 hover:text-gold underline underline-offset-2">Check your marriage year</Link> or <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">find your Darakaraka</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { q: 'Can a love marriage turn into an arranged one (Love-cum-Arranged)?', a: 'Yes. Many charts show strong 5th-7th connections (love) but also have a powerful 9th lord or Jupiter (tradition). This indicates a relationship that starts with love but eventually receives full family blessing and traditional ceremonies.' },
            { q: 'Is a love marriage successful according to astrology?', a: 'Success depends on the strength of the 7th house and the D9 Navamsa chart, not the type of marriage. A love marriage with a weak 7th lord may face challenges, while an arranged marriage with a strong Venus can be incredibly romantic and stable.' },
            { q: 'What if my chart shows mixed indicators?', a: 'Mixed indicators are common in the modern era. It usually means you will have the freedom to choose, but family values will still play a significant role in the final decision or the wedding process.' },
            { q: 'Does the Navamsa (D9) chart change the result?', a: 'The D9 chart is the &quot;fruit&quot; of the tree. If the D1 (Birth Chart) shows love but the D9 is very traditional/Saturnian, there might be initial romance that leads to a very disciplined, traditional marital life.' },
            { q: 'Can a Manglik person have a love marriage?', a: 'Yes. Manglik Dosha affects the quality and timing of marriage, not whether it is love or arranged. Many Manglik individuals have successful love marriages, especially when the Dosha is cancelled or the partner is also Manglik.' },
            { q: 'Does Rahu always mean love marriage?', a: 'Not always, but Rahu is the strongest indicator. Rahu in the 7th house alone does not guarantee love marriage — it needs to connect with Venus, the 5th lord, or the 5th house to create that pattern. Rahu in 7th without these connections may simply indicate an unconventional or foreign spouse through an arranged match.' }
          ].map((item) => (
            <div key={item.q} className="bg-surface/40 border border-border/50 rounded-2xl p-5 space-y-2">
              <h4 className="text-gold font-serif text-base">{item.q}</h4>
              <p className="text-muted text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
