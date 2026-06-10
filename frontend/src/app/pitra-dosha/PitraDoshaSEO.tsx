import Link from 'next/link';

export default function PitraDoshaSEOContent() {
  const doshaFormations = [
    {
      title: "Sun + Rahu Conjunction (Eclipse Yoga)",
      desc: "This is widely recognized as the strongest indicator of Pitra Dosha in a natal chart. The Sun represents the father, ancestors, and the vital solar energy of the soul. When Rahu, the shadow planet of unfulfilled desires and illusions, conjoins the Sun within close degrees, it eclipses this vital energy. This indicates a severe ancestral blockage, suggesting that a prominent paternal ancestor passed away with deep-seated regrets or unresolved trauma, which now manifests as a barrier to your recognition, self-confidence, and career progression."
    },
    {
      title: "Sun in the 9th House Afflicted by Rahu, Saturn, or Ketu",
      desc: "The 9th house is the house of father, fortune, righteousness (dharma), and ancestors. If the Sun is placed here but is aspected or conjoined by malefic planets such as Saturn (the lord of karma and delay), Rahu, or Ketu, it blocks the flow of ancestral blessings. Instead of inheriting positive fortune, the native inherits an ancestral debt, leading to struggles in higher learning, sudden downfalls, and delayed success."
    },
    {
      title: "Rahu in the 9th House (Direct Ancestral Karma)",
      desc: "Rahu's placement in the 9th house of the birth chart is a direct, classical indicator of ancestral karma. It signifies that the ancestors did not follow their designated dharma or left behind unfulfilled duties that have now been passed to the native to resolve. Natives with this placement often experience sudden reversals of luck, conflicts with religious beliefs, and complex relationships with their father or father-figures."
    },
    {
      title: "Sun Debilitated in Libra with Malefic Aspect",
      desc: "The Sun is debilitated in the sign of Libra, where its authority and vitality are at their lowest. If this debilitated Sun is further afflicted by malefic aspects from planets like Saturn, Mars, or Rahu, the native's connection to the ancestral energy grid is severely weakened. The ancestral support is virtually absent, leading to low physical energy, problems with bones, and struggle to establish authority."
    },
    {
      title: "9th Lord Afflicted by Rahu or Saturn",
      desc: "The lord of the 9th house governs how ancestral fortune and merits (punya) are delivered to you. When this ruler is conjoined with Rahu or Saturn, placed in dusthana houses (6th, 8th, or 12th), or combust, the native experiences constant hurdles. The cosmic pipeline carrying blessings of the forefathers is obstructed, resulting in persistent delays in all major life areas."
    },
    {
      title: "Moon + Rahu Conjunction in Key Houses (Matru Dosha)",
      desc: "While the Sun signifies paternal lineage, the Moon signifies the mother, maternal ancestors, and emotional peace. A Moon + Rahu conjunction (known as Grahan Yoga), especially when placed in the 4th, 5th, or 9th houses, indicates a deep maternal debt. This manifestation leads to inherited emotional trauma, maternal health issues, chronic mental anxiety, and a feeling of instability in the home."
    },
    {
      title: "Saturn in the 9th House in an Enemy Sign",
      desc: "Saturn is the planet of duty, cold reality, and karmic retribution. When Saturn occupies the 9th house in an enemy sign (such as Leo, Aries, or Cancer), it imposes strict, restrictive lessons regarding paternal lineage. The native must work exceptionally hard to earn their fortune, often feeling isolated from family support and bearing the burden of clearing ancestral debts."
    },
    {
      title: "Birth During Krishna Paksha Amavasya",
      desc: "Being born on Amavasya (New Moon Day) during the waning phase of the Moon (Krishna Paksha) indicates a high Pitra Dosha score. Amavasya is the day dedicated entirely to the ancestors (Pitras) in Vedic tradition. The lack of lunar light signifies that the ancestral debt is active, requiring the native to perform regular tarpan to restore spiritual harmony to their lineage."
    },
    {
      title: "Birth During the Pitru Paksha Fortnight (Sept-Oct)",
      desc: "Pitru Paksha is the sacred 15-day period in the Hindu calendar (Ashwin month) when the gates of Pitru Loka are believed to open. Being born during this specific fortnight means the native's soul has chosen to take on the direct responsibility of resolving family karma. This placement amplifies the intensity of other planetary doshas, calling for conscious spiritual intervention."
    },
    {
      title: "Father's Health Issues or Early Death of Father",
      desc: "This is a direct physical manifestation of a severely afflicted Sun and 9th house. When Pitra Dosha is highly concentrated in a chart, it often reflects as the native's father suffering from chronic, debilitating health conditions, experiencing heavy losses, or passing away early in the native's life, creating a sudden vacuum in paternal guidance."
    }
  ];

  const symptomsList = [
    {
      symptom: "Repeated Failures Despite Hard Work",
      details: "You put in maximum effort, possess the right skills, and follow all guidelines, yet the final results always slip away at the last moment. This constant stagnation in career and personal goals is a classic sign of blocked ancestral flow."
    },
    {
      symptom: "Delays in Marriage or Career",
      details: "Finding a compatible partner becomes an uphill battle with unexplained delays, broken alliances, or sudden cancellations. Similarly, career growth remains stalled, leaving you stuck in roles far below your actual potential."
    },
    {
      symptom: "Recurring Financial Problems & Debt",
      details: "Inexplicable financial losses, mounting debts that refuse to clear, and constant expenditure on emergencies. It also manifests as legal disputes over ancestral properties that drain your hard-earned savings."
    },
    {
      symptom: "Health Issues with Father or Paternal Family",
      details: "The father or paternal relatives face chronic illnesses, genetic disorders, or sudden physical setbacks. This indicates a physical manifestation of the energetic imbalance within the paternal bloodline."
    },
    {
      symptom: "Dreams of Ancestors Asking for Food, Water, or Clothes",
      details: "Regularly dreaming of deceased family members, especially if they appear sad, sick, hungry, or ask you for help, water, or clothing. This is a clear signal that their souls require spiritual assistance and offerings to cross over."
    },
    {
      symptom: "Sudden Unexpected Obstacles",
      details: "The 'almost done but failed' phenomenon. When deals are finalized, contracts are written, or life milestones are about to be achieved, sudden and completely unexpected obstacles crop up to derail the entire progress."
    },
    {
      symptom: "Problems with Authority Figures",
      details: "Facing constant friction with bosses, mentors, government officials, or tax authorities. This arises from a weakened Sun, which governs authority, indicating that the native's relationship with hierarchical structures is blocked."
    },
    {
      symptom: "Difficulty Having Children (Lineage Obstacles)",
      details: "Facing persistent issues in conceiving, frequent miscarriages, or delays in starting a family. In Vedic culture, the extension of the family lineage is the primary duty (Dharma) to satisfy ancestors; blocks here show deep-seated Pitra Dosha."
    }
  ];

  const remediesList = [
    {
      name: "Perform Pitra Tarpan on Amavasya",
      desc: "Every month on the New Moon (Amavasya) day, offer water mixed with black sesame seeds (Kala Til), barley, and Kusha grass to your ancestors. Pouring this water while chanting ancestral mantras satisfies their thirst, brings peace to their souls, and clears your personal karmic blocks."
    },
    {
      name: "Donate Food, Clothes, and Blankets on Amavasya",
      desc: "Giving charity (Daana) is a highly recommended practice to convert material wealth into spiritual merit. Donating food grains (like rice and wheat), clean clothes, and blankets to Brahmins, the elderly, or orphans on Amavasya helps satisfy ancestral debts."
    },
    {
      name: "Feed Crows Daily",
      desc: "In Hindu mythology, crows are considered the messengers of Yama (the god of death) and are closely linked to Saturn and the ancestors. Feeding crows daily with cooked rice or bread is a simple yet powerful daily remedy to gain the favor of your departed forefathers."
    },
    {
      name: "Perform Narayan Bali Puja",
      desc: "If there are indications of unnatural deaths (accidents, sudden illness, suicide) in the family history, the souls may get stuck in the lower realms. Performing the Narayan Bali Puja—a special Vedic ritual done at sacred places like Trimbakeshwar or Gaya—helps release these souls."
    },
    {
      name: "Perform Tripindi Shraad",
      desc: "This is a specialized three-generation shraad ritual performed to pacify ancestors who might be angry or unsatisfied due to lack of rites. It is highly recommended if you are experiencing severe blockages in childbirth, progeny, or marriage."
    },
    {
      name: "Chant the Surya Gayatri Mantra Daily",
      desc: "Strengthening the Sun is essential to counter Pitra Dosha. Chant the Surya Gayatri Mantra 108 times daily: 'Om Bhaskaraya Vidmahe Mahadyutikaraya Dhimahi Tanno Aditya Prachodayat'. This solar invocation dispels the dark shadow cast by Rahu or Saturn."
    },
    {
      name: "Visit Gaya (Bihar) for Pind Daan",
      desc: "Gaya is recognized as the most sacred place on Earth for performing ancestral rites. Offering Pind Daan (food offerings) at the Vishnupad Temple in Gaya is believed to satisfy your ancestors for eternity, granting them ultimate liberation (Moksha)."
    },
    {
      name: "Visit Prayagraj During Kumbh for Ancestral Liberation",
      desc: "Performing ancestral rituals and bathing at the Triveni Sangam (confluence of Ganga, Yamuna, and Saraswati) in Prayagraj during highly auspicious planetary transits helps wash away ancestral karmic imprints."
    },
    {
      name: "Respect and Serve Your Living Father and Elders",
      desc: "The most practical, immediate, and effective remedy is to respect, care for, and serve your living father, mother, and grandparents. The blessings of living elders carry immense spiritual power and can neutralize even the most severe planetary doshas."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      
      {/* Intro Section */}
      <div className="space-y-4">
        <h1 className="text-gold font-serif text-3xl">Pitra Dosha Calculator — Check Ancestral Karma & Remedies</h1>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic astrology (Jyotish), <strong>Pitra Dosha</strong> (also written as <em>Pitru Dosha</em>) stands as one of the most critical and frequently analyzed karmic configurations. The word <em>Pitra</em> refers to our ancestors or departed forefathers, while <em>Dosha</em> signifies an affliction, debt, or energetic imbalance. Therefore, Pitra Dosha does not represent a curse from angry ancestors; instead, it is a spiritual representation of the unresolved karma, unfulfilled desires, or debts of your lineage that have been imprinted onto your own birth chart.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          According to Vedic philosophy, life is an unbroken chain of consciousness. Just as we inherit physical features, genetic predispositions, and personality traits through our biological DNA, we also inherit our spiritual and karmic history through what can be called 'spiritual DNA'. If our ancestors departed from the physical world with severe trauma, sudden deaths, unfulfilled desires, or performed actions that violated natural laws without resolving them, those heavy energetic imprints affect the entire family tree. These imbalances manifest as planetary blockages in the charts of their descendants, signaling a call for healing and resolution.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          To understand your chart's specific cosmic layout, it is highly beneficial to look at other major planetary calculators. For instance, you can determine your core astrological placements using our <Link href="/moon-sign" className="text-gold hover:underline">Moon Sign Calculator</Link> or discover your primary karmic challenge by checking if you have <Link href="/kaal-sarp-dosha" className="text-gold hover:underline">Kaal Sarp Dosha</Link> in your chart. Furthermore, analyzing the timing of when these ancestral debts will manifest is possible by running your chart through our <Link href="/dasha-calculator" className="text-gold hover:underline">Vimshottari Dasha Calculator</Link>.
        </p>
      </div>

      {/* Planetary Combinations Section */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Which Planetary Combinations Create Pitra Dosha?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Pitra Dosha is calculated by assessing the condition of the **Sun** (the natural significator of father and ancestors), the **9th House** (the house of ancestors, father, fortune, and dharma), and the **9th House Lord** (the planet ruling the house of fortune). When these key indicators are afflicted by malefic shadow planets or structural delayers, ancestral karma is activated. Here are the specific planetary combinations that create this condition:
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

      {/* Signs Section */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Signs You May Have Pitra Dosha</h2>
        <p className="text-muted text-sm leading-relaxed">
          When ancestral karma remains unrectified and heavy, it creates an invisible, persistent friction in your daily life. It often feels like you are swimming against the current, where even simple tasks require monumental effort. Classical Vedic texts describe several common life patterns and signs that point to the presence of Pitra Dosha:
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {symptomsList.map((item, index) => (
            <div key={index} className="bg-surface border border-border/60 rounded-xl p-5 hover:border-gold/30 transition-all space-y-2">
              <h3 className="text-gold text-base font-semibold">{item.symptom}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Remedies Section */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Pitra Dosha Remedies — Complete Guide</h2>
        <p className="text-muted text-sm leading-relaxed">
          The beauty of Vedic astrology lies in its prescriptive nature. A diagnosis of Pitra Dosha is never a final sentence; it is simply an invitation to perform remedies (Upayas) that bring balance. By performing these rituals, you offer gratitude, help elevate the souls of your ancestors, and release the positive flow of luck into your life. Here is the complete guide to the most effective classical remedies:
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {remediesList.map((item, index) => (
            <div key={index} className="bg-surface2 border border-border rounded-xl p-5 hover:border-gold/30 transition-all">
              <h3 className="text-white text-base font-semibold mb-2">{item.name}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-muted text-sm leading-relaxed mt-4">
          For daily protection, repeating the Surya Gayatri Mantra is highly recommended: 
          <br />
          <strong className="text-gold block my-2 text-center font-serif text-base">
            "Om Bhaskaraya Vidmahe Mahadyutikaraya Dhimahi Tanno Aditya Prachodayat"
          </strong>
          Chanting this solar mantra daily at sunrise revitalizes the Sun's strength in your chart and gradually burns away the negative shadow of Rahu, Ketu, or Saturn that causes Pitra Dosha.
        </p>
      </div>

      {/* Distinction Section */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Pitra Dosha vs Pitru Paksha — Important Distinction</h2>
        <p className="text-muted text-sm leading-relaxed">
          It is common to confuse Pitra Dosha and Pitru Paksha, but they represent entirely different concepts in Vedic tradition:
        </p>
        <p className="text-muted text-sm leading-relaxed">
          <strong>Pitra Dosha</strong> is a permanent astrological condition present in an individual's birth chart (Janma Kundali). It is determined at the moment of birth based on the alignments of the Sun, the 9th house, and the nodes. It remains active throughout the native's life unless neutralized by specific, conscious remedies.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          <strong>Pitru Paksha</strong>, on the other hand, is an annual 15-day period in the Hindu lunar calendar (specifically the Krishna Paksha of the Ashwin month, usually falling in September or October). During this fortnight, it is believed that the veil between the physical world (Bhu Loka) and the ancestral realm (Pitru Loka) becomes extremely thin, allowing the departed souls to visit the earth plane to accept offerings from their descendants.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Performing Shraad, Tarpan, and charity during Pitru Paksha is highly beneficial for everyone, regardless of whether they have Pitra Dosha in their birth chart or not. However, for those who do carry Pitra Dosha, Pitru Paksha is the ultimate golden window of opportunity. Performing remedies during these fifteen days yields compounding spiritual results, helping to clear decades of accumulated ancestral debt in a single fortnight.
        </p>
      </div>

      {/* D9 and Progeny Section */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How Ancestral Karma Affects the D9 Navamsa Chart</h2>
        <p className="text-muted text-sm leading-relaxed">
          To truly understand the depth of Pitra Dosha, a seasoned astrologer will always cross-examine the main birth chart (D1) with the Navamsa chart (D9). The D9 chart represents the inner potential, the second half of life, and the fruits of your actions. If Pitra Dosha is present in the D1 chart but the 9th house in the D9 chart is strong and occupied by auspicious planets like Jupiter or Venus, it indicates that the ancestral debt is superficial and can be easily resolved through simple charity and gratitude rituals.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          However, if the D9 chart also displays an afflicted Sun or a weak 9th lord conjoined with Rahu/Ketu, it signals a deep-seated karmic block. This often manifests as severe challenges in continuing the family lineage, such as facing obstacles in having children or encountering chronic health issues in descendants. In such cases, performing advanced remedies like the Narayan Bali Puja or visiting Gaya for Pind Daan becomes absolutely necessary to break the cycle of inherited trauma.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          If you are also exploring relationship dynamics and want to ensure that these ancestral patterns do not impact your matrimonial harmony, we recommend analyzing your partner's soul indicators using the <Link href="/atmakaraka" className="text-gold hover:underline">Atmakaraka Calculator</Link> or examining potential Saturn influences through the <Link href="/sade-sati" className="text-gold hover:underline">Sade Sati Calculator</Link> to ensure a balanced union.
        </p>
      </div>

      {/* FAQs Section */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Is Pitra Dosha a curse from ancestors?",
              a: "No. Your ancestors do not curse you. Pitra Dosha is a karmic signature showing that there is unresolved debt or unfulfilled desires in your family lineage that you have chosen to take on at a soul level to resolve in this life. It is an opportunity for healing, not a punishment."
            },
            {
              q: "Can Pitra Dosha occur in a chart if the 9th house has good planets?",
              a: "Yes. Even if you have beneficial planets in the 9th house, if the Sun is conjoined with Rahu or Ketu in another house, or if the 9th lord is severely afflicted, Pitra Dosha is still active. A comprehensive analysis of both D1 and D9 charts is necessary to determine the overall strength."
            },
            {
              q: "What is the best day to perform Pitra Dosha remedies?",
              a: "Amavasya (New Moon Day) is the most auspicious day of every month to feed the needy, offer prayers, and perform tarpan. Saturday is also an excellent day due to its connection with Saturn, the lord of karma."
            },
            {
              q: "Does Kaal Sarp Dosha relate to Pitra Dosha?",
              a: "They are separate but can be present together. Kaal Sarp Dosha involves all planets hemmed between Rahu and Ketu, representing personal struggle and destiny. Pitra Dosha specifically involves the Sun, 9th house, and 9th lord, representing ancestral debt. You can check both using our calculators."
            },
            {
              q: "How does Pitra Dosha affect children and future generations?",
              a: "If left unaddressed, Pitra Dosha can pass down the line, manifesting as chronic health issues, genetic vulnerabilities, or behavioral blocks in children. Resolving the dosha through proper shradh and charity cuts off the cycle, protecting your lineage."
            },
            {
              q: "Can women perform Pitra Dosha remedies and Tarpan?",
              a: "Yes, absolutely. Classical Vedic scriptures allow women to perform offerings and charity for their ancestors, particularly if there are no male descendants in the family, or if they wish to seek blessings for their children's well-being."
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
