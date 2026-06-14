import re

path = "frontend/src/app/blog/[slug]/page.tsx"
with open(path, 'r') as f:
    content = f.read()

def replace_article(text, slug, new_title, new_desc, new_content, new_faqs):
    slug_marker = f"'{slug}'"
    slug_pos = text.find(slug_marker)
    if slug_pos == -1:
        print(f"ERROR: {slug} not found")
        return text

    # Replace title
    title_pattern = re.compile(r"('" + slug + r"':\s*\{[^}]*?title:\s*)(\"[^\"]*\"|'[^']*')", re.DOTALL)
    text = title_pattern.sub(lambda m: m.group(1) + f'"{new_title}"', text, count=1)

    # Replace description
    desc_pattern = re.compile(r"('" + slug + r"':\s*\{.*?description:\s*)(\"[^\"]*\"|'[^']*')", re.DOTALL)
    text = desc_pattern.sub(lambda m: m.group(1) + f'"{new_desc}"', text, count=1)

    # Replace content block using paren matching
    slug_pos2 = text.find(f"'{slug}'")
    content_label = 'content: ('
    c_start = text.find(content_label, slug_pos2)
    if c_start == -1:
        print(f"ERROR: content block not found for {slug}")
        return text
    paren_start = c_start + len('content: ')
    depth = 0
    i = paren_start
    while i < len(text):
        if text[i] == '(':
            depth += 1
        elif text[i] == ')':
            depth -= 1
            if depth == 0:
                break
        i += 1
    text = text[:c_start] + 'content: (\n' + new_content + '\n    )' + text[i+1:]

    # Replace faqs
    slug_pos3 = text.find(f"'{slug}'")
    faqs_label = 'faqs: ['
    f_start = text.find(faqs_label, slug_pos3)
    if f_start != -1:
        depth = 0
        i = f_start + len('faqs: ')
        while i < len(text):
            if text[i] == '[':
                depth += 1
            elif text[i] == ']':
                depth -= 1
                if depth == 0:
                    break
            i += 1
        text = text[:f_start] + 'faqs: [\n' + new_faqs + '\n    ]' + text[i+1:]
    else:
        # If it doesn't exist, insert before content: (
        slug_pos4 = text.find(f"'{slug}'")
        c_start = text.find('content: (', slug_pos4)
        if c_start != -1:
            text = text[:c_start] + 'faqs: [\n' + new_faqs + '\n    ],\n    ' + text[c_start:]

    print(f"OK: {slug} expanded")
    return text


# ============================================================
# POST 1: sade-sati-guide
# ============================================================
sade_title = "Shani Sade Sati 2026: Saturn in Pisces — 3 Phases, Ashtakavarga & Remedies"
sade_desc = "Complete Sade Sati guide for 2026: which Moon signs are in Saturn grip right now, the 3 phases explained, Jaimini Ashtakavarga intensity method, 2026 retrograde dates, and proven remedies for Saturn in Pisces."

