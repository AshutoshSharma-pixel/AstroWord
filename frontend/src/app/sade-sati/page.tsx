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
    "Locating the Moon in your birth chart...",
    "Calculating Saturn's 2026 transit position...",
    "Measuring house distance from Moon...",
    "Analyzing Sade Sati and Dhaiya periods...",
    "Synthesizing your Shani transit reading..."
];

const SUGGESTED_QUESTIONS = [
    "What are the best remedies for my Sade Sati?",
    "How will Shani Dhaiya affect my career?",
    "When does my current Sade Sati phase end?",
    "What are the emotional effects of Peak Sade Sati?",
    "Can Sade Sati bring positive results in career?"
];

export default function SadeSatiPage() {
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
                    fetchSadeSati(parsed);
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

    const fetchSadeSati = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/sade-sati`, {
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
                setError('Could not calculate your Sade Sati status. Please try again.');
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
        fetchSadeSati(data);
    };

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button
                        onClick={() => { setError(null); if (chartData) fetchSadeSati(chartData); }}
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
                    <h1 className="text-gold font-serif text-3xl">Sade Sati Calculator — Free Shani Sade Sati Check</h1>
                    <p className="text-muted text-sm leading-relaxed">Enter your birth details above to find out if you are under Sade Sati or Shani Dhaiya, your current phase, transit timeline, and get a detailed personalized AI reading with Vedic remedies.</p>
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

    const getStatusHeader = () => {
        if (result.is_active) {
            return `Active — ${result.phase} Phase`;
        }
        if (result.has_dhaiya) {
            return `Active Dhaiya — ${result.dhaiya_type}`;
        }
        return "Sade Sati Inactive";
    };

    const getStatusBadgeColor = () => {
        if (result.is_active) {
            if (result.phase === 'Peak') return 'text-red-400 border-red-400/20 bg-red-400/10';
            return 'text-amber-400 border-amber-400/20 bg-amber-400/10';
        }
        if (result.has_dhaiya) {
            return 'text-amber-400 border-amber-400/20 bg-amber-400/10';
        }
        return 'text-green-400 border-green-400/20 bg-green-400/10';
    };

    return (
        <div className="min-h-[100dvh] bg-bg text-text py-12">
            <TopToolsStrip currentTool="sade-sati" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">
                        Saturn Transit Analysis (2026)
                    </p>
                    <h1 className={`font-serif text-3xl sm:text-4xl tracking-wide py-2 ${result.is_active && result.phase === 'Peak' ? 'text-red-400' : result.is_active || result.has_dhaiya ? 'text-amber-400' : 'text-green-400'}`}>
                        {getStatusHeader()}
                    </h1>
                    <p className="text-white text-sm tracking-wide">
                        Natal Moon Sign: <span className="text-gold font-serif">{result.moon_sign}</span> · Saturn in <span className="text-gold font-serif">{result.saturn_sign}</span>
                    </p>
                    <div className="flex justify-center">
                        <span className={`text-xs border px-4 py-1.5 rounded-full font-mono ${getStatusBadgeColor()}`}>
                            {result.is_active ? '7.5 Years Cycle Active' : result.has_dhaiya ? '2.5 Years Cycle Active' : 'Transit Safe'}
                        </span>
                    </div>

                    {/* Phase Visualizer */}
                    <div className="mt-6 pt-4 border-t border-border/30">
                        <p className="text-xs text-muted uppercase tracking-widest font-mono mb-4">Sade Sati Phase Tracker</p>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { title: '1. Rising', desc: '12th House (Aquarius)', name: 'Rising' },
                                { title: '2. Peak', desc: '1st House (Pisces)', name: 'Peak' },
                                { title: '3. Setting', desc: '2nd House (Aries)', name: 'Setting' }
                            ].map((ph, i) => {
                                const isActivePhase = result.is_active && result.phase === ph.name;
                                return (
                                    <div 
                                        key={i} 
                                        className={`p-3 rounded-xl border transition-all text-center ${isActivePhase ? 'bg-amber-400/10 border-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.1)]' : 'bg-surface/50 border-border/50 text-muted'}`}
                                    >
                                        <p className={`text-xs font-mono font-medium ${isActivePhase ? 'text-gold' : 'text-muted'}`}>{ph.title}</p>
                                        <p className="text-[10px] mt-1 leading-tight">{ph.desc}</p>
                                        {isActivePhase && (
                                            <span className="inline-block mt-2 text-[9px] bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-mono">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Dhaiya Box */}
                    {result.has_dhaiya && (
                        <div className="mt-4 text-left bg-surface/50 p-4 rounded-xl border border-amber-500/20">
                            <p className="text-xs text-amber-400 uppercase tracking-widest font-mono mb-2">⚠ Shani Dhaiya Active:</p>
                            <p className="text-sm text-text/90 leading-relaxed">
                                You are currently experiencing <strong className="text-white">{result.dhaiya_type}</strong>. 
                                {result.dhaiya_type === 'Kantaka Shani' 
                                    ? ' This transit occurs through the 4th house from the Moon, impacting domestic stability, mental peace, and focus in work/career.' 
                                    : ' This transit occurs through the 8th house from the Moon, bringing sudden transformations, challenges in investments, and karmic life lessons.'}
                            </p>
                        </div>
                    )}

                    {/* Timeline Tracker */}
                    <div className="mt-4 text-left bg-surface/30 p-4 rounded-xl border border-border">
                        <p className="text-xs text-muted uppercase tracking-widest font-mono mb-3">Transit Timeline Parameters</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted block text-xs font-mono">CYCLE START YEAR</span>
                                <span className="text-white font-medium">{result.start_year}</span>
                            </div>
                            <div>
                                <span className="text-muted block text-xs font-mono">CYCLE END YEAR</span>
                                <span className="text-white font-medium">{result.end_year}</span>
                            </div>
                            <div>
                                <span className="text-muted block text-xs font-mono">CURRENT PHASE END</span>
                                <span className="text-white font-medium">{result.current_phase_end}</span>
                            </div>
                            <div>
                                <span className="text-muted block text-xs font-mono">NEXT SADE SATI STARTS</span>
                                <span className="text-white font-medium">{result.next_start}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <ShareCard
                  question="Am I in Sade Sati?"
                  answer={result.is_active ? `Yes — ${result.phase} Phase` : result.has_dhaiya ? `Dhaiya: ${result.dhaiya_type}` : "No — Inactive"}
                  subtext={result.is_active ? `Sade Sati active till ${result.end_year}` : `Next starts: ${result.next_start}`}
                  keywords={result.is_active ? ['Sade Sati', result.phase, result.moon_sign] : ['Saturn Transit', result.moon_sign]}
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
                        sessionStorage.setItem('pending_question', `Tell me more about my ${result.is_active ? result.phase + ' Sade Sati' : result.has_dhaiya ? result.dhaiya_type : 'Saturn transit'} and what remedies I should perform`);
                        window.location.href = '/';
                      }}
                      className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
                    >
                      ✦ Ask the AI — Free
                    </button>
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'How will Saturn affect my career and wealth in this transit?');
                        window.location.href = '/';
                      }}
                      className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm"
                    >
                      Saturn Career Impact
                    </button>
                  </div>
                  <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                </div>

                <MarriageReportPreview 
                    chartData={chartData} 
                    calculatorType="sade-sati"
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
