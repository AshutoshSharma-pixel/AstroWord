import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Disclaimer — AstroWord",
  description: "AstroWord's disclaimer for astrological readings and AI-generated content. Astrology is for guidance purposes only.",
  alternates: { canonical: "https://www.astroword.in/disclaimer" },
  robots: { index: false, follow: true },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-[100dvh] bg-bg text-text py-16">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gold hover:opacity-80 transition-opacity mb-10 font-mono"
        >
          ← Back to AstroWord
        </Link>

        <div className="space-y-2">
          <h1 className="text-gold font-serif text-3xl">Disclaimer</h1>
          <p className="text-muted text-sm">Last updated: June 7, 2026</p>
        </div>

        <div className="space-y-6 text-muted text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-white font-medium text-base">For Entertainment and Guidance Only</h2>
            <p>AstroWord provides astrological information, calculations, and AI-generated readings strictly for entertainment and personal guidance purposes only. Astrology is a belief system and not a science. Our readings and predictions are not guaranteed to be accurate and should not be treated as facts.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-white font-medium text-base">Not a Substitute for Professional Advice</h2>
            <p>AstroWord's readings and predictions are not a substitute for professional legal, medical, financial, psychological, or any other professional advice. Do not make major life decisions — including but not limited to marriage, career changes, medical treatment, or financial investments — solely based on AstroWord's readings.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-white font-medium text-base">AI-Generated Content</h2>
            <p>AstroWord uses artificial intelligence (Google Gemini) to generate personalised astrological interpretations based on classical Vedic astrology principles. These readings are algorithmically generated and may contain errors, inaccuracies, or omissions. The AI interpretations represent one possible reading of classical astrological rules and should not be considered authoritative.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-white font-medium text-base">Birth Data Usage</h2>
            <p>Birth data (date, time, and place of birth) provided by users is used solely for astrological calculation purposes. We do not sell, rent, or share your birth data with third parties for marketing purposes. Birth data is stored securely in Firebase Firestore and protected under our Privacy Policy.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-white font-medium text-base">No Liability</h2>
            <p>AstroWord, its owners, developers, and AI systems are not responsible or liable for any decisions, actions, losses, damages, or outcomes resulting from the use of our astrological readings, predictions, or any content on this platform. By using AstroWord, you acknowledge that you are doing so of your own free will and accept full responsibility for your choices.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-white font-medium text-base">Accuracy of Calculations</h2>
            <p>AstroWord uses Swiss Ephemeris with Lahiri ayanamsa for astrological calculations — the same standard used by professional Vedic astrologers. However, calculation accuracy depends on the accuracy of birth time and location provided by the user. AstroWord does not guarantee calculation accuracy for imprecise or estimated birth times.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-white font-medium text-base">Contact</h2>
            <p>For questions about this disclaimer, contact us at <a href="mailto:info@astroword.in" className="text-gold/70 hover:text-gold">info@astroword.in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
