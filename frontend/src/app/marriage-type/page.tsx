'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import MarriageReportPreview from '@/components/MarriageReportPreview';
import { motion } from 'framer-motion';
import { cleanReading } from '@/utils/cleanReading';
import { API_URL } from '@/utils/api';
import { handleStreamResponse } from '@/utils/stream';
import ShareCard from '@/components/ShareCard';
import TopToolsStrip from '@/components/TopToolsStrip';
import Link from 'next/link';

const TAGLINES = [
    "Analyzing your 5th and 7th house...",
    "Checking Venus and Rahu placements...",
    "Reading love indicators in your chart...",
    "Consulting the stars about your union...",
    "Your marriage destiny is revealed..."
];

const SUGGESTED_QUESTIONS = [
    "When will I get married?",
    "Will I meet my spouse through friends or family?",
    "What obstacles will I face in marriage?",
    "Is my current relationship leading to marriage?",
    "What does my chart say about my love life?"
];

export default function MarriageTypePage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [chartData, setChartData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Initial load: check auth and local storage
    useEffect(() => {
        if (!authLoading) {
            const savedChart = localStorage.getItem('astroword_chart');
            if (savedChart) {
                try {
                    const parsed = JSON.parse(savedChart);
                    setChartData(parsed);
                    fetchMarriageType(parsed);
                } catch (e) {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        }
    }, [user, authLoading, router]);

    // Tagline cycler
    useEffect(() => {
        if (isLoading && chartData && !result) {
            const interval = setInterval(() => {
                setTaglineIndex(prev => (prev < TAGLINES.length - 1 ? prev + 1 : prev));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading, chartData, result]);

    const fetchMarriageType = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/marriage-type`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    user_id: user?.uid,
                    chart_data: chart
                })
            });

            if (!res.ok) {
                setError('Could not load your marriage type. Please try again.');
                setIsLoading(false);
                return;
            }

            let resultData: any = { reading: '' };

            await handleStreamResponse(
                res,
                (meta) => {
                    resultData = { 
                        ...resultData, 
                        ...meta,
                        result: "Analyzing...",
                        percentage: { love: 50, arranged: 50 },
                        key_indicators: ["Analyzing..."]
                    };
                    setResult({ ...resultData });
                    setIsLoading(false); // Stop loading animation, show the result card
                },
                (chunk) => {
                    resultData.reading += chunk;
                    setResult({ ...resultData });
                },
                (doneData) => {
                    resultData = { 
                        ...resultData, 
                        ...doneData,
                        percentage: {
                            love: doneData.love_percentage || 50,
                            arranged: doneData.arranged_percentage || 50
                        }
                    };
                    setResult({ ...resultData });
                    localStorage.setItem('astroword_chart', JSON.stringify(chart));
                }
            );
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setIsLoading(false);
        }
    };

    const handleSuggestedQuestion = (q: string) => {
        sessionStorage.setItem('pending_question', q);
        router.push('/');
    };

    const handleFormSubmit = (data: any) => {
        setChartData(data);
        fetchMarriageType(data);
    };

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button
                        onClick={() => { setError(null); if (chartData) fetchMarriageType(chartData); }}
                        className="bg-gold/10 border border-gold/20 text-gold px-6 py-2 rounded-xl text-sm hover:bg-gold/20 transition-all"
                    >
                        Try Again
                    </button>
                    <button onClick={() => router.push('/')} className="block text-muted text-sm hover:text-white transition-colors mt-2 mx-auto">
                        ← Back to Chat
                    </button>
                </div>
            </div>
        );
    }

    if (!chartData && !isLoading) {
        return (
            <div className="min-h-[100dvh] bg-bg text-text">
                <WelcomeScreen onComplete={handleFormSubmit} />
                <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
  <div className="space-y-4">
    <h1 className="text-gold font-serif text-3xl">Love or Arranged Marriage? What Your Birth Chart Reveals</h1>
    <p className="text-muted text-sm leading-relaxed">
      Enter your birth details above to find out whether your chart indicates 
      a love marriage or arranged marriage. AI analysis based on your 5th house, 
      7th house, Venus, Rahu, and D9 Navamsa placements.
    </p>
  </div>

  <div className="space-y-4">
    <h2 className="text-gold font-serif text-2xl">Love Marriage Indicators in Vedic Astrology</h2>
    <p className="text-muted text-sm leading-relaxed">
      Vedic astrology identifies love marriage through connections between the 
      5th house (romance), 7th house (marriage), and specific planets — 
      especially Venus, Rahu, and Moon.
    </p>
    <div className="space-y-2">
      {[
        'Rahu in the 7th house or conjunct Venus — strongest love marriage indicator',
        '5th lord and 7th lord connected by conjunction or mutual aspect',
        'Venus in 1st, 5th, 7th, or 11th house with benefic influence',
        'Moon in 5th house or aspecting the 5th lord',
        'Mars and Venus conjunction — passionate love before marriage',
        'Rahu aspecting or conjunct the 5th or 7th lord',
      ].map((item) => (
        <div key={item} className="flex items-start gap-2">
          <span className="text-gold text-xs mt-1 flex-shrink-0">✦</span>
          <p className="text-muted text-sm">{item}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="space-y-4">
    <h2 className="text-gold font-serif text-2xl">Arranged Marriage Indicators in Vedic Astrology</h2>
    <div className="space-y-2">
      {[
        'Jupiter strongly placed in or aspecting the 7th house',
        'Saturn in the 7th house — traditional, duty-based marriage',
        '7th lord in 2nd or 4th house — marriage within family or community',
        'Strong benefic influence on 7th house with no Rahu connection',
        'Venus in traditional signs like Taurus, Cancer, or Capricorn',
        'Moon in Kendra with no malefic connection to 5th house',
      ].map((item) => (
        <div key={item} className="flex items-start gap-2">
          <span className="text-gold text-xs mt-1 flex-shrink-0">✦</span>
          <p className="text-muted text-sm">{item}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="space-y-4">
    <h2 className="text-gold font-serif text-2xl">Love or Arranged Marriage — FAQ</h2>
    <div className="space-y-3">
      {[
        { q: 'Can astrology predict love marriage or arranged marriage with certainty?', a: 'Astrology identifies strong tendencies and planetary yogas that make one type more likely. AstroWord analyses your 5th house, 7th house, Venus, Rahu, and D9 chart together to give you a probability-based reading.' },
        { q: 'What is the strongest indicator of love marriage in astrology?', a: "Rahu's connection to Venus or the 7th house is the strongest single indicator of a love marriage or unconventional relationship in Vedic astrology." },
        { q: 'Can someone have both love and arranged marriage indicators?', a: 'Yes — many charts show mixed signals, which often means a love relationship that eventually gets family approval, or an arranged marriage with a strong romantic connection.' },
        { q: 'Does D9 Navamsa chart show love or arranged marriage?', a: 'Yes. The D9 Navamsa confirms the D1 reading. If Venus is strong and well-placed in both D1 and D9, love marriage is strongly indicated. Rahu in the 7th of D9 is also a strong love marriage signal.' },
        { q: 'What if my chart shows arranged marriage but I want a love marriage?', a: 'Astrology shows tendencies, not fixed outcomes. Free will plays a major role. Many people with arranged marriage indicators still find love — and vice versa. The chart shows the path of least resistance, not the only path.' },
      ].map((item) => (
        <div key={item.q} className="bg-surface2 border border-border rounded-xl p-4 space-y-2">
          <p className="text-white text-sm font-medium">{item.q}</p>
          <p className="text-muted text-xs leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
</div>
            </div>
        );
    }

    if (isLoading || !result) {
        return (
            <div className="min-h-[100dvh] bg-bg text-text flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                    <svg width="700" height="700" viewBox="0 0 700 700" fill="none" style={{ width: 'min(700px, 95vw)', height: 'min(700px, 95vw)' }}>
                        <circle cx="350" cy="350" r="340" stroke="#c9a84c" strokeWidth="0.8" opacity="0.2" />
                        <circle cx="350" cy="350" r="280" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="6 6" opacity="0.15" />
                        <circle cx="350" cy="350" r="220" stroke="#c9a84c" strokeWidth="0.8" opacity="0.18" />
                        <circle cx="350" cy="350" r="160" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.12" />
                        <circle cx="350" cy="350" r="100" stroke="#c9a84c" strokeWidth="0.8" opacity="0.2" />
                        <circle cx="350" cy="350" r="50" stroke="#c9a84c" strokeWidth="1" opacity="0.25" />
                        <line x1="350" y1="10" x2="350" y2="690" stroke="#c9a84c" strokeWidth="0.4" opacity="0.12" />
                        <line x1="10" y1="350" x2="690" y2="350" stroke="#c9a84c" strokeWidth="0.4" opacity="0.12" />
                        <line x1="110" y1="110" x2="590" y2="590" stroke="#c9a84c" strokeWidth="0.4" opacity="0.12" />
                        <line x1="590" y1="110" x2="110" y2="590" stroke="#c9a84c" strokeWidth="0.4" opacity="0.12" />
                    </svg>
                </motion.div>

                <div className="z-10 text-center space-y-4">
                    <p className="font-serif text-lg sm:text-2xl text-gold animate-pulse px-6">
                        {TAGLINES[taglineIndex]}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-bg text-text py-12">
            <TopToolsStrip currentTool="marriage-type" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4">
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">Your Marriage Type</p>
                    <h1 className="text-gold font-serif text-4xl sm:text-5xl">{result.result}</h1>

                    <div className="space-y-2 mt-4 max-w-sm mx-auto">
                        <div className="flex justify-between text-xs text-muted font-mono px-2">
                            <span>❤️ Love {result.percentage?.love || 50}%</span>
                            <span>🏛️ Arranged {result.percentage?.arranged || 50}%</span>
                        </div>
                        <div className="h-4 bg-surface rounded-full overflow-hidden border border-border">
                            <div
                                className="h-full bg-gradient-to-r from-pink-500 to-gold rounded-full transition-all duration-1000"
                                style={{ width: `${result.percentage?.love || 50}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center pt-4">
                        {result.key_indicators?.map((indicator: string, i: number) => (
                            <span key={i} className="text-[11px] sm:text-xs bg-gold/10 text-gold border border-gold/20 px-3 py-1.5 rounded-full font-mono">
                                {indicator}
                            </span>
                        ))}
                    </div>
                </div>

                {result.result !== "Analyzing..." && (
                    <ShareCard
                      question="Will I have a love or arranged marriage?"
                      answer={result.result}
                      subtext={`❤️ Love ${result.percentage?.love || 50}% · 🏛️ Arranged ${result.percentage?.arranged || 50}%`}
                      keywords={result.key_indicators?.slice(0, 3)}
                    />
                )}

                <div className="bg-surface2/80 border border-border rounded-2xl p-6 sm:p-8 relative min-h-[400px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
                    <ReactMarkdown
                        components={{
                            h2: ({ children }) => <h2 className="text-gold font-serif text-xl font-medium mt-6 mb-3">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-gold/80 text-lg font-medium mt-4 mb-2">{children}</h3>,
                            strong: ({ children }) => <strong className="text-white font-medium">{children}</strong>,
                            p: ({ children }) => <p className="text-text/90 leading-relaxed mb-4 text-[15px]">{children}</p>,
                            ul: ({ children }) => <ul className="space-y-2 mb-4 mt-2">{children}</ul>,
                            li: ({ children }) => (
                                <li className="flex items-start gap-3 text-text/90 text-[15px]">
                                    <span className="text-gold mt-1 text-[10px] flex-shrink-0">✦</span>
                                    <span>{children}</span>
                                </li>
                            ),
                        }}
                    >
                        {cleanReading(result.reading)}
                    </ReactMarkdown>
                </div>

                <div className="text-center py-4">
                    <a
                        href="/blog/love-marriage-or-arranged-marriage-astrology"
                        className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors"
                    >
                        <span>📖</span>
                        <span>Read: Love or Arranged Marriage? Astrology Guide</span>
                        <span>→</span>
                    </a>
                </div>

                <div className="mt-6 bg-surface2 border border-gold/20 rounded-2xl p-5 text-center space-y-3">
                  <p className="text-gold font-serif text-lg">Want to ask follow-up questions?</p>
                  <p className="text-muted text-sm leading-relaxed">
                    AstroWord&apos;s AI can answer anything about your chart — marriage timing, career, relationships, 2026 predictions — in plain language.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'Tell me more about my marriage type indicators');
                        window.location.href = '/';
                      }}
                      className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
                    >
                      ✦ Ask the AI — Free
                    </button>
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'What does my 7th house and Venus say about love marriage?');
                        window.location.href = '/';
                      }}
                      className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm"
                    >
                      Will I have love marriage?
                    </button>
                  </div>
                  <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                </div>

                <MarriageReportPreview
                  chartData={chartData}
                  calculatorType="marriage-type"
                />

                <div className="space-y-3 pt-4">
                    <p className="text-xs text-muted uppercase tracking-widest font-mono ml-2">
                        Ask a follow-up question
                    </p>
                    <div className="space-y-2">
                        {SUGGESTED_QUESTIONS.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSuggestedQuestion(q)}
                                className="w-full text-left bg-surface border border-border hover:border-gold/40 hover:bg-surface2 rounded-xl px-5 py-4 text-sm text-text/80 hover:text-white transition-all group flex justify-between items-center"
                            >
                                <span>{q}</span>
                                <span className="text-gold/50 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">→</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full text-center text-muted/80 text-sm hover:text-white transition-colors py-3 rounded-lg hover:bg-surface border border-transparent hover:border-border"
                    >
                        ← Back to Chat
                    </button>
                </div>
            </div>
        </div>
    );
}
