'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { API_URL } from '@/utils/api';
import { 
  Sparkles, Calendar, Clock, MapPin, User, Lock, Check, 
  AlertCircle, ArrowRight, Mail, FileText, Heart, Globe, Compass 
} from 'lucide-react';
import TopToolsStrip from '@/components/TopToolsStrip';

const TAGLINES = [
  "Parsing planetary coordinates for both charts...",
  "Calculating 36-point Ashtakoota Guna Milan...",
  "Auditing Mangal Dosha and cancellation rules...",
  "Mapping Jaimini Darakarakas and Upapada Lagnas...",
  "Compiling compatibility profile..."
];

const COMMON_TIMEZONES = [
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney",
  "Asia/Tokyo",
  "Africa/Johannesburg"
];

export default function KundaliMatchingPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    boyName: '',
    boyDob: '',
    boyTobHour: '',
    boyTobMinute: '',
    boyPob: '',
    boyLat: '' as string | number,
    boyLon: '' as string | number,
    boyTimezone: 'Asia/Kolkata',

    girlName: '',
    girlDob: '',
    girlTobHour: '',
    girlTobMinute: '',
    girlPob: '',
    girlLat: '' as string | number,
    girlLon: '' as string | number,
    girlTimezone: 'Asia/Kolkata'
  });

  // Autocomplete States
  const [boySuggestions, setBoySuggestions] = useState<any[]>([]);
  const [girlSuggestions, setGirlSuggestions] = useState<any[]>([]);
  const [isSearchingBoy, setIsSearchingBoy] = useState(false);
  const [isSearchingGirl, setIsSearchingGirl] = useState(false);
  const [showBoySuggestions, setShowBoySuggestions] = useState(false);
  const [showGirlSuggestions, setShowGirlSuggestions] = useState(false);

  const boyWrapperRef = useRef<HTMLDivElement>(null);
  const girlWrapperRef = useRef<HTMLDivElement>(null);

  // App States
  const [isLoading, setIsLoading] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [errorText, setErrorText] = useState('');

  // Payment/Report States
  const [buyerEmail, setBuyerEmail] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportSuccessMessage, setReportSuccessMessage] = useState('');

  // Load Razorpay Script & Persisted Data
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Load form details from localStorage
    const savedInputs = localStorage.getItem('astroword_kundali_matching');
    if (savedInputs) {
      try {
        const parsed = JSON.parse(savedInputs);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to load persisted inputs', e);
      }
    }

    // Set default email if logged in
    if (user?.email) {
      setBuyerEmail(user.email);
    }

    // Handle clicks outside of suggestions lists
    function handleClickOutside(event: MouseEvent) {
      if (boyWrapperRef.current && !boyWrapperRef.current.contains(event.target as Node)) {
        setShowBoySuggestions(false);
      }
      if (girlWrapperRef.current && !girlWrapperRef.current.contains(event.target as Node)) {
        setShowGirlSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);

  // Sync email when user signs in
  useEffect(() => {
    if (user?.email) {
      setBuyerEmail(user.email);
    }
  }, [user]);

  // Loading Tagline Cycler
  useEffect(() => {
    if (isLoading && !result) {
      const interval = setInterval(() => {
        setTaglineIndex(prev => (prev < TAGLINES.length - 1 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading, result]);

  // Boy Location Autocomplete Lookup
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.boyPob.length >= 3 && showBoySuggestions) {
        setIsSearchingBoy(true);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.boyPob)}&format=json&limit=5&addressdetails=1&accept-language=en`);
          const data = await res.json();
          const processed = data.map((place: any) => {
            if (!place.address) return null;
            const city = place.address.city || place.address.town || place.address.village || place.address.municipality || place.address.county || '';
            if (!city) return null;
            const state = place.address.state || place.address.region || '';
            const country = place.address.country || '';
            const label = [city, state, country].filter(Boolean).join(', ');
            return { ...place, label };
          }).filter(Boolean);

          const unique = processed.filter((place: any, index: number, self: any[]) =>
            index === self.findIndex((t) => t.label === place.label)
          );
          setBoySuggestions(unique);
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearchingBoy(false);
        }
      } else {
        setBoySuggestions([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [formData.boyPob, showBoySuggestions]);

  // Girl Location Autocomplete Lookup
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.girlPob.length >= 3 && showGirlSuggestions) {
        setIsSearchingGirl(true);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.girlPob)}&format=json&limit=5&addressdetails=1&accept-language=en`);
          const data = await res.json();
          const processed = data.map((place: any) => {
            if (!place.address) return null;
            const city = place.address.city || place.address.town || place.address.village || place.address.municipality || place.address.county || '';
            if (!city) return null;
            const state = place.address.state || place.address.region || '';
            const country = place.address.country || '';
            const label = [city, state, country].filter(Boolean).join(', ');
            return { ...place, label };
          }).filter(Boolean);

          const unique = processed.filter((place: any, index: number, self: any[]) =>
            index === self.findIndex((t) => t.label === place.label)
          );
          setGirlSuggestions(unique);
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearchingGirl(false);
        }
      } else {
        setGirlSuggestions([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [formData.girlPob, showGirlSuggestions]);

  // Handle Form Submit (POST to /api/kundali-matching)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText('');
    setResult(null);
    setPaymentError('');
    setReportSuccessMessage('');

    // Persist input fields
    localStorage.setItem('astroword_kundali_matching', JSON.stringify(formData));

    const boyTob = `${formData.boyTobHour.padStart(2, '0')}:${formData.boyTobMinute.padStart(2, '0')}`;
    const girlTob = `${formData.girlTobHour.padStart(2, '0')}:${formData.girlTobMinute.padStart(2, '0')}`;

    try {
      const res = await fetch(`${API_URL}/api/kundali-matching`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boy: {
            name: formData.boyName || 'Boy',
            dob: formData.boyDob,
            tob: boyTob,
            pob: formData.boyPob,
            lat: formData.boyLat ? parseFloat(String(formData.boyLat)) : null,
            lon: formData.boyLon ? parseFloat(String(formData.boyLon)) : null,
            timezone: formData.boyTimezone
          },
          girl: {
            name: formData.girlName || 'Girl',
            dob: formData.girlDob,
            tob: girlTob,
            pob: formData.girlPob,
            lat: formData.girlLat ? parseFloat(String(formData.girlLat)) : null,
            lon: formData.girlLon ? parseFloat(String(formData.girlLon)) : null,
            timezone: formData.girlTimezone
          }
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.detail || 'Calculation failed. Please check inputs.');
      }

      setResult(data);
    } catch (err: any) {
      setErrorText(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger Razorpay payment for Premium Report (₹399)
  const handleBuyReport = () => {
    setPaymentError('');
    setReportSuccessMessage('');

    if (!buyerEmail) {
      setPaymentError("Please provide a valid email to receive the report.");
      return;
    }

    if (!(window as any).Razorpay) {
      setPaymentError("Payment gateway failed to load. Please refresh the page.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 39900, // ₹399 in paisa
      currency: "INR",
      name: "AstroWord",
      description: `Premium Kundali Matching Report: ${formData.boyName || 'Boy'} & ${formData.girlName || 'Girl'}`,
      theme: { color: "#c9a84c" },
      prefill: { email: buyerEmail },
      handler: async function (response: any) {
        setIsGeneratingReport(true);
        setPaymentError('');

        try {
          const res = await fetch(`${API_URL}/api/kundali-matching/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              boy_name: formData.boyName || 'Boy',
              girl_name: formData.girlName || 'Girl',
              buyer_email: buyerEmail,
              razorpay_order_id: response.razorpay_order_id || 'order_custom_' + Date.now(),
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature || 'signature_bypass',
              boy_chart: result.boy_chart,
              girl_chart: result.girl_chart,
              ashtakoota_breakdown: result.ashtakoota,
              total_score: result.total_score,
              mangal_dosha_boy: result.mangal_dosha_boy,
              mangal_dosha_girl: result.mangal_dosha_girl,
              mangal_dosha_cancelled: result.mangal_dosha_cancelled,
              boy_jaimini_karakas: result.boy_jaimini_karakas,
              girl_jaimini_karakas: result.girl_jaimini_karakas,
              boy_upapada_lagna: result.boy_upapada_lagna,
              girl_upapada_lagna: result.girl_upapada_lagna
            })
          });

          const data = await res.json();
          if (res.ok && data.success) {
            setReportSuccessMessage(`Your report will be sent to ${buyerEmail} within 2 minutes ✓`);
          } else {
            setPaymentError(data.detail || "Failed to generate report. Please contact support at info@astroword.in");
          }
        } catch (err) {
          setPaymentError("An error occurred during report generation. Contact support at info@astroword.in");
        } finally {
          setIsGeneratingReport(false);
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const getScoreColor = (score: number) => {
    if (score >= 18) return 'text-green-400 border-green-500/30 bg-green-500/5 shadow-green-500/5';
    if (score >= 13) return 'text-amber-400 border-amber-500/30 bg-amber-500/5 shadow-amber-500/5';
    return 'text-red-400 border-red-500/30 bg-red-500/5 shadow-red-500/5';
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E8E4DC]">
      <TopToolsStrip currentTool="kundali-matching" />
      
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        
        {/* Title Block */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="text-gold text-2xl animate-pulse">✦</div>
          <h1 className="text-4xl font-serif text-white leading-tight">
            Kundali <span className="text-gold italic">Compatibility</span> Matching
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            Enter birth details for both partners to run a full 36-point Ashtakoota Guna Milan, check Jaimini spouse karakas, and verify Manglik alignments.
          </p>
        </div>

        {/* Loading Mandala */}
        {isLoading && (
          <div className="min-h-[400px] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <style>{`
              @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
            <div className="animate-[spin-slow_90s_linear_infinite] opacity-30 mb-8">
              <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
                <circle cx="120" cy="120" r="115" stroke="#c9a84c" strokeWidth="0.8" />
                <circle cx="120" cy="120" r="95" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="4 4" />
                <circle cx="120" cy="120" r="75" stroke="#c9a84c" strokeWidth="0.8" />
                <line x1="120" y1="5" x2="120" y2="235" stroke="#c9a84c" strokeWidth="0.5" />
                <line x1="5" y1="120" x2="235" y2="120" stroke="#c9a84c" strokeWidth="0.5" />
              </svg>
            </div>
            <p className="text-gold font-serif text-lg animate-pulse">{TAGLINES[taglineIndex]}</p>
          </div>
        )}

        {/* INPUT FORM (Only display when not loading and no result) */}
        {!isLoading && !result && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* BOY DETAILS */}
              <div className="bg-surface/40 backdrop-blur-sm border border-border p-6 rounded-2xl space-y-4 relative">
                <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#0A0A0F] px-3 py-0.5 border border-border text-gold font-serif text-xs uppercase tracking-wider rounded-md">
                  Boy Details
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Boy Name (Optional)"
                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/60"
                    value={formData.boyName}
                    onChange={(e) => setFormData({ ...formData, boyName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                    <input
                      type="date"
                      required
                      className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-text/90"
                      value={formData.boyDob}
                      onChange={(e) => setFormData({ ...formData, boyDob: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none z-10" />
                      <select
                        required
                        className="w-full bg-surface border border-border rounded-lg pl-10 pr-2 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-text/90 appearance-none"
                        value={formData.boyTobHour}
                        onChange={(e) => setFormData({ ...formData, boyTobHour: e.target.value })}
                      >
                        <option value="" disabled>HH</option>
                        {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(h => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                    <div className="relative flex-1">
                      <select
                        required
                        className="w-full bg-surface border border-border rounded-lg px-3 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-text/90 appearance-none"
                        value={formData.boyTobMinute}
                        onChange={(e) => setFormData({ ...formData, boyTobMinute: e.target.value })}
                      >
                        <option value="" disabled>MM</option>
                        {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative" ref={boyWrapperRef}>
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    required
                    placeholder="City of Birth (e.g. Mumbai, India)"
                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-10 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/60 text-text/90"
                    value={formData.boyPob}
                    onChange={(e) => {
                      setFormData({ ...formData, boyPob: e.target.value });
                      setShowBoySuggestions(true);
                    }}
                    onFocus={() => { if (formData.boyPob.length >= 3) setShowBoySuggestions(true); }}
                  />
                  {isSearchingBoy && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 border-2 border-border border-t-gold rounded-full animate-spin"></div>
                    </div>
                  )}
                  {showBoySuggestions && boySuggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#101015] border border-border rounded-lg shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                      {boySuggestions.map((s, i) => (
                        <div
                          key={i}
                          className="px-4 py-2.5 text-xs sm:text-sm text-text hover:bg-surface cursor-pointer border-b border-border/40 last:border-0 transition-colors"
                          onMouseDown={() => {
                            setFormData(prev => ({
                              ...prev,
                              boyPob: s.label,
                              boyLat: s.lat,
                              boyLon: s.lon
                            }));
                            setShowBoySuggestions(false);
                          }}
                        >
                          {s.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lat, Lon, Timezone section (Visible and edit-friendly, satisfies requirement) */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div>
                    <label className="text-[10px] text-muted font-mono uppercase block mb-1">Latitude</label>
                    <div className="relative">
                      <Compass className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/50" />
                      <input
                        type="text"
                        required
                        className="w-full bg-surface border border-border rounded-md pl-7 pr-2 py-1.5 text-xs focus:border-gold outline-none text-muted"
                        value={formData.boyLat}
                        onChange={(e) => setFormData({ ...formData, boyLat: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted font-mono uppercase block mb-1">Longitude</label>
                    <div className="relative">
                      <Compass className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/50" />
                      <input
                        type="text"
                        required
                        className="w-full bg-surface border border-border rounded-md pl-7 pr-2 py-1.5 text-xs focus:border-gold outline-none text-muted"
                        value={formData.boyLon}
                        onChange={(e) => setFormData({ ...formData, boyLon: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted font-mono uppercase block mb-1">Timezone</label>
                    <div className="relative">
                      <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/50" />
                      <select
                        required
                        className="w-full bg-surface border border-border rounded-md pl-7 pr-1 py-1.5 text-xs focus:border-gold outline-none text-muted appearance-none"
                        value={formData.boyTimezone}
                        onChange={(e) => setFormData({ ...formData, boyTimezone: e.target.value })}
                      >
                        {COMMON_TIMEZONES.map(tz => (
                          <option key={tz} value={tz}>{tz.split('/')[1] || tz}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* GIRL DETAILS */}
              <div className="bg-surface/40 backdrop-blur-sm border border-border p-6 rounded-2xl space-y-4 relative">
                <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#0A0A0F] px-3 py-0.5 border border-border text-gold font-serif text-xs uppercase tracking-wider rounded-md">
                  Girl Details
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Girl Name (Optional)"
                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/60"
                    value={formData.girlName}
                    onChange={(e) => setFormData({ ...formData, girlName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                    <input
                      type="date"
                      required
                      className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-text/90"
                      value={formData.girlDob}
                      onChange={(e) => setFormData({ ...formData, girlDob: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none z-10" />
                      <select
                        required
                        className="w-full bg-surface border border-border rounded-lg pl-10 pr-2 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-text/90 appearance-none"
                        value={formData.girlTobHour}
                        onChange={(e) => setFormData({ ...formData, girlTobHour: e.target.value })}
                      >
                        <option value="" disabled>HH</option>
                        {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(h => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                    <div className="relative flex-1">
                      <select
                        required
                        className="w-full bg-surface border border-border rounded-lg px-3 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-text/90 appearance-none"
                        value={formData.girlTobMinute}
                        onChange={(e) => setFormData({ ...formData, girlTobMinute: e.target.value })}
                      >
                        <option value="" disabled>MM</option>
                        {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative" ref={girlWrapperRef}>
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    required
                    placeholder="City of Birth (e.g. London, UK)"
                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-10 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted/60 text-text/90"
                    value={formData.girlPob}
                    onChange={(e) => {
                      setFormData({ ...formData, girlPob: e.target.value });
                      setShowGirlSuggestions(true);
                    }}
                    onFocus={() => { if (formData.girlPob.length >= 3) setShowGirlSuggestions(true); }}
                  />
                  {isSearchingGirl && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 border-2 border-border border-t-gold rounded-full animate-spin"></div>
                    </div>
                  )}
                  {showGirlSuggestions && girlSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#101015] border border-border rounded-lg shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                      {girlSuggestions.map((s, i) => (
                        <div
                          key={i}
                          className="px-4 py-2.5 text-xs sm:text-sm text-text hover:bg-surface cursor-pointer border-b border-border/40 last:border-0 transition-colors"
                          onMouseDown={() => {
                            setFormData(prev => ({
                              ...prev,
                              girlPob: s.label,
                              girlLat: s.lat,
                              girlLon: s.lon
                            }));
                            setShowGirlSuggestions(false);
                          }}
                        >
                          {s.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lat, Lon, Timezone section */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div>
                    <label className="text-[10px] text-muted font-mono uppercase block mb-1">Latitude</label>
                    <div className="relative">
                      <Compass className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/50" />
                      <input
                        type="text"
                        required
                        className="w-full bg-surface border border-border rounded-md pl-7 pr-2 py-1.5 text-xs focus:border-gold outline-none text-muted"
                        value={formData.girlLat}
                        onChange={(e) => setFormData({ ...formData, girlLat: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted font-mono uppercase block mb-1">Longitude</label>
                    <div className="relative">
                      <Compass className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/50" />
                      <input
                        type="text"
                        required
                        className="w-full bg-surface border border-border rounded-md pl-7 pr-2 py-1.5 text-xs focus:border-gold outline-none text-muted"
                        value={formData.girlLon}
                        onChange={(e) => setFormData({ ...formData, girlLon: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted font-mono uppercase block mb-1">Timezone</label>
                    <div className="relative">
                      <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/50" />
                      <select
                        required
                        className="w-full bg-surface border border-border rounded-md pl-7 pr-1 py-1.5 text-xs focus:border-gold outline-none text-muted appearance-none"
                        value={formData.girlTimezone}
                        onChange={(e) => setFormData({ ...formData, girlTimezone: e.target.value })}
                      >
                        {COMMON_TIMEZONES.map(tz => (
                          <option key={tz} value={tz}>{tz.split('/')[1] || tz}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {errorText && (
              <div className="text-red-400 text-xs sm:text-sm text-center p-3 bg-red-500/10 rounded-xl border border-red-500/20 max-w-md mx-auto">
                {errorText}
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-gold to-amber hover:opacity-95 text-bg font-medium px-12 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-gold/5 transition-all text-sm sm:text-base"
              >
                Match Kundalis
                <Sparkles className="w-4 h-4 text-bg" />
              </button>
            </div>
          </form>
        )}

        {/* RESULTS BLOCK (Only display when result is calculated) */}
        {result && (
          <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            
            {/* Score Badge */}
            <div className="bg-surface/50 border border-border/80 rounded-2xl p-6 sm:p-8 text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <p className="text-muted text-xs uppercase tracking-widest font-mono">Compatibility Score</p>
              
              <div className="flex justify-center">
                <div className={`w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center shadow-lg transition-all ${getScoreColor(result.total_score)}`}>
                  <span className="text-4xl font-serif font-bold leading-none">{result.total_score}</span>
                  <span className="text-xs font-mono mt-1 opacity-70">/ 36 Gunas</span>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <h3 className="text-white text-lg font-serif">
                  {result.total_score >= 18 
                    ? "Auspicious & Harmonious Union" 
                    : result.total_score >= 13 
                    ? "Moderate & Average Match" 
                    : "Challenging Compatibility"}
                </h3>
              </div>
            </div>

            {/* Teaser Compatibility Interpretation */}
            <div className="bg-surface/30 border border-border/60 rounded-xl p-5 text-sm leading-relaxed text-muted/90 space-y-3">
              <p className="text-white font-medium font-serif">Teaser Compatibility Analysis:</p>
              {result.total_score >= 18 ? (
                <>
                  <p>This indicates a very auspicious and harmonious matching of energies. The couple shares a strong foundation of emotional understanding, mutual respect, and intellectual alignment.</p>
                  <p>Life goals and core values are well-aligned, promising domestic happiness, family support, and joint prosperity.</p>
                  <p>While minor disagreements can happen, the overall astrological parameters provide strong resilience, allowing the couple to resolve conflicts with empathy.</p>
                </>
              ) : result.total_score >= 13 ? (
                <>
                  <p>This represents a moderate compatibility match. While there is stable attraction and basic alignment, minor differences in behavioral rhythms or communication styles may surface.</p>
                  <p>Specific areas like Gana or Graha Maitri might indicate contrasting worldviews, which means both partners will need to put conscious effort into understanding each other's outlooks.</p>
                  <p>With patience, mutual understanding, and active efforts, this union can be nurtured successfully into a loving, stable relationship.</p>
                </>
              ) : (
                <>
                  <p>This points to potential challenges and clashes in temperament, emotional language, or physiological alignment. This match suggests caution.</p>
                  <p>Key doshas like Nadi or Bhakoot might be active, indicating possible areas of friction regarding daily communication or domestic synchronization.</p>
                  <p>This union warrants the performance of specific astrological remedies, deep personal understanding, and medical consultation regarding progeny where relevant.</p>
                </>
              )}
            </div>

            {/* Ashtakoota Table */}
            <div className="bg-surface/30 border border-border rounded-2xl p-5 space-y-3 overflow-hidden">
              <p className="text-muted text-xs uppercase tracking-widest font-mono">36-Point Ashtakoota Breakdown</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/60 text-muted font-mono text-[10px] uppercase">
                      <th className="py-2.5">Koota</th>
                      <th className="py-2.5 text-center">Boy Value</th>
                      <th className="py-2.5 text-center">Girl Value</th>
                      <th className="py-2.5 text-center">Obtained</th>
                      <th className="py-2.5 text-right">Area of Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {result.ashtakoota?.map((item: any, i: number) => {
                      const pts = parseFloat(item.obtained_points);
                      const maxPts = parseFloat(item.max_points);
                      const rowColor = pts === maxPts 
                        ? 'text-green-400 bg-green-500/0' 
                        : pts === 0 
                        ? 'text-red-400 bg-red-500/0' 
                        : 'text-amber-400';

                      return (
                        <tr key={i} className="hover:bg-surface/25 transition-colors">
                          <td className="py-3 font-medium text-white/95">{item.name}</td>
                          <td className="py-3 text-center text-muted">{item.boy_value}</td>
                          <td className="py-3 text-center text-muted">{item.girl_value}</td>
                          <td className={`py-3 text-center font-bold ${rowColor}`}>
                            {pts} / {parseInt(item.max_points)}
                          </td>
                          <td className="py-3 text-right text-muted/80">{item.area}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mangal Dosha Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface/30 border border-border rounded-xl p-5 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-[10px] text-muted font-mono uppercase">Mangal Dosha Status (Boy)</p>
                  <p className="text-white font-serif text-base mt-1">{formData.boyName || 'Boy'}</p>
                </div>
                <div className="flex items-center">
                  {result.mangal_dosha_boy ? (
                    <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Mangal Dosha Active
                    </span>
                  ) : (
                    <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      No Dosha
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-surface/30 border border-border rounded-xl p-5 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-[10px] text-muted font-mono uppercase">Mangal Dosha Status (Girl)</p>
                  <p className="text-white font-serif text-base mt-1">{formData.girlName || 'Girl'}</p>
                </div>
                <div className="flex items-center">
                  {result.mangal_dosha_girl ? (
                    <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Mangal Dosha Active
                    </span>
                  ) : (
                    <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      No Dosha
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Jaimini Section */}
            <div className="bg-surface/30 border border-border rounded-2xl p-5 space-y-4">
              <p className="text-muted text-xs uppercase tracking-widest font-mono">Jaimini Soul Compatibility</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface/20 border border-border/40 rounded-xl p-4 space-y-2">
                  <h4 className="text-gold text-xs font-mono uppercase tracking-wider">Darakaraka (Spouse)</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Boy: <span className="text-white">{result.boy_jaimini_karakas?.darakaraka?.planet || 'N/A'}</span> ({result.boy_jaimini_karakas?.darakaraka?.degree || 0}°) · Girl: <span className="text-white">{result.girl_jaimini_karakas?.darakaraka?.planet || 'N/A'}</span> ({result.girl_jaimini_karakas?.darakaraka?.degree || 0}°)
                  </p>
                  <p className="text-xs text-muted/70 italic">
                    Reveals the qualities, temperament, and appearance of the partner that your soul seeks.
                  </p>
                </div>

                <div className="bg-surface/20 border border-border/40 rounded-xl p-4 space-y-2">
                  <h4 className="text-gold text-xs font-mono uppercase tracking-wider">Upapada Lagna (Commitment)</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Boy UL: <span className="text-white">{result.boy_upapada_lagna?.upapada_lagna || 'N/A'}</span> · Girl UL: <span className="text-white">{result.girl_upapada_lagna?.upapada_lagna || 'N/A'}</span>
                  </p>
                  <p className="text-xs text-muted/70 italic">
                    Indicates the social status, longevity, and overall commitment of the marriage contract.
                  </p>
                </div>
              </div>
            </div>

            {/* Paywall CTA box */}
            <div className="bg-gradient-to-r from-gold/15 via-gold/5 to-amber/15 border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-6 text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-2xl rounded-full" />
              
              <div className="max-w-xl mx-auto space-y-3">
                <span className="bg-gold/10 border border-gold/25 text-gold text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full">Premium Option</span>
                <h2 className="text-xl sm:text-2xl font-serif text-white">Get Your Complete 30-Page Kundali Matching Report</h2>
                <p className="text-gold font-serif text-xl sm:text-2xl font-semibold">One-time payment of ₹399</p>
                <p className="text-muted text-xs sm:text-sm">
                  Includes Jaimini analysis, D9 compatibility, Dasha timing & AI verdict.
                </p>
              </div>

              {/* Highlights */}
              <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-left">
                {[
                  "⭐ 30-Page Premium PDF",
                  "🔍 Deep D9 Navamsa Audit",
                  "🔮 Dasha Marriage Windows",
                  "🪔 Personalized Remedies",
                  "🤖 Gemini AI Verdict",
                  "🚀 Sent instantly to Email"
                ].map((highlight, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="text-gold">✦</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Purchase CTA controls */}
              <div className="max-w-md mx-auto space-y-4">
                {reportSuccessMessage ? (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-4 rounded-xl flex items-center justify-center gap-2">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>{reportSuccessMessage}</span>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your Email (e.g. buyer@example.com)"
                        className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold outline-none transition-all placeholder:text-muted/65 text-text/90"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={handleBuyReport}
                      disabled={isGeneratingReport}
                      className="w-full bg-gradient-to-r from-gold to-amber hover:opacity-95 text-bg font-medium py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-gold/10 transition-all text-sm sm:text-base disabled:opacity-50"
                    >
                      {isGeneratingReport ? (
                        <>
                          <div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                          <span>Generating Report...</span>
                        </>
                      ) : (
                        <>
                          <span>Unlock 30-Page PDF Report — ₹399</span>
                          <ArrowRight className="w-4 h-4 text-bg" />
                        </>
                      )}
                    </button>
                  </>
                )}

                {paymentError && (
                  <p className="text-red-400 text-xs mt-1 text-center">{paymentError}</p>
                )}

                <p className="text-muted/50 text-[10px] sm:text-xs">
                  Instant PDF delivery · Secured by Razorpay · 100% Secure Checkout
                </p>
              </div>

            </div>

            {/* Reset / Run Again Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setResult(null)}
                className="text-muted hover:text-white transition-colors text-sm border border-border hover:border-gold/30 px-6 py-2.5 rounded-xl bg-surface/20"
              >
                ← Calculate Another Match
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
