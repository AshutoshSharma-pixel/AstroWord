import Link from 'next/link';

export default function PitraDoshaSEOContent() {
  const doshaFormations = [
    {
      title: "Sun Conjunct Rahu or Ketu (Eclipse Yoga)",
      desc: "The Sun represents the father, ancestors, and your soul's vitality. When Rahu or Ketu conjoins the Sun within 10 degrees, it eclipses this vital solar energy, indicating a severe karmic block linked to paternal ancestors. This can manifest as low vitality, struggles with authority, or career blocks."
    },
    {
      title: "Rahu or Ketu in the 9th House",
      desc: "The 9th house is the house of father, fortune, and ancestors. When the shadow planets Rahu or Ketu occupy this house, they directly destabilize your luck and ancestral connection, requiring dedicated rituals (Samskaras) to purify the house of dharma."
    },
    {
      title: "9th House Lord Afflicted by Malefics",
      desc: "If the lord of your 9th house is conjoined with, aspected by, or sandwiched between malefic planets like Rahu, Ketu, or Saturn, the flow of ancestral blessings is obstructed, often leading to sudden setbacks, delayed marriages, or difficulties in inheritance."
    },
    {
      title: "Moon Conjunct Rahu or Ketu (Grahan Yoga)",
      desc: "While the Sun represents paternal ancestors, the Moon represents maternal ancestors, peace of mind, and mother. When conjoined with the lunar nodes, it creates maternal ancestor debt, manifesting as emotional unrest, anxiety, or recurring family patterns."
    }
  ];

  const remediesList = [
    {
      name: "Shradh & Tarpan Rituals",
      desc: "Offering water and sesame seeds (Tarpan) or food (Pind Daan) during the sacred 16-day period of Pitru Paksha is the most powerful classical remedy to satisfy departed souls and receive their blessings."
    },
    {
      name: "Feeding Animals (Seva)",
      desc: "Feeding crows (represented by Saturn/ancestors), cows (representing all deities), and stray dogs on Saturdays or Amavasya (New Moon) days helps burn off negative ancestral debt rapidly."
    },
    {
      name: "Donating to the Needy (Daana)",
      desc: "Donating clothes, food, or oil to orphans, elderly people, or priests on New Moon days. Daana acts as a direct conversion of material wealth into spiritual merits (Punya) to clear ancestral debt."
    },
    {
      name: "Chanting Sun Mantras",
      desc: "Reciting the Aditya Hrudaya Stotra or chanting the Gayatri Mantra daily strengthens the Sun (the natural significator of ancestors and soul), helping to dispel the darkness of eclipse energy."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      
      <div className="space-y-4">
        <h1 className="text-gold font-serif text-3xl">Pitra Dosha Calculator — Check Ancestral Karma & Remedies</h1>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic astrology (Jyotish), <strong>Pitra Dosha</strong> (also spelled <em>Pitru Dosha</em>) is one of the most significant and frequently discussed astrological configurations. The word <em>Pitra</em> refers to ancestors or forefathers, and <em>Dosha</em> translates to an affliction, imbalance, or debt. Therefore, Pitra Dosha represents the heavy karmic debt or unresolved lessons of your ancestors that have been passed down to your current birth chart.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Vedic philosophy views life as a continuous chain of consciousness. Just as we inherit biological DNA from our ancestors, we also inherit their karmic imprint (spiritual DNA). If ancestors departed with unfulfilled desires, sudden trauma, or committed negative deeds without resolving them, these energies manifest in the charts of their descendants as planetary blockages. Identifying and resolving these blockages is key to unlocking prosperity, health, and family harmony.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The Planetary Formations of Pitra Dosha</h2>
        <p className="text-muted text-sm leading-relaxed">
          Pitra Dosha is not a curse from your ancestors; rather, it is a reflection of ancestral debt in your astrological blueprint. It is calculated by looking at the condition of the **Sun** (father/ancestors), the **9th House** (ancestors, father, dharma, and luck), and the **9th House Lord** (lord of fortune). Here are the primary planetary combinations that form this dosha:
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {doshaFormations.map((item, index) => (
            <div key={index} className="bg-surface2 border border-border rounded-xl p-5 hover:border-gold/30 transition-all">
              <h3 className="text-white text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Common Symptoms and Effects of Pitra Dosha</h2>
        <p className="text-muted text-sm leading-relaxed">
          When ancestral karma is heavy and unrectified, it creates invisible obstacles in everyday life. Some of the most common symptoms associated with Pitra Dosha in classical texts include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-surface border border-border/60 rounded-xl p-4 space-y-2">
            <h4 className="text-gold text-sm font-semibold">Career & Financial Blocks</h4>
            <p className="text-muted text-xs leading-relaxed">
              Facing constant, inexplicable delays in promotions, sudden business losses, or legal disputes over inheritance and ancestral properties.
            </p>
          </div>
          <div className="bg-surface border border-border/60 rounded-xl p-4 space-y-2">
            <h4 className="text-gold text-sm font-semibold">Family & Child Birth Delays</h4>
            <p className="text-muted text-xs leading-relaxed">
              Obstacles in getting married, frequent relationship discord without clear reasons, or difficulties conceiving children (representing lineage continuation).
            </p>
          </div>
          <div className="bg-surface border border-border/60 rounded-xl p-4 space-y-2">
            <h4 className="text-gold text-sm font-semibold">Chronic Health Vulnerabilities</h4>
            <p className="text-muted text-xs leading-relaxed">
              Genetic illnesses, lack of physical vitality, or family members suffering from recurring health issues that do not respond to medical treatments.
            </p>
          </div>
          <div className="bg-surface border border-border/60 rounded-xl p-4 space-y-2">
            <h4 className="text-gold text-sm font-semibold">Unexplained Mental Anxiety</h4>
            <p className="text-muted text-xs leading-relaxed">
              A general, heavy feeling of worry, grief, or dissatisfaction inside the home, even when material comforts are present.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Classical Remedies for Pitra Dosha Resolution</h2>
        <p className="text-muted text-sm leading-relaxed">
          Vedic astrology is unique because it always offers remedies (Upayas) alongside diagnoses. Since Pitra Dosha arises from a lack of ancestral satisfaction, the remedies focus on gratitude, charity, and solar revitalization:
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {remediesList.map((item, index) => (
            <div key={index} className="bg-surface2 border border-border rounded-xl p-5 hover:border-gold/30 transition-all">
              <h3 className="text-white text-base font-semibold mb-2">{item.name}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Pitru Paksha: The Golden Opportunity for Ancestral Healing</h2>
        <p className="text-muted text-sm leading-relaxed">
          Each year, during the Hindu lunar month of Bhadrapada, a sacred 16-day period called <strong>Pitru Paksha</strong> (Fortnight of the Ancestors) is observed. Astrologically, this is when the Sun transits the sign of Virgo, which is believed to open the gateways between the physical plane and the ancestral realms (Pitru Loka).
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Performing simple acts of charity, offering water (Tarpan), and chanting ancestral prayers during these 16 days is believed to be 100 times more effective than performing them at other times. Even if you cannot perform complex ceremonies, simply offering sincere prayers of forgiveness and gratitude during Pitru Paksha can significantly reduce the severity of Pitra Dosha in your chart.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Is Pitra Dosha a curse from ancestors?",
              a: "No. Your ancestors do not curse you. Pitra Dosha is a karmic signature showing that there is unresolved debt or unfulfilled desires in your family lineage that you have chosen to take on at a soul level to resolve in this life."
            },
            {
              q: "Can Pitra Dosha occur in a chart if the 9th house has good planets?",
              a: "Yes. Even if you have beneficial planets in the 9th house, if the Sun is conjoined with Rahu or Ketu in another house, or if the 9th lord is severely afflicted, Pitra Dosha is still active. A comprehensive analysis of both D1 and D9 is needed."
            },
            {
              q: "What is the best day to perform Pitra Dosha remedies?",
              a: "Amavasya (New Moon Day) is the most auspicious day of every month to feed the needy, offer prayers, and perform tarpan. Saturday is also an excellent day due to its connection with Saturn, the lord of karma."
            },
            {
              q: "Does Kaal Sarp Dosha relate to Pitra Dosha?",
              a: "They are separate but can be present together. Kaal Sarp Dosha involves all planets hemmed between Rahu and Ketu, representing personal struggle and destiny. Pitra Dosha specifically involves the Sun, 9th house, and 9th lord, representing ancestral debt. You can check both using our calculators."
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
