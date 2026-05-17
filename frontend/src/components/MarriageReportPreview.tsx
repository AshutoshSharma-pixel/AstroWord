'use client';

import { useState, useEffect } from 'react';
import { Lock, Check, Download, Loader2, X } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import Image from 'next/image';

interface MarriageReportPreviewProps {
  chartData: any;
  calculatorType: 'darakaraka' | 'atmakaraka' | 'amatyakaraka' | 'gana' | 'marriage-year' | 'marriage-type' | 'spouse-initial' | 'manglik' | 'dasha';
}

export default function MarriageReportPreview({ chartData, calculatorType }: MarriageReportPreviewProps) {
    const { user } = useAuth();
    const [generating, setGenerating] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 9000);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
            clearTimeout(timer);
        };
    }, []);

    const handlePayment = () => {
        if (!user) {
            setError("Please log in to unlock the report.");
            return;
        }

        if (!(window as any).Razorpay) {
            setError("Payment gateway failed to load. Please refresh the page.");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: 19900,
            currency: "INR",
            name: "AstroWord",
            description: "Personal Marriage Report",
            theme: { color: "#c9a84c" },
            handler: async function (response: any) {
                setGenerating(true);
                setError(null);
                try {
                    const res = await fetch('https://astroword-backend-422394834926.asia-south1.run.app/api/marriage-report/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chart_data: chartData,
                            payment_id: response.razorpay_payment_id,
                            user_id: user?.uid || 'anonymous',
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });
                    
                    const data = await res.json();
                    
                    if (data.success) {
                        setDownloadUrl(data.download_url);
                        setIsModalOpen(false); // Close modal on success
                    } else {
                        setError("Something went wrong. Please contact support.");
                    }
                } catch (err) {
                    setError("Something went wrong. Please contact support.");
                } finally {
                    setGenerating(false);
                }
            }
        };
        
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    const blurredPreviewContent = (
        <div className="space-y-4 text-left">
            <div>
                <h4 className="text-gold text-xs font-mono tracking-widest uppercase mb-2 mt-4">YOUR FUTURE SPOUSE</h4>
                <div className="blur-[4px] select-none opacity-60">
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-full"></div>
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-4/5"></div>
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-3/4"></div>
                </div>
            </div>
            <div>
                <h4 className="text-gold text-xs font-mono tracking-widest uppercase mb-2 mt-4">WHEN WILL YOU MARRY</h4>
                <div className="blur-[4px] select-none opacity-60">
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-full"></div>
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-4/5"></div>
                </div>
            </div>
            <div>
                <h4 className="text-gold text-xs font-mono tracking-widest uppercase mb-2 mt-4">LOVE OR ARRANGED</h4>
                <div className="blur-[4px] select-none opacity-60">
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-full"></div>
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-3/4"></div>
                </div>
            </div>
            <div>
                <h4 className="text-gold text-xs font-mono tracking-widest uppercase mb-2 mt-4">SPOUSE NAME INITIAL</h4>
                <div className="blur-[4px] select-none opacity-60">
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-1/2"></div>
                </div>
            </div>
            <div>
                <h4 className="text-gold text-xs font-mono tracking-widest uppercase mb-2 mt-4">2026-2027 FORECAST</h4>
                <div className="blur-[4px] select-none opacity-60">
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-full"></div>
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-4/5"></div>
                </div>
            </div>
            <div>
                <h4 className="text-gold text-xs font-mono tracking-widest uppercase mb-2 mt-4">REMEDIES & GUIDANCE</h4>
                <div className="blur-[4px] select-none opacity-60">
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-full"></div>
                    <div className="h-3 rounded-full bg-white/15 mb-2 w-3/4"></div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="bg-surface rounded-xl border border-border overflow-hidden my-8">
                {/* TOP SECTION */}
                <div className="p-6 border-b border-border text-center">
                    <div className="text-gold text-2xl mb-2">✦</div>
                    <h2 className="text-xl font-serif text-white mb-1">Your Full Marriage Report is Ready</h2>
                    <p className="text-muted text-sm mb-3">Spouse profile · Marriage timing · 2026 forecast · Remedies</p>
                    <span className="bg-surface2 text-gold text-xs px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px]">Preview</span>
                </div>

                {/* MIDDLE SECTION (Blurred Content or Success State) */}
                <div className="relative p-6">
                    {downloadUrl ? (
                        // Success State
                        <div className="text-center py-8">
                            <div className="bg-green-500/10 text-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="text-white text-lg font-serif mb-2">Your Marriage Report is Ready!</h3>
                            <p className="text-muted text-sm mb-6">You can now download your comprehensive PDF report.</p>
                            <a 
                                href={downloadUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF Report
                            </a>
                        </div>
                    ) : (
                        // Blurred Preview
                        <>
                            {blurredPreviewContent}

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-surface/70 flex flex-col items-center justify-center p-6 text-center">
                                {!generating && (
                                    <div className="flex justify-center mb-4">
                                        <div className="relative w-32 rounded-xl overflow-hidden shadow-xl shadow-gold/10 border border-gold/20">
                                            <Image
                                                src="/Marriage Report Image .png"
                                                alt="Your Vedic Marriage Report"
                                                width={200}
                                                height={240}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                {generating ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="w-8 h-8 text-gold animate-spin" />
                                        <p className="text-white font-medium">Generating your report...</p>
                                        <p className="text-muted text-sm">This may take up to a minute. Please don't close this window.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-surface2 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-border">
                                            <Lock className="w-5 h-5 text-gold" />
                                        </div>
                                        <h3 className="text-white text-lg font-serif mb-1">Unlock Your Complete Marriage Report</h3>
                                        <p className="text-muted text-sm mb-6 max-w-md">Deeply personalised · Based on your exact birth chart · Instant PDF</p>
                                        
                                        <button 
                                            onClick={handlePayment}
                                            className="bg-gold text-black px-8 py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors mb-3 shadow-lg shadow-gold/10"
                                        >
                                            Get Full Report — ₹199
                                        </button>
                                        
                                        <p className="text-muted text-xs">One-time payment · Instant download · No subscription</p>
                                        
                                        {error && (
                                            <p className="text-red-500 text-xs mt-4">{error}</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Persistent Trigger Button */}
            {!downloadUrl && (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full mt-4 border border-gold/40 text-gold text-sm py-2 rounded-xl hover:bg-gold/10 transition-all"
                >
                    ✦ View Your Marriage Report Preview
                </button>
            )}

            {/* Auto-Popup Modal */}
            {isModalOpen && !downloadUrl && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div 
                        className="bg-surface2 border border-gold/30 rounded-2xl p-6 max-w-md w-full relative max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="absolute top-4 right-4 text-muted hover:text-white"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="text-center mb-6">
                            <div className="text-gold text-2xl mb-2">✦</div>
                            <h2 className="text-xl font-serif text-white mb-1">Your Marriage Report</h2>
                            <p className="text-muted text-sm">Spouse profile · Marriage timing · 2026 forecast</p>
                        </div>
                        
                        {/* Preview Content */}
                        <div className="mb-6">
                            {blurredPreviewContent}
                        </div>
                        
                        {/* CTA Button */}
                        <div className="text-center">
                            <button 
                                onClick={handlePayment}
                                className="bg-gold text-black px-6 py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors mb-2 w-full"
                            >
                                Get Full Report — ₹199
                            </button>
                            <p className="text-muted text-xs">One-time payment · Instant download</p>
                            
                            {error && (
                                <p className="text-red-500 text-xs mt-3">{error}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
