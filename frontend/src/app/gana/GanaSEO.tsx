import Link from 'next/link';

export default function GanaSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      
      {/* H1 */}
      <div className="space-y-4 text-center">
        <h1 className="text-gold font-serif text-3xl sm:text-4xl leading-tight">
          Gana Calculator — Find Your Deva, Manushya or Rakshasa Gana
        </h1>
        <p className="text-muted text-xs uppercase tracking-widest font-mono">
          Vedic Astrology Temperament Classification & Gana Koota Rules
        </p>
      </div>

      {/* Section 1: What is Gana in Vedic Astrology? */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Gana in Vedic Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic astrology (Jyotish), Gana represents the classification of human temperament and instinctual behavior. The Sanskrit word &quot;Gana&quot; translates directly to group, category, or tribe. In the astrological context, every individual belongs to one of three specific Ganas: Deva Gana (Divine), Manushya Gana (Human), or Rakshasa Gana (Intense/Fierce). Your Gana is determined solely by the exact position of the Moon at the time of your birth, specifically which of the 27 Nakshatras (lunar mansions) the Moon occupied.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Gana matching—known as Gana Koota—is one of the most critical components of the traditional 36-point Ashtakoota Kundali Matching system used to evaluate marital compatibility. Gana Koota is assigned 6 points out of the total 36, indicating how well a couple&apos;s fundamental temperaments, values, and reactions to life will blend. 
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Historically, the classification of Ganas reflects the three main gunas (qualities) of nature: Sattva (purity and harmony), Rajas (passion and activity), and Tamas (inertia and darkness), though they manifest as unique psychological temperaments. Deva Gana aligns with Sattvic energy, promoting peace, spirituality, and altruism. Manushya Gana represents Rajasic energy, focusing on action, ambition, and worldly achievement. Rakshasa Gana represents an intense mix of energy that, while often misunderstood, carries the power of transformation, protection, and fierce independence.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          A common and unfortunate misconception in popular astrology is that Rakshasa Gana implies a demonic, evil, or negative character. This is completely false. These three categories are not moral judgments; they are psychological archetypes that describe how we process emotions, handle conflicts, and view the world. Deva represents peace and cooperation; Manushya represents practical achievement and family focus; and Rakshasa represents intense independence, protection, and fierce loyalty.
        </p>
      </div>

      {/* Section 2: The Three Ganas — Complete Personality Guide */}
      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl">The Three Ganas — Complete Personality Guide</h2>
        <p className="text-muted text-sm leading-relaxed">
          Each Gana carries a unique set of behavioral traits, emotional responses, and life outlooks. Here is a detailed guide to the three astrological temperaments:
        </p>

        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Deva Gana (Divine)</h3>
            <p className="text-muted text-xs font-mono uppercase tracking-wider text-gold/60">
              Nakshatras: Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Individuals born under Deva Gana possess a gentle, cooperative, peace-loving, and predominantly sattvic (pure/harmonious) nature. They value harmony, honesty, and kindness, prioritizing cooperation over competition. Deva Gana people are excellent listeners, supportive team players, and natural peacemakers who avoid conflict whenever possible. They show high levels of patience and adaptability, thriving in environments that reward diplomacy and collaboration.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              In social settings, Deva Gana individuals are soft-spoken, well-behaved, and respected for their moral values. Under pressure, they react with calm contemplation, seeking compromise rather than direct confrontation. However, because they seek peace, they can sometimes struggle to stand up for themselves in highly aggressive situations, requiring them to cultivate healthy boundaries and assertiveness.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Manushya Gana (Human)</h3>
            <p className="text-muted text-xs font-mono uppercase tracking-wider text-gold/60">
              Nakshatras: Bharani, Rohini, Ardra, Purva Phalguni, Uttara Phalguni, Purva Ashadha, Uttara Ashadha, Purva Bhadrapada, Uttara Bhadrapada
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Those born under Manushya Gana exhibit a balanced mixture of divine qualities and intense worldly drives. They represent the practical, goal-oriented, and highly adaptable archetype of human nature. Manushya Gana individuals are family-focused, hardworking, and capable of both deep kindness and firm action. They are the builders, innovators, and real-world achievers of society. While they seek comfort and material stability, they hold a strong sense of moral duty, making them highly balanced and practical in managing relationships and career goals.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Manushya Gana people are highly realistic, adjusting their expectations to fit the situation. In conflicts, they seek practical resolutions that protect their family and interests, maintaining a balance between emotional sensitivity and firm reality. Their adaptability makes them successful in business, management, and family life.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Rakshasa Gana (Intense/Fierce)</h3>
            <p className="text-muted text-xs font-mono uppercase tracking-wider text-gold/60">
              Nakshatras: Krittika, Ashlesha, Magha, Chitra, Vishakha, Jyeshtha, Mula, Dhanishta, Shatabhisha
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Individuals born under Rakshasa Gana are intense, fiercely independent, strong-willed, and direct in their communication. While often misunderstood as difficult or aggressive, they are actually deeply passionate, highly intuitive, and fiercely loyal to those they love. Rakshasa Gana people possess a sharp ability to see through deception, making them natural leaders, investigators, and entrepreneurs. They are not afraid of challenges or breaking conventions, bringing immense willpower and focus to their goals.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              In social settings, Rakshasa Gana individuals value absolute honesty and directness, often despising superficial pleasantries. Under pressure, they react with bold courage, addressing problems directly rather than avoiding them. In relationships, they require honesty, space, and a partner who respects their strength and independent spirit, returning this respect with lifelong protection and loyalty.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Gana Compatibility Table — Complete Marriage Matching Guide */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Gana Compatibility Table — Complete Marriage Matching Guide</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Ashtakoot Kundali Matching, Gana Koota accounts for 6 points. The scoring system is designed to evaluate how well a couple&apos;s fundamental temperaments will blend in day-to-day life:
        </p>

        <div className="overflow-x-auto my-4 border border-border/50 rounded-xl">
          <table className="min-w-full divide-y divide-border/30 bg-surface">
            <thead>
              <tr className="bg-surface2 text-gold font-mono text-xs uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Gana Combination (Boy + Girl)</th>
                <th className="px-6 py-3 text-left">Compatibility Level</th>
                <th className="px-6 py-3 text-left">Score (Max 6)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-muted text-sm">
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Deva + Deva</td>
                <td className="px-6 py-3 text-emerald-400">Excellent (Shared values, high peace)</td>
                <td className="px-6 py-3 font-mono">6 / 6</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Manushya + Manushya</td>
                <td className="px-6 py-3 text-emerald-400">Excellent (Practical, shared goals)</td>
                <td className="px-6 py-3 font-mono">6 / 6</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Rakshasa + Rakshasa</td>
                <td className="px-6 py-3 text-emerald-400">Excellent (Shared intensity, mutual understanding)</td>
                <td className="px-6 py-3 font-mono">6 / 6</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Deva + Manushya / Manushya + Deva</td>
                <td className="px-6 py-3 text-green-400">Good (Idealism complements practicality)</td>
                <td className="px-6 py-3 font-mono">5 / 6</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Manushya + Rakshasa / Rakshasa + Manushya</td>
                <td className="px-6 py-3 text-amber-500">Challenging (Intensity vs practicality)</td>
                <td className="px-6 py-3 font-mono">1 / 6</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Deva + Rakshasa / Rakshasa + Deva</td>
                <td className="px-6 py-3 text-red-400">Most Challenging (Opposite temperaments)</td>
                <td className="px-6 py-3 font-mono">0 / 6</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted text-sm leading-relaxed">
          Same Gana combinations achieve the maximum 6 points because their instinctual wavelengths are in harmony:
        </p>
        <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4 list-disc">
          <li>
            <strong className="text-white">Deva + Deva (6/6):</strong> Highly peaceful, supportive, and spiritually aligned partnership where both value harmony and compromise.
          </li>
          <li>
            <strong className="text-white">Manushya + Manushya (6/6):</strong> Highly practical, family-oriented, and grounded union focused on shared long-term building and stability.
          </li>
          <li>
            <strong className="text-white">Rakshasa + Rakshasa (6/6):</strong> Highly passionate, direct, and deeply understanding partnership where both respect each other&apos;s need for space, independence, and raw honesty.
          </li>
          <li>
            <strong className="text-white">Deva + Manushya (5/6):</strong> A stable and successful combination where Deva&apos;s moral guidance complements Manushya&apos;s practical focus.
          </li>
          <li>
            <strong className="text-white">Manushya + Rakshasa (1/6):</strong> Challenging dynamic where Manushya&apos;s conventional outlook can feel restricted by Rakshasa&apos;s intense, unconventional energy, requiring conscious cooperation.
          </li>
          <li>
            <strong className="text-white">Deva + Rakshasa (0/6):</strong> The most challenging combination. It represents a clash between a peaceful, conflict-avoidant mindset (Deva) and a direct, confrontational style (Rakshasa). If not managed with mutual respect, it can lead to communication gaps. This 0-point result is known as **Gana Dosha**.
          </li>
        </ul>
      </div>

      {/* Section 4: Can Gana Mismatch Be Overcome? */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Can Gana Mismatch Be Overcome?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Absolutely. In Vedic astrology, no single compatibility factor acts as an absolute deal-breaker. A Gana mismatch or Gana Dosha (0 out of 6 points) can be neutralized or mitigated by several other positive factors in the charts:
        </p>
        <ul className="text-muted text-sm leading-relaxed space-y-3 ml-4 list-disc">
          <li>
            <strong className="text-white">High Overall Score:</strong> If the overall Ashtakoot match score is above 25 points, the relationship possesses a strong foundation that easily overrides a single low score.
          </li>
          <li>
            <strong className="text-white">Strong Graha Maitri:</strong> A perfect 5/5 score in Graha Maitri (friendship of the Moon sign lords) indicates excellent mental compatibility and shared values, neutralizing Gana friction.
          </li>
          <li>
            <strong className="text-white">Same Rashi Lord or Nakshatra Lord:</strong> If the partners share the same ruling planet for their Moon sign or Nakshatra, their core motivations align, reducing conflict.
          </li>
          <li>
            <strong className="text-white">Well-Placed Jupiter:</strong> A strong, well-placed Jupiter in both charts acts as a natural protector, bringing wisdom, patience, and mutual respect.
          </li>
        </ul>
        <p className="text-muted text-sm leading-relaxed">
          Furthermore, classical texts list several specific cancellation conditions (exceptions) where Gana Dosha is considered cancelled or rendered ineffective:
          <br />
          1. **Friendship of Rashi Lords:** If the Moon sign lords of both partners are mutual friends or the same planet, the Gana Dosha is cancelled.
          <br />
          2. **Trine or Quadrant Moon Positions:** If the Moon signs of both partners are in a trine (5th/9th) or quadrant (4th/10th) relationship with each other, the temperament clash is neutralized.
          <br />
          3. **Excellent Nadi Matching:** If the Nadi match is perfect (scoring 8/8) and there is no Nadi Dosha, the Gana mismatch is considered managed.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Practical remedies for navigating Gana mismatch include performing regular Jupiter prayers, strengthening your chart&apos;s benefic planets, and practicing mindful communication. To check your complete compatibility profile, use our advanced <Link href="/kundali-matching" className="text-gold underline hover:text-amber transition-colors">Kundali Matching calculator</Link>.
        </p>
      </div>

      {/* Section 5: All 27 Nakshatras with Their Gana */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">All 27 Nakshatras with Their Gana</h2>
        <p className="text-muted text-sm leading-relaxed">
          For quick reference, here is the complete classification of all 27 Nakshatras across the three temperaments:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface border border-border rounded-xl p-4 space-y-2">
            <h4 className="text-gold font-serif text-md border-b border-border/30 pb-2">Deva Gana Nakshatras</h4>
            <ul className="text-muted text-xs space-y-1.5 list-disc ml-4">
              <li>Ashwini</li>
              <li>Mrigashira</li>
              <li>Punarvasu</li>
              <li>Pushya</li>
              <li>Hasta</li>
              <li>Swati</li>
              <li>Anuradha</li>
              <li>Shravana</li>
              <li>Revati</li>
            </ul>
          </div>
          
          <div className="bg-surface border border-border rounded-xl p-4 space-y-2">
            <h4 className="text-gold font-serif text-md border-b border-border/30 pb-2">Manushya Gana Nakshatras</h4>
            <ul className="text-muted text-xs space-y-1.5 list-disc ml-4">
              <li>Bharani</li>
              <li>Rohini</li>
              <li>Ardra</li>
              <li>Purva Phalguni</li>
              <li>Uttara Phalguni</li>
              <li>Purva Ashadha</li>
              <li>Uttara Ashadha</li>
              <li>Purva Bhadrapada</li>
              <li>Uttara Bhadrapada</li>
            </ul>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 space-y-2">
            <h4 className="text-gold font-serif text-md border-b border-border/30 pb-2">Rakshasa Gana Nakshatras</h4>
            <ul className="text-muted text-xs space-y-1.5 list-disc ml-4">
              <li>Krittika</li>
              <li>Ashlesha</li>
              <li>Magha</li>
              <li>Chitra</li>
              <li>Vishakha</li>
              <li>Jyeshtha</li>
              <li>Mula</li>
              <li>Dhanishta</li>
              <li>Shatabhisha</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 6: Gana Beyond Marriage — Personality in Daily Life */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Gana Beyond Marriage — Personality in Daily Life</h2>
        <p className="text-muted text-sm leading-relaxed">
          While Gana is primarily discussed in the context of marriage compatibility, it also influences how you navigate daily life. Your Gana determines your natural approach to conflict resolution, your leadership style, your relationship with authority figures, and your career temperament.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          For instance, a Deva Gana individual will typically seek diplomatic, cooperative solutions to problems, thriving in collaborative environments. A Manushya Gana individual will focus on practical, goal-oriented results, managing projects with structured realism. A Rakshasa Gana individual will show high levels of independence, tackling challenges head-on and bringing innovation and willpower to their work. Understanding your Gana helps you align your natural temperament with your career and personal relationships.
        </p>

        <div className="space-y-4 pt-2">
          <h3 className="text-white font-serif text-lg">Gana and Conflict Resolution Styles</h3>
          <p className="text-muted text-sm leading-relaxed">
            * **Deva Gana:** Responds to arguments by stepping back, cooling down, and seeking mutual understanding. They prefer mediation and find confrontation draining, occasionally accommodating too much to preserve peace.
            <br />
            * **Manushya Gana:** Views arguments as practical problems to solve. They negotiate based on realistic outcomes and logical compromises, aiming to protect stability and family interests.
            <br />
            * **Rakshasa Gana:** Addresses conflicts directly and immediately. They value transparency and raw truth, preferring a direct argument over passive-aggressive silence. Under pressure, they stand firm, expecting absolute honesty from others.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-white font-serif text-lg">Gana and Career Temperaments</h3>
          <p className="text-muted text-sm leading-relaxed">
            * **Deva Gana:** Thrives in teaching, counseling, public relations, non-profits, and diplomatic roles where listening, patience, and team alignment are crucial.
            <br />
            * **Manushya Gana:** Succeeds in business, management, finance, real estate, and project coordination, where goal execution, practical administration, and structured growth are rewarded.
            <br />
            * **Rakshasa Gana:** Excels in leadership, entrepreneurship, research, investigation, and crisis management, where bold decision-making, competitive drive, and the ability to break conventions are key assets.
          </p>
        </div>
      </div>

      {/* Section 7: Frequently Asked Questions */}
      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">Is Rakshasa Gana really bad for marriage?</h3>
            <p className="text-muted text-sm leading-relaxed">
              No. Rakshasa Gana is not bad or evil. It represents an intense, independent, and strong-willed personality. In marriage matching, a Rakshasa Gana person is highly compatible with another Rakshasa Gana partner, as they share the same energetic wavelength and respect each other&apos;s need for space and honesty.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">What if both partners are same Gana?</h3>
            <p className="text-muted text-sm leading-relaxed">
              If both partners belong to the same Gana (Deva-Deva, Manushya-Manushya, or Rakshasa-Rakshasa), they achieve the maximum compatibility score of 6 out of 6 points. This indicates that their instinctual temperaments, communication styles, and emotional responses are naturally aligned.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">Can remedies fix Gana mismatch?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Yes. Traditional remedies for Gana mismatch include performing prayers to Lord Jupiter (ruling wisdom and counsel), engaging in charitable acts, and practicing conscious communication. Understanding and respecting each other&apos;s differing temperaments is the most effective practical remedy.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">Is Gana calculated from Sun or Moon?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Gana is calculated solely based on the position of the Moon at the time of your birth, specifically which of the 27 Nakshatras the Moon occupied. The Sun sign or Ascendant sign are not used in calculating your Gana.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">What Gana is considered best?</h3>
            <p className="text-muted text-sm leading-relaxed">
              No Gana is better or worse than the others. They are simply different personality archetypes. Deva Gana represents gentle cooperation, Manushya Gana represents practical structure, and Rakshasa Gana represents intense independent will. Each has unique strengths that contribute to life and relationships.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">How important is Gana vs other Ashtakoota factors?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Gana Koota carries 6 points out of the total 36. It is highly important for temperament matching, but other factors like Nadi (8 points for health and progeny) and Bhakoot (7 points for emotional and financial compatibility) are weighted higher. The overall score and chart strengths are what matter most.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-surface2 border border-gold/20 rounded-2xl p-6 text-center space-y-4">
        <p className="text-muted text-sm leading-relaxed">
          Ready to find your Gana? Use AstroWord&apos;s free calculator above to instantly find your Deva, Manushya, or Rakshasa group. For complete compatibility and spousal analysis, try our <Link href="/kundali-matching" className="text-gold underline hover:text-amber font-medium transition-colors">Kundali Matching calculator</Link> and discover your partner&apos;s characteristics.
        </p>
      </div>

    </div>
  );
}