sade_content = """      <>
        <p className="text-lg text-white/80 mb-6">
          Shani Sade Sati is the most discussed transit period in Vedic astrology — a 7.5-year span when Saturn moves through the 12th, 1st, and 2nd houses from your natal Moon sign. In 2026, Saturn continues its journey through Pisces (Meena Rashi), making this one of the most significant Sade Sati periods of the decade for Pisces, Aries, and Aquarius Moon sign natives.
        </p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">What is Shani Sade Sati?</h2>
        <p className="text-white/80 mb-4">
          The word Sade Sati literally means "seven and a half" — referring to the approximately 7.5 years Saturn spends transiting through three consecutive zodiac signs. Since Saturn stays in each sign for roughly 2.5 years, the three-sign journey adds up to 7.5 years of significant karmic activity in your life.
        </p>
        <p className="text-white/80 mb-4">
          Saturn is the planet of karma, discipline, and life lessons. When it transits close to your natal Moon — which represents your mind, emotions, and inner world — the friction creates a period of challenge, transformation, and ultimately, deep spiritual growth. Sade Sati is not a period of pure suffering; it is a period of restructuring. What no longer serves your soul is removed. What needs to be built is tested.
        </p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">Who is in Sade Sati in 2026?</h2>
        <p className="text-white/80 mb-4">
          Saturn remains in Pisces (Meena Rashi) throughout all of 2026, with a retrograde period from June 29 to November 15, 2026. Based on this transit, three Moon signs are currently in active Sade Sati:
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Pisces Moon (Meena Rashi)</strong> — Peak phase (Madhya). Saturn is directly transiting your natal Moon sign. This is the most intense period of Sade Sati, bringing health attention needs, heavy responsibilities, emotional pressure, and profound personal transformation. The key lesson is patience and spiritual surrender.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Aries Moon (Mesha Rashi)</strong> — Rising phase (Aroh). Saturn in your 12th house (Pisces is the 12th from Aries) brings hidden expenditures, foreign connections, sleep disturbances, and subconscious anxieties. This phase marks the beginning of your 7.5-year karmic cycle.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Aquarius Moon (Kumbha Rashi)</strong> — Setting phase (Avaroh). Saturn in your 2nd house (Pisces is the 2nd from Aquarius) tests family relationships, financial discipline, and speech. This is the consolidation phase before relief arrives when Saturn moves to Aries.</span>
          </li>
        </ul>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">The 3 Phases of Sade Sati Explained</h2>
        <p className="text-white/80 mb-4">
          Sade Sati unfolds in three distinct phases, each with different life themes and intensities:
        </p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Phase 1: Rising Phase (Aroh) — Saturn in 12th from Moon</h3>
        <p className="text-white/80 mb-4">
          The first 2.5 years begin when Saturn enters the 12th house from your natal Moon. This phase activates themes of expenses, foreign travel, isolation, sleep issues, spiritual inclination, and subconscious fears surfacing. It is often the least intense of the three phases but signals the beginning of a significant karmic cycle. Many natives experience vivid dreams, increased meditation, or a pull toward spiritual practices during this phase.
        </p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Phase 2: Peak Phase (Madhya) — Saturn conjunct natal Moon</h3>
        <p className="text-white/80 mb-4">
          The central 2.5 years are the most transformative. Saturn directly transits your Moon sign, creating friction between Saturn (karma, discipline, delay) and the Moon (mind, emotions, comfort). Career pressure intensifies, relationships are tested, health requires attention, and the ego undergoes a necessary restructuring. Classical texts consider this the most karmic phase, yet also the most spiritually potent — those who work with Saturn rather than against it emerge fundamentally transformed.
        </p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Phase 3: Setting Phase (Avaroh) — Saturn in 2nd from Moon</h3>
        <p className="text-white/80 mb-4">
          The final 2.5 years bring Saturn to the 2nd house from your Moon, activating themes of family, finances, speech, and accumulated wealth. The intensity begins to reduce, but caution in financial decisions and family communication remains important. As Saturn leaves this house, the full Sade Sati cycle concludes and a significant period of karmic release begins.
        </p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">Jaimini Ashtakavarga: Calculating Your Actual Sade Sati Intensity</h2>
        <p className="text-white/80 mb-4">
          Most Sade Sati guides treat all Moon signs equally — but classical Jaimini astrology offers a more precise tool: Ashtakavarga. The Ashtakavarga score for Saturn in your Moon sign (or the relevant transit house) reveals whether your Sade Sati will be mild, moderate, or intense.
        </p>
        <p className="text-white/80 mb-4">
          Saturn&apos;s Ashtakavarga score in Pisces (the current transit sign) ranges from 0 to 8. A score of 5 or above indicates that Saturn can express constructively in this sign, reducing Sade Sati hardship. A score below 4 indicates greater difficulty. The score is calculated from all 8 planetary positions in your natal chart — making Ashtakavarga a highly personalized tool.
        </p>
        <p className="text-white/80 mb-4">
          Beyond the sign score, your current Mahadasha (planetary period) dramatically modifies Sade Sati effects. A Sade Sati running alongside a Saturn Mahadasha intensifies both; a Venus or Jupiter Mahadasha can significantly soften Saturn transit effects. This is why two people with the same Moon sign experience Sade Sati very differently.
        </p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">2026 Saturn Dates to Know</h2>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Saturn in Pisces all year</strong> — no sign change in 2026. The Sade Sati pattern for Pisces, Aries, and Aquarius Moon signs remains stable throughout the year.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Saturn Retrograde: June 29 to November 15, 2026</strong> — during retrograde, Saturn revisits unresolved karma. Delays intensify, past issues resurface, and patience is essential. Avoid major new beginnings during this window.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Saturn Direct: November 15, 2026</strong> — efforts from the retrograde period begin yielding visible results after Saturn goes direct.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Saturn exits Pisces: June 2027</strong> — Sade Sati peak phase for Pisces Moon ends. Aries Moon enters peak phase.</span>
          </li>
        </ul>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">Kantaka Shani and Ashtama Shani (Dhaiya)</h2>
        <p className="text-white/80 mb-4">
          Dhaiya (also called Small Panoti) is a 2.5-year period when Saturn transits the 4th or 8th house from your natal Moon — shorter than Sade Sati but still significant. In 2026, Gemini Moon natives experience Kantaka Shani (Saturn in 10th from Gemini is not the classic Dhaiya, but Saturn in Pisces is the 10th from Gemini — affecting career directly), while Leo Moon natives experience Ashtama Shani (Saturn in 8th from Leo — unexpected obstacles and health matters).
        </p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">Remedies for Sade Sati 2026 (Saturn in Pisces)</h2>
        <p className="text-white/80 mb-4">
          Saturn in Pisces, a sign ruled by Jupiter, responds well to devotion, charity, and discipline. The following remedies are particularly aligned with the current transit energy:
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Recite Shani Chalisa or Hanuman Chalisa every Saturday</strong> — both are classical remedies for Saturn affliction. Hanuman (Mars energy) is considered a natural remedy for Saturn difficulties in the Parashari tradition.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Donate on Saturdays</strong> — black sesame seeds (til), mustard oil, dark-colored clothing, and iron objects. Feeding crows (associated with Saturn) is a classical remedy.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Light a sesame oil lamp under a Peepal tree on Saturday evenings</strong> — the Peepal tree is sacred to Saturn in Vedic tradition.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Serve and donate to the elderly and underprivileged</strong> — Saturn governs servants, laborers, and the elderly. Acts of genuine service appease Saturn more effectively than ritualistic remedies alone.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Wear blue sapphire (Neelam) only after consultation</strong> — this powerful Saturn gemstone can help or harm depending on your full birth chart. Never wear it without checking your Lagna and Dasha first.</span>
          </li>
        </ul>

        <p className="text-white/60 text-sm mt-8 border-t border-white/10 pt-4">
          Your Sade Sati experience is ultimately shaped by your complete birth chart — Lagna, active Dasha, and natal Saturn placement all modify these general transit effects significantly. Use the Sade Sati calculator above for a personalized assessment based on your exact birth details.
        </p>
      </>"""

