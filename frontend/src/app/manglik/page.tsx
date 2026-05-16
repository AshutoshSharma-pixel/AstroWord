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

const MANGLIK_TAGLINES = [
    "Locating Mars in your chart...",
    "Checking houses 1, 4, 7, 8, 12...",
    "Analysing Manglik severity...",
    "Checking cancellation factors...",
    "Your Manglik status is revealed..."
];

const SUGGESTED_QUESTIONS = [
    "What are the best remedies for my Manglik dosha?",
    "Should I only marry another Manglik?",
    "Will my Manglik dosha affect my marriage timing?",
    "How severe is my Manglik dosha?",
    "Can Manglik dosha be cancelled in my chart?"
];

export default function ManglikPage() {
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
                    fetchManglik(parsed);
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
                setTaglineIndex(prev => (prev < MANGLIK_TAGLINES.length - 1 ? prev + 1 : prev));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading, chartData, result]);

    const fetchManglik = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/manglik`, {
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
                setError('Could not load your Manglik status. Please try again.');
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
        fetchManglik(data);
    };

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button
                        onClick={() => { setError(null); if (chartData) fetchManglik(chartData); }}
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
                    <h1 className="text-gold font-serif text-3xl">Manglik Dosha Calculator — Am I Manglik?</h1>
                    <p className="text-muted text-sm leading-relaxed">Enter your birth details above to find out if you are Manglik, your severity level, cancellation factors, and get a personalised AI reading with remedies.</p>
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
                        {MANGLIK_TAGLINES[taglineIndex]}
                    </p>
                </div>
            </div>
        );
    }

    const getStatusText = () => {
        if (result.is_manglik && !result.partial_manglik) return "🔴 Manglik";
        if (result.partial_manglik) return "🟡 Partial Manglik";
        return "🟢 Not Manglik";
    };

    const getSeverityColor = () => {
        switch (result.severity) {
            case 'High': return 'text-red-400 border-red-400/20 bg-red-400/10';
            case 'Medium': return 'text-amber-400 border-amber-400/20 bg-amber-400/10';
            case 'Low': return 'text-green-400 border-green-400/20 bg-green-400/10';
            default: return 'text-green-400 border-green-400/20 bg-green-400/10';
        }
    };

    return (
        <div className="min-h-[100dvh] bg-bg text-text py-12">
            <TopToolsStrip currentTool="manglik" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">
                        Your Manglik Status is
                    </p>
                    <h1 className={`font-serif text-4xl sm:text-5xl tracking-wide py-2 ${result.is_manglik && !result.partial_manglik ? 'text-red-400' : result.partial_manglik ? 'text-amber-400' : 'text-green-400'}`}>
                        {getStatusText().split(' ')[1] || getStatusText()}
                    </h1>
                    <p className="text-white text-sm tracking-wide">
                        Mars in house {result.mars_house} · {result.mars_sign} · {result.mars_nakshatra}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                        <span className={`text-xs border px-4 py-1.5 rounded-full font-mono ${getSeverityColor()}`}>
                            Severity: {result.severity}
                        </span>
                        {result.mars_retrograde && (
                            <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">
                                Retrograde
                            </span>
                        )}
                    </div>

                    {result.cancellations && result.cancellations.length > 0 && (
                        <div className="mt-4 text-left bg-surface/50 p-4 rounded-xl border border-border">
                            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-2">Cancellation Factors:</p>
                            <ul className="space-y-1">
                                {result.cancellations.map((c: string, i: number) => (
                                    <li key={i} className="text-sm text-text/90 flex items-start gap-2">
                                        <span className="text-gold">•</span>
                                        <span>{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 justify-center pt-4">
                        {result.keywords?.slice(0, 6).map((kw: string, i: number) => (
                            <span key={i} className="text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>

                <ShareCard
                  question="Am I Manglik?"
                  answer={result.is_manglik && !result.partial_manglik 
                    ? "Yes — I am Manglik" 
                    : result.partial_manglik 
                    ? "Partially Manglik" 
                    : "Not Manglik ✓"}
                  subtext={`Mars in house ${result.mars_house} · ${result.mars_sign} · ${result.mars_nakshatra}`}
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

                <div className="mt-6 bg-surface2 border border-gold/20 rounded-2xl p-5 text-center space-y-3">
                  <p className="text-gold font-serif text-lg">Want to ask follow-up questions?</p>
                  <p className="text-muted text-sm leading-relaxed">
                    AstroWord&apos;s AI can answer anything about your chart — marriage timing, career, relationships, 2026 predictions — in plain language.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                    <button
                      onClick={() => {
                        sessionStorage.setItem('pending_question', 'Tell me more about my Manglik dosha and what remedies I should perform');
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

                <MarriageReportPreview 
                    chartData={chartData} 
                    calculatorType="manglik"
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

            <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">
                
                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">What is Manglik Dosha in Vedic Astrology?</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        Manglik Dosha (also called Kuja Dosha, Chevvai Dosham, or Angaraka Dosha) is one of the most significant concepts in Vedic astrology, 
                        especially when it comes to marriage compatibility. It occurs when Mars (Mangal) is placed in specific houses of a person's 
                        birth chart — the 1st, 4th, 7th, 8th, or 12th house from the Ascendant (Lagna).
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        Mars is a fierce, fiery planet that governs energy, aggression, passion, and willpower. When placed in houses 
                        directly related to marriage, partnerships, and domestic harmony, Mars can introduce tension, conflict, or delays 
                        in marital life. However, this does not mean every Manglik person will have a troubled marriage — 
                        Vedic astrology provides powerful cancellation rules that can completely neutralise the dosha.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Which Houses Make You Manglik?</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        According to classical Vedic astrology, a person is Manglik when Mars occupies any of these 5 houses 
                        in the birth chart (D1 chart) from the Ascendant:
                    </p>
                    <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
                        <li>• <span className="text-white">1st House (Lagna)</span> — Mars aspects the 7th house of marriage directly, creating a dominant, assertive personality that can clash with a partner.</li>
                        <li>• <span className="text-white">4th House</span> — Affects domestic happiness and home environment. Can cause restlessness and conflicts in the household.</li>
                        <li>• <span className="text-white">7th House</span> — The house of marriage itself. Mars here is considered the most intense Manglik placement, directly influencing the spouse and partnership.</li>
                        <li>• <span className="text-white">8th House</span> — The house of longevity and in-laws. Traditionally considered very significant for Manglik Dosha, as it connects to the spouse's wellbeing.</li>
                        <li>• <span className="text-white">12th House</span> — The house of bed pleasures and losses. Mars here can affect the emotional and physical intimacy in marriage.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Manglik Dosha Cancellation Rules</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        Classical Vedic texts list several conditions that cancel or significantly reduce Manglik Dosha. 
                        AstroWord checks these automatically when calculating your result:
                    </p>
                    <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
                        <li>• <span className="text-white">Mars in Aries or Scorpio</span> — Mars rules these signs. In its own sign, Mars is dignified and the dosha is greatly reduced.</li>
                        <li>• <span className="text-white">Mars in Capricorn</span> — Mars is exalted here. The aggressive energy of Mars is channelled constructively, neutralising the dosha.</li>
                        <li>• <span className="text-white">Jupiter aspects Mars</span> — Jupiter's benefic influence on Mars calms its fiery nature. Widely accepted cancellation in classical texts.</li>
                        <li>• <span className="text-white">Retrograde Mars</span> — A retrograde Mars internalises its energy. The external impact on marriage is considerably reduced.</li>
                        <li>• <span className="text-white">Both partners are Manglik</span> — When both the bride and groom are Manglik, the doshas cancel each other out. This is the most commonly cited cancellation rule in Indian marriages.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">How Severe is Manglik Dosha?</h2>
                    <p className="text-muted text-sm leading-relaxed">
                        Not all Manglik placements are equal. The severity depends on which house Mars occupies:
                    </p>
                    <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
                        <li>• <span className="text-white">High Severity</span> — Mars in 7th or 8th house. These directly impact the spouse and marital longevity. Remedies are strongly recommended.</li>
                        <li>• <span className="text-white">Medium Severity</span> — Mars in 1st or 4th house. Affects personality and home but can be managed with awareness and compatibility matching.</li>
                        <li>• <span className="text-white">Low Severity</span> — Mars in 12th house. The mildest form. Primarily affects the emotional and physical dimension of marriage.</li>
                    </ul>
                    <p className="text-muted text-sm leading-relaxed">
                        AstroWord calculates your exact severity level and checks all cancellation factors automatically.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
                    
                    <div className="space-y-6">
                        {[
                            {
                                q: "Am I Manglik if Mars is in the 2nd house?",
                                a: "No. According to the primary classical Vedic tradition, Manglik Dosha applies to Mars in houses 1, 4, 7, 8, and 12 from the Ascendant. Some regional traditions include the 2nd house, but AstroWord follows the standard Parashari and Jaimini approach."
                            },
                            {
                                q: "Can a Manglik marry a non-Manglik?",
                                a: "Yes, many Manglik people marry non-Mangliks and have happy marriages. The key is checking other compatibility factors — Moon sign compatibility, Dasha overlaps, and the overall strength of the 7th house. If cancellation rules apply, the dosha may not be significant at all."
                            },
                            {
                                q: "Does Manglik Dosha go away after 28?",
                                a: "There is a popular belief that Manglik Dosha reduces after age 28 because Mars matures at 28. However, this is a folk belief and not universally accepted in classical Vedic astrology. The planetary placement in your chart remains the same regardless of age."
                            },
                            {
                                q: "What are the best remedies for Manglik Dosha?",
                                a: "Common remedies include Mangal Puja on Tuesdays, reciting the Mangal Beej Mantra (Om Kram Kreem Kraum Sah Bhaumaya Namah), wearing a red coral gemstone after consulting a Jyotishi, donating red lentils on Tuesdays, and fasting on Tuesdays. AstroWord's AI gives personalised remedies based on your specific Mars placement."
                            },
                            {
                                q: "Is Manglik Dosha really that serious?",
                                a: "In modern Vedic astrology practice, most experienced Jyotishis treat Manglik Dosha as one factor among many — not a standalone predictor of marital problems. The full chart, Navamsa (D9), and Dasha periods together determine the quality of marriage. Many Manglik individuals have excellent, long-lasting marriages."
                            },
                            {
                                q: "How accurate is AstroWord's Manglik calculator?",
                                a: "AstroWord uses the Swiss Ephemeris with Lahiri ayanamsa — the same standard used by professional Vedic astrologers in India. The calculation is based on your exact birth date, time, and place. The AI reading then interprets your specific Mars placement, nakshatra, and cancellation factors to give a personalised analysis."
                            },
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-border/40 pb-5">
                                <h3 className="text-white text-sm font-medium mb-2">{faq.q}</h3>
                                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
