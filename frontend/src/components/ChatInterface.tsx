'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import UpgradeModal from './UpgradeModal';
import { API_URL } from '@/utils/api';

type Message = {
    id: string;
    role: 'user' | 'ai';
    content: string;
    confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
    tags?: string[];
};

import { useAuth } from '@/components/AuthProvider';
import { db } from '@/utils/firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import React from 'react';

export default function ChatInterface({
    chartData,
    activeChatId,
    initialMessages,
    setChatMessages
}: {
    chartData: any,
    activeChatId: string | null,
    initialMessages: any[],
    setChatMessages: React.Dispatch<React.SetStateAction<any[]>>
}) {
    const { user } = useAuth();
    const router = useRouter();
    const ascendantSign = chartData?.ascendant?.sign || '';

    const navigateTo = (feature: string) => {
        router.push(`/${feature}`);
    };

    // Initialize messages based on if we are loading history
    useEffect(() => {
        if (initialMessages.length > 0) {
            setChatMessages(initialMessages);
        } else {
            setChatMessages([
                {
                    id: '1',
                    role: 'ai',
                    content: `I have cast your chart. I see you have a ${ascendantSign} Ascendant. The cosmos show a strong reading. What would you like to ask about your life path?`,
                    confidence: 'HIGH',
                    tags: ['D1', 'Chart Casted']
                }
            ]);
        }
    }, [initialMessages, ascendantSign, setChatMessages]);

    // Save initial chart session to Firestore so it appears in the sidebar history immediately
    useEffect(() => {
        if (user && activeChatId && initialMessages.length === 1 && initialMessages[0].role === 'ai') {
            const chatRef = doc(db, 'users', user.uid, 'chats', activeChatId);
            setDoc(chatRef, {
                title: 'New Astrology Reading',
                messages: [
                    {
                        role: initialMessages[0].role,
                        content: initialMessages[0].content,
                        timestamp: Date.now()
                    }
                ],
                updated_at: serverTimestamp(),
                created_at: serverTimestamp(),
                chart_data: chartData
            }, { merge: true }).catch(err => console.error("Initial chat save failed", err));
        }
    }, [initialMessages, user, activeChatId, chartData]);

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [loadingText, setLoadingText] = useState("Casting your chart...");

    useEffect(() => {
        if (!isTyping) return;
        const messages = [
            "Casting your chart...",
            "Consulting the planets...",
            "Reading your Dasha timeline...",
            "Analyzing planetary positions...",
            "Checking your Navamsa...",
            "The cosmos are speaking...",
            "Calculating your Antardasha...",
            "Almost ready...",
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setLoadingText(messages[i]);
        }, 2000);
        return () => clearInterval(interval);
    }, [isTyping]);

    useEffect(() => {
        const handleOpenUpgrade = () => setShowUpgrade(true);
        window.addEventListener('openUpgradeModal', handleOpenUpgrade);
        return () => window.removeEventListener('openUpgradeModal', handleOpenUpgrade);
    }, []);



    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [initialMessages, isTyping]);

    // Auto-send pending question from calculator pages (suggested questions)
    useEffect(() => {
        const pending = sessionStorage.getItem('pending_question');
        if (pending && !isTyping) {
            sessionStorage.removeItem('pending_question');
            setInput(pending);
            setTimeout(() => {
                const form = document.getElementById('chat-form') as HTMLFormElement;
                if (form) form.requestSubmit();
            }, 600);
        }
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        const newMsg: Message = { id: Date.now().toString(), role: 'user', content: userMsg };
        const aiMsgId = (Date.now() + 1).toString();
        const aiPlaceholder: Message = { id: aiMsgId, role: 'ai', content: '', tags: [] };

        setInput('');
        setIsTyping(true);
        setChatMessages([...initialMessages, newMsg, aiPlaceholder]);

        const idToken = user ? await user.getIdToken() : '';
        const fetchBody = JSON.stringify({
            user_id: user?.uid || 'demo-user',
            question: userMsg,
            chart_data: chartData,
            chat_history: initialMessages
        });
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` };

        console.log("DEBUG: Sending request to /api/ask");
        console.log("DEBUG: user_id:", user?.uid);
        console.log("DEBUG: chartData exists:", !!chartData);
        console.log("DEBUG: fetchBody:", fetchBody);

        try {
            const res = await fetch(`${API_URL}/api/ask`, {
                method: 'POST',
                headers,
                body: fetchBody
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                if (data.limit_reached) {
                    const resetTimeStr = data.reset_time || 'midnight';
                    const limitMsgs = [
                        ...initialMessages, newMsg,
                        { id: aiMsgId, role: 'ai', content: `LIMIT_REACHED:${resetTimeStr}`, tags: [] } as Message
                    ];
                    setChatMessages(limitMsgs);
                    if (user && activeChatId) {
                        const chatRef = doc(db, 'users', user.uid, 'chats', activeChatId);
                        setDoc(chatRef, {
                            title: initialMessages.length <= 1 ? userMsg.substring(0, 40) : (initialMessages[1]?.content?.substring(0, 40) || 'Astrology Reading'),
                            messages: limitMsgs.map(m => ({ role: m.role, content: m.content, timestamp: Date.now() })),
                            updated_at: serverTimestamp()
                        }, { merge: true }).catch(() => { });
                    }
                    return;
                }
                throw new Error(data.detail || 'Failed to get AI response');
            }

            let parsed = data.data || data;

            // Sometimes the AI returns stringified JSON inside the response text itself
            if (typeof parsed === 'string') {
                try {
                    parsed = JSON.parse(parsed);
                } catch (e) {
                    // Try to aggressively extract the "answer": "..." content if JSON.parse fails
                    const answerMatch = parsed.match(/"answer"\s*:\s*"([\s\S]*?)"\s*(?:,\s*"confidence"|\})/);
                    if (answerMatch && answerMatch[1]) {
                        parsed = { answer: answerMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') };
                    }
                }
            }
            if (typeof parsed.answer === 'string' && parsed.answer.trim().startsWith('{')) {
                try {
                    const innerParsed = JSON.parse(parsed.answer);
                    if (innerParsed.answer) parsed = innerParsed;
                } catch (e) {
                    // Try to aggressively extract if inner parse fails
                    const answerMatch = parsed.answer.match(/"answer"\s*:\s*"([\s\S]*?)"\s*(?:,\s*"confidence"|\})/);
                    if (answerMatch && answerMatch[1]) {
                        parsed.answer = answerMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
                    }
                }
            }

            console.log("parsed response:", parsed);
            console.log("answer text:", parsed.answer);
            const answerText = parsed.answer || (typeof parsed === 'string' ? parsed : 'The cosmos are silent. Try asking again.');
            const tags = parsed.tags || [];
            const newMessages = [...initialMessages, newMsg, { id: aiMsgId, role: 'ai', content: answerText, tags } as Message];
            setChatMessages(newMessages);

            if (user && activeChatId) {
                const chatRef = doc(db, 'users', user.uid, 'chats', activeChatId);
                const updateData: any = {
                    title: initialMessages.length <= 1 ? userMsg.substring(0, 40) : (initialMessages[1]?.content?.substring(0, 40) || 'Astrology Reading'),
                    messages: newMessages.map(m => ({ role: m.role, content: m.content, timestamp: Date.now() })),
                    updated_at: serverTimestamp(),
                    chart_data: chartData
                };
                if (initialMessages.length === 1) updateData.created_at = serverTimestamp();
                setDoc(chatRef, updateData, { merge: true }).catch(e => console.error('Failed to save chat', e));
            }

        } catch (err: any) {
            console.error('Chat Error:', err);
            setChatMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: err.message || 'I encountered an error. Please try again.'
                };
                return updated;
            });
        } finally {
            setIsTyping(false);
        }
    };



    return (
        <div className="flex flex-col h-full bg-bg relative overflow-hidden">
            <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 py-6 space-y-6 max-w-4xl mx-auto w-full scroll-smooth">
                {initialMessages.map((msg: any, idx: number) => (
                    <div
                        key={msg.id || idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] sm:max-w-[80%] flex gap-2 sm:gap-4 min-w-0 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* Avatar */}
                            <div className="flex-shrink-0 mt-1">
                                {msg.role === 'ai' || msg.role === 'model' ? (
                                    <div className="w-8 h-8 rounded bg-surface2 border border-gold/30 flex items-center justify-center text-gold">
                                        ☉
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-sm font-medium">
                                        {user?.displayName
                                            ? user.displayName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
                                            : user?.email?.substring(0, 2).toUpperCase() || 'U'}
                                    </div>
                                )}
                            </div>

                            {/* Message Content */}
                            <div className={`flex flex-col gap-2 max-w-full w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>

                                {msg.role === 'ai' || msg.role === 'model' ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-gold tracking-widest uppercase">AstroWord</span>

                                    </div>
                                ) : null}

                                <div className={`p-4 rounded-2xl text-[15px] leading-relaxed overflow-hidden max-w-full break-words [overflow-wrap:break-word] ${msg.role === 'user'
                                    ? 'bg-surface2 border border-border text-text/90'
                                    : 'bg-transparent text-text border-none p-0'
                                    }`}>
                                    {msg.role === 'ai' || msg.role === 'model' ? (
                                        typeof msg.content === 'string' && msg.content.startsWith('LIMIT_REACHED:') ? (
                                            <div className="bg-surface2 border border-gold/20 rounded-2xl p-6 space-y-5 my-2">
                                                {/* Header */}
                                                <div className="text-center space-y-2">
                                                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
                                                        <span className="text-2xl">🌙</span>
                                                    </div>
                                                    <h3 className="text-white font-serif text-lg">
                                                        Daily Limit Reached
                                                    </h3>
                                                    <p className="text-muted text-sm">
                                                        Your questions reset in{" "}
                                                        <span className="text-gold font-mono font-medium">{msg.content.replace('LIMIT_REACHED:', '')}</span>
                                                    </p>
                                                </div>

                                                {/* Divider */}
                                                <div className="border-t border-border" />

                                                {/* Feature Discovery */}
                                                <div className="space-y-2">
                                                    <p className="text-xs text-muted uppercase tracking-widest font-mono text-center mb-1 mt-2">
                                                        Explore our tools — always free to use
                                                    </p>
                                                    <p className="text-xs text-center text-muted/40 font-mono mb-4">
                                                        These tools don't use your question limit
                                                    </p>

                                                    {/* Darakaraka Card */}
                                                    <button
                                                        onClick={() => navigateTo('darakaraka')}
                                                        className="w-full bg-surface border border-border hover:border-gold/30 rounded-xl p-4 text-left transition-all group"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-xl flex-shrink-0">💑</span>
                                                            <div>
                                                                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                                                                    Darakaraka Calculator
                                                                </p>
                                                                <p className="text-muted text-xs mt-0.5 leading-relaxed">
                                                                    Who is your destined spouse? What will they look like? Discover the planet that reveals your future partner.
                                                                </p>
                                                            </div>
                                                            <span className="text-muted group-hover:text-gold ml-auto text-lg transition-colors flex-shrink-0 mt-1">→</span>
                                                        </div>
                                                    </button>

                                                    {/* Atmakaraka Card */}
                                                    <button
                                                        onClick={() => navigateTo('atmakaraka')}
                                                        className="w-full bg-surface border border-border hover:border-gold/30 rounded-xl p-4 text-left transition-all group mt-2"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-xl flex-shrink-0">☀️</span>
                                                            <div>
                                                                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                                                                    Atmakaraka Calculator
                                                                </p>
                                                                <p className="text-muted text-xs mt-0.5 leading-relaxed">
                                                                    What is your soul's true purpose? What karmic lessons did you come here to learn?
                                                                </p>
                                                            </div>
                                                            <span className="text-muted group-hover:text-gold ml-auto text-lg transition-colors flex-shrink-0 mt-1">→</span>
                                                        </div>
                                                    </button>

                                                    {/* Amatyakaraka Card */}
                                                    <button
                                                        onClick={() => navigateTo('amatyakaraka')}
                                                        className="w-full bg-surface border border-border hover:border-gold/30 rounded-xl p-4 text-left transition-all group mt-2"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-xl flex-shrink-0">💼</span>
                                                            <div>
                                                                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                                                                    Amatyakaraka Calculator
                                                                </p>
                                                                <p className="text-muted text-xs mt-0.5 leading-relaxed">
                                                                    What career were you born for? Which profession will bring you the most success and fulfillment?
                                                                </p>
                                                            </div>
                                                            <span className="text-muted group-hover:text-gold ml-auto text-lg transition-colors flex-shrink-0 mt-1">→</span>
                                                        </div>
                                                    </button>

                                                    {/* Gana Calculator Card */}
                                                    <button
                                                        onClick={() => navigateTo('gana')}
                                                        className="w-full bg-surface border border-border hover:border-gold/30 rounded-xl p-4 text-left transition-all group mt-2"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-xl flex-shrink-0">🔱</span>
                                                            <div>
                                                                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                                                                    Gana Calculator
                                                                </p>
                                                                <p className="text-muted text-xs mt-0.5">
                                                                    Are you Deva, Manushya or Rakshasa Gana? Find out your cosmic nature and compatibility with your partner.
                                                                </p>
                                                            </div>
                                                            <span className="text-muted group-hover:text-gold ml-auto text-lg transition-colors flex-shrink-0 mt-1">→</span>
                                                        </div>
                                                    </button>

                                                    {/* Marriage Type Calculator Card */}
                                                    <button
                                                        onClick={() => navigateTo('marriage-type')}
                                                        className="w-full bg-surface border border-border hover:border-gold/30 rounded-xl p-4 text-left transition-all group mt-2"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-xl flex-shrink-0">💝</span>
                                                            <div>
                                                                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                                                                    Love or Arranged Marriage
                                                                </p>
                                                                <p className="text-muted text-xs mt-0.5 leading-relaxed">
                                                                    Will you find love on your own or will destiny bring your partner through family? Your stars already know the answer.
                                                                </p>
                                                            </div>
                                                            <span className="text-muted group-hover:text-gold ml-auto text-lg transition-colors flex-shrink-0 mt-1">→</span>
                                                        </div>
                                                    </button>

                                                    {/* Spouse Initial Calculator Card */}
                                                    <button
                                                        onClick={() => navigateTo('spouse-initial')}
                                                        className="w-full bg-surface border border-border hover:border-gold/30 rounded-xl p-4 text-left transition-all group mt-2"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-xl flex-shrink-0">🔤</span>
                                                            <div>
                                                                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                                                                    Spouse Initial Letter
                                                                </p>
                                                                <p className="text-muted text-xs mt-0.5 leading-relaxed">
                                                                    What letter does your future spouse's name start with? Discover the sacred sound of your partner.
                                                                </p>
                                                            </div>
                                                            <span className="text-muted group-hover:text-gold ml-auto text-lg transition-colors flex-shrink-0 mt-1">→</span>
                                                        </div>
                                                    </button>

                                                    {/* Marriage Year Predictor Card */}
                                                    <button
                                                        onClick={() => router.push('/marriage-year')}
                                                        className="w-full bg-surface border border-border hover:border-gold/30 rounded-xl p-4 text-left transition-all group mt-2"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-xl">💍</span>
                                                            <div>
                                                                <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                                                                    Marriage Year Predictor
                                                                </p>
                                                                <p className="text-muted text-xs mt-0.5">
                                                                    When will you get married? Find your most auspicious marriage windows based on Dasha timing.
                                                                </p>
                                                            </div>
                                                            <span className="text-muted group-hover:text-gold ml-auto text-lg transition-colors mt-1">→</span>
                                                        </div>
                                                    </button>
                                                </div>

                                                {/* Divider */}
                                                <div className="border-t border-border mt-5 mb-4" />

                                                {/* Upgrade CTA */}
                                                <div className="space-y-3">
                                                    <p className="text-xs text-muted text-center pt-2">
                                                        Or upgrade to keep asking questions right now
                                                    </p>
                                                    <button
                                                        onClick={() => setShowUpgrade(true)}
                                                        className="w-full bg-gradient-to-r from-gold to-amber text-bg font-medium py-3 rounded-xl text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <span>View Upgrade Plans</span>
                                                        <span>✦</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="prose prose-invert max-w-none w-full overflow-hidden text-text prose-p:leading-relaxed prose-a:text-gold hover:prose-a:text-amber prose-strong:text-white font-serif tracking-wide break-words [overflow-wrap:break-word]">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        h1: ({ node, ...props }) => <h1 className="text-gold font-serif text-lg sm:text-xl font-medium mt-4 mb-2 break-words" {...props} />,
                                                        h2: ({ node, ...props }) => <h2 className="text-gold font-serif text-xl sm:text-2xl mt-6 mb-4 font-semibold tracking-wide break-words" {...props} />,
                                                        h3: ({ node, ...props }) => <h3 className="text-white font-serif text-lg sm:text-xl mt-5 mb-3 font-medium tracking-wide break-words" {...props} />,
                                                        strong: ({ node, ...props }) => <strong className="text-gold font-medium" {...props} />,
                                                        em: ({ node, ...props }) => <em className="text-text/80 italic" {...props} />,
                                                        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed break-words [overflow-wrap:break-word]" {...props} />,
                                                        ul: ({ node, ...props }) => <ul className="space-y-2 my-4 opacity-90 ml-2" {...props} />,
                                                        ol: ({ node, ...props }) => <ol className="space-y-1 mb-3 ml-2 list-decimal list-inside" {...props} />,
                                                        li: ({ node, ...props }) => (
                                                            <li className="flex items-start gap-2 mb-2 last:mb-0">
                                                                <span className="text-gold flex-shrink-0 mt-1.5 opacity-70 text-[10px]">✦</span>
                                                                <span className="flex-1 leading-relaxed text-text/90 break-words [overflow-wrap:break-word]" {...props} />
                                                            </li>
                                                        ),
                                                        blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-gold/50 pl-4 py-2 italic bg-gold/5 text-white/90 rounded-r-lg my-6 break-words" {...props} />
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        )
                                    ) : (
                                        msg.content
                                    )}
                                </div>

                                {(msg.role === 'ai' || msg.role === 'model') && msg.tags && msg.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
                                        {msg.tags.map((tag: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-xs font-mono px-2 py-1 rounded-md bg-accent/10 text-accent border border-accent/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                ))}

                {/* Home Dashboard Feature Grid - visible on new chat only */}
                {initialMessages.length === 1 && initialMessages[0].role === 'ai' && !isTyping && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pb-4">
                        <div className="bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] transition-all rounded-2xl p-6 cursor-pointer group"
                            onClick={() => router.push('/marriage-year')}
                        >
                            <div className="text-3xl mb-4">💍</div>
                            <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                                Marriage Year Predictor
                            </h3>
                            <p className="text-muted text-sm mb-4">
                                When will you get married? The planets have already written the timeline. Discover your most auspicious marriage windows based on your Dasha and chart.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Dasha Timing</span>
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">7th House</span>
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Venus</span>
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Jupiter Transit</span>
                            </div>
                            <p className="text-xs text-muted/70 italic">
                                "The stars don't just reveal who — they reveal when."
                            </p>
                            <button className="mt-4 w-full bg-surface border border-border hover:border-gold/30 text-text text-sm py-2.5 rounded-xl transition-all group-hover:border-gold/30">
                                Predict My Marriage Year →
                            </button>
                        </div>
                    </div>
                )}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] flex gap-4">
                            <div className="w-8 h-8 rounded bg-surface2 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                                ☉
                            </div>
                            <div className="flex flex-col gap-1 justify-center">
                                <span className="text-xs font-mono text-gold tracking-widest uppercase">AstroWord</span>
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="w-1.5 h-1.5 rounded-full bg-gold"
                                    />
                                    <span className="text-sm text-muted font-serif italic">{loadingText}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border bg-bg/95 backdrop-blur z-20 w-full flex flex-col shrink-0">
                {/* Tools Shortcut Bar */}
                <div className="px-4 py-3 border-b border-border/30 w-full">
                    <div className="flex flex-wrap items-center gap-2 max-w-4xl mx-auto w-full px-0 sm:px-2 leading-none">
                        <span className="text-[10px] text-muted/50 font-mono uppercase tracking-tighter w-full sm:w-auto mb-1 sm:mb-0">Tools:</span>
                        {[
                            { label: '💑 Darakaraka', path: '/darakaraka' },
                            { label: '☀️ Atmakaraka', path: '/atmakaraka' },
                            { label: '💼 Amatyakaraka', path: '/amatyakaraka' },
                            { label: '🔱 Gana', path: '/gana' },
                            { label: '💝 Love/Arranged', path: '/marriage-type' },
                            { label: '🔤 Spouse Initial', path: '/spouse-initial' },
                            { label: '💍 Marriage Year', path: '/marriage-year' },
                        ].map((tool) => (
                            <button
                                key={tool.path}
                                onClick={() => router.push(tool.path)}
                                className="whitespace-nowrap text-xs bg-surface border border-border hover:border-gold/30 hover:text-gold text-text/60 px-3 py-1.5 rounded-full transition-all flex-shrink-0"
                            >
                                {tool.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 max-w-4xl mx-auto w-full relative">
                    <form id="chat-form" onSubmit={handleSend} className="relative flex items-center">
                        <div className="absolute left-4 text-gold/50 pointer-events-none">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about career, relationships, or the timing of events..."
                            className="w-full bg-surface border border-border rounded-xl pl-11 pr-14 py-3 sm:py-4 focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-muted"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-3 p-2 bg-text text-bg rounded-lg hover:bg-gold transition-colors disabled:opacity-50 disabled:hover:bg-text"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                    <div className="text-center mt-2 text-xs text-muted/70">
                        AstroWord can make mistakes. Consider the 5 question limit per day.
                    </div>
                </div>
            </div>
        </div>
    );
}
