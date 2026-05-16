'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import ReactMarkdown from 'react-markdown';
import MarriageReportPreview from '@/components/MarriageReportPreview';
import { motion } from 'framer-motion';
import { cleanReading } from '@/utils/cleanReading';
import { API_URL } from '@/utils/api';
import { handleStreamResponse } from '@/utils/stream';
import ShareCard from '@/components/ShareCard';
import TopToolsStrip from '@/components/TopToolsStrip';

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

            if (!res.ok) {
                setError('Could not load your Gana. Please try again.');
                setIsLoading(false);
                return;
            }

            let resultData: any = { reading: '' };

            await handleStreamResponse(
                res,
                (meta) => {
                    resultData = { ...resultData, ...meta };
                    setResult({ ...resultData });
                    setIsLoading(false); // Stop loading animation, show the result card
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
        fetchGana(data);
    };

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
                <div className="max-w-2xl mx-auto px-4 pb-16 space-y-8 mt-12 border-t border-border/30 pt-12">
                    <h1 className="text-gold font-serif text-3xl">Gana Calculator — Find Your Vedic Soul Type</h1>
                    <p className="text-muted text-sm leading-relaxed">Enter your birth details above to discover your Gana (Deva, Manushya, or Rakshasa) based on your Moon nakshatra and understand how it shapes your nature and marriage compatibility.</p>
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
            <TopToolsStrip currentTool="gana" />
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

                <ShareCard
                  question="What is my cosmic nature?"
                  answer={`${result.gana} Gana`}
                  subtext={`Moon in ${result.moon_nakshatra} Nakshatra · Pada ${result.moon_pada}`}
                  keywords={result.keywords?.slice(0, 4)}
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

                <div className="text-center py-4">
                    <a
                        href="/blog/what-is-gana-koota"
                        className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors"
                    >
                        <span>📖</span>
                        <span>Read: What is Gana in Vedic Astrology?</span>
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
                        sessionStorage.setItem('pending_question', 'Tell me more about my Gana and compatibility');
                        window.location.href = '/';
                      }}
                      className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
                    >
                      ✦ Ask the AI — Free
                    </button>
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'What Gana should my spouse be for best compatibility?');
                        window.location.href = '/';
                      }}
                      className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm"
                    >
                      Who is compatible with me?
                    </button>
                  </div>
                  <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                </div>

                <MarriageReportPreview
                  chartData={chartData}
                  calculatorType="gana"
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

            {/* SEO Content Block */}
            <div className="max-w-2xl mx-auto px-4 pb-16 space-y-12 mt-12 border-t border-border/30 pt-12">
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">What is Gana in Vedic Astrology?</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        Gana is a Sanskrit term meaning "group" or "category." In Vedic astrology, it is one of the 
                        crucial factors used in Nakshatra-based personality analysis and marriage matching 
                        (Guna Milan). Every person is born into one of three Ganas based on the Nakshatra 
                        (lunar mansion) the Moon was in at the time of their birth.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        The three Ganas are Deva (Divine), Manushya (Human), and Rakshasa (Fierce). 
                        Each represents a fundamental temperament, set of values, and way of reacting 
                        to life's challenges. In marriage compatibility, Gana matching carries 6 out of 36 points, 
                        indicating how well a couple's temperaments will blend.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">The Three Ganas and Their Traits</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { name: 'Deva Gana', traits: 'Kind, spiritual, soft-spoken, and avoids conflict. Highly intuitive.' },
                            { name: 'Manushya Gana', traits: 'Ambitious, hard-working, practical, and family-oriented.' },
                            { name: 'Rakshasa Gana', traits: 'Intense, independent, strong-willed, and naturally investigative.' },
                        ].map((item) => (
                            <div key={item.name} className="bg-surface border border-border rounded-xl p-3">
                                <p className="text-gold text-sm font-medium mb-1 font-serif">{item.name}</p>
                                <p className="text-muted text-xs leading-relaxed">{item.traits}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-6">
                    <h2 className="text-gold font-serif text-2xl">Gana Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">How can I find my Gana?</h3>
                            <p className="text-muted text-sm leading-relaxed">Your Gana is determined solely by your Moon Nakshatra. Each of the 27 Nakshatras is assigned to one of the three Ganas. You can use our Gana calculator above to find your Nakshatra and Gana instantly by entering your birth details.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">Can a Deva Gana person marry a Rakshasa Gana person?</h3>
                            <p className="text-muted text-sm leading-relaxed">While traditionally considered a "challenging" match in Guna Milan (receiving 0 out of 6 points), it is not a deal-breaker. If other factors like Bhakoot and Nadi are strong, or if the couple is aware of their differing temperaments, the marriage can still be successful.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">Is Rakshasa Gana bad or "evil"?</h3>
                            <p className="text-muted text-sm leading-relaxed">Not at all. In modern Vedic astrology, Rakshasa Gana represents someone with high energy, strong willpower, and an ability to see through deception. They make excellent detectives, leaders, and entrepreneurs who aren't afraid of challenges.</p>
                        </div>
                        <div className="bg-surface2/50 border border-border rounded-xl p-5">
                            <h3 className="text-white font-medium mb-2">What is the most compatible Gana match?</h3>
                            <p className="text-muted text-sm leading-relaxed">The highest compatibility score (6/6) is achieved when both partners belong to the same Gana (Deva-Deva, Manushya-Manushya, or Rakshasa-Rakshasa). This indicates that their fundamental temperaments are in sync.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
