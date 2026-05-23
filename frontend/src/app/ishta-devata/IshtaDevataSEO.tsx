import Link from 'next/link';

export default function IshtaDevataSEOContent() {
  const deityDetails = [
    {
      name: "Lord Shiva",
      planet: "Moon / Sun / Saturn / Rahu",
      desc: "Representing cosmic consciousness, detachment, and supreme transcendence. Shiva is the ultimate destroyer of ego and illusion. Devotees of Shiva seek mental peace, absolute stillness, and spiritual liberation.",
      mantra: "Om Namah Shivaya"
    },
    {
      name: "Lord Vishnu / Sri Krishna",
      planet: "Mercury / Jupiter",
      desc: "Representing preservation, divine play (Lila), and wisdom. Vishnu manifests in various avatars (like Krishna or Rama) to restore balance and cosmic order. Worshiping Vishnu promotes intellect, joy, and devotional surrender.",
      mantra: "Om Namo Bhagavate Vasudevaya"
    },
    {
      name: "Goddess Lakshmi",
      planet: "Venus",
      desc: "Representing grace, abundance, beauty, and auspiciousness. Lakshmi is the consort of Vishnu and governs both material wealth and spiritual assets. Devotion to her cultivates contentment and purity.",
      mantra: "Om Shreem Mahalakshmiyei Namah"
    },
    {
      name: "Lord Kartikeya / Muruga",
      planet: "Mars",
      desc: "Representing courage, spiritual warriorship, and the light of consciousness. Kartikeya is the commander of the divine forces, helping to vanquish internal blockages and negative karma.",
      mantra: "Om Saravanabhavaya Namah"
    },
    {
      name: "Lord Ganesha",
      planet: "Ketu / Mars",
      desc: "Representing wisdom, obstacles removal, and new beginnings. Ganesha is the gateway to spiritual practices, purifying the paths and grounding the mind before deeper meditation.",
      mantra: "Om Gam Ganapataye Namah"
    },
    {
      name: "Goddess Durga / Shakti",
      planet: "Rahu / Sun",
      desc: "Representing the dynamic, protective, and nurturing power of the universe. Durga defends the seeker against internal and external adversities, bringing courage and absolute protection.",
      mantra: "Om Aim Hreem Kleem Chamundayai Viche"
    },
    {
      name: "Lord Dattatreya / Brahma",
      planet: "Jupiter",
      desc: "Representing the unified trinity of creation, preservation, and dissolution. Dattatreya is the supreme Guru, teaching through nature and bringing non-dual wisdom and ultimate clarity.",
      mantra: "Om Draam Dreem Draum Sah Dattatreyaya Namah"
    },
    {
      name: "Lord Yama / Shani Dev",
      planet: "Saturn",
      desc: "Representing absolute discipline, righteousness (Dharma), and the laws of Karma. Worshiping the deity associated with Saturn stabilizes the mind, develops patience, and burns off past heavy karmas.",
      mantra: "Om Sham Shanaischaraya Namah"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      
      <div className="space-y-4">
        <h1 className="text-gold font-serif text-3xl">Ishta Devata Calculator — Find Your Personal Deity in Vedic Astrology</h1>
        <p className="text-muted text-sm leading-relaxed">
          In the vast and rich tradition of Vedic astrology (Jyotish), the concept of the <strong>Ishta Devata</strong> (frequently spelled <em>Ista Devata</em> or <em>Ishta Deva</em>) stands as one of the most beautiful and spiritually profound teachings. Translated literally from Sanskrit, <em>Ishta Devata</em> means "cherished deity" or "chosen divinity." It represents the specific form of the Divine that is closest to your soul, uniquely suited to guide you toward spiritual liberation (Moksha) and offer supreme protection through the trials of earthly life.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          While many traditions allow you to choose a deity based on personal preference or cultural affinity, Vedic astrology offers a precise, mathematically calculated method to identify the deity that aligns with your soul's karmic structure. By calculating your Atmakaraka (soul planet) and mapping its position in the D9 Navamsa chart, you can discover which divine energy is destined to assist your spiritual evolution.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The Jaimini Astrology Calculation: How to Find Your Ishta Devata</h2>
        <p className="text-muted text-sm leading-relaxed">
          The calculation of the Ishta Devata is derived from the Jaimini Sutras, a classic and highly revered text of Vedic astrology. The step-by-step process requires high precision and an accurate birth time:
        </p>
        <ol className="list-decimal list-inside space-y-3 text-muted text-sm pl-2">
          <li>
            <strong>Identify the Atmakaraka (AK):</strong> In your natal birth chart (D1), we look at the seven primary planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn) and find the one that has reached the highest degree (from 0° to 30°) in any zodiac sign. This planet is designated as your Atmakaraka, representing your soul's desires, struggles, and ultimate lesson in this incarnation.
          </li>
          <li>
            <strong>Locate the Atmakaraka in the Navamsa Chart (D9):</strong> The D9 Navamsa is the divisional chart representing the inner potential, spiritual path, and marriage life. The sign that your Atmakaraka occupies in this Navamsa chart is called the <strong>Karakamsha</strong>.
          </li>
          <li>
            <strong>Analyze the 12th House from Karakamsha:</strong> The 12th house represents liberation, isolation, surrender, and Moksha. In Jaimini astrology, the 12th house counted from the Karakamsha sign in the Navamsa chart reveals the pathway to Moksha.
          </li>
          <li>
            <strong>Determine the Ruling Deity:</strong> The planet that rules or occupies this 12th house determines your Ishta Devata. Each planet is associated with specific Vedic deities that act as the gatekeepers of liberation.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Deities and Planetary Associations</h2>
        <p className="text-muted text-sm leading-relaxed">
          According to Maharishi Jaimini and subsequent classical commentators, here is the primary mapping of planets in the 12th house from Karakamsha to their corresponding deities:
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {deityDetails.map((item, index) => (
            <div key={index} className="bg-surface2 border border-border rounded-xl p-5 hover:border-gold/30 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white text-base font-semibold">{item.name}</h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold">
                  {item.planet}
                </span>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-3">{item.desc}</p>
              <div className="bg-bg/50 border border-border/50 rounded-lg p-2.5 flex items-center justify-between text-xs font-mono">
                <span className="text-muted">Mantra:</span>
                <span className="text-white select-all">{item.mantra}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Kul Devata vs. Ishta Devata: Understanding the Difference</h2>
        <p className="text-muted text-sm leading-relaxed">
          It is very common in Hindu culture to confuse the Ishta Devata with the <strong>Kul Devata</strong> (or <em>Kula Devi</em>). However, they represent two entirely different dimensions of your life and spiritual journey:
        </p>
        <ul className="list-disc list-inside space-y-3 text-muted text-sm pl-2">
          <li>
            <strong>Kul Devata (Family Deity):</strong> The Kul Devata is tied to your family lineage (Gotra) and ancestry. It is passed down through generations. The Kul Devata acts as a protective shield for the entire family, safeguarding your biological roots, health, prosperity, and lineage. Honoring the Kul Devata is essential for resolving ancestral issues.
          </li>
          <li>
            <strong>Ishta Devata (Individual Soul Deity):</strong> The Ishta Devata is unique to your individual soul's blueprint, regardless of the family you were born into. Calculated from your specific birth chart, it is the divine force that helps you resolve personal ego blocks, navigate your specific planetary dashas, and progress toward liberation.
          </li>
        </ul>
        <p className="text-muted text-sm leading-relaxed">
          While you may worship both, the Kul Devata is worshiped for family protection and mundane well-being, whereas the Ishta Devata is worshiped for individual soul purification, mental peace, and spiritual growth.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How to Worship Your Ishta Devata</h2>
        <p className="text-muted text-sm leading-relaxed">
          Connecting with your Ishta Devata does not require complex or expensive rituals. Simple, sincere devotion is highly effective. Here are the classical ways to integrate this practice into your daily life:
        </p>
        <ul className="list-disc list-inside space-y-3 text-muted text-sm pl-2">
          <li>
            <strong>Chant Their Mantra:</strong> Dedicate 5 to 10 minutes every morning to chant the mantra of your Ishta Devata. Using a Tulsi or Rudraksha mala (108 beads) helps focus the mind.
          </li>
          <li>
            <strong>Altar Placement:</strong> Keep a small picture or idol of your Ishta Devata in your home temple. Light a ghee lamp (diya) and incense (agarbatti) in front of it.
          </li>
          <li>
            <strong>Offerings:</strong> Offer fresh water, flowers, or a small piece of fruit (Prasad) daily.
          </li>
          <li>
            <strong>Weekly Fast:</strong> Observe a partial fast (eating only fruits or light food) on the day of the week ruled by your Ishta Devata's planet (e.g., Mondays for Shiva, Thursdays for Vishnu/Dattatreya, Fridays for Lakshmi).
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Can I worship a deity other than my calculated Ishta Devata?",
              a: "Yes, absolutely. The calculated Ishta Devata is a recommendation from Vedic astrology based on the karmic path of your soul, but you should always follow your heart. Sincere devotion to any form of the Divine is valid and beneficial."
            },
            {
              q: "How does the Atmakaraka relate to the Ishta Devata?",
              a: "The Atmakaraka is the planet representing the soul's primary lesson or challenge. The Ishta Devata is calculated from the Atmakaraka's Navamsa position, representing the divine energy that has the power to soothe the Atmakaraka and guide it to liberation."
            },
            {
              q: "What if my birth time is not accurate?",
              a: "Since the calculation relies on the D9 Navamsa chart, which changes every few minutes, an accurate birth time is crucial. If your birth time is off by even 10-15 minutes, the Navamsa sign can shift, resulting in a different Ishta Devata calculation."
            },
            {
              q: "What is the difference between Ishta Devata and Nakshatra Deity?",
              a: "Your Ishta Devata is calculated from your Atmakaraka's D9 position and represents the soul's path to Moksha. The Nakshatra Deity is the ruling god of your birth Nakshatra (where your Moon sits), representing your emotional patterns, talents, and mind. Both are useful, but for spiritual liberation, the Ishta Devata is primary."
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
