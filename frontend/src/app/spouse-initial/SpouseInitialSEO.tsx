import Link from 'next/link';

export default function SpouseInitialSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Spouse Name Prediction by Astrology: The Science of Sound</h2>
        <p className="text-muted text-sm leading-relaxed">
          Wondering what your future spouse&apos;s name starts with? This Vedic astrology tool predicts your spouse&apos;s name first letter using your Darakaraka planet and its nakshatra — the most accurate method in the Jaimini system for spouse name prediction. By analyzing your birth chart, we can identify the cosmic frequencies that will be present in your spouse&apos;s name.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          This prediction is based on your <Link href="/darakaraka" className="text-gold/70 hover:text-gold underline underline-offset-2">Darakaraka planet</Link> — the planet with the lowest degree in your birth chart, which represents your spouse in Jaimini astrology.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Understanding Nakshatra Aksharas</h2>
        <p className="text-muted text-sm leading-relaxed">
          Each of the 27 Nakshatras is divided into four quarters (Padas). Each Pada is assigned a specific syllable (Akshara).
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-gold text-xs mt-1 flex-shrink-0">✦</span>
            <p className="text-muted text-sm"><strong className="text-text">Primary Vibrations:</strong> These are the sounds that most closely match the soul frequency of the person you are destined to marry.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-gold text-xs mt-1 flex-shrink-0">✦</span>
            <p className="text-muted text-sm"><strong className="text-text">Cross-Cultural Phonetics:</strong> While these sounds are Sanskrit in origin, they apply globally. For instance, the &apos;Ka&apos; syllable corresponds to names like Kevin, Katherine, or Kabir.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The 27 Nakshatras and Their Aksharas (Sound Syllables)</h2>
        <p className="text-muted text-sm leading-relaxed">
          Each of the 27 nakshatras is associated with 4 sounds (padas). The Darakaraka nakshatra&apos;s pada determines the starting sound of your spouse&apos;s name. This is why two people with the same Darakaraka planet can get different initials — the nakshatra pada adds a second layer of specificity.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Ashwini', sounds: 'Chu, Che, Cho, La' },
            { name: 'Bharani', sounds: 'Li, Lu, Le, Lo' },
            { name: 'Krittika', sounds: 'A, I, U, E' },
            { name: 'Rohini', sounds: 'O, Va, Vi, Vu' },
            { name: 'Mrigashira', sounds: 'Ve, Vo, Ka, Ki' },
            { name: 'Ardra', sounds: 'Ku, Gha, Na, Chha' },
            { name: 'Punarvasu', sounds: 'Ke, Ko, Ha, Hi' },
            { name: 'Pushya', sounds: 'Hu, He, Ho, Da' },
            { name: 'Ashlesha', sounds: 'Di, Du, De, Do' }
          ].map((item) => (
            <div key={item.name} className="bg-surface border border-border rounded-xl p-3">
              <p className="text-white text-sm font-medium mb-1">{item.name}</p>
              <p className="text-muted text-xs leading-relaxed">{item.sounds}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">All 27 Nakshatras and Their Spouse Name Syllables</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic astrology, each of the 27 Nakshatras is associated with specific Sanskrit syllables 
          (aksharas). The nakshatra of your Darakaraka planet determines the starting sound of your 
          spouse&apos;s name. Here is the complete table:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Ashwini', sounds: 'Chu, Che, Cho, La' },
            { name: 'Bharani', sounds: 'Li, Lu, Le, Lo' },
            { name: 'Krittika', sounds: 'A, I, U, E' },
            { name: 'Rohini', sounds: 'O, Va, Vi, Vu' },
            { name: 'Mrigashira', sounds: 'Ve, Vo, Ka, Ki' },
            { name: 'Ardra', sounds: 'Ku, Gha, Na, Chha' },
            { name: 'Punarvasu', sounds: 'Ke, Ko, Ha, Hi' },
            { name: 'Pushya', sounds: 'Hu, He, Ho, Da' },
            { name: 'Ashlesha', sounds: 'Di, Du, De, Do' },
            { name: 'Magha', sounds: 'Ma, Mi, Mu, Me' },
            { name: 'Purva Phalguni', sounds: 'Mo, Ta, Ti, Tu' },
            { name: 'Uttara Phalguni', sounds: 'Te, To, Pa, Pi' },
            { name: 'Hasta', sounds: 'Pu, Sha, Na, Tha' },
            { name: 'Chitra', sounds: 'Pe, Po, Ra, Ri' },
            { name: 'Swati', sounds: 'Ru, Re, Ro, Ta' },
            { name: 'Vishakha', sounds: 'Ti, Tu, Te, To' },
            { name: 'Anuradha', sounds: 'Na, Ni, Nu, Ne' },
            { name: 'Jyeshtha', sounds: 'No, Ya, Yi, Yu' },
            { name: 'Mula', sounds: 'Ye, Yo, Ba, Bi' },
            { name: 'Purva Ashadha', sounds: 'Bu, Dha, Bha, Dha' },
            { name: 'Uttara Ashadha', sounds: 'Be, Bo, Ja, Ji' },
            { name: 'Shravana', sounds: 'Ju/Khi, Je/Khu, Jo/Khe, Gha/Kho' },
            { name: 'Dhanishtha', sounds: 'Ga, Gi, Gu, Ge' },
            { name: 'Shatabhisha', sounds: 'Go, Sa, Si, Su' },
            { name: 'Purva Bhadrapada', sounds: 'Se, So, Da, Di' },
            { name: 'Uttara Bhadrapada', sounds: 'Du, Tha, Jha, Da' },
            { name: 'Revati', sounds: 'De, Do, Cha, Chi' }
          ].map((item) => (
            <div key={item.name} className="bg-surface border border-border rounded-xl p-3">
              <p className="text-white text-sm font-medium mb-1">{item.name}</p>
              <p className="text-muted text-xs leading-relaxed">{item.sounds}</p>
            </div>
          ))}
        </div>
        <p className="text-muted text-sm leading-relaxed">
          Your specific Pada (quarter) within the nakshatra determines which of the 4 syllables 
          applies. AstroWord&apos;s calculator automatically identifies your Darakaraka nakshatra and pada 
          to give you the most precise prediction.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How Accurate is Spouse Name Prediction?</h2>
        <p className="text-muted text-sm leading-relaxed">
          The Nakshatra Akshara method is one of the oldest techniques in Jaimini astrology for spouse name prediction. Its accuracy depends on: correct birth time (even 4 minutes changes the nakshatra pada), whether the spouse goes by their given name or a nickname, and which name the spouse is primarily known by — first name, middle name, or family name. Most practitioners report 60-75% accuracy when birth time is precise to within 5 minutes.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Spouse Name Prediction Across Different Traditions</h2>
        <p className="text-muted text-sm leading-relaxed">
          Different regional traditions in India use slightly different nakshatra-to-syllable mappings, particularly for South Indian and North Indian naming conventions. AstroWord uses the classical North Indian mapping which is most widely documented in Jaimini texts. The prediction gives the most likely starting sound — often matching the first letter of the first name, though in some cases it matches the family name or a commonly used nickname.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Spouse Name Prediction by Vedic Astrology — How Accurate Is It?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Spouse name prediction using Vedic astrology is based on the Nakshatra Akshara system — one 
          of the oldest predictive techniques in Jaimini astrology. Your Darakaraka planet&apos;s nakshatra 
          determines the phonetic sounds (aksharas) associated with your spouse&apos;s name. This method 
          has been used by Jyotishis for centuries to identify the starting syllable of a future 
          spouse&apos;s name before marriage.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          The accuracy of spouse name prediction depends on three factors: the precision of your birth 
          time (even 4 minutes changes the nakshatra pada), whether your spouse uses their given name or a 
          nickname, and which name they are primarily known by. When birth time is accurate to within 5 
          minutes, most practitioners report 65-75% accuracy for the first letter of the spouse&apos;s 
          primary name.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Methods of Spouse Name Prediction in Astrology</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Nakshatra Akshara Method (Jaimini)",
              desc: "Most specific — uses Darakaraka nakshatra pada to identify exact syllables. AstroWord uses this method."
            },
            {
              title: "7th House Lord Nakshatra",
              desc: "Traditional Parashari method — find 7th house lord's nakshatra for name syllables."
            },
            {
              title: "Navamsa 7th Lord",
              desc: "Check 7th lord in D9 Navamsa chart — its nakshatra gives alternate name syllables."
            },
            {
              title: "Venus Nakshatra",
              desc: "Venus as natural spouse karaka — its nakshatra pada gives additional clues about spouse name initial."
            }
          ].map((method) => (
            <div key={method.title} className="bg-surface border border-border rounded-xl p-4 space-y-2">
              <h3 className="text-white text-base font-medium">{method.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{method.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Spouse Name Prediction — FAQ</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { q: 'How does spouse name prediction work when it shows multiple possible initials?', a: 'Your chart has multiple marriage indicators—the 7th lord, the Darakaraka, and Venus. In most cases, these planets occupy different Nakshatras. If two or more point to the same sound, that initial is extremely likely.' },
            { q: 'When you predict my spouse\'s name, is the initial for the first name or surname?', a: 'In Vedic tradition, this calculation refers to the "calling name" or the first name, as that is the vibration the individual responds to most frequently.' },
            { q: 'What if the initial doesn\'t match my current partner?', a: 'Astrology shows potential and destiny. If you are in a relationship that doesn\'t match the predicted initial, look at the qualities of the planet. Often, the partner will embody the energy of the predicted planet even if the name initial differs.' },
            { q: 'What if my spouse\'s name doesn\'t start with the predicted letter?', a: 'This can happen for several reasons: slightly imprecise birth time shifting the nakshatra pada, the spouse using a nickname or middle name, or regional variations in nakshatra syllable mapping. The prediction indicates the most likely sound — treat it as a strong clue, not an absolute certainty. Pair it with your full Darakaraka reading for the most complete picture.' },
            { q: 'Does spouse name prediction work for second marriages?', a: 'In classical Jaimini astrology, the Darakaraka represents the primary spouse significator. For second marriages, some practitioners look at the Upapada Lagna and its lord for additional layers. AstroWord\'s prediction focuses on the primary spouse indication from the Darakaraka nakshatra.' }
          ].map((item) => (
            <div key={item.q} className="bg-surface/40 border border-border/50 rounded-2xl p-5 space-y-2">
              <h4 className="text-gold font-serif text-base">{item.q}</h4>
              <p className="text-muted text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
