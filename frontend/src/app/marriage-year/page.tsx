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
    "Analyzing your 7th house and its lord...",
    "Reading Venus and Jupiter placements...",
    "Calculating Dasha and Antardasha windows...",
    "Checking auspicious marriage periods...",
    "Your marriage timeline is revealed..."
];

const SUGGESTED_QUESTIONS = [
    "What can I do to attract marriage faster?",
    "Will I have a love or arranged marriage?",
    "What obstacles are delaying my marriage?",
    "What will my spouse be like?",
    "Which city will my spouse be from?"
];

export default function MarriageYearPage() {
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
                    fetchMarriageYear(parsed);
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

    const fetchMarriageYear = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/marriage-year`, {
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
                if (data.reading) {
                    // Extract numbered list and prepend header
                    const numbered = data.reading.match(/1\.[\s\S]+/);
                    if (numbered) {
                        data.reading = '## Marriage Timing Analysis\n\n' + numbered[0];
                    } else {
                        data.reading = '## Marriage Timing Analysis\n\n' + data.reading;
                    }
                }
                setResult(data);
            } else {
                setError('Could not load your marriage year prediction. Please try again.');
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
        fetchMarriageYear(data);
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
                        onClick={() => { setError(null); if (chartData) fetchMarriageYear(chartData); }}
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
                <div className="max-w-2xl mx-auto px-4 pb-16 space-y-8 mt-12 border-t border-border/30 pt-12">
                    <h1 className="text-gold font-serif text-3xl">Marriage Year Predictor — When Will You Get Married?</h1>
                    <p className="text-muted text-sm leading-relaxed">Enter your birth details above to get your most auspicious marriage windows predicted by Vedic Dasha analysis, Jupiter transits, and 7th house activation.</p>
                </div>
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
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 text-center space-y-3">
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">
                        Your Marriage Windows
                    </p>
                    <h1 className="text-gold font-serif text-3xl">
                        {result.most_likely_year}
                    </h1>
                    <p className="text-white/60 text-sm">
                        Most auspicious year for marriage or any romantic relationship
                    </p>
                </div>

                <div className="space-y-3">
                    <p className="text-xs text-muted uppercase tracking-widest font-mono">All Marriage Windows</p>
                    {result.windows?.map((window: any, i: number) => (
                        <div key={i} className={`bg-surface2 border rounded-xl p-4 flex items-center justify-between ${i === 0 ? 'border-gold/30' : 'border-border'
                            }`}>
                            <div>
                                <p className={`font-serif text-lg ${i === 0 ? 'text-gold' : 'text-white'}`}>
                                    {window.year}
                                </p>
                                <p className="text-muted text-xs font-mono mt-0.5">
                                    {window.dasha_period}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className={`inline-block text-xs px-2 py-1 rounded-full border font-mono ${window.strength === 'Strong'
                                    ? 'bg-gold/10 text-gold border-gold/20'
                                    : window.strength === 'Moderate'
                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        : 'bg-white/5 text-white/40 border-white/10'
                                    }`}>
                                    {window.strength}
                                </div>
                                <p className="text-muted text-xs mt-1">{window.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-surface2/80 border border-border rounded-2xl p-6 sm:p-8 relative">
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

                <div className="text-center text-xs text-muted/50 px-4 font-serif italic">
                    Astrology shows the possibility of a romantic involvement. Free will and your choices always play the ultimate role.
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

            {/* SEO Content Block */}
            <div className="max-w-2xl mx-auto px-4 pb-16 space-y-8 mt-12 border-t border-border/30 pt-12">
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">How Does Vedic Astrology Predict Marriage Year?</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        Vedic astrology predicts marriage timing through a combination of Dasha (planetary period)
                        analysis, Jupiter transits, and activation of the 7th house. Unlike Western astrology,
                        Vedic timing predictions are remarkably precise because they use your exact birth time
                        to calculate which planetary period is running at any given moment.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Key Indicators for Marriage Timing</h2>
                    <div className="space-y-3">
                        {[
                            { title: 'Venus Mahadasha or Antardasha', desc: 'Venus is the natural karaka of marriage. When Venus dasha runs, marriage likelihood is very high.' },
                            { title: '7th Lord Dasha', desc: 'When the lord of your 7th house runs its Mahadasha or Antardasha, marriage often occurs.' },
                            { title: 'Jupiter Transit over 7th House', desc: 'Jupiter transiting your 7th house or natal Venus acts as a trigger for marriage events.' },
                            { title: 'Darakaraka Dasha', desc: 'When your Darakaraka planet runs its period, it activates the spouse significator strongly.' },
                            { title: "Saturn's Role", desc: 'Saturn can delay marriage but also confirms it. Saturn completing Sade Sati often brings marriage after the pressure lifts.' },
                        ].map((item) => (
                            <div key={item.title} className="bg-surface border border-border rounded-xl p-4">
                                <p className="text-gold text-sm font-medium mb-1">✦ {item.title}</p>
                                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
