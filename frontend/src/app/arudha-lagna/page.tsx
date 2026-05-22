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
    "Finding your Lagna lord...",
    "Counting signs to the lord...",
    "Projecting the Arudha...",
    "Applying exception rules...",
    "Your Arudha Lagna is revealed...",
];

const SUGGESTED_QUESTIONS = [
    "What does my Arudha Lagna say about my career and reputation?",
    "How does my Arudha Lagna differ from my true self?",
    "Which Dasha will bring major changes to my public image?",
    "What is the difference between Arudha Lagna and Ascendant?",
    "How can I strengthen my Arudha Lagna?",
];

export default function ArudhaPage() {
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
                    fetchArudha(parsed);
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

    const fetchArudha = async (chart: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const idToken = user ? await user.getIdToken() : '';
            const res = await fetch(`${API_URL}/api/arudha`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
                body: JSON.stringify({ user_id: user?.uid || null, chart_data: chart })
            });
            if (!res.ok) { setError('Could not calculate your Arudha Lagna. Please try again.'); setIsLoading(false); return; }
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
    const handleFormSubmit = (data: any) => { setChartData(data); fetchArudha(data); };

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-2xl">🌙</p>
                    <p className="text-white font-serif text-lg">The cosmos need a moment</p>
                    <p className="text-muted text-sm">{error}</p>
                    <button onClick={() => { setError(null); if (chartData) fetchArudha(chartData); }} className="bg-gold/10 border border-gold/20 text-gold px-6 py-2 rounded-xl text-sm hover:bg-gold/20 transition-all">Try Again</button>
                    <button onClick={() => router.push('/')} className="block text-muted text-sm hover:text-white transition-colors mt-2 mx-auto">← Back to Chat</button>
                </div>
            </div>
        );
    }

    if (!chartData && !isLoading) {
        return (
            <div className="min-h-[100dvh] bg-bg text-text">
                <WelcomeScreen onComplete={handleFormSubmit} />
                <div className="max-w-2xl mx-auto px-4 pb-16 space-y-8 mt-12 border-t border-border/30 pt-12">
                    <h1 className="text-gold font-serif text-3xl">Arudha Lagna Calculator — Your Public Image & Maya Lagna</h1>
                    <p className="text-muted text-sm leading-relaxed">Enter your birth details above to calculate your Arudha Lagna and discover how the world perceives you.</p>
                </div>
            </div>
        );
    }

    if (isLoading || !result) {
        return (
            <div className="min-h-[100dvh] bg-bg text-text flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
        );
    }

    return (
        <div className="min-h-[100dvh] bg-bg text-text py-12">
            <TopToolsStrip currentTool="arudha-lagna" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">

                {/* Result Card */}
                <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <p className="text-muted text-xs uppercase tracking-widest font-mono">Your Arudha Lagna is</p>
                    <h1 className="font-serif text-4xl sm:text-5xl tracking-wide py-2 text-gold">{result.arudha_sign}</h1>
                    <p className="text-white text-sm tracking-wide">
                        Ascendant: {result.ascendant} · Lagna Lord: {result.lagna_lord} in {result.lagna_lord_sign}
                    </p>
                    <p className="text-muted text-xs font-mono">
                        House {result.arudha_house_from_asc} from Ascendant · AL Lord: {result.arudha_lord} in House {result.arudha_lord_house}
                    </p>
                    {result.lagna_lord_retrograde && (
                        <span className="inline-block text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">{result.lagna_lord} Retrograde</span>
                    )}
                    {result.planets_in_arudha?.length > 0 && (
                        <div className="mt-3 bg-surface/50 p-3 rounded-xl border border-border text-left">
                            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-1">Planets in Arudha Lagna:</p>
                            <p className="text-sm text-white">{result.planets_in_arudha.join(', ')}</p>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                        {result.keywords?.slice(0, 5).map((kw: string, i: number) => (
                            <span key={i} className="text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">{kw}</span>
                        ))}
                    </div>
                </div>

                <ShareCard
                    question="What is my Arudha Lagna?"
                    answer={`${result.arudha_sign} Arudha Lagna`}
                    subtext={`Ascendant ${result.ascendant} · ${result.lagna_lord} in ${result.lagna_lord_sign} · House ${result.arudha_house_from_asc}`}
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
                    <p className="text-muted text-sm leading-relaxed">AstroWord&apos;s AI can answer anything about your chart — career, reputation, relationships — in plain language.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                        <button onClick={() => { sessionStorage.setItem('pending_question', 'Tell me more about my Arudha Lagna and what it says about my reputation'); window.location.href = '/'; }} className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm">✦ Ask the AI — Free</button>
                        <button onClick={() => { sessionStorage.setItem('pending_question', 'What career is best for my Arudha Lagna sign?'); window.location.href = '/'; }} className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm">Best career for me?</button>
                    </div>
                    <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
                </div>

                <MarriageReportPreview chartData={chartData} calculatorType="arudha-lagna" />

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

            {/* SEO Content */}
            <div className="max-w-2xl mx-auto px-4 pb-16 space-y-10 mt-12 border-t border-border/30 pt-12">

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">What is Arudha Lagna in Vedic Astrology?</h2>
                    <p className="text-muted text-sm leading-relaxed">Arudha Lagna (AL), also known as Maya Lagna, is one of the cornerstone concepts of Jaimini astrology. While your Ascendant (Lagna) reveals your true inner nature — your soul&apos;s character, innate personality, and authentic self — the Arudha Lagna reveals something entirely different: how the external world perceives you.</p>
                    <p className="text-muted text-sm leading-relaxed">In Sanskrit, &quot;Maya&quot; means illusion or appearance. The Arudha Lagna is called Maya Lagna because it represents the social projection — the image that others form of you through interaction, observation, and social context. This image may align closely with your true nature, or there may be a significant gap. Understanding this gap is one of the most insightful gifts of Jaimini astrology.</p>
                    <p className="text-muted text-sm leading-relaxed">The Arudha Lagna is calculated as the Arudha Pada of the 1st house — a reflection of your Ascendant projected into the social sphere. It is used to analyse career reputation, public standing, social influence, and how you&apos;re received by the world at large.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">How Arudha Lagna is Calculated</h2>
                    <p className="text-muted text-sm leading-relaxed">The calculation follows four steps:</p>
                    <ul className="text-muted text-sm leading-relaxed space-y-2 ml-4">
                        <li>• <span className="text-white">Step 1:</span> Find the lord of your Ascendant sign. If your Ascendant is Leo, the lord is Sun.</li>
                        <li>• <span className="text-white">Step 2:</span> Find where that lord is placed in your birth chart. If Sun is in Scorpio, note its sign.</li>
                        <li>• <span className="text-white">Step 3:</span> Count signs from your Ascendant to the lord&apos;s sign, inclusive. Leo to Scorpio = Leo→Virgo→Libra→Scorpio = 4 signs.</li>
                        <li>• <span className="text-white">Step 4:</span> Project the same count (4 signs) from the lord&apos;s sign. Scorpio→Sagittarius→Capricorn→Aquarius→Pisces = Aquarius. Aquarius is your Arudha Lagna.</li>
                    </ul>
                    <p className="text-muted text-sm leading-relaxed">Exception: if the result falls on the Ascendant itself or its 7th house, add 10 more signs. This prevents the Arudha from falling back to the original house and neutralising the calculation.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Arudha Lagna and Career Reputation</h2>
                    <p className="text-muted text-sm leading-relaxed">Arudha Lagna is one of the strongest indicators in Jaimini astrology for career visibility and public reputation. The sign of your AL describes the domain in which you are most publicly recognised. A Leo AL often creates leaders, performers, or public figures. A Virgo AL creates reputation in technical, medical, or service-oriented fields. A Scorpio AL creates reputation in research, occult, finance, or transformation-related work.</p>
                    <p className="text-muted text-sm leading-relaxed">The lord of your Arudha Lagna and its placement reinforce this. If the AL lord is in the 10th house (career), the Kendra of action, your public image directly feeds into professional success. If the AL lord is in the 7th, business partnerships and public dealings are prominent. The 10th from your Arudha Lagna is also significant — it shows where your image takes its most visible, professional form.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Arudha Lagna vs Ascendant: The Gap</h2>
                    <p className="text-muted text-sm leading-relaxed">The most profound use of Arudha Lagna is in understanding the gap between your true self and your social image. If your Ascendant and Arudha Lagna are the same sign or very compatible signs, you are someone who comes across as who you truly are — there is little gap between inner and outer. If they are very different or even opposing signs, you may find that people consistently misread you, or that you present a very different face to the world than who you feel you are inside.</p>
                    <p className="text-muted text-sm leading-relaxed">This is neither good nor bad — it is simply the nature of your social interaction with the world. Understanding this gap allows you to navigate social expectations more consciously, presenting your Arudha image when appropriate while nurturing your true Ascendant self in private.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "What is the difference between Arudha Lagna and Ascendant?", a: "Your Ascendant shows your true inner nature and soul character. Your Arudha Lagna shows how the world perceives you — the social image you project. These can be similar or quite different depending on your chart." },
                            { q: "Is Arudha Lagna used for marriage analysis?", a: "Yes. The 7th from Arudha Lagna shows the kind of partner others expect you to be with, or the public perception of your relationships. The Upapada Lagna (Arudha of the 12th house) is the primary Jaimini indicator specifically for marriage." },
                            { q: "Which planets strengthen the Arudha Lagna?", a: "Benefic planets (Jupiter, Venus, well-placed Mercury and Moon) in or aspecting the Arudha Lagna generally strengthen the public image and create positive perception. The Arudha lord&apos;s dignity and placement are equally important." },
                            { q: "Can Arudha Lagna change over time?", a: "No — the Arudha Lagna is a fixed calculation based on your birth chart and does not change. However, during certain Dasha periods, the Arudha Lagna can become more or less activated, leading to periods of increased visibility or social prominence." },
                            { q: "How accurate is AstroWord's Arudha Lagna calculator?", a: "AstroWord uses Swiss Ephemeris with Lahiri ayanamsa and follows classical Jaimini rules for Arudha calculation, including the exception rule for when the result falls on the 1st house or its 7th." },
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-border/40 pb-5">
                                <h3 className="text-white text-sm font-medium mb-2">{faq.q}</h3>
                                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-gold font-serif text-2xl">Related Jaimini Astrology Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { href: '/upapada-lagna', emoji: '💍', label: 'Upapada Lagna', desc: 'Your Jaimini marriage sign' },
                            { href: '/darakaraka', emoji: '💑', label: 'Darakaraka', desc: 'The planet that signifies your spouse' },
                            { href: '/atmakaraka', emoji: '☀️', label: 'Atmakaraka', desc: 'Your soul planet and life purpose' },
                            { href: '/amatyakaraka', emoji: '💼', label: 'Amatyakaraka', desc: 'Your career and ambition planet' },
                        ].map((tool, i) => (
                            <a key={i} href={tool.href} className="bg-surface border border-border hover:border-gold/30 rounded-xl p-4 flex items-start gap-3 transition-all group">
                                <span className="text-2xl">{tool.emoji}</span>
                                <div>
                                    <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">{tool.label}</p>
                                    <p className="text-muted text-xs">{tool.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
