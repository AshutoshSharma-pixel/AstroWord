'use client'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import MarriageReportPreview from '@/components/MarriageReportPreview';
import { cleanReading } from '@/utils/cleanReading';
import { API_URL } from '@/utils/api';
import ShareCard from '@/components/ShareCard';
import TopToolsStrip from '@/components/TopToolsStrip';

export default function BirthTithiPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [reading, setReading] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const streamBufferRef = useRef('');
  const chunkQueueRef = useRef<string[]>([]);
  const isAnimatingRef = useRef(false);

  const taglines = [
    "Calculating the Sun-Moon angle at your birth...",
    "Finding your lunar day...",
    "Identifying your Tithi and Paksha...",
    "Connecting with your Tithi's ruling planet...",
    "Writing your personalised Tithi reading..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFormSubmit = async (chart: any) => {
    setChartData(chart);
    await fetchTithi(chart);
  };

  const fetchTithi = async (chart: any) => {
    setIsLoading(true);
    setResult(null);
    setReading('');
    streamBufferRef.current = '';
    chunkQueueRef.current = [];
    isAnimatingRef.current = false;
    
    try {
      const idToken = user ? await user.getIdToken() : null;
      const response = await fetch(`${API_URL}/api/tithi/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify({ user_id: user?.uid || null, chart_data: chart })
      });
      
      if (!response.ok) throw new Error('Failed to fetch');
      
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      
      const processQueue = () => {
        if (isAnimatingRef.current) return;
        if (chunkQueueRef.current.length === 0) {
          isAnimatingRef.current = false;
          return;
        }
        isAnimatingRef.current = true;
        const chunk = chunkQueueRef.current.shift()!;
        const chars = chunk.split('');
        let i = 0;
        const tick = () => {
          if (i >= chars.length) {
            isAnimatingRef.current = false;
            processQueue();
            return;
          }
          streamBufferRef.current += chars.slice(i, i + 3).join('');
          setReading(streamBufferRef.current);
          i += 3;
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;
          try {
            const parsed = JSON.parse(jsonStr);
            if (parsed.type === 'meta') {
              setResult(parsed);
              setIsLoading(false);
              setIsStreaming(true);
            }
            if (parsed.type === 'chunk') {
              chunkQueueRef.current.push(parsed.text);
              processQueue();
            }
            if (parsed.type === 'done') {
              setIsStreaming(false);
            }
            if (parsed.type === 'error') {
              throw new Error(parsed.message);
            }
          } catch {}
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const suggestedQuestions = result ? [
    `What does my ${result.tithi_name} Tithi reveal about my marriage timing?`,
    `How does ${result.paksha} birth affect my career and success?`,
    `What spiritual practices are most powerful for someone born on ${result.tithi_name}?`,
    `How does my Moon in ${result.moon_sign} modify my Tithi energy?`,
    `What remedies are recommended for ${result.tithi_name} Tithi natives?`
  ] : [];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center pt-24 px-4 sm:px-6 relative">
      <TopToolsStrip currentTool="birth-tithi-calculator" />

      {error && (
        <div className="max-w-2xl w-full mx-auto p-4 mb-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
          {error}
        </div>
      )}

      {!chartData && !isLoading && !result && (
        <>
          <WelcomeScreen onComplete={handleFormSubmit} />
          <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4 mt-8">
            <h1 className="text-gold font-serif text-3xl">Birth Tithi Calculator — Find Your Janma Tithi</h1>
            <p className="text-muted text-sm leading-relaxed">Enter your birth details above to calculate your Janma Tithi — the sacred lunar day of your birth. Discover your Tithi, Paksha, ruling planet, and receive an AI-powered personalised reading based on your actual birth chart. Powered by Swiss Ephemeris with Lahiri Ayanamsa.</p>
          </div>
        </>
      )}

      {isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto min-h-[50vh]">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-8">
            <div className="absolute inset-0 border-2 border-gold/20 rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-2 border-2 border-dashed border-gold/40 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl">🌙</div>
          </div>
          <p className="text-gold font-serif text-lg sm:text-xl text-center px-4 animate-pulse">
            {taglines[taglineIndex]}
          </p>
        </div>
      )}

      {result && (
        <div className="max-w-2xl w-full mx-auto space-y-6 pb-24">
          <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-muted text-sm uppercase tracking-widest mb-2">Your Janma Tithi</p>
            <h1 className="text-gold font-serif text-5xl sm:text-6xl tracking-wide py-2">
              {result.tithi_name}
            </h1>
            <p className="text-muted text-sm mt-1">{result.paksha} · Tithi {result.tithi_number} of 30</p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className="bg-gold/10 border border-gold/20 text-gold text-xs font-mono px-3 py-1.5 rounded-full">
                {result.tithi_category} Tithi
              </span>
              <span className="bg-surface border border-border text-muted text-xs font-mono px-3 py-1.5 rounded-full">
                Ruled by {result.tithi_lord}
              </span>
              <span className="bg-surface border border-border text-muted text-xs font-mono px-3 py-1.5 rounded-full">
                Deity: {result.tithi_deity}
              </span>
              <span className="bg-surface border border-border text-muted text-xs font-mono px-3 py-1.5 rounded-full">
                Moon in {result.moon_sign}
              </span>
            </div>
          </div>

          {(reading || isStreaming) && (
            <div className="bg-surface2 border border-border rounded-2xl p-6 min-h-[200px]">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => <h2 className="text-white font-serif text-xl mt-6 mb-3 first:mt-0">{children}</h2>,
                  p: ({ children }) => <p className="text-muted text-sm leading-relaxed mb-3">{children}</p>,
                  strong: ({ children }) => <strong className="text-text font-medium">{children}</strong>,
                  ul: ({ children }) => <ul className="space-y-1 mb-3">{children}</ul>,
                  li: ({ children }) => <li className="text-muted text-sm leading-relaxed flex gap-2"><span className="text-gold mt-1">✦</span><span>{children}</span></li>,
                }}
              >
                {cleanReading(reading)}
              </ReactMarkdown>
              {isStreaming && <span className="inline-block w-1 h-4 bg-gold animate-pulse ml-1" />}
            </div>
          )}

          {!isStreaming && reading && (
            <>
              <ShareCard
                question="What is my Janma Tithi?"
                answer={`${result.tithi_name} — ${result.paksha}`}
                subtext={`${result.tithi_category} Tithi · Ruled by ${result.tithi_lord} · Moon in ${result.moon_sign}`}
                keywords={['Tithi', result.tithi_name, result.paksha, result.tithi_lord, result.moon_sign]}
              />

              <div className="mt-8">
                <h3 className="text-muted font-serif text-lg mb-4 text-center">Ask more about your Tithi</h3>
                <div className="flex flex-col gap-3">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => router.push(`/?q=${encodeURIComponent(q)}`)}
                      className="bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_15px_rgba(201,168,76,0.1)] rounded-xl p-4 text-left transition-all group flex items-center justify-between"
                    >
                      <span className="text-sm text-white/90 group-hover:text-white pr-4">{q}</span>
                      <span className="text-gold opacity-50 group-hover:opacity-100 flex-shrink-0">→</span>
                    </button>
                  ))}
                </div>
              </div>

              <MarriageReportPreview chartData={chartData} calculatorType="tithi" />
            </>
          )}

          <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
            <div>
              <h2 className="text-gold font-serif text-2xl mb-3">Birth Tithi Calculator — Find Your Janma Tithi</h2>
              <p className="text-muted text-sm leading-relaxed">Your Janma Tithi (जन्म तिथि) is the lunar day on which you were born — one of the five essential elements of the Vedic Panchang alongside Nakshatra, Yoga, Vara, and Karana. Unlike your solar birthday which repeats on the same calendar date each year, your Tithi is determined by the angular relationship between the Sun and Moon at the exact moment of your birth. AstroWord's free Birth Tithi calculator uses Swiss Ephemeris with Lahiri Ayanamsa to calculate your precise Tithi, Paksha, ruling planet, and presiding deity — then generates a personalised AI reading based on your complete birth chart.</p>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl mb-3">The 5 Types of Tithis</h2>
              <div className="space-y-3">
                {[
                  { name: "Nanda Tithi", meaning: "Joyful", tithis: "Pratipada, Shashthi, Ekadashi", desc: "Associated with joy, prosperity, and new beginnings. Favorable for auspicious starts, celebrations, and business ventures." },
                  { name: "Bhadra Tithi", meaning: "Auspicious", tithis: "Dwitiya, Saptami, Dwadashi", desc: "Associated with stability and growth. Favorable for purchases, relationships, and building long-term foundations." },
                  { name: "Jaya Tithi", meaning: "Victorious", tithis: "Tritiya, Ashtami, Trayodashi", desc: "Associated with victory and courage. Favorable for competition, assertive action, and overcoming obstacles." },
                  { name: "Rikta Tithi", meaning: "Releasing", tithis: "Chaturthi, Navami, Chaturdashi", desc: "Associated with releasing and letting go. Powerful for spiritual practice, clearing obstacles, and deep introspection." },
                  { name: "Poorna Tithi", meaning: "Complete", tithis: "Panchami, Dashami, Purnima, Amavasya", desc: "Associated with completeness and fullness. Favorable for spiritual ceremonies, ancestral rites, and major life milestones." },
                ].map((t) => (
                  <div key={t.name} className="p-4 bg-surface2 border border-border/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gold font-mono text-sm">{t.name}</span>
                      <span className="text-muted text-xs">— {t.meaning} · {t.tithis}</span>
                    </div>
                    <p className="text-muted text-xs leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl mb-3">All 30 Tithis — Ruling Planets & Deities</h2>
              <p className="text-muted text-sm leading-relaxed mb-4">Each of the 30 Tithis has a ruling planet (Tithi lord) and a presiding deity that shapes the energy of that lunar day and the personality of those born on it.</p>
              <div className="space-y-2">
                {[
                  { n: "Pratipada", lord: "Sun", deity: "Brahma", cat: "Nanda", paksha: "Shukla" },
                  { n: "Dwitiya", lord: "Moon", deity: "Shri Hari", cat: "Bhadra", paksha: "Shukla" },
                  { n: "Tritiya", lord: "Mars", deity: "Vishnu", cat: "Jaya", paksha: "Shukla" },
                  { n: "Chaturthi", lord: "Mercury", deity: "Yama", cat: "Rikta", paksha: "Shukla" },
                  { n: "Panchami", lord: "Jupiter", deity: "Chandra", cat: "Poorna", paksha: "Shukla" },
                  { n: "Shashthi", lord: "Venus", deity: "Agni", cat: "Nanda", paksha: "Shukla" },
                  { n: "Saptami", lord: "Saturn", deity: "Indra", cat: "Bhadra", paksha: "Shukla" },
                  { n: "Ashtami", lord: "Rahu", deity: "Vasus", cat: "Jaya", paksha: "Shukla" },
                  { n: "Navami", lord: "Sun", deity: "Naga", cat: "Rikta", paksha: "Shukla" },
                  { n: "Dashami", lord: "Moon", deity: "Aryaman", cat: "Poorna", paksha: "Shukla" },
                  { n: "Ekadashi", lord: "Mars", deity: "Rudra", cat: "Nanda", paksha: "Shukla" },
                  { n: "Dwadashi", lord: "Mercury", deity: "Aditya", cat: "Bhadra", paksha: "Shukla" },
                  { n: "Trayodashi", lord: "Jupiter", deity: "Bhaga", cat: "Jaya", paksha: "Shukla" },
                  { n: "Chaturdashi", lord: "Venus", deity: "Kali", cat: "Rikta", paksha: "Shukla" },
                  { n: "Purnima", lord: "Moon", deity: "Vishnu", cat: "Poorna", paksha: "Shukla" },
                  { n: "Pratipada", lord: "Sun", deity: "Brahma", cat: "Nanda", paksha: "Krishna" },
                  { n: "Dwitiya", lord: "Moon", deity: "Shri Hari", cat: "Bhadra", paksha: "Krishna" },
                  { n: "Tritiya", lord: "Mars", deity: "Vishnu", cat: "Jaya", paksha: "Krishna" },
                  { n: "Chaturthi", lord: "Mercury", deity: "Yama", cat: "Rikta", paksha: "Krishna" },
                  { n: "Panchami", lord: "Jupiter", deity: "Chandra", cat: "Poorna", paksha: "Krishna" },
                  { n: "Shashthi", lord: "Venus", deity: "Agni", cat: "Nanda", paksha: "Krishna" },
                  { n: "Saptami", lord: "Saturn", deity: "Indra", cat: "Bhadra", paksha: "Krishna" },
                  { n: "Ashtami", lord: "Rahu", deity: "Vasus", cat: "Jaya", paksha: "Krishna" },
                  { n: "Navami", lord: "Sun", deity: "Naga", cat: "Rikta", paksha: "Krishna" },
                  { n: "Dashami", lord: "Moon", deity: "Aryaman", cat: "Poorna", paksha: "Krishna" },
                  { n: "Ekadashi", lord: "Mars", deity: "Rudra", cat: "Nanda", paksha: "Krishna" },
                  { n: "Dwadashi", lord: "Mercury", deity: "Aditya", cat: "Bhadra", paksha: "Krishna" },
                  { n: "Trayodashi", lord: "Jupiter", deity: "Bhaga", cat: "Jaya", paksha: "Krishna" },
                  { n: "Chaturdashi", lord: "Venus", deity: "Kali", cat: "Rikta", paksha: "Krishna" },
                  { n: "Amavasya", lord: "Saturn", deity: "Vishnu", cat: "Poorna", paksha: "Krishna" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-surface2 border border-border/50 rounded-xl text-xs">
                    <span className="text-white font-mono w-28">{t.n}</span>
                    <span className="text-muted w-20">{t.paksha}</span>
                    <span className="text-gold w-20">{t.lord}</span>
                    <span className="text-muted w-24">{t.deity}</span>
                    <span className="text-muted">{t.cat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl mb-3">Shukla Paksha vs Krishna Paksha — What Your Birth Phase Means</h2>
              <p className="text-muted text-sm leading-relaxed mb-3">Paksha refers to the lunar fortnight — the phase of the moon at birth. This is one of the most important yet overlooked factors in birth chart analysis.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-surface2 border border-gold/20 rounded-xl">
                  <h3 className="text-gold font-serif text-lg mb-2">Shukla Paksha ☽</h3>
                  <p className="text-muted text-xs leading-relaxed">Born during the waxing moon (New Moon to Full Moon). Shukla Paksha births carry outward, expansive, building energy. These individuals tend to be expressive, action-oriented, and naturally oriented toward manifestation and external achievement. The growing light of the moon supports visibility, social connection, and worldly success.</p>
                </div>
                <div className="p-4 bg-surface2 border border-border rounded-xl">
                  <h3 className="text-white font-serif text-lg mb-2">Krishna Paksha 🌑</h3>
                  <p className="text-muted text-xs leading-relaxed">Born during the waning moon (Full Moon to New Moon). Krishna Paksha births carry inward, reflective, releasing energy. These individuals tend to be introspective, spiritually inclined, and naturally oriented toward wisdom, depth, and inner growth. The diminishing light supports contemplation, detachment, and spiritual insight.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl mb-3">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: "What is Janma Tithi in Vedic astrology?", a: "Janma Tithi is the lunar day (Tithi) on which you were born, one of the five key elements of Vedic Panchang. It is determined by the angular relationship between the Sun and Moon at the exact time of birth. Each Tithi spans 12 degrees of the Moon's movement relative to the Sun, and there are 30 Tithis in a complete lunar month — 15 in Shukla Paksha (waxing) and 15 in Krishna Paksha (waning). Your Janma Tithi significantly influences personality, emotional patterns, and spiritual tendencies." },
                  { q: "How do I find my birth Tithi?", a: "Enter your date of birth, exact time of birth, and place of birth into AstroWord's free Birth Tithi calculator. The tool uses Swiss Ephemeris to calculate the precise positions of the Sun and Moon at your birth moment, computes their angular difference, and instantly determines your Tithi, Paksha, Tithi category, ruling planet, and presiding deity — along with a personalised AI reading." },
                  { q: "Is Amavasya Tithi birth inauspicious?", a: "No. Amavasya birth is not inauspicious for the individual born on that day. In Vedic tradition, Amavasya carries deep ancestral and spiritual significance. People born on Amavasya often have strong psychic intuition, a deep connection to ancestral wisdom, and natural spiritual gifts. The new moon energy supports introspection, renewal, and inner strength. Many great spiritual figures and mystics have been born on Amavasya." },
                  { q: "What is the most auspicious Tithi to be born on?", a: "In Vedic tradition, Purnima (Full Moon), Ekadashi, and Panchami are considered among the most auspicious Tithis for birth. Purnima is associated with abundance and completeness, Ekadashi with wisdom and spiritual merit, and Panchami with strong moral character. However, every Tithi has its own gifts — even Rikta Tithis (Chaturthi, Navami, Chaturdashi) give deep insight and the ability to transform challenges into wisdom." },
                  { q: "Does birth Tithi affect marriage?", a: "Yes. In Vedic Muhurta astrology, the Janma Tithi is one of the factors considered when calculating marriage timing and compatibility. The Tithi lord's strength and placement in the birth chart, along with the Tithi's category (Nanda, Bhadra, Jaya, Rikta, Poorna), influences relationship tendencies and the timing of significant life events. The annual return of your Janma Tithi is considered an auspicious window for beginning new chapters, including relationships." },
                  { q: "How is AstroWord's Tithi reading different from other calculators?", a: "Most Birth Tithi calculators give you the Tithi name and a generic paragraph about it — the same text for every person born on that Tithi. AstroWord's AI combines your Tithi with your Moon sign, Moon nakshatra, Paksha energy, and current Mahadasha to generate a genuinely personalised reading. Two people born on the same Tithi will receive different readings based on their unique chart configuration. This is the type of nuanced interpretation that a professional Vedic astrologer would provide." },
                ].map((faq, i) => (
                  <div key={i} className="border border-border/50 rounded-xl p-4">
                    <h3 className="text-white text-sm font-medium mb-2">{faq.q}</h3>
                    <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
