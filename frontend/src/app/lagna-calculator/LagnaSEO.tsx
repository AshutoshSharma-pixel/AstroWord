import Link from 'next/link';

export default function LagnaSEOContent() {
  const lagnaSigns = [
    {
      sign: "Aries Lagna (Mesha)",
      desc: "Bold, energetic, competitive, and pioneering. Aries rising individuals typically have a strong, athletic build and an active, direct manner. They are natural leaders who approach challenges with courage and enthusiasm, though they can sometimes act first and think later."
    },
    {
      sign: "Taurus Lagna (Vrishabha)",
      desc: "Stable, patient, practical, and comfort-loving. Taurus rising individuals often possess a solid, sturdy build and a pleasant, calm appearance. They approach life slowly and methodically, building things that are meant to last, and value security and routine."
    },
    {
      sign: "Gemini Lagna (Mithuna)",
      desc: "Curious, communicative, versatile, and highly intellectual. Gemini rising individuals tend to have a slim, agile build and expressive, active eyes. They have a constant need for mental stimulation and variety, excelling in communication and learning."
    },
    {
      sign: "Cancer Lagna (Karka)",
      desc: "Nurturing, intuitive, empathetic, and family-focused. Cancer rising individuals often have a round, gentle face and changeable moods. They approach life with protective care, prioritize domestic harmony, and make their home a true sanctuary."
    },
    {
      sign: "Leo Lagna (Simha)",
      desc: "Confident, charismatic, warm-hearted, and dramatic. Leo rising individuals often have a commanding, regal presence with a prominent head or hair. They possess a natural authority and a desire to be noticed, valued, and respected."
    },
    {
      sign: "Virgo Lagna (Kanya)",
      desc: "Analytical, precise, detail-oriented, and health-focused. Virgo rising individuals usually have a slender build and a sharp, observant look. They are perfectionists who seek order, enjoy helping others in practical ways, and can be highly self-critical."
    },
    {
      sign: "Libra Lagna (Tula)",
      desc: "Diplomatic, charming, artistic, and partnership-oriented. Libra rising individuals frequently have attractive, balanced features and an easygoing, elegant manner. They strive for harmony in all relationships and seek balance in everything they do."
    },
    {
      sign: "Scorpio Lagna (Vrischika)",
      desc: "Intense, magnetic, determined, and deeply private. Scorpio rising individuals are known for a powerful, secretive presence and a penetrating gaze. They approach life with caution and possess a strong inner strength, seeking deep transformation."
    },
    {
      sign: "Sagittarius Lagna (Dhanu)",
      desc: "Philosophical, optimistic, adventurous, and direct. Sagittarius rising individuals often have an athletic, taller build and a cheerful, open expression. They are lifelong seekers of truth, driven by a love for learning, travel, and freedom."
    },
    {
      sign: "Capricorn Lagna (Makara)",
      desc: "Serious, disciplined, ambitious, and practical. Capricorn rising individuals usually have a lean build and a mature, composed presence. They are hardworking and willing to rise slowly and steadily to achieve long-term success."
    },
    {
      sign: "Aquarius Lagna (Kumbha)",
      desc: "Unconventional, intellectual, humanitarian, and friendly. Aquarius rising individuals have a unique, distinctive appearance and an independent mindset. They value group cooperation and progressive ideals, marching to the beat of their own drum."
    },
    {
      sign: "Pisces Lagna (Meena)",
      desc: "Dreamy, empathetic, highly spiritual, and creative. Pisces rising individuals tend to have soft features and deep, soulful eyes. They possess a highly sensitive nature, absorbing the surrounding energies easily, and need quiet time to recharge."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
      
      <div className="space-y-4">
        <h1 className="text-gold font-serif text-3xl">Lagna Calculator — Find Your Vedic Ascendant and Rising Sign</h1>
        <p className="text-muted text-sm leading-relaxed">
          While your Moon Sign reveals your emotions and your Sun Sign represents your ego, your <strong>Lagna</strong> — also known as the <strong>Ascendant</strong> or **Rising Sign** — represents the physical body, the self, and your entire approach to life. It is the zodiac sign that was rising on the eastern horizon at the exact moment and place of your birth. In Vedic astrology (Jyotish), the Lagna forms the first house of your birth chart, defining the entire layout of your houses and planetary placements. Understanding your Lagna is the starting point of any accurate astrological analysis.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">What is Lagna in Vedic Astrology?</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Sanskrit, the word <em>Lagna</em> literally translates to "contact," "clamp," or "intersection." Astrologically, it represents the point where the eastern horizon intersects the ecliptic path. It symbolizes the soul's birth into physical reality. Because the Earth rotates on its axis once every 24 hours, the entire 12-sign zodiac passes through the eastern horizon in a single day. This means the Lagna changes zodiac signs approximately every 2 hours.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          This rapid movement makes the Lagna the most time-sensitive point in your chart. Two people born on the exact same day in the same city will have the same planetary positions, but if they are born three hours apart, their Lagnas will be different. Consequently, their houses will align completely differently — a planet that sits in the career house for one person may sit in the relationship house for another. This is why an accurate birth time is absolutely critical for calculating your Lagna.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Lagna by Sign — Your Rising Sign Personality</h2>
        <p className="text-muted text-sm leading-relaxed">
          Your Rising Sign represents your physical body, overall health, physical appearance, and the initial filter through which you view the world. It is also the first impression you make on other people. Here is a guide to the 12 Lagna signs in Vedic astrology:
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          {lagnaSigns.map((item, index) => (
            <div key={index} className="bg-surface2 border border-border rounded-xl p-5 hover:border-gold/30 transition-all">
              <h3 className="text-white text-base font-semibold mb-2">{item.sign}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Lagna Lord — The Key to Your Life Direction</h2>
        <p className="text-muted text-sm leading-relaxed">
          Each zodiac sign is ruled by a specific planet. The ruling planet of your Lagna is called the <strong>Lagna Lord</strong> (or <em>Lagnesha</em>). In Vedic astrology, the Lagna Lord acts as the prime guardian of your life. The house and sign that your Lagna Lord occupies in your birth chart indicate where your primary focus, life energy, and destiny will unfold.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          For example, if you have a Taurus Lagna, your Lagna Lord is Venus. If Venus is placed in the 10th house (career), your main focus in life will be professional success and public recognition. If Venus is in the 9th house (religion and philosophy), your life will revolve around higher learning, spirituality, and travel. A strong, unafflicted Lagna Lord brings good health, vitality, clarity of purpose, and the strength to overcome life's obstacles.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Lagna and Physical Appearance</h2>
        <p className="text-muted text-sm leading-relaxed">
          In Jyotish, the first house governs the head, physical form, and general appearance. The rising sign itself, along with any planets sitting in the first house or aspecting it, shapes how you look. 
        </p>
        <p className="text-muted text-sm leading-relaxed">
          A Sun-ruled Lagna (Leo) often gives a strong bone structure, thick hair, and a commanding posture. A Saturn-ruled Lagna (Capricorn or Aquarius) tends to give a leaner, taller build, with a serious expression and prominent joints. Planets placed in the first house modify this energy. For example, Jupiter in the first house can make a person taller or give a warm, pleasant face, while Mars in the first house can add a reddish tint to the skin, athletic muscles, or a visible scar.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Lagna vs Arudha Lagna</h2>
        <p className="text-muted text-sm leading-relaxed">
          While the Lagna represents your physical self and your true, internal reality, Jaimini astrology introduces the concept of the <strong>Arudha Lagna</strong>. The Arudha Lagna is the reflection or image of the self. It represents how the external world perceives you, your social status, reputation, and public projection.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Often, there is a gap between who we are (Lagna) and how the world sees us (Arudha Lagna). For example, a person with a weak Lagna lord but a very strong Arudha Lagna might feel insecure internally, yet be perceived as highly successful and powerful by the public. To calculate your public image chart, check out our <Link href="/arudha-lagna" className="text-gold hover:underline">Arudha Lagna Calculator</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Lagna in Vedic astrology?",
              a: "Lagna (also called Ascendant or Rising Sign) is the zodiac sign rising on the eastern horizon at the exact moment and place of your birth. It forms the first house of your birth chart and is considered the most important point in Vedic astrology — more important than the Sun or Moon sign for physical appearance, personality, and overall life direction."
            },
            {
              q: "How often does the Lagna change?",
              a: "The Lagna changes approximately every 2 hours as Earth rotates. This means two people born on the same day but 2 hours apart can have completely different Lagnas. This is why accurate birth time is essential for Lagna calculation — even a 5-minute error can shift the Lagna degree significantly."
            },
            {
              q: "What is the difference between Lagna and Moon Sign?",
              a: "Your Lagna represents your physical body, outer personality, and how you approach life. Your Moon Sign represents your inner emotional world and subconscious mind. In Vedic astrology, both are important — the Lagna shows your external reality, while the Moon Sign shows your internal experience."
            },
            {
              q: "What is Lagna lord and why is it important?",
              a: "The Lagna lord is the ruling planet of your Ascendant sign. Its placement in your birth chart — which house and sign it occupies — tells you where your life's energy and focus is directed. A strong Lagna lord indicates good health, clear purpose, and overall wellbeing."
            },
            {
              q: "Can my Lagna change if my birth time is slightly off?",
              a: "Yes. Because the Lagna shifts by 1 degree roughly every 4 minutes, even a 5-to-10 minute difference in birth time can shift your Lagna, especially if you were born near the boundary of two zodiac signs. Always use the most accurate birth certificate time available."
            },
            {
              q: "What is the difference between Vedic rising sign and Western rising sign?",
              a: "Because Vedic astrology uses the Sidereal zodiac (based on actual star positions) and Western uses the Tropical zodiac (based on seasons), your Vedic rising sign will be approximately 24 degrees behind your Western rising sign. In many cases, this shifts your rising sign back by one full sign."
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
