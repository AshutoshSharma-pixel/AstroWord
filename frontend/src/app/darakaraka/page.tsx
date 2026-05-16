'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import MarriageReportPreview from '@/components/MarriageReportPreview';
import { cleanReading } from '@/utils/cleanReading';
import { API_URL } from '@/utils/api';
import { handleStreamResponse } from '@/utils/stream';
import ShareCard from '@/components/ShareCard';
import TopToolsStrip from '@/components/TopToolsStrip';

const DARAKARAKA_TAGLINES = [
    "Finding your spouse significator...",
    "Reading Venus and 7th house...",
    "Calculating the lowest degree planet...",
    "Decoding your destined partner...",
    "Your Darakaraka is revealed..."
];

const SUGGESTED_QUESTIONS = [
    "What will my spouse look like?",
    "What career will my spouse have?",
    "When will I get married?",
    "Where will I meet my spouse?",
    "Will my marriage be happy?"
];

export default function DarakarakaPage() {
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
                    fetchKaraka(parsed);
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
                setTaglineIndex(prev => (prev < DARAKARAKA_TAGLINES.length - 1 ? prev + 1 : prev));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading, chartData, result]);

    const fetchKaraka = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/karaka`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    user_id: user?.uid,
                    chart_data: chart,
                    karaka_type: 'darakaraka'
                })
            });

            if (!res.ok) {
                setError('Could not load your Darakaraka. Please try again.');
                setIsLoading(false);
                return;
            }

            let resultData: any = { reading: '' };

            await handleStreamResponse(
                res,
                (meta) => {
                    resultData = { ...resultData, ...meta };
                    setResult({ ...resultData });
                    setIsLoading(false);
                },
                (chunk) => {
                    resultData.reading += chunk;
                    setResult({ ...resultData });
                },
                (doneData) => {
                    resultData = { ...resultData, ...doneData };
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
        fetchKaraka(data);
    };

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button
                        onClick={() => { setError(null); if (chartData) fetchKaraka(chartData); }}
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

    if (!chartData && !isLoading && !result) {
        return (
            <div className="min-h-[100dvh] bg-bg text-text">
                <WelcomeScreen onComplete={handleFormSubmit} />
                <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
                    <div className="space-y-4">
                        <h1 className="text-gold font-serif text-3xl">Darakaraka Calculator — Find Your Destined Spouse</h1>
                        <p className="text-muted text-sm leading-relaxed">
                            The Darakaraka is the "Spouse" significator in your birth chart. It reveals the nature, 
                            personality, and destiny associated with your future life partner.
                        </p>
                        <p className="text-muted text-sm leading-relaxed italic">
                            Enter your birth details to discover your Darakaraka planet and get a personalized AI reading about your spouse.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading && !result) {
        return (
            <div className="min-h-[100dvh] bg-bg text-text flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ animation: 'spin 120s linear infinite' }}
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
                        {/* Sun */}
                        <circle cx="350" cy="10" r="10" fill="#FFD700" />
                        <circle cx="350" cy="10" r="16" fill="#FFD700" opacity="0.2" />
                        <circle cx="350" cy="10" r="22" fill="#FFD700" opacity="0.08" />
                        {/* Moon */}
                        <circle cx="690" cy="350" r="8" fill="#E8E4DC" />
                        <circle cx="690" cy="350" r="14" fill="#E8E4DC" opacity="0.2" />
                        <circle cx="690" cy="350" r="20" fill="#E8E4DC" opacity="0.07" />
                        {/* Mars */}
                        <circle cx="590" cy="110" r="7" fill="#FF4444" />
                        <circle cx="590" cy="110" r="13" fill="#FF4444" opacity="0.2" />
                        <circle cx="590" cy="110" r="19" fill="#FF4444" opacity="0.07" />
                        {/* Mercury */}
                        <circle cx="590" cy="590" r="6" fill="#4CAF77" />
                        <circle cx="590" cy="590" r="11" fill="#4CAF77" opacity="0.2" />
                        <circle cx="590" cy="590" r="17" fill="#4CAF77" opacity="0.07" />
                        {/* Jupiter */}
                        <circle cx="110" cy="590" r="9" fill="#F0A500" />
                        <circle cx="110" cy="590" r="15" fill="#F0A500" opacity="0.22" />
                        <circle cx="110" cy="590" r="22" fill="#F0A500" opacity="0.08" />
                        {/* Venus */}
                        <circle cx="110" cy="110" r="7" fill="#FF69B4" />
                        <circle cx="110" cy="110" r="13" fill="#FF69B4" opacity="0.2" />
                        <circle cx="110" cy="110" r="19" fill="#FF69B4" opacity="0.07" />
                        {/* Saturn */}
                        <circle cx="350" cy="690" r="8" fill="#7c6fcd" />
                        <circle cx="350" cy="690" r="14" fill="#7c6fcd" opacity="0.22" />
                        <circle cx="350" cy="690" r="20" fill="#7c6fcd" opacity="0.08" />
                        {/* Rahu */}
                        <circle cx="10" cy="350" r="6" fill="#4A90E2" />
                        <circle cx="10" cy="350" r="12" fill="#4A90E2" opacity="0.2" />
                        {/* Ketu */}
                        <circle cx="490" cy="70" r="5" fill="#00BCD4" />
                        <circle cx="490" cy="70" r="10" fill="#00BCD4" opacity="0.2" />
                    </svg>
                </div>

                <div className="z-10 text-center space-y-4">
                    <p className="font-serif text-lg sm:text-2xl text-gold animate-pulse px-6">
                        {DARAKARAKA_TAGLINES[taglineIndex]}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-bg text-text pb-20">
            <TopToolsStrip currentTool="darakaraka" />
            
            <div className="max-w-4xl mx-auto px-4 pt-8">
                {result && (
                    <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">
                        Your Darakaraka is
                    </p>
                    <h1 className="text-gold font-serif text-4xl sm:text-5xl tracking-wide py-2">
                        {result.planet}
                    </h1>
                    <p className="text-white text-sm tracking-wide">
                        {result.nakshatra} Nakshatra · Pada {result.pada}
                    </p>
                    <p className="text-muted text-xs font-mono">
                        {result.degree}° {result.sign}
                        {result.retrograde && " · Retrograde"}
                        {result.combust && " · Combust"}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center pt-4">
                        {result.keywords?.slice(0, 6).map((kw: string, i: number) => (
                            <span key={i} className="text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>

                <ShareCard
                  question="What is my future spouse like?"
                  answer={`${result.planet} — Your Spouse Planet`}
                  subtext={`${result.nakshatra} Nakshatra · ${result.sign} · Pada ${result.pada}`}
                  keywords={result.keywords?.slice(0, 4)}
                  planet={result.planet}
                />

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
                        href="/blog/what-is-darakaraka"
                        className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors"
                    >
                        <span>📖</span>
                        <span>Read: What is Darakaraka? Complete Guide</span>
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
                        sessionStorage.setItem('pending_question', 'Tell me more about my Darakaraka and what it means for my marriage');
                        window.location.href = '/';
                      }}
                      className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
                    >
                      ✦ Ask the AI — Free
                    </button>
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'When will I get married based on my chart?');
                        window.location.href = '/';
                      }}
                      className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm"
                    >
                      When will I marry?
                    </button>
                  </div>
                  <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                </div>

                <MarriageReportPreview 
                    chartData={chartData} 
                    calculatorType="darakaraka"
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
                                <span className="text-gold/50 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </button>
                        ))}
                    </div>
                </div>

                    </div>
                )}
            </div>

            {/* SEO Content Block — visible to Google, useful to users */}
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
        </div>
    );
}
