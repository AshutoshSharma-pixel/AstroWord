'use client';

import { X, Sparkles } from 'lucide-react';

export default function UpgradeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm animate-in fade-in duration-200">

            <div className="bg-surface2 border border-gold/30 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-text transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-8 text-center relative z-10">
                    <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
                        <Sparkles className="w-8 h-8" />
                    </div>

                    <h2 className="font-serif text-3xl mb-2 text-white">Unlock the Cosmos</h2>
                    <p className="text-muted text-sm mb-8">Get unrestricted access to precision Vedic AI analysis for the next 24 hours.</p>

                    <div className="space-y-4 mb-8 text-left text-sm text-text/90">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                            <span>Unlimited D1 & D9 chart questions</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                            <span>Deep Vimshottari Dasha timing analysis</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                            <span>Current planetary transit impacts</span>
                        </div>
                    </div>

                    <div className="flex items-baseline justify-center gap-1 mb-8">
                        <span className="text-4xl font-semibold text-white">₹99</span>
                        <span className="text-muted text-sm uppercase tracking-wider">/ 24 hrs</span>
                    </div>

                    <button className="w-full bg-gradient-to-r from-gold to-amber hover:opacity-90 text-bg font-medium py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                        Pay with UPI / Card
                    </button>

                    <p className="text-xs text-muted mt-4">Secure payment powered by Razorpay</p>
                </div>
            </div>
        </div>
    );
}
