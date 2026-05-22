import Link from 'next/link';

export default function DarakarakaSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Darakaraka in Vedic Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Darakaraka is a concept from Jaimini astrology — one of the oldest systems of Vedic astrology.
          The word "Dara" means spouse in Sanskrit. The Darakaraka planet is the planet with the
          lowest degree within its sign among all 7 planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn).
          This planet acts as the significator of your spouse and marriage.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Unlike Parashari astrology which uses the 7th house lord, Jaimini's Chara Karaka system
          uses the Darakaraka to reveal the nature, appearance, profession, and personality of your
          future spouse with remarkable precision.
        </p>
        <p className="text-muted text-sm leading-relaxed mt-3">
          While Darakaraka reveals your spouse, your{' '}
          <Link href="/atmakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Atmakaraka</Link>
          {' '}reveals your soul&apos;s deepest desire, and your{' '}
          <Link href="/amatyakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Amatyakaraka</Link>
          {' '}shows your path to achievement.
        </p>

        <div className="flex flex-col gap-2 mt-4">
          <p className="text-gold/50 text-xs uppercase tracking-wider">
            Also explore
          </p>
          <Link href="/atmakaraka" className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors">
            <span>🔮</span>
            <span>Atmakaraka Calculator — your soul planet, the most powerful in your chart</span>
            <span>→</span>
          </Link>
          <Link href="/amatyakaraka" className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors">
            <span>💼</span>
            <span>Amatyakaraka Calculator — your planet of career and highest achievement</span>
            <span>→</span>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How is Darakaraka Calculated?</h2>
        <p className="text-muted text-sm leading-relaxed">
          To calculate your Darakaraka, take the degrees of all 7 planets (excluding Rahu and Ketu)
          within their respective signs (0° to 30°). The planet with the lowest degree is your
          Darakaraka. AstroWord calculates this automatically from your exact birth data and then
          uses AI to generate a personalized reading about your spouse.
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Darakaraka by Planet</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { planet: 'Sun as Darakaraka', meaning: 'Spouse with authority, government job, strong personality, from a respected family' },
            { planet: 'Moon as Darakaraka', meaning: 'Spouse who is caring, emotional, beautiful, may work in hospitality or healthcare' },
            { planet: 'Mars as Darakaraka', meaning: 'Spouse who is energetic, ambitious, may be in sports, military, engineering or surgery' },
            { planet: 'Mercury as Darakaraka', meaning: 'Spouse who is intelligent, communicative, may work in media, writing, or business' },
            { planet: 'Jupiter as Darakaraka', meaning: 'Spouse who is wise, spiritual, educated, from a traditional or religious family' },
            { planet: 'Venus as Darakaraka', meaning: 'Spouse who is artistic, beautiful, charming, may work in arts, fashion or beauty' },
            { planet: 'Saturn as Darakaraka', meaning: 'Spouse who is mature, hardworking, older or more serious, loyal and disciplined' },
          ].map((item) => (
            <div key={item.planet} className="bg-surface border border-border rounded-xl p-3">
              <p className="text-white text-sm font-medium mb-1">{item.planet}</p>
              <p className="text-muted text-xs leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
