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

const AMATYAKARAKA_TAGLINES = [
    "Finding your career significator...",
    "Reading your professional destiny...",
    "Calculating the second highest degree planet...",
    "Decoding your ideal career path...",
    "Your Amatyakaraka is revealed..."
];

const SUGGESTED_QUESTIONS = [
    "What is my ideal career?",
    "When will I achieve professional success?",
    "Should I do business or job?",
    "What are my greatest professional strengths?",
    "Which field will bring me the most success?"
];

export default function AmatyakarakaPage() {
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
                setTaglineIndex(prev => (prev < AMATYAKARAKA_TAGLINES.length - 1 ? prev + 1 : prev));
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
                    karaka_type: 'amatyakaraka'
                })
            });

            if (!res.ok) {
                setError('Could not load your Amatyakaraka. Please try again.');
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
                    resultData.reading += chunk;
                    setResult({ ...resultData });
                },
                (done) => {
                    resultData.keywords = done.keywords;
                    setResult({ ...resultData });
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
                        <h1 className="text-gold font-serif text-3xl">Amatyakaraka Calculator — Reveal Your Ideal Career Path</h1>
                        <p className="text-muted text-sm leading-relaxed">
                            The Amatyakaraka is the "Minister" to your soul's "King." It is the primary indicator of 
                            how you interact with the material world and what kind of work will bring you success.
                        </p>
                        <p className="text-muted text-sm leading-relaxed italic">
                            Enter your birth details to discover your career significator and receive an AI-powered reading.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-bg text-text pb-20">
            <TopToolsStrip currentTool="amatyakaraka" />
            
            <div className="max-w-4xl mx-auto px-4 pt-8">
                {isLoading && !result && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-gold text-xs">
                                {Math.round((taglineIndex / AMATYAKARAKA_TAGLINES.length) * 100)}%
                            </div>
                        </div>
                        <p className="text-gold font-serif italic text-lg animate-pulse text-center px-6">
                            {AMATYAKARAKA_TAGLINES[taglineIndex]}
                        </p>
                    </div>
                )}

                {result && (
                    <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">
                        Your Amatyakaraka is
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
                  question="What career was I born for?"
                  answer={`${result.planet} — My Career Planet`}
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

                <div className="mt-6 bg-surface2 border border-gold/20 rounded-2xl p-5 text-center space-y-3">
                  <p className="text-gold font-serif text-lg">Want to ask follow-up questions?</p>
                  <p className="text-muted text-sm leading-relaxed">
                    AstroWord&apos;s AI can answer anything about your chart — marriage timing, career, relationships, 2026 predictions — in plain language.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'Tell me more about my Amatyakaraka and ideal career');
                        window.location.href = '/';
                      }}
                      className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
                    >
                      ✦ Ask the AI — Free
                    </button>
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'Does my chart show government job or private sector?');
                        window.location.href = '/';
                      }}
                      className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm"
                    >
                      Will I get a govt job?
                    </button>
                  </div>
                  <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                </div>

                <MarriageReportPreview
                  chartData={chartData}
                  calculatorType="amatyakaraka"
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
                    <h2 className="text-gold font-serif text-2xl">What is Amatyakaraka in Vedic Astrology?</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        In Jaimini astrology, the Amatyakaraka (AmK) is the planet that holds the second-highest degree 
                        among all seven planets in your birth chart. While the Atmakaraka represents your soul, the 
                        Amatyakaraka represents your mind, your professional advisors, and your career path.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        The Amatyakaraka acts as the "Minister" to your soul's "King." It is the primary indicator of 
                        how you interact with the material world and what kind of work will bring you success and 
                        financial stability. Understanding your AmK helps you align your daily actions with your 
                        soul's higher purpose.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Amatyakaraka by Planet — Your Career Destiny</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { planet: 'Sun as Amatyakaraka', meaning: 'Success in leadership, politics, administration, or government roles.' },
                            { planet: 'Moon as Amatyakaraka', meaning: 'Success in public relations, hospitality, psychology, or creative arts.' },
                            { planet: 'Mars as Amatyakaraka', meaning: 'Success in engineering, military, surgery, or entrepreneurship.' },
                            { planet: 'Mercury as Amatyakaraka', meaning: 'Success in business, writing, teaching, or data analysis.' },
                            { planet: 'Jupiter as Amatyakaraka', meaning: 'Success in law, finance, philosophy, or spiritual guidance.' },
                            { planet: 'Venus as Amatyakaraka', meaning: 'Success in luxury goods, fashion, entertainment, or design.' },
                            { planet: 'Saturn as Amatyakaraka', meaning: 'Success in long-term projects, research, history, or social service.' },
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
                    <h2 className="text-gold font-serif text-2xl">Amatyakaraka Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">How do I find my Amatyakaraka planet?</h3>
                            <p className="text-muted text-sm leading-relaxed">Your Amatyakaraka is the planet that has the second-highest degree in your birth chart, ranging from 0 to 30 degrees. You can find this manually from your Jaimini Karaka list or use our free calculator above to discover it instantly.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">Can Amatyakaraka predict my career success?</h3>
                            <p className="text-muted text-sm leading-relaxed">Yes, the Amatyakaraka is the most important planet for professional life in Jaimini astrology. Its placement in the D1 (Birth Chart) and D10 (Dashamsha) charts determines the level of fame, wealth, and authority you will achieve in your career.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">What happens if my Amatyakaraka is weak or debilitated?</h3>
                            <p className="text-muted text-sm leading-relaxed">A weak Amatyakaraka may indicate initial struggles or obstacles in finding the right career path. However, because it represents your advisors, seeking mentorship or specialized education can help strengthen its energy and bring success.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">Is the Amatyakaraka different for everyone?</h3>
                            <p className="text-muted text-sm leading-relaxed">Absolutely. Depending on the exact time and place of your birth, your second-highest degree planet will vary, making your professional blueprint unique to you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
