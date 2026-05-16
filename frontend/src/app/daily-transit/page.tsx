'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
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
                        <h1 className="text-gold font-serif text-3xl">Daily Planetary Transits & Readings</h1>
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
            <TopToolsStrip />
            
            <div className="max-w-4xl mx-auto px-4 pt-8">
                {isLoading && !result && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <motion.div 
                                className="w-20 h-20 border-2 border-gold/20 border-t-gold rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
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
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
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

                        {result.keywords && <ShareCard keywords={result.keywords} />}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
