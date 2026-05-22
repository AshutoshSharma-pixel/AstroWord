import Link from 'next/link';

export default function AtmakarakaSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-12 mt-12 border-t border-border/30 pt-12">
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Atmakaraka in Vedic Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Atmakaraka means "soul significator" in Sanskrit (Atma = soul, Karaka = significator). 
          In Jaimini astrology, it is the planet with the highest degree among all 7 planets (excluding Rahu/Ketu in some systems) in your birth chart. 
          It represents your soul's core identity, its deepest desires, and the primary reason for your incarnation.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          The Atmakaraka is often called the "King" of the chart. While your Lagna (Ascendant) 
          describes your physical body and social identity, your Atmakaraka reveals what your soul 
          needs to master to attain peace and liberation (Moksha).
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Atmakaraka by Planet — What Each Planet Means</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { planet: 'Sun as Atmakaraka', meaning: 'Soul driven by recognition, leadership, and self-expression. Life lessons involve ego, authority, and learning to lead without dominating. Career in government, leadership, or medicine fulfils the soul.' },
            { planet: 'Moon as Atmakaraka', meaning: 'Soul driven by emotional connection, nurturing, and belonging. Life lessons involve attachment, letting go, and emotional security. Drawn to healing, caregiving, and community.' },
            { planet: 'Mars as Atmakaraka', meaning: 'Soul driven by courage, action, and protection. Life lessons involve anger, patience, and channeling aggression constructively. Drawn to engineering, military, surgery, or athletics.' },
            { planet: 'Mercury as Atmakaraka', meaning: 'Soul driven by learning, communication, and mastery of knowledge. Life lessons involve focus — tendency to scatter across too many interests. Drawn to writing, teaching, technology.' },
            { planet: 'Jupiter as Atmakaraka', meaning: 'Soul driven by wisdom, dharma, and guiding others. Life lessons involve humility — the teacher must also remain a student. Drawn to teaching, law, spirituality, counselling.' },
            { planet: 'Venus as Atmakaraka', meaning: 'Soul driven by beauty, harmony, and love. Life lessons involve desire and detachment — learning to love without losing self. Drawn to arts, music, fashion, relationships.' },
            { planet: 'Saturn as Atmakaraka', meaning: 'Soul driven by justice, discipline, and service. Life lessons involve patience, delayed gratification, and humility. Often indicates a soul that chose a difficult life for spiritual growth.' },
          ].map((item) => (
            <div key={item.planet} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-white text-sm font-medium mb-1">{item.planet}</p>
              <p className="text-muted text-xs leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Atmakaraka vs Darakaraka — Soul vs Spouse</h2>
        <p className="text-muted text-sm leading-relaxed">
          The Atmakaraka is your soul planet — the highest degree planet, representing your karmic mission this lifetime. The Darakaraka is your spouse planet — the lowest degree planet, representing who you will attract as a partner. Together they tell the story of your soul's journey and the person who will walk it with you.
          When your Darakaraka planet is the same as your partner's Atmakaraka — or vice versa — it indicates a deeply karmic relationship where each person helps the other fulfil their soul's purpose. <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Calculate your Darakaraka here</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How to Use Your Atmakaraka in Daily Life</h2>
        <p className="text-muted text-sm leading-relaxed">
          Your Atmakaraka planet reveals which area of life needs the most attention and growth. Strengthening your Atmakaraka through its natural significations — wearing its gemstone, worshipping its deity, working in its domain — accelerates your spiritual growth and reduces karmic friction. The Atmakaraka's placement in the Navamsa (D9) chart, called the Karakamsa, is one of the most sacred points in Jaimini astrology.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Atmakaraka in the Navamsa Chart</h2>
        <p className="text-muted text-sm leading-relaxed">
          The sign occupied by your Atmakaraka in the D9 Navamsa chart is called the Karakamsa Lagna. The planets placed in or aspecting the Karakamsa give specific predictions about career, spirituality, and life purpose. This is one of the most detailed predictive techniques in classical Jaimini astrology — and AstroWord's AI reads all of these layers together.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl">Atmakaraka Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">How do I find my Atmakaraka planet?</h3>
            <p className="text-muted text-sm leading-relaxed">To find your Atmakaraka, look at the degrees of all seven main planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn). The planet with the highest degree (0° to 30°) is your Atmakaraka. You can use our free Atmakaraka calculator above to get your result instantly.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">What is the difference between Atmakaraka and Amatyakaraka?</h3>
            <p className="text-muted text-sm leading-relaxed">The Atmakaraka is the planet with the highest degree and represents the soul. The Amatyakaraka is the planet with the second-highest degree and represents your career, advisors, and how you achieve your soul's goals in the material world.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">What happens if my Atmakaraka is retrograde?</h3>
            <p className="text-muted text-sm leading-relaxed">A retrograde Atmakaraka suggests deep-seated karmic desires from past lives that are being revisited. It often indicates a very strong, intense soul purpose that requires looking inward rather than outward for fulfillment.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">Is Atmakaraka always the highest degree planet?</h3>
            <p className="text-muted text-sm leading-relaxed">Yes, in the Jaimini 7-Karaka system, the Atmakaraka is always the planet with the highest degree. In the 8-Karaka system, Rahu is also included, but most practitioners prefer the 7-planet system for soul readings.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">Is Atmakaraka the same as Lagna lord?</h3>
            <p className="text-muted text-sm leading-relaxed">No. The Lagna lord is the ruler of your rising sign and represents your physical self and life direction. The Atmakaraka is the planet with the highest degree across all seven planets and represents your soul's karmic mission — a deeper, more spiritual layer of your chart.</p>
          </div>
          <div className="bg-surface2/50 border border-border rounded-xl p-5">
            <h3 className="text-white font-medium mb-2">Which Atmakaraka is most powerful?</h3>
            <p className="text-muted text-sm leading-relaxed">All Atmakarakas are equally significant as they represent the soul's chosen lessons. However, Jupiter and Venus as Atmakaraka are considered particularly auspicious in classical texts as they are natural benefics. Saturn as Atmakaraka often indicates a soul that has chosen significant karmic challenges for accelerated spiritual growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
