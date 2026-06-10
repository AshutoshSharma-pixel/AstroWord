'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import MarriageReportPreview from '@/components/MarriageReportPreview';
import { cleanReading } from '@/utils/cleanReading';
import { API_URL } from '@/utils/api';
import ShareCard from '@/components/ShareCard';
import TopToolsStrip from '@/components/TopToolsStrip';

const DASHA_TAGLINES = [
    "Calculating your Moon's nakshatra position...",
    "Mapping your 120-year Dasha timeline...",
    "Finding your current Mahadasha...",
    "Interpreting your planetary periods...",
    "Writing your personalised Dasha reading..."
];

const DASHA_THEMES: Record<string, string> = {
    Sun: "Leadership, career, authority, father, government, self-confidence",
    Moon: "Emotions, mind, mother, home, public life, mental peace",
    Mars: "Energy, property, siblings, courage, land, competitive pursuits",
    Rahu: "Ambition, foreign connections, unconventional paths, sudden transformation",
    Jupiter: "Wisdom, expansion, prosperity, children, spirituality, good fortune",
    Saturn: "Discipline, karma, hard work, delays, long-term rewards, responsibility",
    Mercury: "Communication, business, intellect, writing, education, trade",
    Ketu: "Spirituality, detachment, past karma, moksha, intuition, isolation",
    Venus: "Love, marriage, luxury, arts, vehicles, material comforts, creativity",
};

