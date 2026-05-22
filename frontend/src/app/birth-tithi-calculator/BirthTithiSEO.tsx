export default function BirthTithiSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      <div>
        <h2 className="text-gold font-serif text-2xl mb-3">Birth Tithi Calculator — Find Your Janma Tithi</h2>
        <p className="text-muted text-sm leading-relaxed">Your Janma Tithi (जन्म तिथि) is the lunar day on which you were born — one of the five essential elements of the Vedic Panchang alongside Nakshatra, Yoga, Vara, and Karana. Unlike your solar birthday which repeats on the same calendar date each year, your Tithi is determined by the angular relationship between the Sun and Moon at the exact moment of your birth. AstroWord's free Birth Tithi calculator uses Swiss Ephemeris with Lahiri Ayanamsa to calculate your precise Tithi, Paksha, ruling planet, and presiding deity — then generates a personalised AI reading based on your complete birth chart.</p>
      </div>

      <div>
        <h2 className="text-white font-serif text-xl mb-3">The 5 Types of Tithis</h2>
        <div className="space-y-3">
          {[
            { name: "Nanda Tithi", meaning: "Joyful", tithis: "Pratipada, Shashthi, Ekadashi", desc: "Associated with joy, prosperity, and new beginnings. Favorable for auspicious starts, celebrations, and business ventures." },
            { name: "Bhadra Tithi", meaning: "Auspicious", tithis: "Dwitiya, Saptami, Dwadashi", desc: "Associated with stability and growth. Favorable for purchases, relationships, and building long-term foundations." },
            { name: "Jaya Tithi", meaning: "Victorious", tithis: "Tritiya, Ashtami, Trayodashi", desc: "Associated with victory and courage. Favorable for competition, assertive action, and overcoming obstacles." },
            { name: "Rikta Tithi", meaning: "Releasing", tithis: "Chaturthi, Navami, Chaturdashi", desc: "Associated with releasing and letting go. Powerful for spiritual practice, clearing obstacles, and deep introspection." },
            { name: "Poorna Tithi", meaning: "Complete", tithis: "Panchami, Dashami, Purnima, Amavasya", desc: "Associated with completeness and fullness. Favorable for spiritual ceremonies, ancestral rites, and major life milestones." },
          ].map((t) => (
            <div key={t.name} className="p-4 bg-surface2 border border-border/50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gold font-mono text-sm">{t.name}</span>
                <span className="text-muted text-xs">— {t.meaning} · {t.tithis}</span>
              </div>
              <p className="text-muted text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-white font-serif text-xl mb-3">All 30 Tithis — Ruling Planets & Deities</h2>
        <p className="text-muted text-sm leading-relaxed mb-4">Each of the 30 Tithis has a ruling planet (Tithi lord) and a presiding deity that shapes the energy of that lunar day and the personality of those born on it.</p>
        <div className="space-y-2">
          {[
            { n: "Pratipada", lord: "Sun", deity: "Brahma", cat: "Nanda", paksha: "Shukla" },
            { n: "Dwitiya", lord: "Moon", deity: "Shri Hari", cat: "Bhadra", paksha: "Shukla" },
            { n: "Tritiya", lord: "Mars", deity: "Vishnu", cat: "Jaya", paksha: "Shukla" },
            { n: "Chaturthi", lord: "Mercury", deity: "Yama", cat: "Rikta", paksha: "Shukla" },
            { n: "Panchami", lord: "Jupiter", deity: "Chandra", cat: "Poorna", paksha: "Shukla" },
            { n: "Shashthi", lord: "Venus", deity: "Agni", cat: "Nanda", paksha: "Shukla" },
            { n: "Saptami", lord: "Saturn", deity: "Indra", cat: "Bhadra", paksha: "Shukla" },
            { n: "Ashtami", lord: "Rahu", deity: "Vasus", cat: "Jaya", paksha: "Shukla" },
            { n: "Navami", lord: "Sun", deity: "Naga", cat: "Rikta", paksha: "Shukla" },
            { n: "Dashami", lord: "Moon", deity: "Aryaman", cat: "Poorna", paksha: "Shukla" },
            { n: "Ekadashi", lord: "Mars", deity: "Rudra", cat: "Nanda", paksha: "Shukla" },
            { n: "Dwadashi", lord: "Mercury", deity: "Aditya", cat: "Bhadra", paksha: "Shukla" },
            { n: "Trayodashi", lord: "Jupiter", deity: "Bhaga", cat: "Jaya", paksha: "Shukla" },
            { n: "Chaturdashi", lord: "Venus", deity: "Kali", cat: "Rikta", paksha: "Shukla" },
            { n: "Purnima", lord: "Moon", deity: "Vishnu", cat: "Poorna", paksha: "Shukla" },
            { n: "Pratipada", lord: "Sun", deity: "Brahma", cat: "Nanda", paksha: "Krishna" },
            { n: "Dwitiya", lord: "Moon", deity: "Shri Hari", cat: "Bhadra", paksha: "Krishna" },
            { n: "Tritiya", lord: "Mars", deity: "Vishnu", cat: "Jaya", paksha: "Krishna" },
            { n: "Chaturthi", lord: "Mercury", deity: "Yama", cat: "Rikta", paksha: "Krishna" },
            { n: "Panchami", lord: "Jupiter", deity: "Chandra", cat: "Poorna", paksha: "Krishna" },
            { n: "Shashthi", lord: "Venus", deity: "Agni", cat: "Nanda", paksha: "Krishna" },
            { n: "Saptami", lord: "Saturn", deity: "Indra", cat: "Bhadra", paksha: "Krishna" },
            { n: "Ashtami", lord: "Rahu", deity: "Vasus", cat: "Jaya", paksha: "Krishna" },
            { n: "Navami", lord: "Sun", deity: "Naga", cat: "Rikta", paksha: "Krishna" },
            { n: "Dashami", lord: "Moon", deity: "Aryaman", cat: "Poorna", paksha: "Krishna" },
            { n: "Ekadashi", lord: "Mars", deity: "Rudra", cat: "Nanda", paksha: "Krishna" },
            { n: "Dwadashi", lord: "Mercury", deity: "Aditya", cat: "Bhadra", paksha: "Krishna" },
            { n: "Trayodashi", lord: "Jupiter", deity: "Bhaga", cat: "Jaya", paksha: "Krishna" },
            { n: "Chaturdashi", lord: "Venus", deity: "Kali", cat: "Rikta", paksha: "Krishna" },
            { n: "Amavasya", lord: "Saturn", deity: "Vishnu", cat: "Poorna", paksha: "Krishna" },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-surface2 border border-border/50 rounded-xl text-xs">
              <span className="text-white font-mono w-28">{t.n}</span>
              <span className="text-muted w-20">{t.paksha}</span>
              <span className="text-gold w-20">{t.lord}</span>
              <span className="text-muted w-24">{t.deity}</span>
              <span className="text-muted">{t.cat}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-white font-serif text-xl mb-3">Shukla Paksha vs Krishna Paksha — What Your Birth Phase Means</h2>
        <p className="text-muted text-sm leading-relaxed mb-3">Paksha refers to the lunar fortnight — the phase of the moon at birth. This is one of the most important yet overlooked factors in birth chart analysis.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-surface2 border border-gold/20 rounded-xl">
            <h3 className="text-gold font-serif text-lg mb-2">Shukla Paksha ☽</h3>
            <p className="text-muted text-xs leading-relaxed">Born during the waxing moon (New Moon to Full Moon). Shukla Paksha births carry outward, expansive, building energy. These individuals tend to be expressive, action-oriented, and naturally oriented toward manifestation and external achievement. The growing light of the moon supports visibility, social connection, and worldly success.</p>
          </div>
          <div className="p-4 bg-surface2 border border-border rounded-xl">
            <h3 className="text-white font-serif text-lg mb-2">Krishna Paksha 🌑</h3>
            <p className="text-muted text-xs leading-relaxed">Born during the waning moon (Full Moon to New Moon). Krishna Paksha births carry inward, reflective, releasing energy. These individuals tend to be introspective, spiritually inclined, and naturally oriented toward wisdom, depth, and inner growth. The diminishing light supports contemplation, detachment, and spiritual insight.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-white font-serif text-xl mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is Janma Tithi in Vedic astrology?", a: "Janma Tithi is the lunar day (Tithi) on which you were born, one of the five key elements of Vedic Panchang. It is determined by the angular relationship between the Sun and Moon at the exact time of birth. Each Tithi spans 12 degrees of the Moon's movement relative to the Sun, and there are 30 Tithis in a complete lunar month — 15 in Shukla Paksha (waxing) and 15 in Krishna Paksha (waning). Your Janma Tithi significantly influences personality, emotional patterns, and spiritual tendencies." },
            { q: "How do I find my birth Tithi?", a: "Enter your date of birth, exact time of birth, and place of birth into AstroWord's free Birth Tithi calculator. The tool uses Swiss Ephemeris to calculate the precise positions of the Sun and Moon at your birth moment, computes their angular difference, and instantly determines your Tithi, Paksha, Tithi category, ruling planet, and presiding deity — along with a personalised AI reading." },
            { q: "Is Amavasya Tithi birth inauspicious?", a: "No. Amavasya birth is not inauspicious for the individual born on that day. In Vedic tradition, Amavasya carries deep ancestral and spiritual significance. People born on Amavasya often have strong psychic intuition, a deep connection to ancestral wisdom, and natural spiritual gifts. The new moon energy supports introspection, renewal, and inner strength. Many great spiritual figures and mystics have been born on Amavasya." },
            { q: "What is the most auspicious Tithi to be born on?", a: "In Vedic tradition, Purnima (Full Moon), Ekadashi, and Panchami are considered among the most auspicious Tithis for birth. Purnima is associated with abundance and completeness, Ekadashi with wisdom and spiritual merit, and Panchami with strong moral character. However, every Tithi has its own gifts — even Rikta Tithis (Chaturthi, Navami, Chaturdashi) give deep insight and the ability to transform challenges into wisdom." },
            { q: "Does birth Tithi affect marriage?", a: "Yes. In Vedic Muhurta astrology, the Janma Tithi is one of the factors considered when calculating marriage timing and compatibility. The Tithi lord's strength and placement in the birth chart, along with the Tithi's category (Nanda, Bhadra, Jaya, Rikta, Poorna), influences relationship tendencies and the timing of significant life events. The annual return of your Janma Tithi is considered an auspicious window for beginning new chapters, including relationships." },
            { q: "How is AstroWord's Tithi reading different from other calculators?", a: "Most Birth Tithi calculators give you the Tithi name and a generic paragraph about it — the same text for every person born on that Tithi. AstroWord's AI combines your Tithi with your Moon sign, Moon nakshatra, Paksha energy, and current Mahadasha to generate a genuinely personalised reading. Two people born on the same Tithi will receive different readings based on their unique chart configuration. This is the type of nuanced interpretation that a professional Vedic astrologer would provide." },
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
