'use client';

import { X, Sparkles, Star, Infinity as InfinityIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { API_URL } from '@/utils/api';

// Declare razorpay window interface
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function UpgradeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const { user } = useAuth();

    if (!isOpen) return null;

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleUpgrade = async (planType: string) => {
        if (!user) return alert('Please login to upgrade.');
        setLoadingPlan(planType);

        try {
            const resScript = await loadRazorpayScript();
            if (!resScript) {
                alert('Razorpay SDK failed to load. Are you online?');
                return setLoadingPlan(null);
            }

            // 1. Create Order on Backend
            const orderRes = await fetch(`${API_URL}/api/payment/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.uid,
                    plan_type: planType
                })
            });

            const orderData = await orderRes.json();
            if (!orderData.success) throw new Error(orderData.detail || 'Failed to create order');

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Make sure this is in env
                amount: orderData.amount,
                currency: orderData.currency,
                name: "AstroWord",
                description: `Upgrade to ${planType} plan`,
                order_id: orderData.order_id,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment on Backend
                        const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                user_id: user.uid,
                                plan_type: planType,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            onClose();
                            setTimeout(() => {
                                alert('✨ Cosmic Upgrade Successful! Your new plan is now active.');
                            }, 300);
                        } else {
                            alert('Payment verification failed.');
                        }
                    } catch (error) {
                        alert('Error verifying payment.');
                    }
                },
                prefill: {
                    name: user.displayName || 'Astrology Enthusiast',
                    email: user.email || '',
                },
                theme: {
                    color: "#D4AF37" // AstroWord Gold
                }
            };

            const rzpay = new window.Razorpay(options);
            rzpay.on("payment.failed", function (response: any) {
                alert(`Payment Failed: ${response.error.description}`);
            });
            rzpay.open();

        } catch (error: any) {
            console.error(error);
            alert(error.message || 'Error processing upgrade');
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-bg/90 backdrop-blur-md animate-in fade-in duration-200">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-muted hover:text-white transition-colors z-[60] bg-surface2 p-2 rounded-full border border-border"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="w-full sm:max-w-4xl relative z-10 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300 bg-[#0D0F1A] sm:bg-transparent rounded-t-3xl sm:rounded-none max-h-[92vh] overflow-y-auto sm:max-h-none sm:overflow-visible p-6 sm:p-0">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="font-serif text-4xl mb-3 text-white">Unlock the Cosmos</h2>
                    <p className="text-muted/90 text-sm max-w-md mx-auto">
                        Elevate your spiritual journey with unbounded cosmic guidance and precision timing analysis.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
                    {/* FREE PLAN — shown for context */}
                    <div className="bg-surface2/40 border border-border/50 rounded-3xl p-6 relative flex flex-col opacity-80">

                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-5 border border-white/10">
                            <span className="text-lg">🌙</span>
                        </div>

                        <h3 className="text-xl font-serif text-white/70 mb-2">Free</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-semibold text-white/70">₹0</span>
                            <span className="text-muted text-sm uppercase tracking-wider">/ forever</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-start gap-3 text-sm text-text/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />
                                <span>5 questions per day</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-text/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />
                                <span>Birth chart analysis <span className="font-mono text-xs">D1</span></span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-text/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />
                                <span>Marriage & soul analysis <span className="font-mono text-xs">D9</span></span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-text/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />
                                <span>All calculator features</span>
                            </li>
                        </ul>

                        <button
                            onClick={onClose}
                            className="w-full bg-transparent text-white/40 border border-white/10 font-medium py-3 rounded-xl text-sm"
                        >
                            Current Plan
                        </button>
                    </div>

                    {/* STARTER */}
                    <div className="bg-surface2 border border-border hover:border-gold/30 transition-all rounded-3xl p-8 relative flex flex-col group">

                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-gold/10 group-hover:border-gold/20 transition-all">
                            <Star className="w-6 h-6 text-slate-300 group-hover:text-gold transition-colors" />
                        </div>

                        <h3 className="text-2xl font-serif text-white mb-1">Starter</h3>
                        <p className="text-muted text-xs mb-4 font-mono uppercase tracking-wider">7 Day Pass</p>

                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm line-through text-muted">₹149</span>
                            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full border border-green-500/30">
                                54% OFF
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-semibold text-white">₹69</span>
                            <span className="text-muted text-sm">/ 7 days</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1 text-sm text-text/80">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                <span>10 questions per day</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                <span>Birth chart analysis <span className="text-gold font-mono text-xs">D1</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                <span>Marriage & soul analysis <span className="text-gold font-mono text-xs">D9</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                <span>Career & profession chart <span className="text-gold font-mono text-xs">D10</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                <span>Dasha + Antardasha timing</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                                <span>All 6 calculator features</span>
                            </li>
                        </ul>

                        <button
                            onClick={() => handleUpgrade('starter')}
                            disabled={loadingPlan !== null}
                            className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loadingPlan === 'starter' ? 'Processing...' : 'Get 7 Day Pass'}
                        </button>
                    </div>

                    {/* PRO PLAN */}
                    <div className="bg-surface2 border-2 border-gold/40 shadow-[0_0_30px_rgba(255,215,0,0.1)] rounded-3xl p-8 relative flex flex-col overflow-hidden">

                        <div className="absolute top-0 right-0 bg-gold text-bg text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg">
                            Most Popular
                        </div>

                        <div className="w-12 h-12 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mb-6 border border-gold/30">
                            <InfinityIcon className="w-6 h-6" />
                        </div>

                        <h3 className="text-2xl font-serif text-white mb-1">Pro</h3>
                        <p className="text-muted text-xs mb-4 font-mono uppercase tracking-wider">30 Day Pass</p>

                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm line-through text-muted">₹499</span>
                            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full border border-green-500/30">
                                60% OFF
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-semibold text-white">₹199</span>
                            <span className="text-gold/80 text-sm">/ 30 days</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1 text-sm text-text/90">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                                <span className="text-white font-medium">20 questions per day</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 flex-shrink-0" />
                                <span>Birth chart <span className="text-gold font-mono text-xs">D1</span> + Soul chart <span className="text-gold font-mono text-xs">D9</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 flex-shrink-0" />
                                <span>Career chart <span className="text-gold font-mono text-xs">D10</span> + Children <span className="text-gold font-mono text-xs">D7</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 flex-shrink-0" />
                                <span>Property <span className="text-gold font-mono text-xs">D4</span> + Spiritual <span className="text-gold font-mono text-xs">D20</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 flex-shrink-0" />
                                <span>Education <span className="text-gold font-mono text-xs">D24</span> + Past life <span className="text-gold font-mono text-xs">D60</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 flex-shrink-0" />
                                <span>AI auto-selects right chart per question</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 flex-shrink-0" />
                                <span>All 6 calculator features</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 flex-shrink-0" />
                                <span>Priority AI model</span>
                            </li>
                        </ul>

                        <button
                            onClick={() => handleUpgrade('pro')}
                            disabled={loadingPlan !== null}
                            className="w-full bg-gradient-to-r from-gold to-amber hover:opacity-90 text-bg font-medium py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loadingPlan === 'pro' ? 'Processing...' : 'Get 30 Day Pass'}
                            {!loadingPlan && <Sparkles className="w-4 h-4 ml-1" />}
                        </button>
                    </div>

                </div>

                {/* ANNUAL STRIP */}
                <div className="mt-5 max-w-5xl mx-auto bg-surface2/60 border border-gold/15 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium text-sm">Annual Plan</span>
                            <span className="bg-gold/20 text-gold text-xs font-bold px-2 py-0.5 rounded-full border border-gold/30">
                                BEST VALUE
                            </span>
                        </div>
                        <p className="text-muted text-xs">
                            Everything in Pro · 365 days ·
                            <span className="text-gold"> ₹83/month</span> · Save 58%
                        </p>
                    </div>
                    <div className="text-left sm:text-right flex items-center sm:items-end justify-between sm:flex-col gap-4 sm:gap-0">
                        <p className="text-white font-semibold">₹999<span className="text-muted text-xs">/year</span></p>
                        <button
                            onClick={() => handleUpgrade('annual')}
                            disabled={loadingPlan !== null}
                            className="text-gold text-xs hover:underline disabled:opacity-50 font-medium"
                        >
                            {loadingPlan === 'annual' ? 'Processing...' : 'Get Annual →'}
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-xs text-muted/50 font-mono uppercase tracking-widest">Secured by Razorpay</p>
                </div>
            </div>
        </div>
    );
}
