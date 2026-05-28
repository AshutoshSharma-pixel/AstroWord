import Link from 'next/link';

export default function D9ChartSEO() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is the Navamsa Chart (D9 Chart)?</h2>
        <p className="text-muted text-sm leading-relaxed">
          The Navamsa chart, also known as the D9 chart or Navamansha, is the most important divisional chart in Vedic astrology after the birth chart (D1). The word Navamsa comes from Sanskrit — Nava meaning nine, and Amsa meaning division. Each of the 12 zodiac signs spanning 30 degrees is divided into 9 equal parts of exactly 3 degrees and 20 minutes, producing 108 Navamsa divisions in total.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          While the D1 birth chart shows what your life looks like from the outside — your circumstances, opportunities, and major events — the Navamsa chart reveals what it looks like from the inside. It shows whether the promises in your birth chart will actually manifest, and how strongly your planets can deliver their results over your lifetime. If the D1 is the tree, the D9 is the fruit.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          The Navamsa chart is especially important for marriage and relationship analysis. The 7th house from your Navamsa ascendant reveals the inner nature, physical characteristics, and karmic role of your future spouse — details the birth chart alone cannot provide. No astrological reading is considered complete without examining the D9 chart alongside the D1.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Vargottama — and Why Does It Matter?</h2>
        <p className="text-muted text-sm leading-relaxed">
          A planet is called Vargottama when it occupies the same zodiac sign in both the birth chart (D1) and the Navamsa chart (D9). This alignment is considered highly auspicious in Vedic astrology because the planet's strength is reinforced — it can fully deliver its results without weakness or dilution.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Vargottama planets are especially powerful during their Mahadasha and Antardasha periods. If your Ascendant itself is Vargottama — meaning your D1 Lagna and D9 Lagna are the same sign — it makes the entire chart exceptionally strong, often indicating a person with strong willpower, social status, and the ability to overcome obstacles.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          AstroWord automatically identifies all Vargottama planets in your chart and highlights them in your D9 reading — something no other free calculator currently provides.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Karakamsha in Jaimini Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Karakamsha is a core concept in Jaimini astrology. Your Atmakaraka is the planet with the highest degree in your birth chart — it represents your soul's core lesson and deepest desire in this lifetime. The sign that your Atmakaraka occupies in the Navamsa chart is called the Karakamsha sign.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          The Karakamsha sign is profoundly significant. It reveals your Ishta Devata (personal deity), your soul's ultimate spiritual direction, and the deepest karmic theme of your life. Ancient Jaimini texts use the Karakamsha extensively for predicting career, spirituality, and the nature of one's moksha.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          AstroWord's D9 calculator automatically computes your Karakamsha sign and connects it to your{' '}
          <Link href="/ishta-devata" className="text-gold/70 hover:text-gold underline underline-offset-2">Ishta Devata</Link>
          {' '}and{' '}
          <Link href="/atmakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Atmakaraka</Link>
          {' '}readings — unique to AstroWord's Jaimini system.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How to Read Your Navamsa Ascendant</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { sign: 'Aries D9 Ascendant', meaning: 'Courageous inner nature, independent soul, Martian energy defines your private self and marriage approach' },
            { sign: 'Taurus D9 Ascendant', meaning: 'Stable, sensual inner nature, marriage built on loyalty and material security, Venusian soul' },
            { sign: 'Gemini D9 Ascendant', meaning: 'Communicative and curious inner self, spouse likely intellectual or in media, Mercury-ruled soul' },
            { sign: 'Cancer D9 Ascendant', meaning: 'Deep emotional inner world, marriage strongly family-oriented, Moon as your inner ruler' },
            { sign: 'Leo D9 Ascendant', meaning: 'Dignified inner nature, spouse with regal or creative qualities, Sun rules your soul expression' },
            { sign: 'Virgo D9 Ascendant', meaning: 'Analytical and service-oriented soul, marriage grounded in daily life and duty, Mercury inner ruler' },
            { sign: 'Libra D9 Ascendant', meaning: 'Relationship-centred inner nature, spouse likely artistic or charming, Venus governs the inner life' },
            { sign: 'Scorpio D9 Ascendant', meaning: 'Intense transformative inner world, marriage carries deep karmic lessons, Mars and Ketu influence' },
            { sign: 'Sagittarius D9 Ascendant', meaning: 'Philosophical and dharmic inner nature, spouse from different background or culture, Jupiter rules' },
            { sign: 'Capricorn D9 Ascendant', meaning: 'Disciplined inner character, spouse mature and hardworking, Saturn shapes the inner life' },
            { sign: 'Aquarius D9 Ascendant', meaning: 'Unconventional and humanitarian inner nature, unique marriage path, Saturn and Rahu influence' },
            { sign: 'Pisces D9 Ascendant', meaning: 'Spiritual and compassionate inner world, marriage spiritually significant, Jupiter and Ketu rule' },
          ].map((item) => (
            <div key={item.sign} className="bg-surface border border-border rounded-xl p-3">
              <p className="text-white text-sm font-medium mb-1">{item.sign}</p>
              <p className="text-muted text-xs leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How the Navamsa is Calculated — The 9 Sequences</h2>
        <p className="text-muted text-sm leading-relaxed">
          The Navamsa chart is not arbitrary — it follows a precise mathematical sequence based on the element of each zodiac sign. Each sign&apos;s 9 Navamsa divisions begin from a specific starting sign determined by its elemental quality:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { element: 'Fire Signs — Aries, Leo, Sagittarius', rule: 'The 9 Navamsa divisions begin from Aries. So the first 3°20&apos; of Aries is Aries Navamsa, the next 3°20&apos; is Taurus Navamsa, and so on through all 9 signs.' },
            { element: 'Earth Signs — Taurus, Virgo, Capricorn', rule: 'The 9 Navamsa divisions begin from Capricorn. So the first 3°20&apos; of Taurus corresponds to Capricorn in D9, the next to Aquarius, and so on.' },
            { element: 'Air Signs — Gemini, Libra, Aquarius', rule: 'The 9 Navamsa divisions begin from Libra. So the first 3°20&apos; of Gemini corresponds to Libra in D9, the next to Scorpio, and so on.' },
            { element: 'Water Signs — Cancer, Scorpio, Pisces', rule: 'The 9 Navamsa divisions begin from Cancer. So the first 3°20&apos; of Cancer corresponds to Cancer in D9, the next to Leo, and so on.' },
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-3">
              <p className="text-white text-sm font-medium mb-1">{item.element}</p>
              <p className="text-muted text-xs leading-relaxed">{item.rule}</p>
            </div>
          ))}
        </div>
        <p className="text-muted text-sm leading-relaxed">
          This is why accurate birth time is critical for D9 chart calculation. A planet at 3°19&apos; in Aries is in a completely different Navamsa than a planet at 3°21&apos; in Aries — a difference of just 2 minutes of arc that takes less than 5 minutes of birth time to cross. AstroWord uses Swiss Ephemeris with Lahiri ayanamsa to calculate all Navamsa positions with professional precision.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Reading D1 and D9 Together — The Professional Method</h2>
        <p className="text-muted text-sm leading-relaxed">
          The most important rule in Vedic astrology is that no divisional chart should ever be read in isolation. The D9 Navamsa must always be read in conjunction with the D1 birth chart. Here is the exact method professional astrologers use:
        </p>
        <div className="space-y-3">
          {[
            { step: 'Step 1 — Identify the key planet in D1', desc: 'For marriage analysis, identify your 7th house lord, Venus, and Darakaraka in the D1 chart. Note their sign, house, and strength.' },
            { step: 'Step 2 — Find the same planet in D9', desc: 'Locate that same planet in your D9 chart. Is it in its own sign, exalted, or debilitated? Is it Vargottama (same sign as D1)? This tells you whether the D1 promise will actually manifest.' },
            { step: 'Step 3 — Check Vargottama', desc: 'If the planet occupies the same sign in both D1 and D9, it is Vargottama — exceptionally strong and reliable in delivering its results consistently throughout life.' },
            { step: 'Step 4 — Examine the D9 7th house', desc: 'The 7th house from your Navamsa ascendant describes your spouse&apos;s inner character — more accurately than the D1 7th house for the lived reality of marriage.' },
            { step: 'Step 5 — Find the Karakamsha', desc: 'Locate your Atmakaraka in D9. The sign it occupies is your Karakamsha — the most important spiritual and dharmic indicator in Jaimini astrology. The 12th from Karakamsha reveals your Ishta Devata.' },
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-gold text-sm font-medium mb-1">✦ {item.step}</p>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-muted text-sm leading-relaxed">
          For the complete picture, use AstroWord&apos;s D9 calculator alongside your{' '}
          <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Darakaraka</Link>
          {', '}
          <Link href="/atmakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Atmakaraka</Link>
          {', and '}
          <Link href="/ishta-devata" className="text-gold/70 hover:text-gold underline underline-offset-2">Ishta Devata</Link>
          {' calculators — all free on AstroWord, all based on authentic Jaimini methodology.'}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">D9 Chart and Spouse Prediction</h2>
        <p className="text-muted text-sm leading-relaxed">
          The 7th house from your Navamsa ascendant is the primary indicator of your spouse in the D9 chart. The sign of this house, and any planets placed there, reveal detailed information about your future partner — their physical appearance, personality, profession, and the karmic nature of your relationship.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          For example, Venus in the 7th house of the Navamsa often indicates a charming, artistic, and beautiful spouse. Jupiter there indicates a wise, learned, or spiritual partner. Mars in the D9 7th house can indicate an athletic, assertive partner, or one from a technical or medical background.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          For the most complete spouse analysis, use the D9 chart together with your{' '}
          <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Darakaraka planet</Link>
          {', your '}
          <Link href="/upapada-lagna" className="text-gold/70 hover:text-gold underline underline-offset-2">Upapada Lagna</Link>
          {', and your '}
          <Link href="/spouse-initial" className="text-gold/70 hover:text-gold underline underline-offset-2">spouse name initial</Link>
          {' calculator — all available free on AstroWord.'}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <p className="text-gold/50 text-xs uppercase tracking-wider">
          Also explore
        </p>
        <Link href="/darakaraka" className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors">
          <span>💑</span>
          <span>Darakaraka Calculator — your spouse significator planet</span>
          <span>→</span>
        </Link>
        <Link href="/atmakaraka" className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors">
          <span>🔮</span>
          <span>Atmakaraka Calculator — your soul planet and Karakamsha</span>
          <span>→</span>
        </Link>
        <Link href="/ishta-devata" className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors">
          <span>🕉️</span>
          <span>Ishta Devata Calculator — your personal deity from D9</span>
          <span>→</span>
        </Link>
        <Link href="/upapada-lagna" className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors">
          <span>💍</span>
          <span>Upapada Lagna — marriage reality from D9</span>
          <span>→</span>
        </Link>
      </div>

    </div>
  );
}
