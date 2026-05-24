import Link from 'next/link';

export default function MarriageYearSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Marriage Year Prediction — When Will You Get Married?</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic Astrology (Jyotish), the timing of marriage is not a random event but a calculated convergence of planetary periods (Dashas) and celestial movements (Transits). While your birth chart shows the <em>promise</em> of marriage, the specific year is determined by when the &quot;Marriage Karakas&quot; and the 7th house lords become active in your life.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          AstroWord&apos;s AI analyzer examines your D1 (Birth Chart) and D9 (Navamsa) together with your current Vimshottari Dasha to identify the most probable window for your union.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The Three Pillars of Marriage Timing</h2>
        <p className="text-muted text-sm leading-relaxed">
          Astrologers use three primary layers to pinpoint the year of marriage. Our AI simulates this multi-layered analysis:
        </p>
        <div className="space-y-3">
          {[
            { t: 'The Promise (D1 & D9 Charts)', d: 'First, we check if the 7th house, its lord, and Venus (for men) or Jupiter (for women) are well-placed. The D9 Navamsa chart is then consulted to see the "strength of the fruit"—confirming if the marriage promise is strong.' },
            { t: 'The Time (Vimshottari Dasha)', d: 'Marriage usually occurs during the Mahadasha or Antardasha of the 7th lord, the 2nd lord (family), or planets placed in the 7th house. Venus, Rahu, and Jupiter are also major timing triggers.' },
            { t: 'The Trigger (Transits)', d: 'Even with a favorable Dasha, a "trigger" is needed. This usually happens when Jupiter transits or aspects the 7th house/7th lord, and Saturn simultaneously aspects the same area—a phenomenon known as the Double Transit.' }
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3">
              <span className="text-gold text-xs mt-1 flex-shrink-0">✦</span>
              <p className="text-muted text-sm"><strong className="text-text">{item.t}:</strong> {item.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Why Does Marriage Get Delayed?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Sometimes the &quot;Marriage Year&quot; seems to pass without an event. Astrology identifies several reasons for this &quot;delayed destiny&quot;:
        </p>
        <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
          <li>• <span className="text-white">Saturn&apos;s Influence:</span> Saturn in the 7th house or aspecting the 7th lord often delays marriage until after age 28 or 30, ensuring maturity.</li>
          <li>• <span className="text-white">Retrograde 7th Lord:</span> If the planet governing your marriage is retrograde, it can indicate multiple attempts or a feeling of &quot;almost there&quot; before the final union.</li>
          <li>• <span className="text-white">Kumbha Vivaha Indicators:</span> Certain doshas might require specific spiritual remedies before the marriage gates open.</li>
          <li>• <span className="text-white">Focus on Career:</span> Strong 10th house placements can shift the planetary priority from marriage to professional growth during early favorable Dashas.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Jupiter Transit and Marriage — The Most Reliable Indicator</h2>
        <p className="text-muted text-sm leading-relaxed">
          Jupiter is the Deva Guru — the planet of blessings and auspicious events. In Vedic tradition, no major life event happens without Jupiter&apos;s involvement. Jupiter takes approximately 12 years to complete one full orbit. The years when Jupiter transits your 7th house, natal Venus, or the 7th lord&apos;s natal position are your strongest marriage windows. When Jupiter&apos;s transit aligns with a supporting Dasha period, marriage often happens within that year.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Age-Wise Marriage Timing in Vedic Astrology</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { age: 'Ages 22-25', desc: 'Venus Mahadasha or strong Venus Antardasha in early life. Jupiter transiting 7th house for the first time. Most common window for early marriages.' },
            { age: 'Ages 25-28', desc: '7th lord Dasha periods often activate in mid-20s. Saturn\'s first return (age 29) often brings major life commitments including marriage.' },
            { age: 'Ages 28-32', desc: 'Saturn\'s 7.5-year Sade Sati ending often releases blocked marriage energy. Post-Sade Sati is a classic marriage window for delayed charts.' },
            { age: 'Ages 32-36', desc: 'Rahu/Ketu axis shift every 18 months creates new relationship opportunities. Jupiter\'s second pass over 7th house for those born with Jupiter in Capricorn through Gemini.' },
            { age: 'Ages 36+', desc: 'Saturn Mahadasha natives often marry later as Saturn delays but rewards patience with stable, mature partnerships built on solid foundations.' }
          ].map((item) => (
            <div key={item.age} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-white text-sm font-medium mb-1">{item.age}</p>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Marriage Delay — When and Why</h2>
        <p className="text-muted text-sm leading-relaxed">
          Delayed marriage is not denied marriage. The most common delay factors are Saturn aspecting the 7th house or its lord (adds 3-7 years to the natural timing), Ketu in the 7th house (spiritual detachment phase must complete first), and Venus being combust or debilitated in the birth chart. In all these cases, the marriage eventually happens — often stronger and more stable for the wait.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The Jaimini Method: Darakaraka Timing</h2>
        <p className="text-muted text-sm leading-relaxed">
          AstroWord uses the Jaimini Darakaraka system in addition to standard Dasha analysis. Your Darakaraka planet&apos;s Mahadasha and Antardasha periods are among the most reliable marriage timing indicators in your personal chart — more specific than generic methods because the Darakaraka is unique to your birth chart. <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Find your Darakaraka</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Marriage Age Windows — When Does It Typically Happen?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Ages 22-25",
              desc: "Venus Mahadasha or strong Venus Antardasha in early life. Jupiter transiting 7th house for the first time. Most common window for early marriages in India."
            },
            {
              title: "Ages 25-28",
              desc: "7th lord Dasha periods often activate in mid-20s. Saturn first return at age 29 often brings major life commitments."
            },
            {
              title: "Ages 28-32",
              desc: "Post Sade Sati relief often releases blocked marriage energy. Jupiter's second pass over 7th house for many charts."
            },
            {
              title: "Ages 32-36",
              desc: "Rahu/Ketu axis shift creates new relationship opportunities. Strong window for charts with delayed indicators."
            },
            {
              title: "Ages 36+",
              desc: "Saturn Mahadasha natives often marry later — delayed but deeply stable partnerships built on solid foundations."
            }
          ].map((win) => (
            <div key={win.title} className="bg-surface border border-border rounded-xl p-4 space-y-2">
              <h3 className="text-white text-base font-medium">{win.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{win.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Which Dasha Period Brings Marriage? — The Complete Guide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Venus Mahadasha (20 years)",
              desc: "Most powerful marriage period. Venus is natural karaka for marriage. Venus-Jupiter or Venus-Moon Antardasha within this period is the strongest combination."
            },
            {
              title: "7th Lord Dasha",
              desc: "The ruling planet of your 7th house brings marriage during its Mahadasha or Antardasha. Most chart-specific indicator."
            },
            {
              title: "Darakaraka Dasha (Jaimini)",
              desc: (
                <>
                  Your Darakaraka planet's Dasha — unique to your chart. More specific than the generic 7th lord method.{" "}
                  <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Find your Darakaraka</Link>.
                </>
              )
            },
            {
              title: "Jupiter Antardasha",
              desc: "Within any favorable Mahadasha, Jupiter's sub-period brings blessings and marriage opportunities."
            },
            {
              title: "Rahu Mahadasha (18 years)",
              desc: "For some charts, Rahu's period brings unconventional or foreign marriages, especially when Rahu is placed in or aspecting the 7th house."
            }
          ].map((dasha) => (
            <div key={dasha.title} className="bg-surface border border-border rounded-xl p-4 space-y-2">
              <h3 className="text-white text-base font-medium">{dasha.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{dasha.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What Delays Marriage in Your Chart?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Saturn aspecting 7th house or lord",
              desc: "Most common delay factor. Adds 3-7 years to natural timing but rewards with stability. Marriage after Saturn's influence is often the strongest."
            },
            {
              title: "Venus combust or debilitated",
              desc: "Venus too close to Sun loses strength. Difficulty attracting the right partner until Venus strengthens through transits."
            },
            {
              title: "Rahu in 7th house",
              desc: "Unconventional path — often delays conventional marriage while creating intense but complex relationships."
            },
            {
              title: "Ketu in 7th house",
              desc: "Spiritual detachment from marriage. May prioritize other life areas before settling down."
            },
            {
              title: "Manglik Dosha without cancellation",
              desc: (
                <>
                  Mars energy creates friction in partnerships until matched or cancelled.{" "}
                  <Link href="/manglik" className="text-gold/70 hover:text-gold underline underline-offset-2">Check Manglik status</Link>.
                </>
              )
            },
            {
              title: "Sade Sati over Moon",
              desc: (
                <>
                  Saturn transiting Moon sign suppresses emotional availability for partnership during the 7.5-year period.{" "}
                  <Link href="/sade-sati" className="text-gold/70 hover:text-gold underline underline-offset-2">Am I in Sade Sati?</Link>.
                </>
              )
            }
          ].map((delay) => (
            <div key={delay.title} className="bg-surface border border-border rounded-xl p-4 space-y-2">
              <h3 className="text-white text-base font-medium">{delay.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{delay.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Jupiter Transit and Marriage — Which Years Are Favorable?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Jupiter takes approximately 12 years to complete one full orbit, spending about 1 year in each sign. 
          The years when Jupiter transits your 7th house from Lagna, conjuncts your natal Venus, or aspects the 
          7th lord are your strongest marriage windows. When Jupiter&apos;s transit aligns with a supporting 
          Dasha period — that is when marriage most commonly manifests.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Jupiter is currently in Gemini (2025-2026) moving to Cancer (2025). Check which house this falls in 
          from your Lagna to understand your current Jupiter influence on marriage.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { q: 'How accurate is the marriage year prediction?', a: 'Astrology shows the most favorable planetary windows. While we can identify the year with high probability based on Dasha and Transits, individual choices and free will play a final role. Our AI uses high-precision ephemeris data for the best possible estimate.' },
            { q: 'Can astrology predict the exact date of marriage?', a: 'Predicting a specific day is complex and requires "Pratyantar Dasha" analysis and daily transit checks. Most Vedic astrologers, including our AI, focus on the most favorable 6-12 month window.' },
            { q: 'What if my predicted marriage year has already passed?', a: 'This often happens if you missed a window due to personal choices or if a specific Dosha caused a delay. The AI will look for the next available favorable window in your upcoming planetary cycles.' },
            { q: 'Does the Navamsa chart change the timing?', a: 'The Navamsa (D9) doesn\'t change the timing, but it confirms it. If the D1 shows a favorable period but the D9 is weak, the marriage might be delayed or face obstacles. If both are strong, the marriage happens smoothly.' },
            { q: 'Can astrology predict the exact year of marriage?', a: 'Vedic astrology can identify the most likely windows — typically 1-3 year periods — when multiple planetary indicators align for marriage. Pinpointing an exact date requires precise birth time and advanced techniques like Jaimini timing and transit analysis, which AstroWord\'s AI applies to your specific chart.' },
            { q: 'What if I am past the predicted marriage age?', a: 'Marriage windows repeat as planets cycle through their positions. If one window passed without marriage, the next Jupiter transit or Dasha activation creates a new opportunity. No chart permanently denies marriage — the timing simply shifts. Saturn-influenced charts often have their best marriage years after age 30.' }
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
