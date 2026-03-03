'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { cleanReading } from '@/utils/cleanReading';
import { API_URL } from '@/utils/api';

const GANA_TAGLINES = [
    "Reading your Moon's nakshatra...",
    "Calculating your cosmic nature...",
    "Consulting the ancient Gana system...",
    "Revealing your primal soul type...",
    "Your Gana is determined..."
];

const SUGGESTED_QUESTIONS = [
    "Am I compatible with my partner's Gana?",
    "How does my Gana affect my marriage?",
    "What are my Gana's biggest strengths?",
    "Which careers suit my Gana type?",
    "How can I balance my Gana energy?"
];

export default function GanaPage() {
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
            if (!user) {
                router.push('/login');
                return;
            }

            const savedChart = localStorage.getItem('astroword_chart');
            if (savedChart) {
                try {
                    const parsed = JSON.parse(savedChart);
                    setChartData(parsed);
                    fetchGana(parsed);
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
                setTaglineIndex(prev => (prev < GANA_TAGLINES.length - 1 ? prev + 1 : prev));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading, chartData, result]);

    const fetchGana = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/gana`, {
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
                setError('Could not load your Gana. Please try again.');
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
        fetchGana(data);
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
                        onClick={() => { setError(null); if (chartData) fetchGana(chartData); }}
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
                    <svg width="700" height="700" viewBox="0 0 700 700" fill="none">
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
                        <circle cx="350" cy="10" r="22" fill="#FFD700" opacity="0.08" />
                        <circle cx="690" cy="350" r="8" fill="#E8E4DC" />
                        <circle cx="690" cy="350" r="14" fill="#E8E4DC" opacity="0.2" />
                        <circle cx="690" cy="350" r="20" fill="#E8E4DC" opacity="0.07" />
                        <circle cx="590" cy="110" r="7" fill="#FF4444" />
                        <circle cx="590" cy="110" r="13" fill="#FF4444" opacity="0.2" />
                        <circle cx="590" cy="110" r="19" fill="#FF4444" opacity="0.07" />
                        <circle cx="590" cy="590" r="6" fill="#4CAF77" />
                        <circle cx="590" cy="590" r="11" fill="#4CAF77" opacity="0.2" />
                        <circle cx="590" cy="590" r="17" fill="#4CAF77" opacity="0.07" />
                        <circle cx="110" cy="590" r="9" fill="#F0A500" />
                        <circle cx="110" cy="590" r="15" fill="#F0A500" opacity="0.22" />
                        <circle cx="110" cy="590" r="22" fill="#F0A500" opacity="0.08" />
                        <circle cx="110" cy="110" r="7" fill="#FF69B4" />
                        <circle cx="110" cy="110" r="13" fill="#FF69B4" opacity="0.2" />
                        <circle cx="110" cy="110" r="19" fill="#FF69B4" opacity="0.07" />
                        <circle cx="350" cy="690" r="8" fill="#7c6fcd" />
                        <circle cx="350" cy="690" r="14" fill="#7c6fcd" opacity="0.22" />
                        <circle cx="350" cy="690" r="20" fill="#7c6fcd" opacity="0.08" />
                        <circle cx="10" cy="350" r="6" fill="#4A90E2" />
                        <circle cx="10" cy="350" r="12" fill="#4A90E2" opacity="0.2" />
                        <circle cx="490" cy="70" r="5" fill="#00BCD4" />
                        <circle cx="490" cy="70" r="10" fill="#00BCD4" opacity="0.2" />
                    </svg>
                </motion.div>

                <div className="z-10 text-center space-y-4">
                    <p className="font-serif text-lg sm:text-2xl text-gold animate-pulse px-6">
                        {GANA_TAGLINES[taglineIndex]}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-bg text-text py-12">
            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4">
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">Your Gana is</p>
                    <h1 className="text-gold font-serif text-4xl sm:text-5xl">{result.gana} Gana</h1>
                    <p className="text-white text-sm">Moon in {result.moon_nakshatra} Nakshatra · Pada {result.moon_pada}</p>
                    <div className="text-4xl">{result.gana === 'Deva' ? '✨' : result.gana === 'Manushya' ? '🌿' : '🔱'}</div>

                    <div className="flex flex-wrap gap-2 justify-center pt-4">
                        {result.keywords?.map((kw: string, i: number) => (
                            <span key={i} className="text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">
                                {kw}
                            </span>
                        ))}
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

            {/* SEO Content Block */}
            <div className="max-w-2xl mx-auto px-4 pb-16 space-y-8 mt-12 border-t border-border/30 pt-12">
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">What is Gana in Vedic Astrology?</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        Gana is one of the most important factors in Vedic astrology match making (Kundli Milan).
                        Every person belongs to one of three Ganas based on their Moon nakshatra — Deva (divine),
                        Manushya (human) or Rakshasa (fierce). Gana reveals your fundamental nature and temperament.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        In marriage compatibility, Gana matching carries 6 points out of 36 total in Ashtakoot
                        matching. Same Gana couples are considered most compatible. Deva-Rakshasa combination
                        is traditionally considered challenging.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Gana Compatibility Chart</h2>
                    <div className="overflow-x-auto rounded-xl border border-border">
                        <table className="w-full text-xs text-muted">
                            <thead>
                                <tr className="border-b border-border bg-surface">
                                    <th className="text-left py-3 px-4 text-gold font-mono">Your Gana</th>
                                    <th className="text-left py-3 px-4 text-gold font-mono">Partner's Gana</th>
                                    <th className="text-left py-3 px-4 text-gold font-mono">Score</th>
                                    <th className="text-left py-3 px-4 text-gold font-mono">Compatibility</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Deva', 'Deva', '6/6', 'Excellent'],
                                    ['Deva', 'Manushya', '5/6', 'Good'],
                                    ['Deva', 'Rakshasa', '0/6', 'Challenging'],
                                    ['Manushya', 'Manushya', '6/6', 'Excellent'],
                                    ['Manushya', 'Rakshasa', '0/6', 'Moderate'],
                                    ['Rakshasa', 'Rakshasa', '6/6', 'Excellent'],
                                ].map(([g1, g2, score, compat]) => (
                                    <tr key={`${g1}-${g2}`} className="border-b border-border/30 hover:bg-surface/50 transition-colors">
                                        <td className="py-3 px-4">{g1}</td>
                                        <td className="py-3 px-4">{g2}</td>
                                        <td className="py-3 px-4 text-gold font-mono">{score}</td>
                                        <td className="py-3 px-4">{compat}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
