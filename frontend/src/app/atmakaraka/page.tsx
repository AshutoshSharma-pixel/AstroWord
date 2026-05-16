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

const ATMAKARAKA_TAGLINES = [
    "Finding your soul significator...",
    "Reading your karmic blueprint...",
    "Calculating the highest degree planet...",
    "Decoding your soul's purpose...",
    "Your Atmakaraka is revealed..."
];

const SUGGESTED_QUESTIONS = [
    "What is my soul's deepest desire?",
    "What karmic lessons must I learn this life?",
    "Which career aligns with my soul purpose?",
    "What spiritual path is right for me?",
    "What are my soul's greatest strengths?"
];

export default function AtmakarakaPage() {
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
                setTaglineIndex(prev => (prev < ATMAKARAKA_TAGLINES.length - 1 ? prev + 1 : prev));
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
                    karaka_type: 'atmakaraka'
                })
            });

            if (!res.ok) {
                setError('Could not load your Atmakaraka. Please try again.');
                setIsLoading(false);
                return;
            }

            let resultData: any = { reading: '' };

            await handleStreamResponse(
                res,
                (meta) => {
                    resultData = { ...resultData, ...meta };
                    setResult({ ...resultData });
                    setIsLoading(false); // Stop loading animation, show the result card
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

            localStorage.setItem('astroword_chart', JSON.stringify(chart));
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
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
                        <h1 className="text-gold font-serif text-3xl">Atmakaraka Calculator — Discover Your Soul's Purpose</h1>
                        <p className="text-muted text-sm leading-relaxed">
                            In Vedic Astrology, the Atmakaraka is the planet that holds the highest degree in your birth chart. 
                            It represents your soul's deepest desires and the primary karmic lessons you are here to learn.
                        </p>
                        <p className="text-muted text-sm leading-relaxed italic">
                            Enter your birth details to reveal your soul significator and receive a personalized reading.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-bg text-text pb-20">
            <TopToolsStrip currentTool="atmakaraka" />
            
            <div className="max-w-4xl mx-auto px-4 pt-8">
                {isLoading && !result && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-gold text-xs">
                                {Math.round((taglineIndex / ATMAKARAKA_TAGLINES.length) * 100)}%
                            </div>
                        </div>
                        <p className="text-gold font-serif italic text-lg animate-pulse text-center px-6">
                            {ATMAKARAKA_TAGLINES[taglineIndex]}
                        </p>
                    </div>
                )}

                {result && (
                    <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">
                        Your Atmakaraka is
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
                  question="What is my soul's true purpose?"
                  answer={`${result.planet} — My Soul Planet`}
                  subtext={`${result.nakshatra} Nakshatra · ${result.sign} · Pada ${result.pada}`}
                  keywords={result.keywords?.slice(0, 4)}
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
                        href="/blog/what-is-atmakaraka"
                        className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors"
                    >
                        <span>📖</span>
                        <span>Read: What is Atmakaraka? Complete Guide</span>
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
                        sessionStorage.setItem('pending_question', 'Tell me more about my Atmakaraka and my soul purpose');
                        window.location.href = '/';
                      }}
                      className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
                    >
                      ✦ Ask the AI — Free
                    </button>
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'What career is best suited for my Atmakaraka planet?');
                        window.location.href = '/';
                      }}
                      className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm"
                    >
                      What career suits me?
                    </button>
                  </div>
                  <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                </div>

                <MarriageReportPreview
                  chartData={chartData}
                  calculatorType="atmakaraka"
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

            {/* SEO Content Block */}
            <div className="max-w-2xl mx-auto px-4 pb-16 space-y-12 mt-12 border-t border-border/30 pt-12">
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">What is Atmakaraka in Vedic Astrology?</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        Atmakaraka means "soul significator" in Sanskrit (Atma = soul, Karaka = significator). 
                        In Jaimini astrology, it is the planet with the highest degree among all 7 planets (excluding Rahu/Ketu in some systems) in your birth chart. 
                        It represents your soul's core identity, its deepest desires, and the primary reason for your incarnation.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        The Atmakaraka is often called the "King" of the chart. While your Lagna (Ascendant) 
                        describes your physical body and social identity, your Atmakaraka reveals what your soul 
                        needs to master to attain peace and liberation (Moksha).
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Atmakaraka by Planet — Your Soul's Path</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { planet: 'Sun as Atmakaraka', meaning: 'Soul seeks to overcome ego and learn true humility and service to others.' },
                            { planet: 'Moon as Atmakaraka', meaning: 'Soul seeks emotional mastery and overcoming fluctuations of the mind.' },
                            { planet: 'Mars as Atmakaraka', meaning: 'Soul seeks to master courage and channel energy toward non-violence.' },
                            { planet: 'Mercury as Atmakaraka', meaning: 'Soul seeks to master speech and use intellect for spiritual truth.' },
                            { planet: 'Jupiter as Atmakaraka', meaning: 'Soul seeks wisdom and to respect teachers, avoiding spiritual pride.' },
                            { planet: 'Venus as Atmakaraka', meaning: 'Soul seeks to master relationships and refine desires into pure devotion.' },
                            { planet: 'Saturn as Atmakaraka', meaning: 'Soul seeks to master discipline and accept suffering as a path to growth.' },
                        ].map((item) => (
                            <div key={item.planet} className="bg-surface border border-border rounded-xl p-3">
                                <p className="text-white text-sm font-medium mb-1">{item.planet}</p>
                                <p className="text-muted text-xs leading-relaxed">{item.meaning}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-6">
                    <h2 className="text-gold font-serif text-2xl">Atmakaraka Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">How do I find my Atmakaraka planet?</h3>
                            <p className="text-muted text-sm leading-relaxed">To find your Atmakaraka, look at the degrees of all seven main planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn). The planet with the highest degree (0° to 30°) is your Atmakaraka. You can use our free Atmakaraka calculator above to get your result instantly.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">What is the difference between Atmakaraka and Amatyakaraka?</h3>
                            <p className="text-muted text-sm leading-relaxed">The Atmakaraka is the planet with the highest degree and represents the soul. The Amatyakaraka is the planet with the second-highest degree and represents your career, advisors, and how you achieve your soul's goals in the material world.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">What happens if my Atmakaraka is retrograde?</h3>
                            <p className="text-muted text-sm leading-relaxed">A retrograde Atmakaraka suggests deep-seated karmic desires from past lives that are being revisited. It often indicates a very strong, intense soul purpose that requires looking inward rather than outward for fulfillment.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">Is Atmakaraka always the highest degree planet?</h3>
                            <p className="text-muted text-sm leading-relaxed">Yes, in the Jaimini 7-Karaka system, the Atmakaraka is always the planet with the highest degree. In the 8-Karaka system, Rahu is also included, but most practitioners prefer the 7-planet system for soul readings.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
