'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Calendar, Clock, MapPin, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '@/utils/api';
import { useAuth } from '@/components/AuthProvider';

export default function WelcomeScreen({ onComplete }: { onComplete: (chartData: any) => void }) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        dob: '',
        tob: '',
        pob: '',
        name: '',
        lat: null as number | null,
        lon: null as number | null
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (formData.pob.length >= 3 && showSuggestions) {
                setIsSearching(true);
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.pob)}&format=json&limit=6&addressdetails=1&accept-language=en`, {
                        headers: { 'Accept-Language': 'en' }
                    });
                    const data = await res.json();

                    const processed = data
                        .map((place: any) => {
                            if (!place.address) return null;
                            const city = place.address.city || place.address.town || place.address.village || place.address.municipality || place.address.county || '';
                            if (!city) return null;

                            const state = place.address.state || place.address.region || '';
                            const country = place.address.country || '';
                            const label = [city, state, country].filter(Boolean).join(', ');

                            return { ...place, label };
                        })
                        .filter(Boolean);

                    // Deduplicate by label just in case
                    const unique = processed.filter((place: any, index: number, self: any[]) =>
                        index === self.findIndex((t) => t.label === place.label)
                    );

                    setSuggestions(unique);
                } catch (err) {
                    console.error('Failed to fetch locations', err);
                    setSuggestions([]);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [formData.pob, showSuggestions]);

    // Fire-and-forget welcome email — sent once per user via Firestore deduplication
    const sendWelcomeEmail = async () => {
        if (!user?.email || !user?.uid) return;
        try {
            await fetch(`${API_URL}/api/email/welcome`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    name: user.displayName || formData.name || '',
                    user_id: user.uid
                })
            });
        } catch (e) {
            // Silent fail — email is non-critical
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorText('');

        try {
            const res = await fetch(`${API_URL}/api/chart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    dob: formData.dob,
                    tob: formData.tob,
                    pob: formData.pob,
                    lat: formData.lat,
                    lon: formData.lon
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.detail || 'Failed to generate chart');
            }

            localStorage.setItem('astroword_chart', JSON.stringify(data.data));
            onComplete(data.data);

            // Send welcome email after first chart setup (no-op if already sent)
            sendWelcomeEmail();
        } catch (err: any) {
            setErrorText(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 h-full relative">

            {/* Background Mandala Animation */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                <svg width="700" height="700" viewBox="0 0 700 700" fill="none">
                    {/* Rings */}
                    <circle cx="350" cy="350" r="340" stroke="#c9a84c" strokeWidth="0.8" opacity="0.2" />
                    <circle cx="350" cy="350" r="280" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="6 6" opacity="0.15" />
                    <circle cx="350" cy="350" r="220" stroke="#c9a84c" strokeWidth="0.8" opacity="0.18" />
                    <circle cx="350" cy="350" r="160" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.12" />
                    <circle cx="350" cy="350" r="100" stroke="#c9a84c" strokeWidth="0.8" opacity="0.2" />
                    <circle cx="350" cy="350" r="50" stroke="#c9a84c" strokeWidth="1" opacity="0.25" />

                    {/* Spokes */}
                    <line x1="350" y1="10" x2="350" y2="690" stroke="#c9a84c" strokeWidth="0.4" opacity="0.12" />
                    <line x1="10" y1="350" x2="690" y2="350" stroke="#c9a84c" strokeWidth="0.4" opacity="0.12" />
                    <line x1="110" y1="110" x2="590" y2="590" stroke="#c9a84c" strokeWidth="0.4" opacity="0.12" />
                    <line x1="590" y1="110" x2="110" y2="590" stroke="#c9a84c" strokeWidth="0.4" opacity="0.12" />

                    {/* SUN - bright yellow */}
                    <circle cx="350" cy="10" r="10" fill="#FFD700" />
                    <circle cx="350" cy="10" r="16" fill="#FFD700" opacity="0.2" />
                    <circle cx="350" cy="10" r="22" fill="#FFD700" opacity="0.08" />

                    {/* MOON - silver white */}
                    <circle cx="690" cy="350" r="8" fill="#E8E4DC" />
                    <circle cx="690" cy="350" r="14" fill="#E8E4DC" opacity="0.2" />
                    <circle cx="690" cy="350" r="20" fill="#E8E4DC" opacity="0.07" />

                    {/* MARS - red */}
                    <circle cx="590" cy="110" r="7" fill="#FF4444" />
                    <circle cx="590" cy="110" r="13" fill="#FF4444" opacity="0.2" />
                    <circle cx="590" cy="110" r="19" fill="#FF4444" opacity="0.07" />

                    {/* MERCURY - green */}
                    <circle cx="590" cy="590" r="6" fill="#4CAF77" />
                    <circle cx="590" cy="590" r="11" fill="#4CAF77" opacity="0.2" />
                    <circle cx="590" cy="590" r="17" fill="#4CAF77" opacity="0.07" />

                    {/* JUPITER - orange */}
                    <circle cx="110" cy="590" r="9" fill="#F0A500" />
                    <circle cx="110" cy="590" r="15" fill="#F0A500" opacity="0.22" />
                    <circle cx="110" cy="590" r="22" fill="#F0A500" opacity="0.08" />

                    {/* VENUS - pink */}
                    <circle cx="110" cy="110" r="7" fill="#FF69B4" />
                    <circle cx="110" cy="110" r="13" fill="#FF69B4" opacity="0.2" />
                    <circle cx="110" cy="110" r="19" fill="#FF69B4" opacity="0.07" />

                    {/* SATURN - purple */}
                    <circle cx="350" cy="690" r="8" fill="#7c6fcd" />
                    <circle cx="350" cy="690" r="14" fill="#7c6fcd" opacity="0.22" />
                    <circle cx="350" cy="690" r="20" fill="#7c6fcd" opacity="0.08" />

                    {/* RAHU - deep blue */}
                    <circle cx="10" cy="350" r="6" fill="#4A90E2" />
                    <circle cx="10" cy="350" r="12" fill="#4A90E2" opacity="0.2" />

                    {/* KETU - teal */}
                    <circle cx="490" cy="70" r="5" fill="#00BCD4" />
                    <circle cx="490" cy="70" r="10" fill="#00BCD4" opacity="0.2" />
                </svg>
            </motion.div>

            <div className="max-w-md w-full relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

                {/* Header */}
                <div className="text-center space-y-3">
                    <h2 className="font-serif text-5xl">
                        Ask the <span className="text-gold italic">cosmos</span>
                    </h2>
                    <p className="text-muted text-sm tracking-wide">Enter your exact birth details for precision Vedic analysis.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 bg-surface2/50 backdrop-blur-sm p-6 rounded-2xl border border-border">

                    <div className="space-y-4">
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                            <input
                                type="text"
                                placeholder="Name (Optional)"
                                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/70"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-text/90"
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                <input
                                    type="time"
                                    required
                                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-text/90"
                                    value={formData.tob}
                                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="relative" ref={wrapperRef}>
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                            <input
                                type="text"
                                required
                                placeholder="City of Birth (e.g. New Delhi, India)"
                                className="w-full bg-surface border border-border rounded-lg pl-10 pr-10 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/70 text-text/90"
                                value={formData.pob}
                                onChange={(e) => {
                                    setFormData({ ...formData, pob: e.target.value });
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => {
                                    if (formData.pob.length >= 3) {
                                        setShowSuggestions(true);
                                    }
                                }}
                            />
                            {isSearching && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-border border-t-gold rounded-full animate-spin"></div>
                                </div>
                            )}

                            {showSuggestions && formData.pob.length >= 3 && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-surface border border-border rounded-lg shadow-xl overflow-hidden z-50">
                                    {suggestions.length > 0 ? (
                                        <div className="max-h-60 overflow-y-auto">
                                            {suggestions.map((s, i) => (
                                                <div
                                                    key={i}
                                                    className="px-4 py-3 text-sm text-text hover:bg-surface2 cursor-pointer border-b border-border/50 last:border-0 transition-colors"
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            pob: s.label,
                                                            lat: parseFloat(s.lat),
                                                            lon: parseFloat(s.lon)
                                                        });
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    {s.label}
                                                </div>
                                            ))}
                                        </div>
                                    ) : !isSearching ? (
                                        <div className="px-4 py-3 text-sm text-muted italic">
                                            No locations found
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>

                    {errorText && (
                        <div className="text-red-400 text-xs text-center p-2 bg-red-500/10 rounded-md border border-red-500/20">
                            {errorText}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-gold to-amber hover:opacity-90 text-bg font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                        ) : (
                            <>
                                Cast My Chart
                                <Sparkles className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
}
