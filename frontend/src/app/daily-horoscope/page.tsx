'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import { cleanReading } from '@/utils/cleanReading';

import { API_URL } from '@/utils/api';
import { handleStreamResponse } from '@/utils/stream';
import ShareCard from '@/components/ShareCard';
import TopToolsStrip from '@/components/TopToolsStrip';

const TRANSIT_TAGLINES = [
    "Consulting the current heavens...",
    "Calculating planetary positions...",
    "Aligning with today's stars...",
    "Fetching the celestial weather...",
    "Your daily reading is arriving..."
];

const SUGGESTED_QUESTIONS = [
    "How does today's Moon transit affect my mood?",
    "Which planet is most influential for me today?",
    "Is today good for financial decisions?",
    "What should I avoid doing today based on my transits?"
];

export default function DailyTransitPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [chartData, setChartData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading) {
            const savedChart = localStorage.getItem('astroword_chart');
            if (savedChart) {
                try {
                    const parsed = JSON.parse(savedChart);
                    setChartData(parsed);
                    fetchTransit(parsed);
                } catch (e) {
                    setIsLoading(false);
                }
            } else {
                // If no saved chart, we can still fetch generic transit or wait for user input
                setIsLoading(false);
            }
        }
    }, [user, authLoading]);

    // Tagline cycler
    useEffect(() => {
        if (isLoading && !result) {
            const interval = setInterval(() => {
                setTaglineIndex(prev => (prev < TRANSIT_TAGLINES.length - 1 ? prev + 1 : prev));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading, result]);

    const fetchTransit = async (chart: any = null) => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/daily-transit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    chart_data: chart,
                    timezone_offset: -new Date().getTimezoneOffset() / 60
                })
            });

            if (!res.ok) {
                setError('Could not load daily transits. Please try again.');
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
                    setResult((prev: any) => {
                        if (!prev) return prev;
                        return { ...prev, reading: (prev.reading || '') + chunk };
                    });
                },
                (done) => {
                    setResult((prev: any) => {
                        if (!prev) return prev;
                        return { ...prev, keywords: done.keywords };
                    });
                }
            );

            if (chart) {
                localStorage.setItem('astroword_chart', JSON.stringify(chart));
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (data: any) => {
        setChartData(data);
        fetchTransit(data);
    };
    const handleSuggestedQuestion = (question: string) => {
        sessionStorage.setItem('pending_question', question);
        router.push('/');
    };

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6 text-text">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="font-serif text-lg text-white">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button
                        onClick={() => fetchTransit(chartData)}
                        className="bg-gold/10 border border-gold/20 text-gold px-6 py-2 rounded-xl text-sm hover:bg-gold/20 transition-all"
                    >
                        Try Again
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
                        <h1 className="text-gold font-serif text-3xl">Your Daily Horoscope</h1>
                        <p className="text-muted text-sm leading-relaxed">
                            Vedic Astrology (Jyotish) emphasizes the importance of current planetary movements (Gochara). 
                            Enter your birth details to see how today's transits interact with your natal chart.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-bg text-text pb-20">
            <TopToolsStrip currentTool="daily-horoscope" />
            
            <div className="max-w-4xl mx-auto px-4 pt-8">
                {isLoading && !result && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-gold text-xs">
                                {Math.round((taglineIndex / TRANSIT_TAGLINES.length) * 100)}%
                            </div>
                        </div>
                        <p className="text-gold font-serif italic text-lg animate-pulse">
                            {TRANSIT_TAGLINES[taglineIndex]}
                        </p>
                    </div>
                )}

                {result && (
                    <div className="space-y-8">
                        {/* Header Section */}
                        <div className="text-center space-y-4">
                            <h1 className="text-gold font-serif text-3xl md:text-4xl">Your Daily Horoscope</h1>
                            <p className="text-muted text-sm tracking-widest uppercase">
                                {new Date(result.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>

                        {/* Transit Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {Object.entries(result.transits || {}).map(([planet, info]: [string, any]) => (
                                <div key={planet} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                    <p className="text-muted text-[10px] uppercase tracking-wider mb-1">{planet}</p>
                                    <p className="text-white font-medium text-sm">{info.sign}</p>
                                    <p className="text-gold/60 text-[11px] mt-1">{info.degree}° {info.is_retrograde ? '(R)' : ''}</p>
                                </div>
                            ))}
                        </div>

                        {/* Reading Content */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
                            <ReactMarkdown
                                components={{
                                    h2: ({ children }) => (
                                        <h2 className="text-gold font-serif text-xl font-medium mt-8 mb-3 pb-1 border-b border-gold/20">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-gold/80 text-lg font-medium mt-5 mb-2">{children}</h3>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="text-white font-medium">{children}</strong>
                                    ),
                                    p: ({ children }) => (
                                        <p className="text-text/90 leading-relaxed mb-4 text-[15px]">{children}</p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="space-y-2 mb-4 mt-2">{children}</ul>
                                    ),
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
                            {isLoading && <span className="inline-block w-2 h-4 bg-gold ml-1 animate-pulse" />}
                        </div>

                        {result.keywords && (
                            <ShareCard 
                                question="What do my stars say today?"
                                answer="My Daily Reading"
                                subtext={new Date(result.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                keywords={result.keywords} 
                            />
                        )}

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

                        <div className="pt-6">
                            <button
                                onClick={() => router.push('/')}
                                className="w-full text-center text-muted/80 text-sm hover:text-white transition-colors py-3 rounded-lg hover:bg-surface border border-transparent hover:border-border"
                            >
                                ← Back to Chat
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* SEO Content */}
            <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
                
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Why Generic Daily Horoscopes Are Wrong for You</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        When Times of India publishes your "Aries horoscope today," that prediction applies to 
                        every person born when the Sun was in Aries — roughly 700 million people worldwide. 
                        Obviously not all of them will have the same day. Generic sun sign horoscopes are 
                        entertainment, not real astrology.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        Real Vedic astrology is personal. Your ascendant changes every 2 hours at birth. 
                        Your Moon nakshatra is one of 27 specific energy signatures. Your current Mahadasha 
                        — the planetary period governing your life right now — is unique to your exact birth 
                        moment. When Jupiter transits Gemini today, it activates the 7th house for Sagittarius 
                        ascendants, the 1st house for Gemini ascendants, and the 10th house for Virgo ascendants. 
                        Three completely different life areas. The experience is entirely different for each person.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        AstroWord calculates today's actual planetary positions using Swiss Ephemeris with Lahiri 
                        ayanamsa, maps them to YOUR specific birth chart, and writes a reading that is genuinely 
                        unique to you — updated every single day.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">How Planetary Transits Work in Vedic Astrology</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        Gochara (planetary transit) is the study of how currently moving planets interact with 
                        your natal chart. Every planet is always somewhere in the sky — and wherever it falls 
                        in relation to your ascendant creates an active influence in a specific area of your life.
                    </p>
                    <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
                        <li>• <span className="text-white">Moon transits</span> — Changes sign every 2.5 days. The most immediate daily influence on emotions, intuition, and interactions. The Moon nakshatra today sets the general energy quality of the entire day.</li>
                        <li>• <span className="text-white">Sun transits</span> — Changes sign monthly. Illuminates whichever house it passes through. Brings focus and vitality to that life area.</li>
                        <li>• <span className="text-white">Mercury transits</span> — Changes sign every 3-4 weeks. Governs communication, travel, contracts, and intellect. Critical for business decisions and important conversations.</li>
                        <li>• <span className="text-white">Venus transits</span> — Changes sign roughly monthly. Activates love, beauty, finance, and creativity.</li>
                        <li>• <span className="text-white">Mars transits</span> — Changes sign every 6-7 weeks. Brings energy, ambition, and potential conflict to the house it activates.</li>
                        <li>• <span className="text-white">Jupiter transits</span> — Stays in each sign ~13 months. Creates sustained opportunities and expansion in the houses it touches.</li>
                        <li>• <span className="text-white">Saturn transits</span> — Stays in each sign 2.5 years. Brings discipline, lessons, and long-term restructuring.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Dasha + Transit — The Complete Picture</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        In Vedic astrology, transits alone are never the complete picture. The same Jupiter 
                        transit over your 7th house means something entirely different depending on which 
                        Mahadasha you are running. During a Venus Mahadasha — the period of love and 
                        relationships — Jupiter activating your 7th house is a powerful marriage indicator. 
                        During a Saturn Mahadasha, the same transit might bring a serious, committed 
                        relationship after delays and tests.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        AstroWord reads both simultaneously — your current Vimsottari Dasha period AND 
                        today's actual transits — to give you the most contextualised daily reading possible. 
                        This is exactly how a professional Jyotishi approaches your chart.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "How is this different from a regular daily horoscope?",
                                a: "Generic daily horoscopes apply to 1/12th of the population based on sun sign. AstroWord analyses today's actual transits against YOUR specific ascendant, natal placements, current Dasha, and nakshatra positions. Every reading is unique to your birth chart and updates daily."
                            },
                            {
                                q: "What are planetary transits in Vedic astrology?",
                                a: "Planetary transits (Gochara) are the real-time positions of planets in the sky today. When a transiting planet passes through a house in your chart, it activates the themes of that house. AstroWord calculates these live using Swiss Ephemeris."
                            },
                            {
                                q: "Which planet has the most daily impact?",
                                a: "The Moon has the most immediate daily influence — it changes sign every 2.5 days and its nakshatra sets the energy quality of each day. The Moon nakshatra today is particularly important for understanding your emotional state and how interactions will flow."
                            },
                            {
                                q: "How accurate is a daily transit reading?",
                                a: "Transit readings are most accurate when combined with Dasha analysis. AstroWord always reads both your current Dasha period and today's transits together for maximum accuracy."
                            },
                            {
                                q: "Does AstroWord use real-time planetary positions?",
                                a: "Yes. AstroWord calculates today's actual planetary positions in real time using Swiss Ephemeris with Lahiri ayanamsa — the same system used by professional Vedic astrologers in India."
                            },
                            {
                                q: "Can I get a reading every day?",
                                a: "Yes. The reading updates automatically every day as planetary positions change. Enter your birth details once and come back daily for your personalised reading."
                            },
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-border/40 pb-5">
                                <h3 className="text-white text-sm font-medium mb-2">{faq.q}</h3>
                                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
