'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const ALL_TOOLS = [
  { slug: '/',               emoji: '✦', label: 'Ask AI',          isAI: true },
  { slug: 'daily-horoscope',   emoji: '☄️', label: "Today's Reading" },
  { slug: 'manglik',         emoji: '🔴', label: 'Manglik' },
  { slug: 'dasha-calculator', emoji: '🪐', label: 'Dasha' },
  { slug: 'birth-tithi-calculator', emoji: '🌙', label: 'Birth Tithi' },
  { slug: 'darakaraka',      emoji: '💑', label: 'Darakaraka' },
  { slug: 'atmakaraka',      emoji: '☀️', label: 'Atmakaraka' },
  { slug: 'amatyakaraka',    emoji: '💼', label: 'Amatyakaraka' },
  { slug: 'gana',            emoji: '🔱', label: 'Gana' },
  { slug: 'marriage-year',   emoji: '💍', label: 'Marriage Year' },
  { slug: 'marriage-type',   emoji: '💝', label: 'Love or Arranged' },
  { slug: 'upapada-lagna',   emoji: '💍', label: 'Upapada Lagna' },
  { slug: 'arudha-lagna',    emoji: '🪞', label: 'Arudha Lagna' },
  { slug: 'spouse-initial',  emoji: '🔤', label: 'Spouse Initial' },
  { slug: 'marriage-report', emoji: '📜', label: 'Report ₹199',    isPaid: true },
];

interface TopToolsStripProps {
  currentTool: string;
}

export default function TopToolsStrip({ currentTool }: TopToolsStripProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const tools = ALL_TOOLS.filter(t => t.slug !== currentTool);

  const [showRightFade, setShowRightFade] = useState(true);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleHorizontalScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 10);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);   // scrolling up
      } else if (currentY > lastScrollY.current + 8) {
        setVisible(false);  // scrolling down
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-[#0a0a0f]/90 backdrop-blur-md border-b border-gold/15 relative">
          
          {/* Left fade */}
          {showLeftFade && (
            <div className="absolute left-0 top-0 h-full w-8 z-10 pointer-events-none"
              style={{background: 'linear-gradient(to right, #0a0a0f, transparent)'}}
            />
          )}

          {/* Scrollable tools */}
          <div 
            ref={scrollRef}
            onScroll={handleHorizontalScroll}
            className="flex items-center justify-start sm:justify-center gap-2 h-12 px-3 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden"
            style={{scrollbarWidth:'none', msOverflowStyle:'none'}}
          >
            {tools.map(tool => (
              <button
                key={tool.slug}
                onClick={() => router.push(tool.slug.startsWith('/') ? tool.slug : `/${tool.slug}`)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border whitespace-nowrap
                  ${tool.isAI
                    ? 'bg-gold text-black border-gold hover:bg-gold/90 font-semibold'
                    : tool.isPaid
                    ? 'bg-gold/10 text-gold border-gold/40 hover:bg-gold/20 hover:border-gold/70'
                    : 'bg-surface text-white/80 border-border hover:border-gold/30 hover:text-white'
                  }`}
              >
                <span className={tool.isAI ? 'text-sm' : 'text-sm'}>{tool.emoji}</span>
                <span>{tool.label}</span>
              </button>
            ))}
          </div>

          {/* Right fade + chevron */}
          {showRightFade && (
            <div className="absolute right-0 top-0 h-full w-12 z-10 pointer-events-none flex items-center justify-end pr-1"
              style={{background: 'linear-gradient(to left, #0a0a0f, transparent)'}}
            >
              <span className="text-gold/50 text-xs">›</span>
            </div>
          )}
        </div>
      </div>

      {/* Spacer so content doesn't hide behind the strip */}
      <div className="h-12" />
    </>
  );
}
