import Link from 'next/link';

export default function ArudhaSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Arudha Lagna in Vedic Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">Arudha Lagna (AL), also known as Maya Lagna, is one of the cornerstone concepts of Jaimini astrology. While your Ascendant (Lagna) reveals your true inner nature — your soul&apos;s character, innate personality, and authentic self — the Arudha Lagna reveals something entirely different: how the external world perceives you.</p>
        <p className="text-muted text-sm leading-relaxed">In Sanskrit, &quot;Maya&quot; means illusion or appearance. The Arudha Lagna is called Maya Lagna because it represents the social projection — the image that others form of you through interaction, observation, and social context. This image may align closely with your true nature, or there may be a significant gap. Understanding this gap is one of the most insightful gifts of Jaimini astrology.</p>
        <p className="text-muted text-sm leading-relaxed">The Arudha Lagna is calculated as the Arudha Pada of the 1st house — a reflection of your Ascendant projected into the social sphere. It is used to analyse career reputation, public standing, social influence, and how you&apos;re received by the world at large.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How Arudha Lagna is Calculated</h2>
        <p className="text-muted text-sm leading-relaxed">The calculation follows four steps:</p>
        <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
          <li>• <span className="text-white">Step 1:</span> Find the lord of your Ascendant sign. If your Ascendant is Leo, the lord is Sun.</li>
          <li>• <span className="text-white">Step 2:</span> Find where that lord is placed in your birth chart. If Sun is in Scorpio, note its sign.</li>
          <li>• <span className="text-white">Step 3:</span> Count signs from your Ascendant to the lord&apos;s sign, inclusive. Leo to Scorpio = Leo→Virgo→Libra→Scorpio = 4 signs.</li>
          <li>• <span className="text-white">Step 4:</span> Project the same count (4 signs) from the lord&apos;s sign. Scorpio→Sagittarius→Capricorn→Aquarius→Pisces = Aquarius. Aquarius is your Arudha Lagna.</li>
        </ul>
        <p className="text-muted text-sm leading-relaxed">Exception: if the result falls on the Ascendant itself or its 7th house, add 10 more signs. This prevents the Arudha from falling back to the original house and neutralising the calculation.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Arudha Lagna and Career Reputation</h2>
        <p className="text-muted text-sm leading-relaxed">Arudha Lagna is one of the strongest indicators in Jaimini astrology for career visibility and public reputation. The sign of your AL describes the domain in which you are most publicly recognised. A Leo AL often creates leaders, performers, or public figures. A Virgo AL creates reputation in technical, medical, or service-oriented fields. A Scorpio AL creates reputation in research, occult, finance, or transformation-related work.</p>
        <p className="text-muted text-sm leading-relaxed">The lord of your Arudha Lagna and its placement reinforce this. If the AL lord is in the 10th house (career), the Kendra of action, your public image directly feeds into professional success. If the AL lord is in the 7th, business partnerships and public dealings are prominent. The 10th from your Arudha Lagna is also significant — it shows where your image takes its most visible, professional form.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Arudha Lagna vs Ascendant: The Gap</h2>
        <p className="text-muted text-sm leading-relaxed">The most profound use of Arudha Lagna is in understanding the gap between your true self and your social image. If your Ascendant and Arudha Lagna are the same sign or very compatible signs, you are someone who comes across as who you truly are — there is little gap between inner and outer. If they are very different or even opposing signs, you may find that people consistently misread you, or that you present a very different face to the world than who you feel you are inside.</p>
        <p className="text-muted text-sm leading-relaxed">This is neither good nor bad — it is simply the nature of your social interaction with the world. Understanding this gap allows you to navigate social expectations more consciously, presenting your Arudha image when appropriate while nurturing your true Ascendant self in private.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">All 12 Arudha Lagna Signs — What Each Means for Your Public Image</h2>
        <p className="text-muted text-sm leading-relaxed">
          The sign of your Arudha Lagna shapes the flavour of your public persona — how strangers perceive you, what reputation you naturally attract, and what social identity feels most authentic to project outward.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { sign: 'Aries AL', meaning: 'Perceived as bold, energetic, and pioneering. Society sees you as someone who acts first and thinks later — a natural initiator and risk-taker. Your public image carries the energy of Mars: competitive, direct, and driven.' },
            { sign: 'Taurus AL', meaning: 'Perceived as stable, wealthy, and refined. Others see you as someone who values quality, comfort, and material success. Your public image carries Venus energy — dependable, aesthetically aware, and worth trusting with resources.' },
            { sign: 'Gemini AL', meaning: 'Perceived as intelligent, communicative, and versatile. Society sees you as a connector — someone who knows everyone and has information on everything. Your image is youthful, curious, and socially agile.' },
            { sign: 'Cancer AL', meaning: 'Perceived as nurturing, approachable, and emotionally safe. Others see you as family-oriented and trustworthy. Your public image carries a warm, protective quality — people feel cared for in your presence.' },
            { sign: 'Leo AL', meaning: 'Perceived as charismatic, authoritative, and naturally prominent. Society sees you as someone of status — a leader, performer, or public figure. Your image commands respect and attention without needing to demand it.' },
            { sign: 'Virgo AL', meaning: 'Perceived as analytical, competent, and detail-oriented. Others see you as someone who gets things right — reliable, methodical, and excellent at their craft. Your public image is built on demonstrated skill rather than charisma.' },
            { sign: 'Libra AL', meaning: 'Perceived as elegant, diplomatic, and socially graceful. Society sees you as a harmoniser — someone who makes every room more pleasant. Your image is aesthetically polished and socially adept, often associated with beauty or fairness.' },
            { sign: 'Scorpio AL', meaning: 'Perceived as intense, magnetic, and somewhat mysterious. Others sense depth and power in you — a person who knows more than they reveal. Your public image carries an aura of transformation and strategic intelligence.' },
            { sign: 'Sagittarius AL', meaning: 'Perceived as optimistic, philosophical, and worldly. Society sees you as someone with broad horizons — a teacher, traveller, or visionary. Your public image carries expansive, inspiring energy that others want to follow.' },
            { sign: 'Capricorn AL', meaning: 'Perceived as professional, disciplined, and achievement-oriented. Others see you as someone who has earned their position through hard work. Your public image grows stronger with age and is associated with institutional authority and long-term success.' },
            { sign: 'Aquarius AL', meaning: 'Perceived as innovative, unconventional, and socially conscious. Society sees you as someone ahead of their time — a reformer, technologist, or humanitarian. Your public image is associated with originality and collective thinking.' },
            { sign: 'Pisces AL', meaning: 'Perceived as spiritual, compassionate, and otherworldly. Others sense something mystical or artistic in you — a healer, creative, or seeker. Your public image carries a gentle, idealistic quality that draws people seeking meaning.' },
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-3">
              <p className="text-white text-sm font-medium mb-1">{item.sign}</p>
              <p className="text-muted text-xs leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The 10th, 2nd and 11th Houses from Arudha Lagna</h2>
        <p className="text-muted text-sm leading-relaxed">
          The Arudha Lagna is not read in isolation — the houses around it reveal different dimensions of your public life. Classical Jaimini texts specify three key derivative houses from the AL that every astrologer checks:
        </p>
        <div className="space-y-3">
          {[
            { house: '10th House from AL — Career and Public Authority', desc: 'The 10th from your Arudha Lagna shows your professional image, career recognition, and the public authority you are perceived to have. Planets placed here directly color how your career is seen by the world. Jupiter in the 10th from AL gives a reputation for wisdom and ethical leadership. Saturn gives a reputation for hard work and seriousness. Sun gives authority and a prominent professional image. This is often more important than the D1 10th house for understanding why certain careers make someone famous rather than just successful.' },
            { house: '2nd House from AL — Wealth Perception', desc: 'The 2nd house from AL shows how your financial status is perceived by others. It is not your actual wealth (that is the D1 2nd house) but rather how wealthy people think you are. A strong 2nd from AL — with Jupiter or Venus — makes you appear prosperous and successful even before you have fully arrived. This is why AL is essential for understanding social mobility, brand perception, and financial reputation.' },
            { house: '11th House from AL — Social Network and Gains', desc: 'The 11th from AL shows the quality and nature of your social network and the gains that flow through public recognition. Strong planets here indicate a large, influential social circle and the ability to monetise your public image. This house is particularly important for entrepreneurs, influencers, and anyone whose income depends on their reputation and network.' },
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-4">
              <p className="text-gold text-sm font-medium mb-2">✦ {item.house}</p>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Arudha Lagna in the Age of Social Media</h2>
        <p className="text-muted text-sm leading-relaxed">
          Arudha Lagna has never been more relevant than it is today. In an era of personal branding, LinkedIn profiles, Instagram personas, and public discourse, the gap between who you truly are (Lagna) and how you are perceived (Arudha Lagna) has become the central challenge of professional life.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Your Arudha Lagna describes your social media presence, your professional reputation on platforms, how colleagues talk about you in rooms you are not in, and what first impression you make on strangers. A Leo Arudha Lagna person naturally attracts attention and tends to build a prominent public profile — even if their inner self (Lagna) is actually introverted or humble. A Virgo Arudha Lagna person is perceived as precise and competent — their professional reputation is built on demonstrated quality rather than personal charisma.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Understanding your AL doesn&apos;t mean becoming the image — it means understanding the gap between your truth and your perception. Some people find their AL uncomfortable or unfamiliar — they don&apos;t recognise themselves in how others describe them. Others find their AL is exactly how they like to be seen. Both experiences are valid, and both are information. Use your AL to consciously shape how you present yourself in public life — rather than letting the projection happen unconsciously.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          For complete Jaimini analysis, use AstroWord&apos;s Arudha Lagna calculator alongside your{' '}
          <Link href="/upapada-lagna" className="text-gold/70 hover:text-gold underline underline-offset-2">Upapada Lagna</Link>
          {' (marriage reality), your '}
          <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Darakaraka</Link>
          {' (spouse significator), and your '}
          <Link href="/raja-yoga" className="text-gold/70 hover:text-gold underline underline-offset-2">Raja Yoga calculator</Link>
          {' — all free on AstroWord.'}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: "What is the difference between Arudha Lagna and Ascendant?", a: "Your Ascendant shows your true inner nature and soul character. Your Arudha Lagna shows how the world perceives you — the social image you project. These can be similar or quite different depending on your chart." },
            { q: "Is Arudha Lagna used for marriage analysis?", a: "Yes. The 7th from Arudha Lagna shows the kind of partner others expect you to be with, or the public perception of your relationships. The Upapada Lagna (Arudha of the 12th house) is the primary Jaimini indicator specifically for marriage." },
            { q: "Which planets strengthen the Arudha Lagna?", a: "Benefic planets (Jupiter, Venus, well-placed Mercury and Moon) in or aspecting the Arudha Lagna generally strengthen the public image and create positive perception. The Arudha lord&apos;s dignity and placement are equally important." },
            { q: "Can Arudha Lagna change over time?", a: "No — the Arudha Lagna is a fixed calculation based on your birth chart and does not change. However, during certain Dasha periods, the Arudha Lagna can become more or less activated, leading to periods of increased visibility or social prominence." },
            { q: "How accurate is AstroWord's Arudha Lagna calculator?", a: "AstroWord uses Swiss Ephemeris with Lahiri ayanamsa and follows classical Jaimini rules for Arudha calculation, including the exception rule for when the result falls on the 1st house or its 7th." },
          ].map((faq, i) => (
            <div key={i} className="border-b border-border/40 pb-5">
              <h3 className="text-white text-sm font-medium mb-2">{faq.q}</h3>
              <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Related Jaimini Astrology Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/upapada-lagna', emoji: '💍', label: 'Upapada Lagna', desc: 'Your Jaimini marriage sign' },
            { href: '/darakaraka', emoji: '💑', label: 'Darakaraka', desc: 'The planet that signifies your spouse' },
            { href: '/atmakaraka', emoji: '☀️', label: 'Atmakaraka', desc: 'Your soul planet and life purpose' },
            { href: '/amatyakaraka', emoji: '💼', label: 'Amatyakaraka', desc: 'Your career and ambition planet' },
          ].map((tool, i) => (
            <Link key={i} href={tool.href} className="bg-surface border border-border hover:border-gold/30 rounded-xl p-4 flex items-start gap-3 transition-all group">
              <span className="text-2xl">{tool.emoji}</span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">{tool.label}</p>
                <p className="text-muted text-xs">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