sade_faqs = """      { q: "Which Moon signs are in Sade Sati in 2026?", a: "In 2026, three Moon signs are in active Sade Sati: Pisces (peak phase — most intense), Aries (rising phase — beginning of cycle), and Aquarius (setting phase — approaching end of cycle). Saturn remains in Pisces throughout 2026." },
      { q: "When does Sade Sati end for Pisces Moon in 2026?", a: "Sade Sati peak phase for Pisces Moon ends when Saturn exits Pisces in June 2027. The full Sade Sati cycle (including setting phase in Aries) will conclude around 2029." },
      { q: "What are the Saturn retrograde dates in 2026?", a: "Saturn is retrograde from June 29 to November 15, 2026. During this period, karmic lessons intensify and past issues resurface. Avoid major new beginnings during retrograde." },
      { q: "How is Jaimini Ashtakavarga used to assess Sade Sati intensity?", a: "Ashtakavarga assigns a score of 0-8 to Saturn in each zodiac sign based on your natal chart. A score of 5 or above in Pisces reduces Sade Sati hardship; below 4 indicates greater difficulty. This score is unique to each individual's chart." },
      { q: "Is Sade Sati always negative?", a: "No. Sade Sati is a period of karma completion and restructuring, not pure suffering. Those who work with Saturn — through discipline, service, and spiritual practice — often experience significant achievements and long-lasting growth during this period." },
      { q: "What is the difference between Sade Sati and Dhaiya?", a: "Sade Sati is the 7.5-year period of Saturn transiting the 12th, 1st, and 2nd houses from your Moon sign. Dhaiya (or Kantaka Shani) is the shorter 2.5-year period of Saturn transiting the 4th or 8th house from your Moon — significant but less intense than Sade Sati." }"""


