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
import IshtaDevataSEOContent from './IshtaDevataSEO';

const DEVA_TAGLINES = [
  "Identifying Atmakaraka degree in D1...",
  "Locating Karakamsha sign in D9 Navamsa...",
  "Analyzing 12th house of liberation...",
  "Matching deity vibrational frequencies...",
  "Your Ishta Devata reading is ready..."
];

const SUGGESTED_QUESTIONS = [
  "How can I worship my Ishta Devata daily with my busy schedule?",
  "What is the difference between my Atmakaraka and Ishta Devata?",
  "How does my Ishta Devata protect me during tough planetary periods?",
  "Should I also worship my family deity (Kul Devata)?",
  "How does my Moon Nakshatra deity affect my mind?"
];

export default function IshtaDevataPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      const savedChart = localStorage.getItem('astroword_chart');
      if (savedChart) {
        try {
          const parsed = JSON.parse(savedChart);
          setChartData(parsed);
          fetchIshtaDevata(parsed);
        } catch (e) {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (isLoading && chartData && !result) {
      const interval = setInterval(() => {
        setTaglineIndex(prev => (prev < DEVA_TAGLINES.length - 1 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading, chartData, result]);

  const fetchIshtaDevata = async (chart: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const idToken = user ? await user.getIdToken() : '';
      const res = await fetch(`${API_URL}/api/ishta-devata`, {
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
        setError('Could not calculate your Ishta Devata details. Please try again.');
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
    fetchIshtaDevata(data);
  };

  const copyMantraToClipboard = () => {
    if (result?.ishta_devata_mantra) {
      navigator.clipboard.writeText(result.ishta_devata_mantra);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (error) {
    return (
      <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-2xl">🕉️</p>
          <p className="text-white font-serif text-lg">The spiritual query failed</p>
          <p className="text-muted text-sm">{error}</p>
          <button
            onClick={() => { setError(null); if (chartData) fetchIshtaDevata(chartData); }}
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
        <IshtaDevataSEOContent />
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
            {DEVA_TAGLINES[taglineIndex]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-bg text-text py-12">
      <TopToolsStrip currentTool="ishta-devata" />
      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">
        <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="text-muted text-xs uppercase tracking-widest font-mono">
            Your Jaimini Ishta Devata is
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-wide py-2 text-gold">
            {result.ishta_devata}
          </h1>
          <div className="bg-bg/60 border border-border/85 rounded-xl p-4 max-w-md mx-auto space-y-2 mt-2">
            <p className="text-muted text-xs font-mono">SACRED MANTRA</p>
            <p className="text-white text-base font-serif italic tracking-wide">{result.ishta_devata_mantra}</p>
            <button
              onClick={copyMantraToClipboard}
              className="text-xs border px-3 py-1 rounded-md text-gold border-gold/20 bg-gold/5 hover:bg-gold/10 transition-all font-mono mt-1"
            >
              {copied ? '✓ Copied' : 'Copy Mantra'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            <span className="text-xs border px-4 py-1.5 rounded-full font-mono text-gold border-gold/20 bg-gold/10">
              Soul Planet (AK): {result.atmakaraka}
            </span>
            <span className="text-xs border px-4 py-1.5 rounded-full font-mono text-white/80 border-border bg-surface">
              Karakamsha: {result.navamsa_sign}
            </span>
            <span className="text-xs border px-4 py-1.5 rounded-full font-mono text-white/80 border-border bg-surface">
              12th Navamsa House: {result.twelfth_from_navamsa}
            </span>
            {result.nakshatra_deity && result.nakshatra_deity !== 'Unknown' && (
              <span className="text-xs border px-4 py-1.5 rounded-full font-mono text-white/80 border-border bg-surface">
                Nakshatra Deity: {result.nakshatra_deity}
              </span>
            )}
          </div>
        </div>

        <ShareCard
          question="Who is my Ishta Devata?"
          answer={`${result.ishta_devata}`}
          subtext={`Soul Planet: ${result.atmakaraka} · Mantra: ${result.ishta_devata_mantra}`}
          keywords={['Ishta Devata', result.ishta_devata, result.atmakaraka, 'Moksha']}
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
                sessionStorage.setItem('pending_question', `What are the classical remedies and daily worship guidelines for connecting with ${result.ishta_devata}?`);
                window.location.href = '/';
              }}
              className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
            >
              ✦ Ask the AI — Free
            </button>
            <button
              onClick={() => {
                sessionStorage.setItem('pending_question', `How does having my Atmakaraka ${result.atmakaraka} in ${result.navamsa_sign} Navamsa affect my spiritual journey?`);
                window.location.href = '/';
              }}
              className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm"
            >
              Atmakaraka Remedies
            </button>
          </div>
          <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
        </div>

        <MarriageReportPreview 
          chartData={chartData} 
          calculatorType="ishta-devata"
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
    </div>
  );
}
