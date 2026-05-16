'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';

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
                    resultData.reading += chunk;
                    setResult({ ...resultData });
                },
                (done) => {
                    resultData.keywords = done.keywords;
                    setResult({ ...resultData });
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
                        <h1 className="text-gold font-serif text-3xl">Daily Horoscope & Planetary Transits</h1>
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
                            <h2 className="text-gold font-serif text-3xl md:text-4xl">Daily Transit Reading</h2>
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
                            <div className="prose prose-invert prose-gold max-w-none prose-p:text-text/90 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-gold">
                                <ReactMarkdown>{result.reading}</ReactMarkdown>
                                {isLoading && <span className="inline-block w-2 h-4 bg-gold ml-1 animate-pulse" />}
                            </div>
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

            {/* SEO Content Block */}
            <div className="max-w-2xl mx-auto px-4 pb-16 space-y-12 mt-12 border-t border-border/30 pt-12">
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Understanding Daily Horoscope & Transits</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        In Vedic Astrology (Jyotish), daily transits—known as <strong>Gochara</strong>—refer to the continuous movement of planets through the zodiac signs. 
                        While your birth chart (Lagna Kundali) remains fixed, these shifting celestial positions interact with your natal planets, creating unique opportunities and challenges each day.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        By observing Gochara, we can understand the "celestial weather." Just as you might check the rain forecast before leaving home, 
                        checking your daily transits helps you align your activities with the cosmic flow, ensuring better timing for important decisions.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">The Significance of Major Planet Transits</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { planet: 'Moon Transit', meaning: 'Changes signs every 2.25 days. Governs your daily mood, emotions, and general mental state.' },
                            { planet: 'Sun Transit', meaning: 'Changes signs monthly. Influences your vitality, public life, and professional focus.' },
                            { planet: 'Mars Transit', meaning: 'Governs your energy levels, ambition, and how you handle conflicts today.' },
                            { planet: 'Jupiter Transit', meaning: 'The "Great Benefic." Brings growth, wisdom, and luck to whichever house it touches.' },
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
                    <h2 className="text-gold font-serif text-2xl">Daily Horoscope Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">What are planetary transits?</h3>
                            <p className="text-muted text-sm leading-relaxed">Planetary transits refer to the continuous movement of planets through the zodiac signs as seen from Earth. In Vedic astrology (Jyotish), these transits are compared with your birth chart to predict current life events.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">Which transit is most important for daily readings?</h3>
                            <p className="text-muted text-sm leading-relaxed">The Moon's transit is considered the most significant for daily emotional states and events, as it changes signs approximately every 2.25 days. It determines your "Chandra Lagna" or your mental focus for the day.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">How does AstroWord calculate transits?</h3>
                            <p className="text-muted text-sm leading-relaxed">AstroWord uses the professional-grade Swiss Ephemeris with the Lahiri Ayanamsa to ensure the highest degree of astronomical accuracy, providing you with real-time planetary positions calculated precisely for your location.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">Are transits more important than the birth chart?</h3>
                            <p className="text-muted text-sm leading-relaxed">No, the birth chart is the foundation. Transits only deliver what is already promised in your birth chart. Think of the birth chart as the seeds and the transits as the seasons that allow those seeds to sprout.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
