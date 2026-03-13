'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { cleanReading } from '@/utils/cleanReading';
import { API_URL } from '@/utils/api';

const TAGLINES = [
    "Calculating your Darakaraka nakshatra...",
    "Finding the sacred sound vibration...",
    "Consulting ancient nakshatra aksharas...",
    "Decoding your spouse's name initial...",
    "The stars have revealed the letter..."
];

const SUGGESTED_QUESTIONS = [
    "What will my spouse look like?",
    "When will I meet my spouse?",
    "What is my Darakaraka planet telling me about my spouse?",
    "Will my spouse be from the same city?",
    "What career will my spouse have?"
];

export default function SpouseInitialPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [chartData, setChartData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
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
                    fetchSpouseInitial(parsed);
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

    const fetchSpouseInitial = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/spouse-initial`, {
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
            const data = await res.json();
            if (res.ok && data.success) {
                setResult(data);
            } else {
                setError('Could not load your spouse initial. Please try again.');
            }
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
        fetchSpouseInitial(data);
    };

    if (authLoading) return <div className="min-h-[100dvh] bg-bg text-text" />;

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button
                        onClick={() => { setError(null); if (chartData) fetchSpouseInitial(chartData); }}
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
            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-6">
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">
                        Your Spouse&apos;s Name Starts With
                    </p>

                    {/* Most likely initials as giant letters */}
                    <div className="flex gap-4 justify-center">
                        {result.most_likely_initials?.map((letter: string, i: number) => (
                            <div key={i} className="text-[80px] font-serif text-gold leading-none filter drop-shadow-[0_0_20px_rgba(201,168,76,0.6)]">
                                {letter}
                            </div>
                        ))}
                    </div>

                    {/* Three methods breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mt-4">
                        <div className="bg-surface border border-border rounded-xl p-3 sm:p-4">
                            <p className="text-[10px] sm:text-xs text-muted font-mono mb-1">7th Lord Method</p>
                            <p className="text-gold font-medium text-sm sm:text-base">{result.methods?.seventh_lord?.planet}</p>
                            <p className="text-xs text-muted truncate">{result.methods?.seventh_lord?.nakshatra}</p>
                            <p className="text-white font-mono text-lg mt-1">{result.methods?.seventh_lord?.primary_syllable}</p>
                        </div>
                        <div className="bg-surface border border-border rounded-xl p-3 sm:p-4">
                            <p className="text-[10px] sm:text-xs text-muted font-mono mb-1">Darakaraka</p>
                            <p className="text-gold font-medium text-sm sm:text-base">{result.methods?.darakaraka?.planet}</p>
                            <p className="text-xs text-muted truncate">{result.methods?.darakaraka?.nakshatra}</p>
                            <p className="text-white font-mono text-lg mt-1">{result.methods?.darakaraka?.primary_syllable}</p>
                        </div>
                        <div className="bg-surface border border-border rounded-xl p-3 sm:p-4">
                            <p className="text-[10px] sm:text-xs text-muted font-mono mb-1">Venus Karaka</p>
                            <p className="text-gold font-medium text-sm sm:text-base">Venus</p>
                            <p className="text-xs text-muted truncate">{result.methods?.venus?.nakshatra}</p>
                            <p className="text-white font-mono text-lg mt-1">{result.methods?.venus?.primary_syllable}</p>
                        </div>
                    </div>

                    {/* Sample names */}
                    <div className="pt-2">
                        <p className="text-[11px] sm:text-xs text-muted mb-3 font-mono uppercase tracking-widest">Names with these initials</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {result.sample_names?.map((name: string, i: number) => (
                                <span key={i} className="bg-surface border border-border text-white text-xs sm:text-sm px-3 py-1.5 rounded-full">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-surface2/80 border border-border rounded-2xl p-6 sm:p-8 relative">
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
