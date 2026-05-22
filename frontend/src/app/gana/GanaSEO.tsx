export default function GanaSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Gana in Vedic Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Gana is a Sanskrit term meaning &quot;group&quot; or &quot;category.&quot; In Vedic astrology, it is one of the 
          crucial factors used in Nakshatra-based personality analysis and marriage matching 
          (Guna Milan). Every person is born into one of three Ganas based on the Nakshatra 
          (lunar mansion) the Moon was in at the time of their birth.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          The three Ganas are Deva (Divine), Manushya (Human), and Rakshasa (Fierce). 
          Each represents a fundamental temperament, set of values, and way of reacting 
          to life&apos;s challenges. In marriage compatibility, Gana matching carries 6 out of 36 points, 
          indicating how well a couple&apos;s temperaments will blend.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The Three Ganas and Their Traits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Deva Gana', traits: 'Kind, spiritual, soft-spoken, and avoids conflict. Highly intuitive.' },
            { name: 'Manushya Gana', traits: 'Ambitious, hard-working, practical, and family-oriented.' },
            { name: 'Rakshasa Gana', traits: 'Intense, independent, strong-willed, and naturally investigative.' },
          ].map((item) => (
            <div key={item.name} className="bg-surface border border-border rounded-xl p-3">
              <p className="text-gold text-sm font-medium mb-1 font-serif">{item.name}</p>
              <p className="text-muted text-xs leading-relaxed">{item.traits}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Gana Compatibility in Marriage — The Full Table</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Kundali matching (Ashtakoot Milan), Gana compatibility contributes 6 points out of 36 total. Same Gana combinations score the maximum 6 points. Here is how each combination scores:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { match: 'Deva + Deva', desc: '6/6 points. Excellent compatibility — shared values, similar temperaments, natural harmony.' },
            { match: 'Manushya + Manushya', desc: '6/6 points. Strong compatibility — both grounded, practical, and family-oriented.' },
            { match: 'Rakshasa + Rakshasa', desc: '6/6 points. Intense but compatible — both understand each other\'s fierce, unconventional nature.' },
            { match: 'Deva + Manushya', desc: '5/6 points. Good compatibility — Deva\'s idealism complements Manushya\'s practicality.' },
            { match: 'Manushya + Rakshasa', desc: '1/6 points. Challenging — Manushya\'s conventional nature clashes with Rakshasa\'s intensity. Requires strong Jupiter in both charts.' },
            { match: 'Deva + Rakshasa', desc: '0/6 points. Most difficult — completely opposite temperaments. Needs exceptional chart strength elsewhere to overcome this difference.' },
          ].map((item) => (
            <div key={item.match} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-white text-sm font-medium mb-1">{item.match}</p>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The 27 Nakshatras and Their Gana</h2>
        <p className="text-muted text-sm leading-relaxed">
          Your Gana is determined by your Moon nakshatra — the star constellation the Moon occupies at your birth. The 27 nakshatras are divided equally: 9 Deva, 9 Manushya, and 9 Rakshasa. Deva nakshatras: Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati. Manushya nakshatras: Bharani, Rohini, Ardra, Purva Phalguni, Uttara Phalguni, Purva Ashadha, Uttara Ashadha, Purva Bhadrapada, Uttara Bhadrapada. Rakshasa nakshatras: Krittika, Ashlesha, Magha, Chitra, Vishakha, Jyeshtha, Mula, Dhanishtha, Shatabhisha.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Is Gana Mismatch a Deal-Breaker?</h2>
        <p className="text-muted text-sm leading-relaxed">
          No. Gana is one of eight compatibility factors (Ashtakoot). A Deva-Rakshasa mismatch scores 0 on Gana but the couple can still have an excellent total score if other factors like Rashi (3 points), Nadi (8 points), and Bhakoot (7 points) are strong. Modern astrologers consider the overall score and the strength of both charts individually — not individual factor scores in isolation.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl">Gana Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">How can I find my Gana?</h3>
            <p className="text-muted text-sm leading-relaxed">Your Gana is determined solely by your Moon Nakshatra. Each of the 27 Nakshatras is assigned to one of the three Ganas. You can use our Gana calculator above to find your Nakshatra and Gana instantly by entering your birth details.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">Can a Deva Gana person marry a Rakshasa Gana person?</h3>
            <p className="text-muted text-sm leading-relaxed">While traditionally considered a &quot;challenging&quot; match in Guna Milan (receiving 0 out of 6 points), it is not a deal-breaker. If other factors like Bhakoot and Nadi are strong, or if the couple is aware of their differing temperaments, the marriage can still be successful.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">Is Rakshasa Gana bad or &quot;evil&quot;?</h3>
            <p className="text-muted text-sm leading-relaxed">Not at all. In modern Vedic astrology, Rakshasa Gana represents someone with high energy, strong willpower, and an ability to see through deception. They make excellent detectives, leaders, and entrepreneurs who aren&apos;t afraid of challenges.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">What is the most compatible Gana match?</h3>
            <p className="text-muted text-sm leading-relaxed">The highest compatibility score (6/6) is achieved when both partners belong to the same Gana (Deva-Deva, Manushya-Manushya, or Rakshasa-Rakshasa). This indicates that their fundamental temperaments are in sync.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">What is the most important factor in Kundali matching?</h3>
            <p className="text-muted text-sm leading-relaxed">Nadi is weighted highest at 8 out of 36 points and is considered most critical for health and progeny. Bhakoot (7 points) governs financial and emotional compatibility. Gana (6 points) governs temperament. A total score above 18 is generally considered acceptable; above 24 is considered good.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">Can Rakshasa Gana people have happy marriages?</h3>
            <p className="text-muted text-sm leading-relaxed">Absolutely. Rakshasa Gana individuals are passionate, intense, and unconventional — not malevolent as the name might suggest. They thrive with partners who match their energy (another Rakshasa) or complement it (strong Mars or Rahu in partner&apos;s chart). Many highly successful people have Rakshasa Gana.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
