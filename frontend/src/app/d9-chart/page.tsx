'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import WelcomeScreen from '@/components/WelcomeScreen';
import MarriageReportPreview from '@/components/MarriageReportPreview';
import { API_URL } from '@/utils/api';
import TopToolsStrip from '@/components/TopToolsStrip';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { cleanReading } from '@/utils/cleanReading';

const LOADING_TAGLINES = [
  "Reading your Navamsa divisions...",
  "Detecting Vargottama planets...",
  "Finding your Karakamsha sign...",
  "Mapping the 7th house in D9...",
  "Your Navamsa chart is ready..."
];

export default function D9ChartPage() {
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
          localStorage.removeItem('astroword_chart');
          fetchD9Chart(parsed);
        } catch (e) {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (isLoading && !result) {
      const interval = setInterval(() => {
        setTaglineIndex(prev => prev < LOADING_TAGLINES.length - 1 ? prev + 1 : prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading, result]);

  const fetchD9Chart = async (chart: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/d9-chart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chart_data: chart })
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setResult(data);
      localStorage.setItem('astroword_chart', JSON.stringify(chart));
    } catch {
      setError('Could not load your D9 chart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (data: any) => {
    setChartData(data);
    fetchD9Chart(data);
  };

  // Error state — same pattern as darakaraka
  if (error) {
    return (
      <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-2xl">🌙</p>
          <p className="text-white font-serif text-lg">The cosmos need a moment</p>
          <p className="text-muted text-sm">{error}</p>
          <button onClick={() => { setError(null); if (chartData) fetchD9Chart(chartData); }}
            className="bg-gold/10 border border-gold/20 text-gold px-6 py-2 rounded-xl text-sm hover:bg-gold/20 transition-all">
            Try Again
          </button>
          <button onClick={() => router.push('/')} className="block text-muted text-sm hover:text-white transition-colors mt-2 mx-auto">
            ← Back to Chat
          </button>
        </div>
      </div>
    );
  }

  // No chart yet — show WelcomeScreen + intro text
  if (!chartData && !isLoading && !result) {
    return (
      <div className="min-h-[100dvh] bg-bg text-text">
        <WelcomeScreen onComplete={handleFormSubmit} />
        <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6 mt-12 border-t border-border/30 pt-12">
          <h1 className="text-gold font-serif text-3xl">Navamsa Chart Calculator (D9 Chart)</h1>
          <p className="text-muted text-sm leading-relaxed">
            The Navamsa or D9 chart is the most important divisional chart in Vedic astrology — revealing your soul's purpose, the true strength of your planets, and the inner nature of your marriage and spouse.
          </p>
          <p className="text-muted text-sm leading-relaxed italic">
            Enter your birth details above to generate your free Navamsa chart with AI-powered interpretation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-bg text-text pb-20">
      <TopToolsStrip currentTool="d9-chart" />
      <div className="max-w-4xl mx-auto px-4 pt-8">

        {/* Loading spinner */}
        {isLoading && !result && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-gold text-xs">
                {Math.round((taglineIndex / LOADING_TAGLINES.length) * 100)}%
              </div>
            </div>
            <p className="text-gold font-serif italic text-lg animate-pulse text-center px-6">
              {LOADING_TAGLINES[taglineIndex]}
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="max-w-2xl mx-auto space-y-6">

            {/* D9 Ascendant hero card */}
            <div className="bg-surface2 border border-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              <p className="text-muted text-xs uppercase tracking-widest font-mono">Your Navamsa Ascendant</p>
              <h1 className="text-gold font-serif text-4xl sm:text-5xl tracking-wide py-2">
                {typeof result.d9_ascendant === 'string' ? result.d9_ascendant : result.d9_ascendant?.sign ?? '—'}
              </h1>
              <p className="text-white/70 text-sm">D9 Lagna · Navamsa Chart</p>

              {/* Key highlights row */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/30">
                <div className="text-center">
                  <p className="text-muted text-xs uppercase tracking-wider mb-1">Karakamsha</p>
                  <p className="text-gold text-sm font-medium">
                    {typeof result.karakamsha_sign === 'string' ? result.karakamsha_sign : result.karakamsha_sign?.sign ?? '—'}
                  </p>
                  <p className="text-muted text-xs">({result.atmakaraka})</p>
                </div>
                <div className="text-center">
                  <p className="text-muted text-xs uppercase tracking-wider mb-1">7th House D9</p>
                  <p className="text-gold text-sm font-medium">
                    {typeof result.d9_spouse_sign === 'string' ? result.d9_spouse_sign : result.d9_spouse_sign?.sign ?? '—'}
                  </p>
                  <p className="text-muted text-xs">Spouse sign</p>
                </div>
                <div className="text-center">
                  <p className="text-muted text-xs uppercase tracking-wider mb-1">Vargottama</p>
                  <p className="text-gold text-sm font-medium">
                    {result.vargottama_planets?.length > 0 ? result.vargottama_planets.length : 'None'}
                  </p>
                  <p className="text-muted text-xs">planets</p>
                </div>
              </div>
            </div>

            {/* Vargottama highlight — only if any */}
            {result.vargottama_planets?.length > 0 && (
              <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5 space-y-2">
                <p className="text-gold text-sm font-medium uppercase tracking-wider">✦ Vargottama Planets</p>
                <p className="text-muted text-xs leading-relaxed">
                  These planets occupy the same sign in both your D1 and D9 charts — they are exceptionally powerful and deliver their full results during their Dasha.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.vargottama_planets.map((p: string) => (
                    <span key={p} className="text-xs bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full font-mono">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* D9 Planet table */}
            <div className="bg-surface2/80 border border-border rounded-2xl p-5 sm:p-6 space-y-3">
              <p className="text-muted text-xs uppercase tracking-widest font-mono">Planetary Positions in D9</p>
              <div className="space-y-2">
                {result.d9_planets?.map((p: any) => (
                  <div key={p.planet} className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm ${p.is_vargottama ? 'bg-gold/10 border border-gold/20' : 'bg-surface border border-border/50'}`}>
                    <div className="flex items-center gap-2">
                      <span className={p.is_vargottama ? 'text-gold font-medium' : 'text-white/80'}>{p.planet}</span>
                      {p.is_vargottama && <span className="text-xs text-gold/60 font-mono">★ Vargottama</span>}
                      {p.retrograde && <span className="text-xs text-muted font-mono">(R)</span>}
                    </div>
                    <div className="text-right">
                      <span className={p.is_vargottama ? 'text-gold' : 'text-muted'}>{p.d9_sign}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {result.reading && (
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
                <p className="text-xs text-text/40 mt-4 pt-4 border-t border-border/30 text-center">
                  This reading is for guidance and spiritual purposes only. Please consult 
                  qualified professionals for medical, legal, or financial decisions. 
                  <a href="/disclaimer" className="underline hover:text-text/60 transition-colors ml-1">
                    Disclaimer
                  </a>
                </p>
              </div>
            )}

            {/* AI CTA */}
            <div className="bg-surface2 border border-gold/20 rounded-2xl p-5 text-center space-y-3">
              <p className="text-gold font-serif text-lg">Want a personalised AI reading of your D9 chart?</p>
              <p className="text-muted text-sm leading-relaxed">
                Ask AstroWord's AI anything — what your D9 says about your spouse, marriage timing, or soul purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                <button onClick={() => {
                  sessionStorage.setItem('pending_question', `Analyse my Navamsa D9 chart. My D9 ascendant is ${result.d9_ascendant}, Karakamsha is ${result.karakamsha_sign}, and my Vargottama planets are ${result.vargottama_planets?.join(', ') || 'none'}. What does this say about my marriage and soul purpose?`);
                  window.location.href = '/';
                }} className="bg-gradient-to-r from-gold to-amber text-bg font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm">
                  ✦ Read My D9 Chart with AI
                </button>
                <button onClick={() => {
                  sessionStorage.setItem('pending_question', 'What does my Navamsa 7th house say about my future spouse?');
                  window.location.href = '/';
                }} className="border border-gold/30 text-gold px-6 py-2.5 rounded-xl hover:bg-gold/10 transition-all text-sm">
                  Spouse from D9 →
                </button>
              </div>
              <p className="text-muted/50 text-xs">Free 5 questions daily · No signup required</p>
            </div>

            {/* Cross links */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/darakaraka" className="bg-surface border border-border hover:border-gold/40 rounded-xl p-4 text-center space-y-1 transition-all">
                <p className="text-gold text-sm font-medium">Darakaraka</p>
                <p className="text-muted text-xs">Your spouse planet</p>
              </Link>
              <Link href="/ishta-devata" className="bg-surface border border-border hover:border-gold/40 rounded-xl p-4 text-center space-y-1 transition-all">
                <p className="text-gold text-sm font-medium">Ishta Devata</p>
                <p className="text-muted text-xs">From Karakamsha</p>
              </Link>
              <Link href="/atmakaraka" className="bg-surface border border-border hover:border-gold/40 rounded-xl p-4 text-center space-y-1 transition-all">
                <p className="text-gold text-sm font-medium">Atmakaraka</p>
                <p className="text-muted text-xs">Your soul planet</p>
              </Link>
              <Link href="/upapada-lagna" className="bg-surface border border-border hover:border-gold/40 rounded-xl p-4 text-center space-y-1 transition-all">
                <p className="text-gold text-sm font-medium">Upapada Lagna</p>
                <p className="text-muted text-xs">Marriage reality</p>
              </Link>
            </div>

            <MarriageReportPreview chartData={chartData} calculatorType="d9-chart" />
          </div>
        )}
      </div>
    </div>
  );
}
