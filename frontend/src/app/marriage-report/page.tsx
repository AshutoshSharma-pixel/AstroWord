'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SECTIONS = [
  { icon: '👤', title: 'Your Future Spouse', desc: 'Appearance, personality, profession and nature of your destined partner based on Darakaraka and 7th house analysis.' },
  { icon: '📅', title: 'When Will You Marry', desc: 'Specific year windows with Dasha and transit explanation. Know if 2026 or 2027 is your year.' },
  { icon: '💑', title: 'Love or Arranged', desc: 'Percentage breakdown of love vs arranged marriage indicators with full planetary reasoning.' },
  { icon: '🔤', title: 'Spouse Name Initial', desc: 'Predicted name syllables from 3 Vedic methods — 7th lord nakshatra, Darakaraka nakshatra, Venus nakshatra.' },
  { icon: '🌙', title: 'Your Compatibility Nature', desc: 'Gana analysis (Deva, Manushya or Rakshasa) and which type of partner you are most compatible with.' },
  { icon: '🔮', title: '2026-2027 Forecast', desc: 'Is this your year? Specific Jupiter and Saturn transit analysis for your chart.' },
  { icon: '✨', title: 'Cosmic Marriage Profile', desc: 'Full overview of your marriage destiny from ascendant, 7th house, and key planetary placements.' },
  { icon: '🪔', title: 'Remedies & Guidance', desc: '3-4 specific Vedic remedies personalised to your chart to attract the right partner.' },
];

const FAQS = [
  {
    q: 'How is this different from a generic horoscope?',
    a: 'This report is generated from your exact birth details — date, time and place. Every section is calculated from your personal planetary positions, not sun sign generalisations. The AI runs all 7 Vedic calculators on your chart and then writes a 1200+ word personalised reading.'
  },
  {
    q: 'What birth details do I need?',
    a: 'You need your date of birth, exact time of birth (from birth certificate or family records), and place of birth. Time accuracy matters — even 15 minutes off can change your ascendant and house placements.'
  },
  {
    q: 'Which ayanamsa does AstroWord use?',
    a: 'AstroWord uses the Lahiri ayanamsa with Swiss Ephemeris — the same standard used by most professional Vedic astrologers in India.'
  },
  {
    q: 'How long does it take to generate?',
    a: 'About 30-60 seconds after payment. The AI analyses your chart and writes the full report in one pass. You get an instant PDF download link.'
  },
  {
    q: 'Is the payment secure?',
    a: 'Yes. Payments are processed by Razorpay, India\'s most trusted payment gateway. AstroWord never sees or stores your card details.'
  },
  {
    q: 'What if I don\'t know my exact birth time?',
    a: 'Use your best estimate. If you\'re unsure, check your birth certificate or ask family members. Without an accurate time, the ascendant and house-based predictions may be less precise, but nakshatra and Dasha-based predictions will still hold.'
  },
];

