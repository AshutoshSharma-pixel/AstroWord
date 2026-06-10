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
              <p className="text-xs text-text/40 mt-4 pt-4 border-t border-border/30 text-center">
                This reading is for guidance and spiritual purposes only. Please consult 
                qualified professionals for medical, legal, or financial decisions. 
                <a href="/disclaimer" className="underline hover:text-text/60 transition-colors ml-1">
                  Disclaimer
                </a>
              </p>
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

              <div className="bg-gradient-to-br from-indigo-500/15 to-purple-500/5 border border-indigo-400/40 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/5 to-transparent" />
                <div className="relative z-10">
                  <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-1">
                    Relationship Compatibility
                  </p>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Know If You&apos;re Compatible? Try Kundali Matching
                  </h3>
                  <p className="text-sm text-text/70 mb-4">
                    Free 36-point Ashtakoota + Jaimini compatibility analysis. 
                    Premium 30-page AI report at ₹399.
                  </p>
                  <a
                    href="/kundali-matching"
                    className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
                  >
                    Try Free Kundali Matching →
                  </a>
                </div>
              </div>

              <MarriageReportPreview chartData={chartData} calculatorType="tithi" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
