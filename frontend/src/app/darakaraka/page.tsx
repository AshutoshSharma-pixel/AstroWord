'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import MarriageReportPreview from '@/components/MarriageReportPreview';
import { cleanReading } from '@/utils/cleanReading';
import { API_URL } from '@/utils/api';
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

            const data = await res.json();
            setResult(data);
            setIsLoading(false);

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

    return (
        <div className="min-h-[100dvh] bg-bg text-text pb-20">
            <TopToolsStrip currentTool="darakaraka" />
            
            <div className="max-w-4xl mx-auto px-4 pt-8">
                {isLoading && !result && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-gold text-xs">
                                {Math.round((taglineIndex / DARAKARAKA_TAGLINES.length) * 100)}%
                            </div>
                        </div>
                        <p className="text-gold font-serif italic text-lg animate-pulse text-center px-6">
                            {DARAKARAKA_TAGLINES[taglineIndex]}
                        </p>
                    </div>
                )}

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
                    <p className="text-xs text-text/40 mt-4 pt-4 border-t border-border/30 text-center">
                      This reading is for guidance and spiritual purposes only. Please consult 
                      qualified professionals for medical, legal, or financial decisions. 
                      <a href="/disclaimer" className="underline hover:text-text/60 transition-colors ml-1">
                        Disclaimer
                      </a>
                    </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/15 to-purple-500/5 border border-indigo-400/40 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/5 to-transparent" />
                    <div className="relative z-10">
                        <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-1">
                            Relationship Compatibility
                        </p>
                        <h3 className="text-lg font-bold text-white mb-2">
                            Know If You're Compatible? Try Kundali Matching
                        </h3>
                        <p className="text-sm text-text/70 mb-4">
                            Enter both birth details for a full 36-point Ashtakoota + Jaimini compatibility analysis. Free results instantly.
                        </p>
                        <a
                            href="/kundali-matching"
                            className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
                        >
                            Try Free Kundali Matching →
                        </a>
                        <p className="text-xs text-text/50 mt-2">
                            Premium 30-page AI report available at ₹399
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gold/15 to-amber/5 border border-gold/40 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <p className="text-gold font-serif text-xl">✦ Want to know WHEN you&apos;ll meet your spouse?</p>
                    <p className="text-white/70 text-sm leading-relaxed">
                        Your free reading reveals WHO your spouse will be.<br/>
                        The Marriage Report reveals <strong className="text-white">WHEN, WHERE, and HOW</strong> — with 2026-2027 timing windows, Dasha analysis, and remedies.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted font-mono">
                        <span>⭐ 15-page personalised PDF</span>
                        <span>·</span>
                        <span>Instant download</span>
                        <span>·</span>
                        <span>Based on your exact chart</span>
                    </div>
                    <button
                        onClick={() => document.getElementById('marriage-report-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gradient-to-r from-gold to-amber text-bg font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-all text-sm w-full sm:w-auto animate-pulse"
                    >
                        Get Full Marriage Report — ₹199
                    </button>
                    <p className="text-muted/50 text-xs">One-time payment · No subscription · Instant PDF</p>
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

                <div id="marriage-report-section">
                    <MarriageReportPreview 
                        chartData={chartData} 
                        calculatorType="darakaraka"
                    />
                </div>

                <div className="mt-8 bg-gradient-to-br from-[#1b1238] via-[#0d091a] to-bg border border-purple-500/20 rounded-2xl p-6 sm:p-8 text-center space-y-4 relative overflow-hidden shadow-lg shadow-purple-500/5">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                    <div className="max-w-xl mx-auto space-y-2">
                        <span className="inline-block bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full">
                            Relationship Compatibility
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif text-white">Know If You&apos;re Compatible? Try Kundali Matching</h2>
                        <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
                            Enter both birth details for a full 36-point Ashtakoota + Jaimini compatibility analysis. Free results instantly.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/kundali-matching"
                            className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium px-8 py-3 rounded-xl shadow-lg shadow-purple-500/10 transition-all text-sm w-full sm:w-auto"
                        >
                            Try Free Kundali Matching &rarr;
                        </Link>
                    </div>
                    <p className="text-muted/60 text-[10px] sm:text-xs">
                        Premium 30-page AI report available at ₹399
                    </p>
                </div>

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
        </div>
    );
}