export default function DashaCalculatorPage() {
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
                    fetchDasha(parsed);
                } catch {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (isLoading && chartData && !result) {
            const interval = setInterval(() => {
                setTaglineIndex(prev => (prev < DASHA_TAGLINES.length - 1 ? prev + 1 : prev));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading, chartData, result]);

    const fetchDasha = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/dasha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ user_id: user?.uid || null, chart_data: chart })
            });

            if (!res.ok) {
                setError('Could not calculate your Dasha. Please try again.');
                setIsLoading(false);
                return;
            }

            const data = await res.json();
            setResult(data);
            setIsLoading(false);
            localStorage.setItem('astroword_chart', JSON.stringify(chart));
        } catch {
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
        fetchDasha(data);
    };

    // --- Error state ---
    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button
                        onClick={() => { setError(null); if (chartData) fetchDasha(chartData); }}
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

    // --- No chart state ---
    if (!chartData && !isLoading) {
        return (
            <div className="min-h-[100dvh] bg-bg text-text">
                <WelcomeScreen onComplete={handleFormSubmit} />
                <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6 mt-8 border-t border-border/30 pt-12">
                    <h1 className="text-gold font-serif text-3xl">Vimshottari Dasha Calculator — Find Your Current Mahadasha</h1>
                    <p className="text-muted text-sm leading-relaxed">
                        Enter your birth details above to calculate your Vimshottari Dasha timeline. Discover your current Mahadasha,
                        Antardasha, and receive an AI-powered personalised reading based on your actual birth chart positions.
                        Powered by Swiss Ephemeris with Lahiri Ayanamsa.
                    </p>
                </div>
            </div>
        );
    }

    // --- Loading state (full-page mandala — matches manglik pattern) ---
    if (isLoading || !result) {
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
                        <circle cx="350" cy="10" r="10" fill="#FFD700" />
                        <circle cx="350" cy="10" r="16" fill="#FFD700" opacity="0.2" />
                        <circle cx="690" cy="350" r="8" fill="#E8E4DC" />
                        <circle cx="590" cy="110" r="7" fill="#FF4444" />
                        <circle cx="590" cy="590" r="6" fill="#4CAF77" />
                        <circle cx="110" cy="590" r="9" fill="#F0A500" />
                        <circle cx="110" cy="110" r="7" fill="#FF69B4" />
                        <circle cx="350" cy="690" r="8" fill="#7c6fcd" />
                        <circle cx="10" cy="350" r="6" fill="#4A90E2" />
                        <circle cx="490" cy="70" r="5" fill="#00BCD4" />
                    </svg>
                </div>
                <div className="z-10 text-center space-y-4">
                    <p className="font-serif text-lg sm:text-2xl text-gold animate-pulse px-6">
                        {DASHA_TAGLINES[taglineIndex]}
                    </p>
                </div>
            </div>
        );
    }

    // --- Suggested questions (dynamic, uses result) ---
    const suggestedQuestions = [
        `What does ${result.current_mahadasha.lord} Mahadasha mean for my career?`,
        `How will ${result.current_antardasha.lord} Antardasha affect my relationships?`,
        `When does my next Mahadasha start and what will change?`,
        `What remedies are recommended during ${result.current_mahadasha.lord} Mahadasha?`,
        `How does my Moon in ${result.moon_nakshatra} affect my Dasha results?`
    ];

    return (
        <div className="min-h-[100dvh] bg-bg text-text py-12">
            <TopToolsStrip currentTool="dasha-calculator" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">

                {/* Hero Card */}
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">Your Current Mahadasha</p>
                    <h1 className="text-gold font-serif text-5xl sm:text-6xl tracking-wide py-2">
                        {result.current_mahadasha.lord}
                    </h1>
                    <p className="text-muted text-sm">
                        Ends {result.current_mahadasha.end_date} · {result.current_mahadasha.years_remaining} years remaining
                    </p>
                    <div className="inline-block bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5">
                        <span className="text-gold text-sm font-mono">
                            Antardasha: {result.current_antardasha.lord} · until {result.current_antardasha.end_date}
                        </span>
                    </div>
                    <p className="text-muted text-xs mt-1">
                        Moon in {result.moon_nakshatra} Nakshatra (Pada {result.moon_nakshatra_pada}) · {result.moon_sign}
                    </p>
                    {DASHA_THEMES[result.current_mahadasha.lord] && (
                        <p className="text-muted/60 text-xs italic mt-1">
                            {DASHA_THEMES[result.current_mahadasha.lord]}
                        </p>
                    )}
                </div>

                {/* 120-year Mahadasha Timeline */}
                <div className="bg-surface2 border border-border rounded-2xl p-6">
                    <h2 className="text-white font-serif text-xl mb-1">Your Complete 120-Year Dasha Timeline</h2>
                    <p className="text-muted text-xs mb-4">Past · Current · Upcoming</p>
                    <div className="space-y-2">
                        {result.mahadashas.map((m: any, i: number) => {
                            const today = new Date();
                            const endDt = new Date(m.end.replace(/(\d{2}) (\w{3}) (\d{4})/, '$2 $1 $3'));
                            const startDt = new Date(m.start.replace(/(\d{2}) (\w{3}) (\d{4})/, '$2 $1 $3'));
                            const isPast = !m.is_current && endDt < today;
                            const isFuture = !m.is_current && startDt > today;
                            return (
                                <div
                                    key={i}
                                    className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                                        m.is_current
                                            ? 'bg-gold/10 border border-gold/30'
                                            : isPast
                                            ? 'bg-surface border border-border/30 opacity-40'
                                            : 'bg-surface border border-border/50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`font-mono text-sm ${
                                            m.is_current ? 'text-gold font-medium' : isPast ? 'text-muted' : 'text-muted'
                                        }`}>
                                            {m.is_current ? '▶ ' : ''}{m.lord} Mahadasha
                                        </span>
                                        {m.is_current && (
                                            <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-mono">Current</span>
                                        )}
                                        {isFuture && i === result.mahadashas.findIndex((x: any) => {
                                            const s = new Date(x.start.replace(/(\d{2}) (\w{3}) (\d{4})/, '$2 $1 $3'));
                                            return s > today && !x.is_current;
                                        }) && (
                                            <span className="text-xs bg-surface2 text-muted/60 border border-border/40 px-2 py-0.5 rounded-full font-mono">Next</span>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted text-xs">{m.start} — {m.end}</p>
                                        <p className="text-muted text-xs">{m.years} yrs</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Antardasha timeline */}
                <div className="bg-surface2 border border-border rounded-2xl p-6">
                    <h2 className="text-white font-serif text-xl mb-4">
                        Antardasha Periods within {result.current_mahadasha.lord} Mahadasha
                    </h2>
                    <div className="space-y-2">
                        {result.antardashas.map((ad: any, i: number) => (
                            <div
                                key={i}
                                className={`flex justify-between items-center p-3 rounded-xl ${ad.is_current
                                    ? 'bg-gold/10 border border-gold/30'
                                    : 'bg-surface border border-border/50'
                                }`}
                            >
                                <span className={`font-mono text-sm ${ad.is_current ? 'text-gold font-medium' : 'text-muted'}`}>
                                    {ad.is_current ? '▶ ' : ''}{ad.lord} Antardasha
                                </span>
                                <span className="text-muted text-xs">{ad.start} — {ad.end}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Share Card */}
                <ShareCard
                    question="What Mahadasha am I in?"
                    answer={`${result.current_mahadasha.lord} Mahadasha`}
                    subtext={`Antardasha: ${result.current_antardasha.lord} · Moon in ${result.moon_nakshatra}`}
                    keywords={result.keywords?.slice(0, 4)}
                    planet={result.current_mahadasha.lord}
                />

                {/* AI Reading */}
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
                    <p className="text-xs text-text/40 mt-4 pt-4 border-t border-border/30 text-center">
                      This reading is for guidance and spiritual purposes only. Please consult 
                      qualified professionals for medical, legal, or financial decisions. 
                      <a href="/disclaimer" className="underline hover:text-text/60 transition-colors ml-1">
                        Disclaimer
                      </a>
                    </p>
                </div>

                {/* Follow-up CTA */}
                <div className="mt-6 bg-surface2 border border-gold/20 rounded-2xl p-5 text-center space-y-3">
                    <p className="text-gold font-serif text-lg">Want to ask follow-up questions?</p>
                    <p className="text-muted text-sm leading-relaxed">
                        AstroWord&apos;s AI can answer anything about your Dasha — timing of life events, remedies, next phase predictions — in plain language.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                        <button
                            onClick={() => {
                                sessionStorage.setItem('pending_question', `What does my ${result.current_mahadasha.lord} Mahadasha mean for my career and relationships?`);
                                window.location.href = '/';
                            }}
                            className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
                        >
                            ✦ Ask the AI — Free
                        </button>
                        <button
                            onClick={() => {
                                sessionStorage.setItem('pending_question', `When will my ${result.current_mahadasha.lord} Mahadasha end and what comes next?`);
                                window.location.href = '/';
                            }}
                            className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm"
                        >
                            What comes after this Dasha?
                        </button>
                    </div>
                    <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
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

                {/* Marriage Report Upsell */}
                <MarriageReportPreview chartData={chartData} calculatorType="dasha" />

                {/* Suggested Questions */}
                <div className="space-y-3 pt-4">
                    <p className="text-xs text-muted uppercase tracking-widest font-mono ml-2">
                        Ask a follow-up question
                    </p>
                    <div className="space-y-2">
                        {suggestedQuestions.map((q, i) => (
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
        </div>
    );
}
