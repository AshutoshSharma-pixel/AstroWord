export default function DashaSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Vimshottari Dasha Calculator — Find Your Current Mahadasha</h2>
        <p className="text-muted text-sm leading-relaxed">
          Vimshottari Dasha (विंशोत्तरी दशा) is the most widely used planetary period system in Vedic astrology.
          The word &quot;Vimshottari&quot; means 120 in Sanskrit — the total duration of one complete cycle across nine planets.
          AstroWord&apos;s free calculator uses Swiss Ephemeris with Lahiri Ayanamsa to map your complete 120-year Dasha timeline.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-white font-serif text-xl">What Is Mahadasha?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Mahadasha is the major planetary period in the Vimshottari Dasha system. Each of the nine planets rules a fixed
          period: Ketu (7 years), Venus (20 years), Sun (6 years), Moon (10 years), Mars (7 years), Rahu (18 years),
          Jupiter (16 years), Saturn (19 years), and Mercury (17 years). Your first Mahadasha is determined by the
          nakshatra your Moon occupied at the exact moment of birth.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-white font-serif text-xl">The 9 Mahadashas and Their Themes</h2>
        <div className="space-y-2">
          {[
            { planet: "Sun", years: 6, themes: "Leadership, authority, career rise, father, government, self-confidence, vitality" },
            { planet: "Moon", years: 10, themes: "Emotions, mind, mother, home, public life, travel, mental peace or turbulence" },
            { planet: "Mars", years: 7, themes: "Energy, property, siblings, courage, surgery, land dealings, competitive pursuits" },
            { planet: "Rahu", years: 18, themes: "Ambition, foreign connections, unconventional paths, sudden transformation, obsession" },
            { planet: "Jupiter", years: 16, themes: "Wisdom, expansion, prosperity, children, higher education, spirituality, good fortune" },
            { planet: "Saturn", years: 19, themes: "Discipline, karma, hard work, delays, long-term rewards, responsibilities, longevity" },
            { planet: "Mercury", years: 17, themes: "Communication, business, intellect, writing, education, trade, analytical thinking" },
            { planet: "Ketu", years: 7, themes: "Spirituality, detachment, past karma, moksha, sudden changes, intuition, isolation" },
            { planet: "Venus", years: 20, themes: "Love, marriage, luxury, arts, vehicles, material comforts, relationships, creativity" },
          ].map((d) => (
            <div key={d.planet} className="flex gap-3 p-3 bg-surface2 border border-border/50 rounded-xl">
              <span className="text-gold font-mono text-sm w-24 shrink-0">{d.planet} · {d.years}yr</span>
              <span className="text-muted text-sm">{d.themes}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-white font-serif text-xl">What Is Antardasha?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Antardasha (also called Bhukti) is the sub-period within each Mahadasha. Each Mahadasha contains nine Antardashas,
          one for each planet, running in the same Vimshottari sequence. The Antardasha modifies the Mahadasha&apos;s themes
          — blending two planetary energies. For example, during a Jupiter Mahadasha, a Saturn Antardasha brings structured
          growth and disciplined expansion rather than free-flowing prosperity.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-white font-serif text-xl">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Is Saturn Mahadasha always difficult?", a: "No. Saturn Mahadasha lasts 19 years and its results entirely depend on Saturn's placement in your birth chart. A strong Saturn — in Capricorn, Aquarius, or exalted in Libra — can bring remarkable career growth and lasting success. Saturn rewards sincere effort and karmic action." },
            { q: "What is Dasha Sandhi?", a: "Dasha Sandhi is the transition period between two Mahadashas — the last few months of one planetary period and the opening months of the next. It is considered one of the most significant and often turbulent windows in life, when old chapters close and new ones begin." },
            { q: "How accurate is birth time for Dasha calculation?", a: "Birth time accuracy is critical. Even a 10–15 minute difference can shift the remaining balance of the first Dasha by weeks or months, affecting all subsequent Antardasha timings. AstroWord uses Swiss Ephemeris DE431 with Lahiri Ayanamsa for arc-second precision." },
            { q: "What happens during Rahu Mahadasha?", a: "Rahu Mahadasha (18 years) brings ambition, obsession, foreign connections, unconventional paths, and sudden transformation. Results depend heavily on Rahu's house and sign in the birth chart. People often experience rapid rise followed by a phase of recalibration." },
            { q: "Can Mahadasha effects be changed through remedies?", a: "Dasha effects cannot be reversed, but they can be navigated more consciously through planetary mantras, charitable acts, fasting on the Dasha lord's day, and spiritual practices. The aim is not to cancel the energy but to align with it constructively." },
            { q: "What makes AstroWord's Dasha calculator different?", a: "Most Dasha calculators show only a table of dates. AstroWord's AI interprets your Mahadasha based on where that planet actually sits in your birth chart — its sign, house, nakshatra, and strength — writing a personalised reading that a professional Vedic astrologer would provide." },
          ].map((faq, i) => (
            <div key={i} className="border border-border/50 rounded-xl p-4">
              <h3 className="text-white text-sm font-medium mb-2">{faq.q}</h3>
              <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
