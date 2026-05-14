'use client';

import { useState, useEffect } from 'react';
import { Lock, Check, Download, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

interface MarriageReportPreviewProps {
  chartData: any;
  calculatorType: 'darakaraka' | 'atmakaraka' | 'amatyakaraka' | 'gana' | 'marriage-year' | 'marriage-type' | 'spouse-initial';
}

export default function MarriageReportPreview({ chartData, calculatorType }: MarriageReportPreviewProps) {
    const { user } = useAuth();
    const [generating, setGenerating] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
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
                    const res = await fetch('/api/marriage-report/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chart_data: chartData,
                            payment_id: response.razorpay_payment_id,
                            user_id: user.uid
                        })
                    });
                    
                    const data = await res.json();
                    
                    if (data.success) {
                        setDownloadUrl(data.download_url);
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

    return (
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
                        <div className="space-y-6 blur-[4px] select-none opacity-40">
                            <div>
                                <h4 className="text-gold text-xs font-medium mb-1 tracking-wider">YOUR FUTURE SPOUSE</h4>
                                <p className="text-white text-sm leading-relaxed">The placement of your Darakaraka indicates a partner with a strong, independent nature. They are likely to be involved in a profession related to leadership, technology, or creative arts. Their appearance will be striking with a warm and magnetic personality that complements yours perfectly, bringing balance to your life.</p>
                            </div>
                            <div>
                                <h4 className="text-gold text-xs font-medium mb-1 tracking-wider">WHEN WILL YOU MARRY</h4>
                                <p className="text-white text-sm leading-relaxed">Based on your current Dasha periods and the transit of Jupiter, the most promising window for marriage appears to be between late 2026 and mid 2027. This period activates your 7th house lord strongly, indicating a time of union.</p>
                            </div>
                            <div>
                                <h4 className="text-gold text-xs font-medium mb-1 tracking-wider">LOVE OR ARRANGED</h4>
                                <p className="text-white text-sm leading-relaxed">Analysis of your 5th and 7th lords suggests a strong inclination towards a love marriage, or a love-cum-arranged setup where you meet through mutual friends but proceed with family blessings.</p>
                            </div>
                            <div>
                                <h4 className="text-gold text-xs font-medium mb-1 tracking-wider">SPOUSE NAME INITIAL</h4>
                                <p className="text-white text-sm leading-relaxed">The syllables indicated by your 7th lord and Darakaraka point towards names starting with letters like R, S, M, or A, aligning with the sacred sounds of your chart.</p>
                            </div>
                            <div>
                                <h4 className="text-gold text-xs font-medium mb-1 tracking-wider">2026-2027 FORECAST</h4>
                                <p className="text-white text-sm leading-relaxed">Transit of Jupiter through your 7th house during this period brings expansion and blessings to your relationship sector, making it an ideal time for commitment and long-term planning.</p>
                            </div>
                            <div>
                                <h4 className="text-gold text-xs font-medium mb-1 tracking-wider">REMEDIES & GUIDANCE</h4>
                                <p className="text-white text-sm leading-relaxed">To strengthen your 7th house energy, consider chanting the Venus mantra on Fridays and donating white items to those in need. This will help remove obstacles in timing and attract the right energy.</p>
                            </div>
                        </div>

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-surface/70 flex flex-col items-center justify-center p-6 text-center">
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
    );
}
