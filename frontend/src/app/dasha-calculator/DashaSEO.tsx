import Link from 'next/link';

export default function DashaSEOContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      
      {/* H1 */}
      <div className="space-y-4 text-center">
        <h1 className="text-gold font-serif text-3xl sm:text-4xl leading-tight">
          Vimshottari Dasha Calculator — Find Your Mahadasha & Antardasha
        </h1>
        <p className="text-muted text-xs uppercase tracking-widest font-mono">
          Vedic Astrology Planetary Periods & Timing of Events
        </p>
      </div>

      {/* Section 1: What is Vimshottari Dasha? */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Vimshottari Dasha?</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic astrology (Jyotish), the Vimshottari Dasha is the most widely used and reliable predictive system for timing life events. The term itself is derived from the Sanskrit word &quot;Vimshottari,&quot; which translates to &quot;one hundred and twenty,&quot; representing the ideal 120-year lifespan of a human being in the current age of Kali Yuga. Under this system, this 120-year cycle is divided into nine major planetary periods known as Mahadashas.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Unlike Western astrology, which relies on solar progressions and transits alone, Vedic astrology recognizes that the timing of events is governed by active planetary periods. The starting point of your Vimshottari Dasha timeline is determined by the exact position of the Moon at the time of your birth. The zodiac sign and specific nakshatra (lunar mansion) occupied by the Moon at birth determine which planet rules your first Mahadasha, as well as the balance of time remaining in that period. By mapping this timeline, a professional astrologer can identify the active planetary energies that influence your thoughts, choices, and life events at any given moment.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Understanding the active dasha is crucial because even if a transit appears highly favorable in your chart, it will only manifest if the ruling dasha planet supports that area of life. The dasha acts as the primary environment, while transits represent the daily weather. By aligning your actions with the themes of your active planetary period, you can make more conscious decisions and navigate life&apos;s transitions with greater ease and understanding.
        </p>
      </div>

      {/* Section 2: The 9 Mahadashas — Complete Duration Table */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">The 9 Mahadashas — Complete Duration Table</h2>
        <p className="text-muted text-sm leading-relaxed">
          The Vimshottari Dasha system divides the 120-year life cycle into nine planetary periods, each lasting a fixed number of years. Regardless of which planet rules your first Mahadasha at birth, the sequence of the planetary periods always follows a fixed, unalterable order:
        </p>
        
        <div className="overflow-x-auto my-4 border border-border/50 rounded-xl">
          <table className="min-w-full divide-y divide-border/30 bg-surface">
            <thead>
              <tr className="bg-surface2 text-gold font-mono text-xs uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Planetary Period (Mahadasha)</th>
                <th className="px-6 py-3 text-left">Vedic Ruler</th>
                <th className="px-6 py-3 text-left">Duration (Years)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-muted text-sm">
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Ketu Mahadasha</td>
                <td className="px-6 py-3">South Node</td>
                <td className="px-6 py-3">7 Years</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Venus Mahadasha</td>
                <td className="px-6 py-3">Shukra</td>
                <td className="px-6 py-3">20 Years</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Sun Mahadasha</td>
                <td className="px-6 py-3">Surya</td>
                <td className="px-6 py-3">6 Years</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Moon Mahadasha</td>
                <td className="px-6 py-3">Chandra</td>
                <td className="px-6 py-3">10 Years</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Mars Mahadasha</td>
                <td className="px-6 py-3">Mangal</td>
                <td className="px-6 py-3">7 Years</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Rahu Mahadasha</td>
                <td className="px-6 py-3">North Node</td>
                <td className="px-6 py-3">18 Years</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Jupiter Mahadasha</td>
                <td className="px-6 py-3">Guru</td>
                <td className="px-6 py-3">16 Years</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Saturn Mahadasha</td>
                <td className="px-6 py-3">Shani</td>
                <td className="px-6 py-3">19 Years</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-white">Mercury Mahadasha</td>
                <td className="px-6 py-3">Budha</td>
                <td className="px-6 py-3">17 Years</td>
              </tr>
              <tr className="bg-surface2 font-mono text-gold">
                <td className="px-6 py-3 font-bold" colSpan={2}>Total Life Cycle Duration</td>
                <td className="px-6 py-3 font-bold">120 Years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted text-sm leading-relaxed">
          Your starting Mahadasha is determined by which planet rules the nakshatra (lunar mansion) occupied by the Moon at your birth. For example, if your Moon is in Ashwini Nakshatra, which is ruled by Ketu, you will be born during the Ketu Mahadasha. You will experience a portion of Ketu&apos;s 7-year period, followed by the full 20-year Venus Mahadasha, the 6-year Sun Mahadasha, and so on, continuing down the sequence.
        </p>
      </div>

      {/* Section 3: What Each Mahadasha Brings — Complete Guide */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What Each Mahadasha Brings — Complete Guide</h2>
        <p className="text-muted text-sm leading-relaxed">
          As you transition from one planetary period to another, the focus of your life changes to reflect the occupied house, sign, and aspects of the Dasha lord. Here is an overview of the key themes of each of the nine Mahadashas:
        </p>
        
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Ketu Mahadasha (7 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              Ketu rules spirituality, detachment, and past-life karma. During this 7-year period, you are likely to experience sudden changes, introspection, and mystical or spiritual growth. It is a time for looking inward, releasing material attachments, and resolving past karma. While it can bring feelings of isolation, it offers opportunities for developing intuition, exploring meditation, and self-discovery.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Venus Mahadasha (20 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              Venus rules love, marriage, luxury, comfort, and creative expression. For many, this is one of the most auspicious and pleasant periods, lasting 20 years. It typically brings opportunities for marriage, starting relationships, enjoying material comfort, and acquiring vehicles or property. It is a highly creative phase that supports artistic endeavors, social life, and emotional connection, encouraging you to bring harmony and beauty into your work.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Sun Mahadasha (6 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              The Sun rules career, authority, father, and ego. Lasting only 6 years, it is the shortest Mahadasha in the cycle. This period focuses on establishing your professional status, taking on leadership roles, and building self-confidence. You may work closely with government, public administration, or father figures, achieving recognition for your efforts. It requires maintaining humility and managing ego conflicts to ensure success.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Moon Mahadasha (10 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              The Moon rules emotions, mind, mother, and public connections. During this 10-year period, your focus will center on domestic life, family relations, and emotional security. You may experience changes in location or travel, and your career may involve public relations. It is a productive phase, though emotional sensitivity and mental fluctuations require conscious balance to maintain peace.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Mars Mahadasha (7 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              Mars rules action, energy, property, courage, and competition. Lasting 7 years, this period brings a dynamic drive to build, acquire land, and compete. It is an excellent phase for sports, engineering, manufacturing, and starting new projects. You must manage impatience, anger, and impulsiveness to avoid conflicts, accidents, or strained relationships with siblings, channeling your energy into positive action.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Rahu Mahadasha (18 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              Rahu rules ambition, foreign connections, obsession, and unconventional paths. Lasting 18 years, this period brings major transformations and rapid changes in status. You may explore international opportunities, work in technology, or pursue unique paths. It is a highly ambitious phase, though managing desires, maintaining ethics, and avoiding illusion or confusion is key to sustaining success.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Jupiter Mahadasha (16 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              Jupiter rules wisdom, expansion, prosperity, spirituality, and teaching. Lasting 16 years, this is considered one of the most auspicious and supportive periods. It typically brings professional growth, higher learning, the birth of children, and spiritual expansion. You are likely to act as a counselor, teacher, or advisor, enjoying optimism, wisdom, and a strong sense of purpose.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Saturn Mahadasha (19 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              Saturn rules discipline, patience, hard work, and karma. Lasting 19 years, this period focuses on building stable foundations through persistent effort and facing responsibilities. You may experience delays or structural changes in career. While it requires discipline and patience, it rewards sincere effort with long-lasting success, maturity, and resilience, clearing past karma.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
            <h3 className="text-gold font-serif text-lg">Mercury Mahadasha (17 Years)</h3>
            <p className="text-muted text-sm leading-relaxed">
              Mercury rules intelligence, business, communication, writing, and education. Lasting 17 years, this period emphasizes mental activity, commerce, and analytical work. It is an excellent phase for business expansion, writing, teaching, and learning new skills. You are likely to manage multiple projects, though avoiding mental fatigue and maintaining focus is essential to maximize your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: Antardasha — The Sub-Periods Within Each Mahadasha */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Antardasha — The Sub-Periods Within Each Mahadasha</h2>
        <p className="text-muted text-sm leading-relaxed">
          While the Mahadasha planet establishes the major theme of a life chapter, the sub-period known as the Antardasha (or Bhukti) determines how that theme manifests in your day-to-day life. Each Mahadasha is divided into nine Antardashas, ruled by each of the nine planets in the same fixed sequence. The Antardasha planet modifies the Mahadasha energy, blending the two planetary forces.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Astrologers look for specific combinations that are highly active:
        </p>
        <ul className="text-muted text-sm leading-relaxed space-y-3 ml-4 list-disc">
          <li>
            <strong className="text-white">Venus Mahadasha + Jupiter Antardasha:</strong> One of the most auspicious combinations for marriage, family celebrations, and material success.
          </li>
          <li>
            <strong className="text-white">Saturn Mahadasha + Saturn Antardasha:</strong> Known as the Sade Sati of the Dasha cycle, this transition phase brings significant changes and structural responsibilities. Check our <Link href="/sade-sati" className="text-gold underline hover:text-amber transition-colors">Sade Sati calculator</Link> for transit timing.
          </li>
          <li>
            <strong className="text-white">Jupiter Mahadasha + Venus Antardasha:</strong> Excellent for starting relationships, creative growth, and financial stability.
          </li>
          <li>
            <strong className="text-white">Rahu Mahadasha + Ketu Antardasha:</strong> A phase of intense karmic shifts, where sudden changes can close old doors to prepare you for new growth.
          </li>
        </ul>
      </div>

      {/* Section 5: How Dasha Affects Marriage Timing */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How Dasha Affects Marriage Timing</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Vedic astrology, transits show if an event is possible, but planetary periods determine if it will actually occur. Marriage typically takes place during the planetary periods that have a direct connection to relationships in your birth chart.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          The most common timing indicators include:
        </p>
        <ul className="text-muted text-sm leading-relaxed space-y-3 ml-4 list-disc">
          <li>
            <strong className="text-white">Venus or Jupiter Periods:</strong> Running the Mahadasha or Antardasha of Venus (the natural significator of love and marriage) or Jupiter (ruling expansion and auspicious unions) is a primary timing indicator.
          </li>
          <li>
            <strong className="text-white">7th House Lord Period:</strong> The planetary period of the ruler of your 7th house (the primary house of marriage) often triggers commitment.
          </li>
          <li>
            <strong className="text-white">Darakaraka Period:</strong> In Jaimini astrology, running the period of your <Link href="/darakaraka" className="text-gold underline hover:text-amber transition-colors">Darakaraka planet</Link> is a powerful timing indicator. You can use our <Link href="/kundali-matching" className="text-gold underline hover:text-amber transition-colors">Kundali Matching calculator</Link> to check compatibility details.
          </li>
        </ul>
        <p className="text-muted text-sm leading-relaxed">
          When a favorable dasha runs concurrently with transit Jupiter aspecting your 7th house, the cosmic conditions align to support a successful, stable marriage.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Additionally, you must consider the concept of Dasha Sandhi. This is the transition period between two major Mahadashas—specifically the last few months of an outgoing period and the first few months of the incoming one. In Vedic texts, Dasha Sandhi is compared to a bridge between two worlds: the old habits and structures fade, while new ones have not yet fully stabilized, often bringing unexpected changes or recalibrations in relationships.
        </p>
      </div>

      {/* Section 6: How to Read Your Dasha Accurately */}
      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">How to Read Your Dasha Accurately</h2>
        <p className="text-muted text-sm leading-relaxed">
          To understand how a planetary period will manifest, a simple list of dates is not enough. You must analyze the planet&apos;s strength and placement within your chart:
        </p>
        <ul className="text-muted text-sm leading-relaxed space-y-3 ml-4 list-decimal">
          <li>
            <strong className="text-white">Accurate Birth Time is Critical:</strong> Because the starting dasha is calculated from the exact position of the Moon, a difference of even five minutes in your birth time can shift your Dasha transition dates by weeks.
          </li>
          <li>
            <strong className="text-white">Check the Planet&apos;s Natal Strength:</strong> A planet that is exalted, in its own sign, or placed in a friendly house will bring highly favorable results during its dasha. Conversely, a debilitated planet might require greater effort and patience.
          </li>
          <li>
            <strong className="text-white">Analyze the Navamsa (D9) Placement:</strong> If a planet is well-placed in the D9 chart, it shows that the second half of its dasha will bring inner happiness and stability, transforming early struggles into growth.
          </li>
          <li>
            <strong className="text-white">Verify House Lordships:</strong> The houses ruled by the dasha planet determine which areas of life (such as career, finance, or health) will be active.
          </li>
          <li>
            <strong className="text-white">Review the Nakshatra Lord:</strong> A dasha planet operates through the energy of its Nakshatra lord. For example, if Mars is in a Venus-ruled Nakshatra, its dasha will highlight Venusian themes like relationships, arts, or material comforts.
          </li>
        </ul>
      </div>

      {/* Section 7: Frequently Asked Questions */}
      <div className="space-y-6">
        <h2 className="text-gold font-serif text-2xl text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">How accurate does birth time need to be for Dasha?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Birth time accuracy is essential. Because the starting dasha is calculated from the exact position of the Moon, a difference of even 5 to 10 minutes can shift your Dasha and Antardasha transition dates by weeks. AstroWord uses the precise Swiss Ephemeris library to ensure your calculations are accurate down to the second.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">Can two people have same Mahadasha sequence?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Yes, everyone follows the exact same sequence of the nine planets (Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury). However, because the starting point depends on your Moon&apos;s nakshatra at birth, two people will start at different points in the cycle, making their timing and experience unique.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">What is Pratyantar Dasha?</h3>
            <p className="text-muted text-sm leading-relaxed">
              The Vimshottari Dasha system is divided into five levels of precision. The Mahadasha is the major period, the Antardasha is the sub-period, and the Pratyantar Dasha is the third level (sub-sub-period), which typically lasts from a few days to a few months, showing the weekly focus of your life.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">Which Mahadasha is best for career growth?</h3>
            <p className="text-muted text-sm leading-relaxed">
              The planetary periods of your 10th house lord, 11th house lord, or your Jaimini Amatyakaraka planet are typically the most favorable for career growth. A strong Sun, Jupiter, or Mercury period can also bring promotions, business expansion, and recognition.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">Can bad Mahadasha be predicted and prepared for?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Yes. If a dasha planet is poorly placed or rules challenging houses in your chart, that period may bring obstacles. By identifying these periods in advance, you can prepare mentally and engage in spiritual practices, charity, or lifestyle adjustments to navigate the energy constructively.
            </p>
          </div>

          <div className="border-b border-border/40 pb-5">
            <h3 className="text-white text-sm font-medium mb-2">What is Sookshma Dasha?</h3>
            <p className="text-muted text-sm leading-relaxed">
              Sookshma Dasha is the fourth level of precision in the Vimshottari system, dividing the Pratyantar Dasha into smaller periods that typically last a few hours or days, showing the daily focus and timing of specific, immediate events.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-surface2 border border-gold/20 rounded-2xl p-6 text-center space-y-4">
        <p className="text-muted text-sm leading-relaxed">
          Ready to map your planetary timeline? Use AstroWord&apos;s free calculator above to instantly find your current Mahadasha and Antardasha with an AI-powered personalized reading. For complete compatibility and spousal analysis, try our <Link href="/kundali-matching" className="text-gold underline hover:text-amber font-medium transition-colors">Kundali Matching calculator</Link> and find your spouse significator planet on the <Link href="/darakaraka" className="text-gold underline hover:text-amber font-medium transition-colors">Darakaraka calculator</Link>.
        </p>
      </div>

    </div>
  );
}
