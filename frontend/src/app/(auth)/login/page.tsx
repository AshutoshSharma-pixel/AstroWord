'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, googleProvider } from '@/utils/firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showSplash, setShowSplash] = useState(true);
    const [taglineIndex, setTaglineIndex] = useState(0);

    const router = useRouter();

    const taglines = [
        "India's First Precision Vedic AI",
        "Trusted by Thousands",
        "Your Chart. Your Destiny. Decoded.",
        "D1 · D9 · D10 — Every Planet. Every House.",
        "Ask the Cosmos. Get Real Answers."
    ];

    useEffect(() => {
        // Tagline cycler: 5 seconds total / 5 taglines = switch every 1000ms
        if (showSplash) {
            const interval = setInterval(() => {
                setTaglineIndex(prev => (prev + 1) % taglines.length);
            }, 1000);

            // Total splash timeout
            const timer = setTimeout(() => {
                setShowSplash(false);
            }, 5000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [showSplash]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                router.push('/');
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {
                    displayName: name || email.split('@')[0],
                });
                router.push('/');
            }
        } catch (error: any) {
            setErrorMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push('/');
        } catch (error: any) {
            setErrorMsg(error.message);
        }
    }

    return (
        <div className="flex h-[100dvh] items-center justify-center bg-bg relative overflow-hidden">

            {/* SPLASH SCREEN OVERLAY */}
            <AnimatePresence>
                {showSplash && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-[#080910] flex flex-col items-center justify-center p-6"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {/* Background Animated Mandala (Inside Splash) */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        >
                            <svg width="700" height="700" viewBox="0 0 700 700" fill="none" style={{ opacity: 0.12, width: 'min(700px, 95vw)', height: 'min(700px, 95vw)' }}>
                                <circle cx="350" cy="350" r="340" stroke="#c9a84c" strokeWidth="1" />
                                <circle cx="350" cy="350" r="280" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="6 6" />
                                <circle cx="350" cy="350" r="220" stroke="#c9a84c" strokeWidth="1" />
                                <circle cx="350" cy="350" r="160" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="4 4" />
                                <circle cx="350" cy="350" r="100" stroke="#c9a84c" strokeWidth="1" />
                                <circle cx="350" cy="350" r="50" stroke="#c9a84c" strokeWidth="1.5" />
                                <line x1="350" y1="10" x2="350" y2="690" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                                <line x1="10" y1="350" x2="690" y2="350" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                                <line x1="110" y1="110" x2="590" y2="590" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                                <line x1="590" y1="110" x2="110" y2="590" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                                <circle cx="350" cy="10" r="6" fill="#c9a84c" opacity="0.8" />
                                <circle cx="690" cy="350" r="5" fill="#7c6fcd" opacity="0.8" />
                                <circle cx="350" cy="690" r="6" fill="#f0a500" opacity="0.8" />
                                <circle cx="10" cy="350" r="4" fill="white" opacity="0.6" />
                                <circle cx="590" cy="110" r="4" fill="#c9a84c" opacity="0.6" />
                                <circle cx="110" cy="590" r="4" fill="#c9a84c" opacity="0.5" />
                            </svg>
                        </motion.div>

                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            <svg width="420" height="420" viewBox="0 0 420 420" fill="none" style={{ opacity: 0.1 }}>
                                <circle cx="210" cy="210" r="200" stroke="#c9a84c" strokeWidth="1" strokeDasharray="8 4" />
                                <circle cx="210" cy="210" r="150" stroke="#7c6fcd" strokeWidth="0.8" strokeDasharray="4 8" />
                                <circle cx="210" cy="10" r="5" fill="#c9a84c" />
                                <circle cx="410" cy="210" r="4" fill="#7c6fcd" />
                                <circle cx="210" cy="410" r="5" fill="#f0a500" />
                                <circle cx="10" cy="210" r="3" fill="white" />
                            </svg>
                        </motion.div>

                        <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
                            <div className="mb-8">
                                <img src="/astroword-logo.svg" alt="AstroWord" className="h-16" />
                            </div>

                            <div className="h-10 w-full relative flex items-center justify-center overflow-hidden mb-32">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={taglineIndex}
                                        className="text-muted text-sm tracking-wide font-medium absolute text-center w-full"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {taglines[taglineIndex]}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            <div className="w-full mt-auto absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center max-w-xs">
                                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
                                    <motion.div
                                        className="h-full bg-gold origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 5, ease: "linear" }}
                                    />
                                </div>
                                <p className="text-[10px] text-muted/60 font-mono tracking-widest uppercase">
                                    Calculating planetary positions...
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Animated Mandala (For Login Screen) */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                <svg width="700" height="700" viewBox="0 0 700 700" fill="none" style={{ opacity: 0.12, width: 'min(700px, 95vw)', height: 'min(700px, 95vw)' }}>
                    <circle cx="350" cy="350" r="340" stroke="#c9a84c" strokeWidth="1" />
                    <circle cx="350" cy="350" r="280" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="6 6" />
                    <circle cx="350" cy="350" r="220" stroke="#c9a84c" strokeWidth="1" />
                    <circle cx="350" cy="350" r="160" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="4 4" />
                    <circle cx="350" cy="350" r="100" stroke="#c9a84c" strokeWidth="1" />
                    <circle cx="350" cy="350" r="50" stroke="#c9a84c" strokeWidth="1.5" />
                    <line x1="350" y1="10" x2="350" y2="690" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                    <line x1="10" y1="350" x2="690" y2="350" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                    <line x1="110" y1="110" x2="590" y2="590" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                    <line x1="590" y1="110" x2="110" y2="590" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
                    <circle cx="350" cy="10" r="6" fill="#c9a84c" opacity="0.8" />
                    <circle cx="690" cy="350" r="5" fill="#7c6fcd" opacity="0.8" />
                    <circle cx="350" cy="690" r="6" fill="#f0a500" opacity="0.8" />
                    <circle cx="10" cy="350" r="4" fill="white" opacity="0.6" />
                    <circle cx="590" cy="110" r="4" fill="#c9a84c" opacity="0.6" />
                    <circle cx="110" cy="590" r="4" fill="#c9a84c" opacity="0.5" />
                </svg>
            </motion.div>

            {/* Counter-rotating inner ring */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
                <svg width="420" height="420" viewBox="0 0 420 420" fill="none" style={{ opacity: 0.08 }}>
                    <circle cx="210" cy="210" r="200" stroke="#c9a84c" strokeWidth="1" strokeDasharray="8 4" />
                    <circle cx="210" cy="210" r="150" stroke="#7c6fcd" strokeWidth="0.8" strokeDasharray="4 8" />
                    <circle cx="210" cy="10" r="5" fill="#c9a84c" />
                    <circle cx="410" cy="210" r="4" fill="#7c6fcd" />
                    <circle cx="210" cy="410" r="5" fill="#f0a500" />
                    <circle cx="10" cy="210" r="3" fill="white" />
                </svg>
            </motion.div>

            <div className="w-full max-w-md p-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">

                {/* Logo */}
                <div className="text-center flex flex-col items-center justify-center mb-10">
                    <img src="/astroword-logo.svg" alt="AstroWord" className="h-[36px] mb-3" />
                    <p className="text-muted text-sm tracking-wide uppercase font-mono">Precision Vedic AI</p>
                </div>

                {/* Auth Box */}
                <div className="bg-surface2/60 backdrop-blur-md border border-border rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-xl font-medium mb-6 text-center">
                        {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>

                    <form onSubmit={handleAuth} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/70 text-text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/70 text-text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/70 text-text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {errorMsg && (
                            <div className="text-red-400 text-xs text-center p-2 bg-red-500/10 rounded-md border border-red-500/20">
                                {errorMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-text text-bg hover:bg-gold font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                    <Sparkles className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-surfacepx bg-surface2 px-2 text-muted">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={signInWithGoogle}
                            className="mt-4 w-full bg-surface hover:bg-white/5 border border-border text-text font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-text/70">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-gold hover:underline font-medium"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