# ============================================================
# POST 2: moon-sign-meaning
# ============================================================
moon_title = "Moon Sign (Rashi) in Vedic Astrology: Meaning, Chandra Lagna & Jaimini System"
moon_desc = "Complete guide to Moon Sign (Janma Rashi) in Vedic astrology: why it matters more than Sun Sign, how it works in the Jaimini system as Chandra Lagna, all 12 Rashis explained, and its role in Dasha calculations."

moon_content = """      <>
        <p className="text-lg text-white/80 mb-6">
          In Vedic astrology, the Moon Sign — known as Janma Rashi or Chandra Rashi — is considered the primary lens through which your inner world, emotional patterns, and mental tendencies are understood. Unlike Western astrology, which prioritizes the Sun sign, Vedic astrology gives the Moon precedence for all psychological and predictive work.
        </p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">What is Your Moon Sign?</h2>
        <p className="text-white/80 mb-4">
          Your Moon sign is the zodiac constellation (Rashi) in which the Moon was positioned at the exact moment of your birth. The Moon moves through all 12 zodiac signs in approximately 27.3 days, spending roughly 2.25 days in each sign. This rapid movement makes the Moon sign highly personalized — two people born even a day apart may have different Moon signs.
        </p>
        <p className="text-white/80 mb-4">
          To calculate your Moon sign accurately, you need your exact birth date, time, and place of birth. Even a few hours difference can change the Moon sign if it was transitioning between signs around your birth time. This is why birth time accuracy matters significantly more in Vedic astrology than in Western astrology.
        </p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">Why Moon Sign Matters More Than Sun Sign in Vedic Astrology</h2>
        <p className="text-white/80 mb-4">
          Classical Vedic texts including Brihat Parasara Hora Shastra establish the Moon as the primary indicator of the mind (manas), emotions, intuition, and subconscious patterns. All of the following core predictive systems use the Moon sign as their foundation:
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Vimshottari Dasha</strong> — the primary timing system in Vedic astrology is calculated from your natal Moon Nakshatra (the constellation the Moon occupied at birth). The entire sequence of planetary periods is anchored to the Moon.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Gochara (Transit) Predictions</strong> — all planetary transit effects (including Sade Sati, Dhaiya, and Jupiter transit results) are calculated from the Moon sign, not the Lagna or Sun sign.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Ashtakoota Matching</strong> — the 36-point compatibility scoring system used in marriage matching is primarily based on the Moon signs and Nakshatras of both partners.</span>
          </li>
          <li className="flex items-start gap-3 text-white/80">
            <span className="text-gold mt-1">✦</span>
            <span><strong className="text-white">Chandra Kundli</strong> — the birth chart calculated with Moon as the first house (Ascendant) is used alongside the Lagna chart for comprehensive life analysis.</span>
          </li>
        </ul>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">Chandra Lagna: The Jaimini Perspective</h2>
        <p className="text-white/80 mb-4">
          In the Jaimini system of Vedic astrology, the Moon takes on an additional dimension through the concept of Chandra Lagna — the Moon sign functioning as an alternate Ascendant. Jaimini astrology reads the chart simultaneously from three reference points: the natal Lagna (Ascendant), the Chandra Lagna (Moon sign as 1st house), and the Arudha Lagna (the image of the Lagna in the material world).
        </p>
        <p className="text-white/80 mb-4">
          When a planet occupies the same position from both the natal Lagna and Chandra Lagna, its influence is considered doubled in strength — a principle known as Bhavat Bhavam in classical texts. This Jaimini reading technique reveals which life areas are most karmically emphasized in your chart.
        </p>
        <p className="text-white/80 mb-4">
          The Chandra Lagna also interacts directly with the Jaimini Chara Karakas. Your Atmakaraka (soul planet) and Darakaraka (spouse planet), when analyzed from the Chandra Lagna, reveal the emotional and psychological dimensions of your soul purpose and spouse qualities — dimensions that Lagna-only analysis misses.
        </p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">All 12 Moon Signs: Jaimini and Vedic Interpretation</h2>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Aries Moon (Mesha Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Mars. Quick emotional responses, independence, and competitive spirit define this Moon sign. From the Chandra Lagna perspective, Mars ruling the 1st and 8th houses creates a chart where identity and hidden depths are deeply interlinked — karmic transformations are sudden and decisive.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Taurus Moon (Vrishabha Rashi)</h3>
        <p className="text-white/80 mb-4">Moon is exalted in Taurus — this is the most emotionally stable Moon sign placement. Ruled by Venus, it brings comfort-seeking, sensory richness, and loyalty. The Moon reaches its highest dignity here (3 degrees Taurus is the exact exaltation point), making emotional intelligence and material stability natural strengths.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Gemini Moon (Mithuna Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Mercury. Curious, communicative, and intellectually restless. The mind is quick and versatile but can scatter without focus. In the Jaimini system, Mercury as Chandra Lagna lord creates strong connections between the mind and career/communication themes.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Cancer Moon (Karka Rashi)</h3>
        <p className="text-white/80 mb-4">Moon rules Cancer — this is the Moon sign in its own sign, making emotional depth, nurturing instincts, and intuition particularly strong. Highly sensitive to environment and relationships. Jaimini considers the Moon especially powerful here for understanding the mother, home life, and emotional foundations.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Leo Moon (Simha Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Sun. Pride, dignity, creativity, and leadership characterize this Moon sign. The emotional need for recognition and respect is strong. From the Chandra Lagna, the Sun (Lagna lord) creates a powerful connection between self-expression and creative identity.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Virgo Moon (Kanya Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Mercury. Analytical, service-oriented, and detail-focused. The mind processes emotions through analysis rather than feeling directly. In Jaimini, Mercury ruling Chandra Lagna and the 10th house makes career and skill development central life themes.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Libra Moon (Tula Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Venus. Relationship-oriented, aesthetically sensitive, and naturally diplomatic. Emotional balance comes through partnership and harmony. Jaimini reads Venus (Chandra Lagna lord for Libra Moon) as directly connected to spouse qualities and creative expression.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Scorpio Moon (Vrishchika Rashi)</h3>
        <p className="text-white/80 mb-4">Moon is debilitated in Scorpio (exact debilitation at 3 degrees). Intense emotions, psychological depth, and transformative experiences define this placement. The Moon struggles here but this placement often produces extraordinary emotional intelligence and resilience through adversity.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Sagittarius Moon (Dhanu Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Jupiter. Philosophical, optimistic, and freedom-seeking. The mind craves expansion, knowledge, and higher meaning. In Jaimini, Jupiter ruling the Chandra Lagna and 4th house connects emotional security with wisdom and spiritual growth.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Capricorn Moon (Makara Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Saturn. Disciplined, ambitious, and emotionally reserved. Feelings are processed through action and achievement rather than direct expression. Saturn as Chandra Lagna lord in the Jaimini system connects the mind deeply with karma, duty, and long-term results.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Aquarius Moon (Kumbha Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Saturn. Humanitarian, unconventional, and intellectually independent. Emotional connections are formed through shared ideals rather than personal sentiment. Aquarius Moon natives often experience Sade Sati effects deeply due to Saturn ruling their Moon sign.</p>

        <h3 className="text-gold/80 text-xl mt-6 mb-3">Pisces Moon (Meena Rashi)</h3>
        <p className="text-white/80 mb-4">Ruled by Jupiter. Deeply intuitive, empathetic, and spiritually sensitive. The mind naturally absorbs emotional environments, making boundaries important. In Jaimini, Jupiter as Chandra Lagna lord connects emotional life to spiritual purpose and the 10th house of dharma.</p>

        <h2 className="text-gold font-serif text-2xl mt-8 mb-4">Moon Sign and Your Darakaraka Connection</h2>
        <p className="text-white/80 mb-4">
          In Jaimini astrology, your Darakaraka (the planet with the lowest degree in your chart, excluding Rahu and Ketu) represents your destined spouse. When read from your Chandra Lagna, the Darakaraka&apos;s placement reveals the emotional and psychological compatibility dimensions of your marriage — what kind of partner your inner emotional world truly seeks, beyond the surface-level Lagna analysis.
        </p>
        <p className="text-white/80 mb-6">
          To discover your Darakaraka planet and receive a complete AI-powered reading about your future spouse&apos;s nature, appearance, and timing, use the Darakaraka Calculator below.
        </p>
      </>"""

