import Link from 'next/link';

export default function HomeSEOContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 mt-16 border-t border-border/30 pt-12 space-y-16">

      <div className="text-center space-y-4">
        <h1 className="text-gold font-serif text-3xl sm:text-4xl">
          India&apos;s First AI Vedic Astrologer
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-2xl mx-auto">
          AstroWord combines 5000 years of Vedic Jyotish with modern AI to
          give you personalised birth chart readings in seconds. Ask anything
          about career, marriage, relationships, timing of events — based on
          your exact D1 and D9 chart.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl text-center">
          How AstroWord Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '01', title: 'Enter Birth Details', desc: 'Your exact birth date, time, and city. AstroWord calculates your D1 Rashi chart and D9 Navamsa chart instantly.' },
            { step: '02', title: 'AI Reads Your Chart', desc: 'Our AI processes Dasha periods, planetary positions, house lords, and Jaimini karakas to understand your unique chart.' },
            { step: '03', title: 'Ask Anything', desc: 'Career, marriage, timing, relationships — ask in plain language. Get answers grounded in classical Vedic astrology principles.' },
          ].map((item) => (
            <div key={item.step} className="bg-surface2 border border-border rounded-2xl p-5 space-y-2">
              <p className="text-gold font-mono text-xs">{item.step}</p>
              <p className="text-white font-serif text-lg">{item.title}</p>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl text-center">
          Free Vedic Astrology Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/amatyakaraka', title: 'Amatyakaraka Calculator', desc: 'Find your career significator planet and ideal professional path' },
            { href: '/atmakaraka', title: 'Atmakaraka Calculator', desc: 'Discover your soul planet and karmic life purpose' },
            { href: '/darakaraka', title: 'Darakaraka Calculator', desc: 'Reveal your future spouse through Jaimini astrology' },
            { href: '/marriage-year', title: 'Marriage Year Predictor', desc: 'Find your most auspicious marriage windows by Dasha' },
            { href: '/marriage-type', title: 'Love or Arranged Marriage', desc: 'Know what your 5th and 7th house reveal about your union' },
            { href: '/gana', title: 'Gana Calculator', desc: 'Discover if you are Deva, Manushya or Rakshasa Gana' },
            { href: '/spouse-initial', title: 'Spouse Name Initial', desc: 'Find the first letter of your future spouse\'s name' },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href}
              className="bg-surface border border-border hover:border-gold/30 rounded-xl p-4 flex items-start gap-3 group transition-all">
              <span className="text-gold mt-0.5">✦</span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">{tool.title}</p>
                <p className="text-muted text-xs mt-0.5 leading-relaxed">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl text-center">
          Why AstroWord is Different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Not a generic calculator', desc: 'Every other tool gives you a planet name and 3 lines. AstroWord gives you a full personalised reading based on your exact chart.' },
            { title: 'Classical Vedic rules', desc: 'Built on authentic Parashari and Jaimini principles — Chara Karakas, Dasha timing, divisional charts — not simplified Western astrology.' },
            { title: 'D1 + D9 analysis', desc: 'AstroWord reads both your Rashi chart (D1) and Navamsa chart (D9) together — the combination most astrologers consider essential.' },
            { title: 'Ask in plain language', desc: 'No need to know astrology terminology. Ask "will I get a government job?" or "when will I meet my partner?" and get a real answer.' },
          ].map((item) => (
            <div key={item.title} className="bg-surface2 border border-border rounded-xl p-4 space-y-1">
              <p className="text-white text-sm font-medium">✦ {item.title}</p>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {[
            { q: 'Is AstroWord free to use?', a: 'Yes. AstroWord offers 5 free questions per day with full D1 and D9 chart analysis. All 7 calculators are completely free with no login required.' },
            { q: 'How accurate is AI Vedic astrology?', a: 'AstroWord processes classical Jyotish rules, exact planetary degrees, Dasha periods, and divisional charts without human error — giving you mathematically precise Vedic analysis.' },
            { q: 'What is the difference between D1 and D9 chart?', a: 'The D1 (Rashi chart) is your main birth chart showing general life themes. The D9 (Navamsa) is the most important divisional chart, revealing marriage, the second half of life, and your true inner nature.' },
            { q: 'Do I need to know my exact birth time?', a: 'Yes — exact birth time is essential for accurate Vedic astrology. Even a 30-minute difference can change your ascendant, Dasha period, and divisional charts significantly.' },
            { q: 'What can I ask AstroWord?', a: 'Career prospects, marriage timing, spouse nature, love or arranged marriage, business vs job, foreign travel, health, spiritual path, and timing of life events — all based on your birth chart.' },
          ].map((item) => (
            <div key={item.q} className="bg-surface2 border border-border rounded-xl p-4 space-y-2">
              <p className="text-white text-sm font-medium">{item.q}</p>
              <p className="text-muted text-xs leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
