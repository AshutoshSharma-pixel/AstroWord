'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ALL_TOOLS = [
  { slug: 'darakaraka',     emoji: '💑', label: 'Darakaraka' },
  { slug: 'atmakaraka',     emoji: '☀️', label: 'Atmakaraka' },
  { slug: 'amatyakaraka',   emoji: '💼', label: 'Amatyakaraka' },
  { slug: 'gana',           emoji: '🔱', label: 'Gana' },
  { slug: 'marriage-year',  emoji: '💍', label: 'Marriage Year' },
  { slug: 'marriage-type',  emoji: '💝', label: 'Love or Arranged' },
  { slug: 'spouse-initial', emoji: '🔤', label: 'Spouse Initial' },
  { slug: 'marriage-report',emoji: '📜', label: 'Report ₹199', isPaid: true },
];

interface FloatingToolsProps {
  currentTool: string;
}

export default function FloatingTools({ currentTool }: FloatingToolsProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const tools = ALL_TOOLS.filter(t => t.slug !== currentTool);

  return (
    <>
      {/* MOBILE — fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="bg-[#0d0d14]/95 backdrop-blur border-t border-gold/20 px-3 py-2">
          
          {/* Collapsed: show label + expand toggle */}
          {!expanded ? (
            <div className="flex items-center justify-between">
              <p className="text-muted text-xs font-mono uppercase tracking-widest">
                ✦ More tools
              </p>
              <button
                onClick={() => setExpanded(true)}
                className="text-gold text-xs border border-gold/30 px-3 py-1.5 rounded-lg hover:bg-gold/10 transition-all"
              >
                Explore ↑
              </button>
            </div>
          ) : (
            /* Expanded: horizontal scroll row */
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted text-xs font-mono uppercase tracking-widest">✦ Try these tools</p>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-muted text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {tools.map(tool => (
                  <button
                    key={tool.slug}
                    onClick={() => router.push(`/${tool.slug}`)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all min-w-[80px]
                      ${tool.isPaid
                        ? 'bg-gold/10 border-gold/40 text-gold'
                        : 'bg-surface border-border text-white'
                      }`}
                  >
                    <span className="text-lg">{tool.emoji}</span>
                    <span className="text-[10px] font-mono leading-tight text-center">
                      {tool.label}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* DESKTOP — floating pill strip on right side */}
      <div className="hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-2">
        <p className="text-muted text-[10px] font-mono uppercase tracking-widest text-center mb-1">
          Tools
        </p>
        {tools.map(tool => (
          <button
            key={tool.slug}
            onClick={() => router.push(`/${tool.slug}`)}
            title={tool.label}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-left group
              ${tool.isPaid
                ? 'bg-gold/10 border-gold/40 hover:border-gold text-gold hover:bg-gold/20'
                : 'bg-[#0d0d14]/90 backdrop-blur border-border hover:border-gold/40 text-white hover:bg-surface'
              }`}
          >
            <span className="text-base">{tool.emoji}</span>
            <span className="text-xs font-mono max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100">
              {tool.label}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile bottom padding so content isn't hidden behind bar */}
      <div className="h-14 sm:hidden" />
    </>
  );
}