moon_faqs = """      { q: "What is Moon Sign in Vedic astrology?", a: "The Moon sign (Janma Rashi) is the zodiac sign where the Moon was positioned at your exact moment of birth. It represents your mind, emotions, intuition, and subconscious patterns. In Vedic astrology, the Moon sign is used as the primary foundation for Dasha calculations, transit predictions, and marriage compatibility." },
      { q: "How is Moon sign different from Sun sign?", a: "The Sun sign is determined by the date of birth alone and changes monthly. The Moon sign requires exact birth time and place, changes every 2.25 days, and is considered more important in Vedic astrology for psychological and predictive work. The Sun represents the soul; the Moon represents the mind." },
      { q: "What is Chandra Lagna in Jaimini astrology?", a: "Chandra Lagna is the Jaimini technique of reading the birth chart with the Moon sign as the first house (Ascendant). This reveals emotional dimensions of career, relationships, and life purpose that Lagna-only analysis misses. When a planet aspects both Lagna and Chandra Lagna, its influence doubles in strength." },
      { q: "Why is Moon sign used for Sade Sati calculations?", a: "Sade Sati tracks Saturn transiting through the 12th, 1st, and 2nd houses from the natal Moon sign — not the Lagna or Sun sign. This is because the Moon represents the mind, and Saturn in proximity to the natal Moon creates friction between karmic discipline and emotional comfort." },
      { q: "Which Moon sign is most powerful?", a: "The Moon is exalted in Taurus (Vrishabha Rashi), reaching its highest dignity at 3 degrees Taurus. This placement produces the greatest emotional stability and material comfort. The Moon is debilitated in Scorpio (Vrishchika Rashi) at 3 degrees — intense but transformative." }"""


content = replace_article(content, 'sade-sati-guide', sade_title, sade_desc, sade_content, sade_faqs)
content = replace_article(content, 'moon-sign-meaning', moon_title, moon_desc, moon_content, moon_faqs)

with open(path, 'w') as f:
    f.write(content)

print("Done. File written.")
