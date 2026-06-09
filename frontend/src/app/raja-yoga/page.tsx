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
import Link from 'next/link';

const TAGLINES = [
  "Scanning your Kendra and Trikona houses...",
  "Detecting Panch Mahapurusha Yogas...",
  "Checking Gaja Kesari formation...",
  "Calculating yoga strength and Dasha timing...",
  "Your Raja Yogas are revealed..."
];

const SUGGESTED_QUESTIONS = [
  "When will my Raja Yoga give results?",
  "Which career is best for my Raja Yoga?",
  "How strong is my Gaja Kesari Yoga?",
  "Do I have Dharma Karmadhipati Yoga?",
  "What mantra should I chant for my Raja Yoga?"
];

export default function RajaYogaPage() {
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
                    fetchRajaYoga(parsed);
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

    const fetchRajaYoga = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/raja-yoga`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    user_id: user?.uid || null,
                    chart_data: chart
                })
            });

            if (!res.ok) {
                setError('Could not load your Raja Yoga status. Please try again.');
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
        fetchRajaYoga(data);
    };

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button
                        onClick={() => { setError(null); if (chartData) fetchRajaYoga(chartData); }}
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
                    <h1 className="text-gold font-serif text-3xl font-medium">Raja Yoga Calculator — Find All Raj Yogas in Your Kundli</h1>
                    <p className="text-muted text-sm leading-relaxed">
                        Discover every Raja Yoga in your birth chart — Gaja Kesari, Panch Mahapurusha, Dharma Karmadhipati, Neecha Bhanga, and more. Get a personalised AI reading with exact Dasha timing for when your yogas will activate.
                    </p>
                </div>
            </div>
        );
    }

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
                </div>

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
            <TopToolsStrip currentTool="raja-yoga" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                
                {/* Hero card */}
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">Raja Yogas in Your Chart</p>
                    <h1 className="text-gold font-serif text-4xl sm:text-5xl tracking-wide py-2">
                        {result.total_yogas} {result.total_yogas === 1 ? 'Yoga' : 'Yogas'} Found
                    </h1>
                    <p className="text-white/70 text-sm">
                        {result.strong_yogas} Strong · {result.total_yogas - result.strong_yogas} Moderate
                    </p>
                    {result.yogakaraka && (
                        <p className="text-gold/60 text-xs font-mono">
                            Yogakaraka: {result.yogakaraka} · Ascendant: {result.asc_sign}
                        </p>
                    )}
                </div>

                {/* Share Card */}
                <ShareCard
                    question="Do I have Raja Yoga?"
                    answer={`${result.total_yogas} Raja Yogas Found`}
                    subtext={`Strongest: ${result.strongest_yoga} · ${result.asc_sign} Ascendant`}
                    keywords={result.yogas_found?.slice(0, 3).map((y: any) => y.name.split(' (')[0]) || []}
                    planet="Jupiter"
                />

                {/* Yogas list */}
                {result.yogas_found?.length > 0 && (
                    <div className="bg-surface2/80 border border-border rounded-2xl p-5 space-y-3">
                        <p className="text-muted text-xs uppercase tracking-widest font-mono">Your Raja Yogas</p>
                        <div className="space-y-3">
                            {result.yogas_found.map((yoga: any, i: number) => (
                                <div key={i} className={`rounded-xl p-4 border ${yoga.strength === 'Strong' ? 'bg-gold/10 border-gold/30' : yoga.strength === 'Good' ? 'bg-gold/5 border-gold/20' : 'bg-surface border-border/50'}`}>
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className={`text-sm font-medium ${yoga.strength === 'Strong' || yoga.strength === 'Good' ? 'text-gold' : 'text-white/80'}`}>
                                            {yoga.name}
                                        </p>
                                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0 ${yoga.strength === 'Strong' ? 'bg-gold/20 text-gold' : yoga.strength === 'Good' ? 'bg-gold/10 text-gold/80' : 'bg-surface2 text-muted'}`}>
                                            {yoga.strength}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gold/50 font-mono mb-1">{yoga.type}</p>
                                    <p className="text-muted text-xs leading-relaxed">{yoga.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No yogas found */}
                {result.yogas_found?.length === 0 && (
                    <div className="bg-surface2/80 border border-border rounded-2xl p-6 text-center space-y-2">
                        <p className="text-white font-serif text-lg">No Major Raja Yogas Detected</p>
                        <p className="text-muted text-sm leading-relaxed">Your chart doesn't show strong Kendra-Trikona connections. This doesn't mean a difficult life — many successful people have no classical Raja Yoga but strong Dhan Yogas and well-placed planets.</p>
                    </div>
                )}

                {/* AI Reading */}
                {result.reading && (
                    <div className="bg-surface2/80 border border-border rounded-2xl p-6 sm:p-8 relative min-h-[400px]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
                        <ReactMarkdown components={{
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
                        }}>
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
                )}

                {/* AI CTA */}
                <div className="bg-surface2 border border-gold/20 rounded-2xl p-5 text-center space-y-3">
                    <p className="text-gold font-serif text-lg">Want to know when your Raja Yoga activates?</p>
                    <p className="text-muted text-sm leading-relaxed">Ask AstroWord's AI about your specific Dasha timing, career fields, and how to maximise your Raja Yoga potential.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                        <button onClick={() => {
                            sessionStorage.setItem('pending_question', `I have ${result.total_yogas} Raja Yogas in my chart. My strongest is ${result.strongest_yoga}. When will it give results based on my current Dasha?`);
                            window.location.href = '/';
                        }} className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm">
                            ✦ Ask AI About My Raja Yoga
                        </button>
                        <button onClick={() => {
                            sessionStorage.setItem('pending_question', 'Which career path will activate my Raja Yoga most powerfully?');
                            window.location.href = '/';
                        }} className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm">
                            Best Career for Me →
                        </button>
                    </div>
                    <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                </div>

                {/* Cross links */}
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/atmakaraka" className="bg-surface border border-border hover:border-gold/40 rounded-xl p-4 text-center space-y-1 transition-all">
                        <p className="text-gold text-sm font-medium">Atmakaraka</p>
                        <p className="text-muted text-xs">Your soul planet</p>
                    </Link>
                    <Link href="/d9-chart" className="bg-surface border border-border hover:border-gold/40 rounded-xl p-4 text-center space-y-1 transition-all">
                        <p className="text-gold text-sm font-medium">D9 Navamsa</p>
                        <p className="text-muted text-xs">Yoga confirmation</p>
                    </Link>
                    <Link href="/darakaraka" className="bg-surface border border-border hover:border-gold/40 rounded-xl p-4 text-center space-y-1 transition-all">
                        <p className="text-gold text-sm font-medium">Darakaraka</p>
                        <p className="text-muted text-xs">Your spouse planet</p>
                    </Link>
                    <Link href="/dasha-calculator" className="bg-surface border border-border hover:border-gold/40 rounded-xl p-4 text-center space-y-1 transition-all">
                        <p className="text-gold text-sm font-medium">Dasha Timeline</p>
                        <p className="text-muted text-xs">When yogas activate</p>
                    </Link>
                </div>

                <MarriageReportPreview chartData={chartData} calculatorType="raja-yoga" />

                {/* Suggested Questions */}
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

                {/* Back button */}
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
