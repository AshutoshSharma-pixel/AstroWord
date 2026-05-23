import Link from 'next/link';

export default function NakshatraSEOContent() {
  const nakshatras = [
    { name: "Ashwini", lord: "Ketu", deity: "Ashwini Kumaras", symbol: "Horse head", desc: "Swift, healing, and pioneering. Initiators and healers of the zodiac." },
    { name: "Bharani", lord: "Venus", deity: "Yama", symbol: "Yoni", desc: "Intense, creative, and carries karmic burdens. Deeply passionate and transformative." },
    { name: "Krittika", lord: "Sun", deity: "Agni", symbol: "Flame/Razor", desc: "Sharp, purifying, and ambitious. Can cut through obstacles with courage." },
    { name: "Rohini", lord: "Moon", deity: "Brahma", symbol: "Chariot/Temple", desc: "Beautiful, sensual, and creative. The most fertile and growth-oriented nakshatra." },
    { name: "Mrigashira", lord: "Mars", deity: "Soma", symbol: "Deer head", desc: "Curious, searching, and gentle. Always seeking knowledge and new experiences." },
    { name: "Ardra", lord: "Rahu", deity: "Rudra", symbol: "Teardrop", desc: "Transformative, stormy, and intellectually sharp. Destruction followed by renewal." },
    { name: "Punarvasu", lord: "Jupiter", deity: "Aditi", symbol: "Quiver of arrows", desc: "Optimistic, nurturing, and focused on returning to goodness. Home-loving." },
    { name: "Pushya", lord: "Saturn", deity: "Brihaspati", symbol: "Flower/Cow's udder", desc: "Nourishing, devoted, and spiritual. Considered the most auspicious star for daily activity." },
    { name: "Ashlesha", lord: "Mercury", deity: "Nagas", symbol: "Coiled serpent", desc: "Penetrating, hypnotic, and mysterious. Deeply intuitive but can be possessive." },
    { name: "Magha", lord: "Ketu", deity: "Pitras", symbol: "Throne/Palanquin", desc: "Royal, ancestral power, and leadership. Strongly connected to lineage and past lives." },
    { name: "Purva Phalguni", lord: "Venus", deity: "Bhaga", symbol: "Hammock/Bed legs", desc: "Pleasurable, creative, and romantic. Enjoys relaxation, luxury, and comfort." },
    { name: "Uttara Phalguni", lord: "Sun", deity: "Aryaman", symbol: "Bed/Cot", desc: "Friendly, helpful, and patronizing. Highly focused on relationships and marriage." },
    { name: "Hasta", lord: "Moon", deity: "Savitar", symbol: "Hand/Fist", desc: "Skillful, crafty, humorous, and hardworking. Natural healers and artisans." },
    { name: "Chitra", lord: "Mars", deity: "Vishwakarma", symbol: "Pearl/Bright jewel", desc: "Beautiful, artistic, and the architect of form. Lovers of aesthetics and structure." },
    { name: "Swati", lord: "Rahu", deity: "Vayu", symbol: "Coral/Sword", desc: "Independent, flexible, and business-minded. Adaptable and free-flowing like the wind." },
    { name: "Vishakha", lord: "Jupiter", deity: "Indra/Agni", symbol: "Triumphal arch", desc: "Goal-oriented, determined, and highly ambitious. Sometimes prone to competition." },
    { name: "Anuradha", lord: "Saturn", deity: "Mitra", symbol: "Lotus flower", desc: "Devoted, organized, and excellent in groups. Deeply loyal and values friendship." },
    { name: "Jyeshtha", lord: "Mercury", deity: "Indra", symbol: "Earring/Amulet", desc: "Eldest, protective, and responsible. Natural leaders who value honor and power." },
    { name: "Mula", lord: "Ketu", deity: "Nirriti", symbol: "Roots tied together", desc: "Investigative, destructive of illusions, and deeply philosophical. Truth-seekers." },
    { name: "Purva Ashadha", lord: "Venus", deity: "Apas", symbol: "Winnowing basket", desc: "Invincible, proud, and closely connected to water. Highly persuasive speakers." },
    { name: "Uttara Ashadha", lord: "Sun", deity: "Vishwadevas", symbol: "Elephant tusk", desc: "Victorious, responsible, and universally respected. Dedicated to long-term goals." },
    { name: "Shravana", lord: "Moon", deity: "Vishnu", symbol: "Ear/Three footprints", desc: "Learning through listening, wise, and connected. Possesses an excellent memory." },
    { name: "Dhanishtha", lord: "Mars", deity: "Ashta Vasus", symbol: "Drum/Flute", desc: "Wealthy, musical, and group-oriented. Driven to achieve status and prosperity." },
    { name: "Shatabhisha", lord: "Rahu", deity: "Varuna", symbol: "Empty circle/100 flowers", desc: "Healing, secretive, and scientific. The star of a hundred doctors and healers." },
    { name: "Purva Bhadrapada", lord: "Jupiter", deity: "Aja Ekapada", symbol: "Sword/Two-faced man", desc: "Intense, fiery, and philosophically extreme. Often eccentric and unique." },
    { name: "Uttara Bhadrapada", lord: "Saturn", deity: "Ahir Budhnya", symbol: "Twins/Back of a bed", desc: "Wise, deep, and possessing ancient soul energy. Strong connection to dreams." },
    { name: "Revati", lord: "Mercury", deity: "Pushan", symbol: "Fish", desc: "Nurturing, prosperous, and protective of travelers. The end of the journey and rebirth." }
  ];

  const careerGroups = [
    { title: "Ketu-ruled (Ashwini, Magha, Mula)", desc: "Alternative medicine, healing, research, spiritual guidance, computing, intelligence work, and investigation." },
    { title: "Venus-ruled (Bharani, Purva Phalguni, Purva Ashadha)", desc: "Arts, music, fashion, beauty, luxury goods, travel, relationships counselling, and entertainment." },
    { title: "Sun-ruled (Krittika, Uttara Phalguni, Uttara Ashadha)", desc: "Government service, political leadership, administration, medicine, and management." },
    { title: "Moon-ruled (Rohini, Hasta, Shravana)", desc: "Food industry, hospitality, real estate, public relations, healthcare, and education." },
    { title: "Mars-ruled (Mrigashira, Chitra, Dhanishtha)", desc: "Engineering, military, sports, real estate, physical construction, and surgery." },
    { title: "Rahu-ruled (Ardra, Swati, Shatabhisha)", desc: "Technology, software development, foreign trade, media, research science, and advanced medicine." },
    { title: "Jupiter-ruled (Punarvasu, Vishakha, Purva Bhadrapada)", desc: "Teaching, law, advisory roles, religious work, financial planning, and publishing." },
    { title: "Saturn-ruled (Pushya, Anuradha, Uttara Bhadrapada)", desc: "Social service, structural law, politics, mining, manufacturing, and heavy industry." },
    { title: "Mercury-ruled (Ashlesha, Jyeshtha, Revati)", desc: "Writing, communications, trade, commerce, software, travel management, and journalism." }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      
      <div className="space-y-4">
        <h1 className="text-gold font-serif text-3xl">Nakshatra Calculator — Find Your Vedic Birth Star</h1>
        <p className="text-muted text-sm leading-relaxed">
          While your Sun Sign reveals your ego and your Moon Sign indicates your general emotional framework, your **Nakshatra** (Vedic birth star) reveals who you truly are at the deepest soul level. The 27 Nakshatras form the oldest and most refined astrological system in the world, predating the 12 zodiac signs by thousands of years. Each Nakshatra carries the energy of a specific deity, a ruling planet, and a unique cosmic power (Shakti). Finding your birth star and pada is the deepest layer of self-knowledge Vedic astrology offers.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is a Nakshatra?</h2>
        <p className="text-muted text-sm leading-relaxed">
          A Nakshatra is a lunar mansion. The word translates roughly to "that which does not decay." While the Sun takes a full year to travel through the 12 signs of the zodiac, the Moon travels through all 27 Nakshatras in a single month, spending approximately 24 hours in each. 
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Each Nakshatra spans exactly 13 degrees and 20 minutes of the zodiac. Every Nakshatra is further divided into 4 quarters, known as **Padas**, of 3 degrees and 20 minutes each. This results in a total of 108 Padas across the entire zodiac. The number 108 is a sacred number in Hinduism, representing the cosmic dance of the Moon through the sky. Your specific birth Nakshatra is the one the Moon occupied at the exact moment of your birth.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The 27 Nakshatras — Complete Guide</h2>
        <p className="text-muted text-sm leading-relaxed">
          Here is a guide to all twenty-seven lunar mansions, including their ruling planet, presiding deity, and key qualities:
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {nakshatras.map((item, index) => (
            <div key={index} className="bg-surface2 border border-border rounded-xl p-5 hover:border-gold/30 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white text-base font-semibold">{index + 1}. {item.name}</h3>
                <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono font-medium">
                  {item.lord}
                </span>
              </div>
              <p className="text-xs text-muted mb-2 font-mono">Deity: {item.deity} · Symbol: {item.symbol}</p>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Nakshatra Padas — The 4 Quarters</h2>
        <p className="text-muted text-sm leading-relaxed">
          Every Nakshatra is divided into 4 Padas of 3°20' each. The Pada is an essential subdivision because it maps directly to the D9 Navamsa chart. 
        </p>
        <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
          <li>• <span className="text-white">Pada 1 (Dharma)</span> — Associated with fire and action. Focuses on setting goals and self-discovery.</li>
          <li>• <span className="text-white">Pada 2 (Artha)</span> — Associated with earth and material stability. Focuses on career and practical values.</li>
          <li>• <span className="text-white">Pada 3 (Kama)</span> — Associated with air and communication. Focuses on relationships and mental concepts.</li>
          <li>• <span className="text-white">Pada 4 (Moksha)</span> — Associated with water and emotional release. Focuses on spiritual growth and healing.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Nakshatra and Career Alignment</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Jyotish, the planet ruling your birth Nakshatra influences your professional talents and inclinations. Here is how careers are grouped:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {careerGroups.map((group, index) => (
            <div key={index} className="bg-surface2 border border-border rounded-xl p-5 hover:border-gold/30 transition-all">
              <h3 className="text-gold text-sm font-semibold mb-2">{group.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{group.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Nakshatra and Marriage Compatibility</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic astrology, marriage matching (Kundli Milan) is calculated using the Nakshatras of both partners. The Nakshatra determines four of the eight major compatibility factors: Gana (temperament), Yoni (instinctual compatibility), Nadi (health and genetics), and Tara (friendship).
        </p>
        <p className="text-muted text-sm leading-relaxed">
          The most critical compatibility factor is **Nadi**, which carries a weight of 8 points. If the bride and groom share the exact same Nakshatra group (Nadi), it is considered a mismatch (Nadi Dosha) that requires careful remediation. To read about the temperament category, check out our <Link href="/gana" className="text-gold hover:underline">Gana Calculator</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a Nakshatra in Vedic astrology?",
              a: "A Nakshatra is a lunar mansion — one of 27 equal segments of the sky, each spanning 13 degrees and 20 minutes. The Moon travels through all 27 Nakshatras in one month. Your birth Nakshatra (Janma Nakshatra) is the one the Moon occupied at your exact birth time. Each Nakshatra has a ruling planet, deity, symbol, and unique qualities that reveal your deepest personality traits and life path."
            },
            {
              q: "How many Nakshatras are there?",
              a: "There are 27 Nakshatras used in Vedic astrology calculations, each divided into 4 Padas (quarters), giving 108 Padas in total. Some texts mention a 28th Nakshatra called Abhijit, but it is rarely used in standard calculations. Your specific Pada within the Nakshatra adds another layer of precision to your reading."
            },
            {
              q: "What is the difference between Nakshatra and Rashi?",
              a: "Your Rashi (Moon Sign) is which of the 12 zodiac signs the Moon occupies. Your Nakshatra is which of the 27 lunar mansions within that sign it occupies. Every zodiac sign contains approximately 2.25 Nakshatras. The Nakshatra is more specific — two people with the same Moon Sign can have completely different temperaments based on their Nakshatra."
            },
            {
              q: "Why is Nakshatra important for marriage?",
              a: "In Vedic marriage matching (Guna Milan), the Nakshatra determines Gana (temperament category), Yoni (compatibility category), Nadi (health compatibility), and Tara (friendship compatibility) — four of the eight compatibility factors. The Nakshatra also determines the starting syllable of your spouse's name in Jaimini astrology."
            },
            {
              q: "Which nakshatra is most powerful?",
              a: "In classical astrology, Pushya (ruled by Saturn and presided over by Brihaspati) is considered the most auspicious and strong for general success and spiritual growth. However, every Nakshatra holds a unique power (Shakti) that is beneficial when directed correctly."
            },
            {
              q: "What is my nakshatra's lucky day?",
              a: "Your nakshatra's lucky day is typically the day ruled by the planetary lord of your Nakshatra. For example, if your Nakshatra is Rohini (ruled by the Moon), Monday is considered auspicious. Alternatively, the day the transiting Moon enters your birth Nakshatra is also a power day."
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
