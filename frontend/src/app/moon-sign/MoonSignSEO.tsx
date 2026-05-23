import Link from 'next/link';

export default function MoonSignSEOContent() {
  const moonSigns = [
    {
      sign: "Aries Moon (Mesha)",
      desc: "Emotionally impulsive, quick to react, passionate, and highly independent. Aries Moon individuals need freedom, action, and new challenges to feel secure. While their anger can flare up rapidly, it also cools down just as quickly. They approach their emotional life with child-like honesty and directness."
    },
    {
      sign: "Taurus Moon (Vrishabha)",
      desc: "Emotionally stable, comfort-seeking, patient, and highly sensual. As the exaltation sign for the Moon, Taurus provides the ultimate grounding. They need financial and material security, routine, and a peaceful domestic life. They are slow to anger but can be incredibly stubborn when pushed."
    },
    {
      sign: "Gemini Moon (Mithuna)",
      desc: "Emotionally curious, restless, communicative, and constantly in need of mental stimulation. Gemini Moon individuals process their feelings through intellect and analysis. They may struggle to sit with deep or heavy emotions, often choosing to talk or write about them instead."
    },
    {
      sign: "Cancer Moon (Karka)",
      desc: "Deeply emotional, nurturing, intuitive, and strongly attached to home and family. In its own sign, the Moon is at its most potent and sensitive. Their moods fluctuate naturally with the lunar cycles. They possess a powerful protective instinct and a deep capacity for empathy."
    },
    {
      sign: "Leo Moon (Simha)",
      desc: "Emotionally proud, dramatic, generous, and highly creative. Leo Moon individuals have a strong need for recognition, appreciation, and respect. They process emotions with warmth and grandeur, feeling deeply wounded if their affection or efforts are ignored."
    },
    {
      sign: "Virgo Moon (Kanya)",
      desc: "Emotionally analytical, helpful, precise, and highly self-critical. Virgo Moons feel secure when their lives are organized, useful, and clean. They are prone to worry and anxiety, but they show their deep care for others through practical, daily acts of service."
    },
    {
      sign: "Libra Moon (Tula)",
      desc: "Emotionally diplomatic, relationship-oriented, and peace-loving. Libra Moons have a strong aversion to conflict and will go to great lengths to restore harmony in their environment. They can be indecisive in emotional matters as they constantly weigh both sides."
    },
    {
      sign: "Scorpio Moon (Vrischika)",
      desc: "Emotionally intense, secretive, magnetic, and deeply psychological. As the sign of the Moon's debilitation, Scorpio presents a highly transformative and complex emotional landscape. They possess extreme loyalty but can struggle with jealousy and the fear of betrayal."
    },
    {
      sign: "Sagittarius Moon (Dhanu)",
      desc: "Emotionally optimistic, freedom-loving, philosophical, and adventurous. Sagittarius Moons avoid emotional heaviness and seek the positive lessons in every crisis. They need physical space and intellectual expansion to feel emotionally safe and fulfilled."
    },
    {
      sign: "Capricorn Moon (Makara)",
      desc: "Emotionally controlled, disciplined, serious, and highly responsible. Capricorn Moons often feel a duty to support others and may struggle to express their own vulnerability. They are exceptionally reliable in a crisis and show love through structure and support."
    },
    {
      sign: "Aquarius Moon (Kumbha)",
      desc: "Emotionally detached, objective, humanitarian, and highly individualistic. Aquarius Moons need an intellectual connection before they can connect emotionally. They feel a deep bond with group causes and humanity, though they can be private in personal relationships."
    },
    {
      sign: "Pisces Moon (Meena)",
      desc: "Emotionally empathetic, highly imaginative, spiritual, and artistic. Pisces Moons possess a porous emotional nature, absorbing the moods and energies of the people around them. They need regular periods of solitude to recharge and filter out external energies."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      
      <div className="space-y-4">
        <h1 className="text-gold font-serif text-3xl">Moon Sign Calculator — Find Your Chandra Rashi</h1>
        <p className="text-muted text-sm leading-relaxed">
          In Western astrology, most people identify with their Sun Sign — the zodiac sign the Sun was transiting on their birthday. However, in Vedic astrology (Jyotish), the Moon Sign — known as the <strong>Chandra Rashi</strong> — is considered far more important for daily life, psychology, and prediction. The Moon governs your mind, emotions, subconscious patterns, and your inner world. It determines how you respond to stress, how you connect in relationships, and how you perceive reality. Enter your birth details above to discover your Moon Sign instantly.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Moon Sign (Rashi) in Vedic Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">
          In the Sanskrit texts, the Moon is referred to as <em>Chandra</em>, and the zodiac signs are called <em>Rashis</em>. Your Chandra Rashi is the specific sign of the zodiac that the Moon was occupying at the exact moment and location of your birth. Because the Moon changes zodiac signs roughly every 2.5 days, it is a highly personalized indicator that requires your exact birth time for precision.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Vedic astrology uses the <strong>Sidereal Zodiac</strong>, which is based on the actual observational positions of the constellations in the night sky. Western astrology, by contrast, uses the <strong>Tropical Zodiac</strong>, which is fixed to the seasons. Because of the precession of the Earth's axis (the ayanamsa), your Sidereal Moon Sign will typically be about 24 degrees backward compared to your Western tropical moon sign.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The 12 Moon Signs and Their Emotional Nature</h2>
        <p className="text-muted text-sm leading-relaxed">
          Your Moon Sign reveals your default emotional reaction pattern. It is what makes you feel safe, what triggers your anxiety, and how you nurture yourself. Here is a guide to all twelve Moon Signs:
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {moonSigns.map((item, index) => (
            <div key={index} className="bg-surface2 border border-border rounded-xl p-5 hover:border-gold/30 transition-all">
              <h3 className="text-white text-base font-semibold mb-2">{item.sign}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Moon Sign vs Nakshatra — The Two Layers</h2>
        <p className="text-muted text-sm leading-relaxed">
          While the Moon Sign (Rashi) gives a broad overview of your mental makeup, Vedic astrology adds an even deeper layer of precision: the <strong>Nakshatras</strong> (lunar mansions). The 360-degree zodiac is divided into 12 signs of 30 degrees each, but it is also divided into 27 Nakshatras of 13 degrees and 20 minutes each.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          This means two people born with the Moon in the same sign can have completely different emotional temperaments. For example, if both have their Moon in Scorpio, one could have their Moon in the intense, transformative nakshatra of Vishakha, while the other has it in the gentle, friendly nakshatra of Anuradha. To find your specific birth star, visit our <Link href="/nakshatra-calculator" className="text-gold hover:underline">Nakshatra Calculator</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Moon Sign and Marriage Compatibility</h2>
        <p className="text-muted text-sm leading-relaxed">
          In the Indian tradition of matchmaking (Kundli Milan), the Moon Sign forms the core of compatibility analysis. The classical 36-point Guna Milan system is based entirely on the positions of the bride's and groom's Moons.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Specifically, the factor called <strong>Bhakoot</strong> (or Rashi Kuta) measures the relationship between the two Moon signs and contributes 7 points out of the total 36. Favorable combinations (such as mutually trine Moon signs) indicate emotional harmony, whereas challenging combinations (such as signs situated 6 and 8 houses apart) indicate potential communication blocks or emotional friction. You can learn more about how your Moon star affects compatibility using our <Link href="/gana" className="text-gold hover:underline">Gana Calculator</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Moon Sign and Your Dasha Timeline</h2>
        <p className="text-muted text-sm leading-relaxed">
          Perhaps the most critical reason for calculating your Vedic Moon Sign is that it determines your **Vimshottari Dasha timeline**. In Vedic astrology, major life events are predicted through planetary periods called Dashas. The starting point of this 120-year sequence is calculated using the exact degree of the Moon in its nakshatra at your birth.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Without the exact Moon position, it is impossible to calculate which dasha period you are running, making it impossible to predict when career shifts, marriage, or health events will manifest. Find your current planetary timeline using our <Link href="/dasha-calculator" className="text-gold hover:underline">Dasha Calculator</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Moon Sign in Vedic astrology?",
              a: "In Vedic astrology, your Moon Sign (Chandra Rashi) is the zodiac sign the Moon was placed in at your exact birth moment. Unlike Western astrology which focuses on Sun Sign, Vedic astrology considers the Moon Sign as the primary indicator of your mind, emotions, and inner world. Your Moon Sign determines your Vimshottari Dasha starting point, making it the foundation of all Vedic timing calculations."
            },
            {
              q: "What is the difference between Moon Sign and Sun Sign?",
              a: "Your Sun Sign is determined by the date of birth and represents your outer personality, ego, and life purpose. Your Moon Sign is determined by the Moon's exact position at birth and represents your emotional nature, subconscious patterns, and inner self. In Vedic astrology, the Moon Sign (Rashi) is considered far more important than the Sun Sign for psychological analysis and predictions."
            },
            {
              q: "How is Moon Sign different from Nakshatra?",
              a: "Your Moon Sign is the zodiac sign (one of 12) the Moon occupies. Your Nakshatra is the lunar mansion (one of 27) within that sign. Every Moon Sign contains approximately 2.25 Nakshatras. The Nakshatra adds a deeper layer — two people with Moon in Scorpio can have very different emotional natures if one has Moon in Vishakha and the other in Anuradha."
            },
            {
              q: "Can my Moon Sign change if my birth time is slightly off?",
              a: "Yes. The Moon moves through a sign in about 2.5 days — roughly 0.5 degrees per hour. A birth time error of even 30 minutes can shift the Moon's degree significantly, and near sign boundaries it can change your Moon Sign entirely. Always use the most accurate birth time available."
            },
            {
              q: "Which Moon sign is most powerful?",
              a: "In Vedic astrology, the Moon is considered most strong and comfortable in Taurus (its sign of exaltation) and Cancer (its own sign). In these placements, the emotional nature is stable, nurturing, and resilient. However, every Moon sign has unique strengths and gifts when aspected by benefic planets."
            },
            {
              q: "Does Moon sign change every day?",
              a: "No, the Moon takes about 2.5 days to traverse a single zodiac sign of 30 degrees. It completes its journey through all 12 signs of the zodiac in approximately 27.3 days."
            }
          ].map((faq, i) => (
            <div key={i} className="border-b border-border/40 pb-5">
              <h3 className="text-white text-sm font-medium mb-2">{faq.q}</h3>
              <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
