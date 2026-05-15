'use client';

import { useState } from 'react';

interface ShareCardProps {
  question: string;
  answer: string;
  subtext: string;
  keywords?: string[];
}

export default function ShareCard({ question, answer, subtext, keywords }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${question}\n\n✦ ${answer}\n${subtext}\n\nDiscover yours free at AstroWord.in`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Vedic Astrology Reading — AstroWord',
          text: shareText,
          url: 'https://www.astroword.in'
        });
      } catch (e) {}
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="mt-6 mb-2">
      {/* The Card */}
      <div className="relative bg-gradient-to-br from-[#0d0d14] to-[#13111c] border border-gold/30 rounded-2xl p-6 text-center overflow-hidden">
        
        {/* Decorative background circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gold/5 blur-2xl pointer-events-none" />
        
        {/* Question */}
        <p className="text-muted text-xs uppercase tracking-widest font-mono mb-4">
          {question}
        </p>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-8 bg-gold/30" />
          <span className="text-gold text-lg">✦</span>
          <div className="h-px w-8 bg-gold/30" />
        </div>

        {/* Main answer */}
        <h2 className="text-gold font-serif text-3xl sm:text-4xl mb-3 leading-tight">
          {answer}
        </h2>

        {/* Subtext */}
        <p className="text-white/70 text-sm mb-5 leading-relaxed max-w-xs mx-auto">
          {subtext}
        </p>

        {/* Keywords */}
        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {keywords.slice(0, 4).map((kw, i) => (
              <span
                key={i}
                className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Watermark */}
        <div className="flex items-center justify-center gap-1.5 mb-5">
          <div className="h-px w-12 bg-gold/20" />
          <span className="text-gold/40 text-xs font-mono tracking-widest">ASTROWORD.IN</span>
          <div className="h-px w-12 bg-gold/20" />
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/60 text-gold text-sm px-6 py-2.5 rounded-xl transition-all"
        >
          {copied ? (
            <>✓ Copied to clipboard</>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share my result
            </>
          )}
        </button>

        <p className="text-muted/40 text-xs mt-3">
          Share on WhatsApp · Instagram · anywhere
        </p>
      </div>
    </div>
  );
}
