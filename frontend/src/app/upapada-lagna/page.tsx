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

const TAGLINES = [
    "Finding your 12th house sign...",
    "Locating the 12th lord...",
    "Calculating the Arudha Pada...",
    "Applying Jaimini exception rules...",
    "Your Upapada Lagna is revealed...",
];

const SUGGESTED_QUESTIONS = [
    "What does my Upapada Lagna say about my future spouse?",
    "When will I get married based on my Upapada Lagna?",
    "How do I strengthen my Upapada Lagna for marriage?",
    "What is the difference between Upapada Lagna and 7th house?",
    "Which Dasha will bring my marriage?",
];

export default function UpapadaPage() {
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
                    fetchUpapada(parsed);
                } catch {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (isLoading && chartData && !result) {
            const interval = setInterval(() => {
                setTaglineIndex(prev => (prev < TAGLINES.length - 1 ? prev + 1 : prev));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading, chartData, result]);

    const fetchUpapada = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/upapada`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
                body: JSON.stringify({ user_id: user?.uid || null, chart_data: chart })
            });
            if (!res.ok) { setError('Could not calculate your Upapada Lagna. Please try again.'); setIsLoading(false); return; }
            const data = await res.json();
            setResult(data);
            localStorage.setItem('astroword_chart', JSON.stringify(chart));
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestedQuestion = (q: string) => { sessionStorage.setItem('pending_question', q); router.push('/'); };
    const handleFormSubmit = (data: any) => { setChartData(data); fetchUpapada(data); };

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button onClick={() => { setError(null); if (chartData) fetchUpapada(chartData); }} className="bg-gold/10 border border-gold/20 text-gold px-6 py-2 rounded-xl text-sm hover:bg-gold/20 transition-all">Try Again</button>
                    <button onClick={() => router.push('/')} className="block text-muted text-sm hover:text-white transition-colors mt-2 mx-auto">← Back to Chat</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-bg text-text">

            {/* Calculator section — conditional on state */}
            {!chartData && !isLoading ? (
                <>
                    <WelcomeScreen onComplete={handleFormSubmit} />
                    <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4 mt-6 border-t border-border/30 pt-8">
                        <h1 className="text-gold font-serif text-3xl">Upapada Lagna Calculator — Your Jaimini Marriage Sign</h1>
                        <p className="text-muted text-sm leading-relaxed">Enter your birth details above to calculate your Upapada Lagna and get a personalised AI reading about your marriage destiny.</p>
                    </div>
                </>
            ) : isLoading || !result ? (
                <div className="flex flex-col items-center justify-center py-32 p-6 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animation: 'spin 120s linear infinite' }}>
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
                            <circle cx="690" cy="350" r="8" fill="#E8E4DC" />
                            <circle cx="590" cy="110" r="7" fill="#FF4444" />
                            <circle cx="110" cy="590" r="9" fill="#F0A500" />
                            <circle cx="350" cy="690" r="8" fill="#7c6fcd" />
                        </svg>
                    </div>
                    <div className="z-10 text-center space-y-4">
                        <p className="font-serif text-lg sm:text-2xl text-gold animate-pulse px-6">{TAGLINES[taglineIndex]}</p>
                    </div>
                </div>
            ) : (
                <>
                    <TopToolsStrip currentTool="upapada-lagna" />
                    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700 pt-12">

                        {/* Result Card */}
                        <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                            <p className="text-muted text-xs uppercase tracking-widest font-mono">Your Upapada Lagna is</p>
                            <h1 className="font-serif text-4xl sm:text-5xl tracking-wide py-2 text-gold">{result.upapada_sign}</h1>
                            <p className="text-white text-sm tracking-wide">
                                12th House: {result.twelfth_house_sign} · 12th Lord: {result.twelfth_lord} in {result.twelfth_lord_sign}
                            </p>
                            <p className="text-muted text-xs font-mono">
                                Upapada Lord: {result.upapada_lord} · House {result.upapada_lord_house}
                            </p>
                            {result.twelfth_lord_retrograde && (
                                <span className="inline-block text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">{result.twelfth_lord} Retrograde</span>
                            )}
                            {result.planets_in_upapada?.length > 0 && (
                                <div className="mt-3 bg-surface/50 p-3 rounded-xl border border-border text-left">
                                    <p className="text-xs text-muted uppercase tracking-widest font-mono mb-1">Planets in Upapada:</p>
                                    <p className="text-sm text-white">{result.planets_in_upapada.join(', ')}</p>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2 justify-center pt-2">
                                {result.keywords?.slice(0, 5).map((kw: string, i: number) => (
                                    <span key={i} className="text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">{kw}</span>
                                ))}
                            </div>
                        </div>

                        <ShareCard
                            question="What is my Upapada Lagna?"
                            answer={`${result.upapada_sign} Upapada Lagna`}
                            subtext={`12th Lord ${result.twelfth_lord} in ${result.twelfth_lord_sign} · UL Lord: ${result.upapada_lord}`}
                            keywords={result.keywords?.slice(0, 4)}
                        />

                        {/* Reading */}
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

                        {/* CTA */}
                        <div className="mt-6 bg-surface2 border border-gold/20 rounded-2xl p-5 text-center space-y-3">
                            <p className="text-gold font-serif text-lg">Want to ask follow-up questions?</p>
                            <p className="text-muted text-sm leading-relaxed">AstroWord&apos;s AI can answer anything about your chart — marriage timing, spouse profile, Dasha analysis — in plain language.</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                                <button onClick={() => { sessionStorage.setItem('pending_question', 'Tell me more about my Upapada Lagna and what it says about my spouse'); window.location.href = '/'; }} className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm">✦ Ask the AI — Free</button>
                                <button onClick={() => { sessionStorage.setItem('pending_question', 'When will I get married based on my Upapada Lagna?'); window.location.href = '/'; }} className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm">When will I marry?</button>
                            </div>
                            <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                        </div>

                        <MarriageReportPreview chartData={chartData} calculatorType="upapada-lagna" />

                        {/* Suggested questions */}
                        <div className="space-y-3 pt-4">
                            <p className="text-xs text-muted uppercase tracking-widest font-mono ml-2">Ask a follow-up question</p>
                            <div className="space-y-2">
                                {SUGGESTED_QUESTIONS.map((q, i) => (
                                    <button key={i} onClick={() => handleSuggestedQuestion(q)} className="w-full text-left bg-surface border border-border hover:border-gold/40 hover:bg-surface2 rounded-xl px-5 py-4 text-sm text-text/80 hover:text-white transition-all group flex justify-between items-center">
                                        <span>{q}</span>
                                        <span className="text-gold/50 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button onClick={() => router.push('/')} className="w-full text-center text-muted/80 text-sm hover:text-white transition-colors py-3 rounded-lg hover:bg-surface border border-transparent hover:border-border">← Back to Chat</button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