export default function MarriageReportPage() {
  const router = useRouter();

  const handleGetReport = () => {
    router.push('/darakaraka');
  };

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-gold font-serif text-xl">✦ AstroWord</Link>
        <Link href="/" className="text-muted text-sm hover:text-white transition-colors">← Back to AI Chat</Link>
      </nav>

      {/* HERO */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          {/* Left — image */}
          <div className="w-full md:w-2/5 flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gold/10 border border-gold/20">
              <Image
                src="/Marriage Report Image .png"
                alt="AstroWord Vedic Marriage Report"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right — text */}
          <div className="w-full md:w-3/5 text-center md:text-left">
            <div className="text-gold text-2xl mb-4">✦</div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Your Complete Vedic<br />Marriage Report
            </h1>
            <p className="text-muted text-lg mb-4 leading-relaxed">
              AI analyses your birth chart using authentic Vedic methods — Jaimini Karakas, Dasha timing, nakshatra mapping — and writes a deeply personalised 1200+ word marriage report.
            </p>
            <p className="text-muted text-sm mb-8">Instant PDF · One-time ₹199 · No subscription</p>
            <button
              onClick={handleGetReport}
              className="bg-gold text-black px-10 py-4 rounded-xl font-medium text-lg hover:bg-gold/90 transition-colors shadow-lg shadow-gold/10 mb-4 w-full md:w-auto"
            >
              Get My Marriage Report — ₹199
            </button>
            <p className="text-muted text-xs mt-3">Enter your birth details → Pay → Download PDF in 60 seconds</p>
          </div>

        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif text-white text-center mb-3">What's inside your report</h2>
        <p className="text-muted text-center text-sm mb-12">8 sections, all calculated from your personal birth chart</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <div key={s.title} className="bg-surface border border-border rounded-xl p-5 flex gap-4">
              <span className="text-2xl mt-0.5">{s.icon}</span>
              <div>
                <h3 className="text-white font-medium mb-1">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-16 bg-surface/40 border-y border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif text-white mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Enter birth details', desc: 'Date, time and place of birth. Takes 30 seconds.' },
              { step: '2', title: 'Pay ₹199', desc: 'Secure Razorpay checkout. One-time payment, no subscription.' },
              { step: '3', title: 'Download PDF', desc: 'Your personalised report is ready in about 60 seconds.' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-gold/40 text-gold flex items-center justify-center font-serif text-lg mb-4">{item.step}</div>
                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLURRED SAMPLE */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif text-white text-center mb-3">Sample report preview</h2>
        <p className="text-muted text-center text-sm mb-8">A glimpse of what your report looks like</p>
        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="text-gold text-xs font-mono tracking-widest uppercase mb-3">YOUR FUTURE SPOUSE</div>
          <div className="space-y-2 blur-sm select-none opacity-50">
            <div className="h-3 bg-white/10 rounded-full w-full"></div>
            <div className="h-3 bg-white/10 rounded-full w-5/6"></div>
            <div className="h-3 bg-white/10 rounded-full w-4/5"></div>
            <div className="h-3 bg-white/10 rounded-full w-full"></div>
            <div className="h-3 bg-white/10 rounded-full w-3/4"></div>
          </div>
          <div className="text-gold text-xs font-mono tracking-widest uppercase mb-3 mt-6">WHEN WILL YOU MARRY</div>
          <div className="space-y-2 blur-sm select-none opacity-50">
            <div className="h-3 bg-white/10 rounded-full w-full"></div>
            <div className="h-3 bg-white/10 rounded-full w-4/5"></div>
            <div className="h-3 bg-white/10 rounded-full w-full"></div>
          </div>
          {/* Overlay CTA */}
          <div className="absolute inset-0 bg-surface/60 flex items-center justify-center">
            <button
              onClick={handleGetReport}
              className="bg-gold text-black px-6 py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors"
            >
              Unlock Full Report — ₹199
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif text-white text-center mb-10">Frequently asked questions</h2>
        <div className="space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.q} className="border-b border-border pb-6">
              <h3 className="text-white font-medium mb-2">{faq.q}</h3>
              <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-6 py-20 text-center border-t border-border">
        <div className="text-gold text-2xl mb-4">✦</div>
        <h2 className="text-3xl font-serif text-white mb-4">Ready to know your marriage destiny?</h2>
        <p className="text-muted text-sm mb-8">1200+ words · 8 sections · Instant PDF · ₹199</p>
        <button
          onClick={handleGetReport}
          className="bg-gold text-black px-10 py-4 rounded-xl font-medium text-lg hover:bg-gold/90 transition-colors shadow-lg shadow-gold/10"
        >
          Get My Marriage Report — ₹199
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-8 text-center">
        <p className="text-muted text-xs">© 2026 AstroWord · Precision Vedic AI · Lahiri Ayanamsa · Swiss Ephemeris</p>
        <div className="flex justify-center gap-6 mt-3">
          <Link href="/darakaraka" className="text-muted text-xs hover:text-white transition-colors">Darakaraka Calculator</Link>
          <Link href="/marriage-year" className="text-muted text-xs hover:text-white transition-colors">Marriage Year</Link>
          <Link href="/blog" className="text-muted text-xs hover:text-white transition-colors">Blog</Link>
        </div>
      </footer>

    </main>
  );
}
