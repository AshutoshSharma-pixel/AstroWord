import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Disclaimer | AstroWord',
    description:
        "Important disclaimer regarding AstroWord's astrological readings, AI-generated content, and limitations of use.",
    robots: 'noindex',
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-[#080910] text-white/90">
            <div className="max-w-3xl mx-auto px-6 py-16">

                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-[#c9a84c] hover:opacity-80 transition-opacity mb-10 font-mono"
                >
                    ← Back to AstroWord
                </Link>

                <h1 className="text-4xl font-serif text-white mb-2">Disclaimer</h1>
                <p className="text-sm text-white/40 font-mono mb-10">Last updated: June 9, 2026</p>

                <div className="space-y-10 text-white/75 leading-relaxed text-[15px]">

                    <section className="space-y-3">
                        <p>
                            Please read this disclaimer carefully before using AstroWord (astroword.in). By accessing 
                            or using any service on AstroWord, you acknowledge that you have read, understood, and 
                            agreed to the terms described below.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">1. Nature of Services</h2>
                        <p>
                            AstroWord provides Vedic astrological calculations and AI-generated interpretations for 
                            personal guidance, spiritual exploration, and educational purposes only. All readings, 
                            reports, and predictions are based on classical Vedic astrology principles and traditional 
                            belief systems. They are not statements of fact and should not be treated as such.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">2. Not Professional Advice</h2>
                        <p>
                            The astrological readings, reports, and AI-generated content provided by AstroWord are not 
                            a substitute for professional advice from qualified experts in medicine, law, finance, 
                            psychology, or any other licensed profession. Users must not make major life decisions — 
                            including marriage, career changes, medical treatment, financial investments, or legal 
                            matters — solely based on AstroWord's readings or reports. If you are experiencing a 
                            medical, legal, or financial emergency, please contact a licensed professional immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">3. AI-Generated Content</h2>
                        <p>
                            AstroWord uses artificial intelligence (Google Gemini) to generate personalised astrological 
                            interpretations based on birth chart data. While classical Vedic astrology principles are 
                            used as the foundation, AI-generated content may contain errors, omissions, or inaccuracies. 
                            Results are indicative, probabilistic, and may vary. AstroWord does not guarantee the 
                            accuracy, completeness, or reliability of any AI-generated reading or report.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">4. No Liability</h2>
                        <p>
                            AstroWord, its owner, employees, and agents shall not be liable for any direct, indirect, 
                            incidental, special, or consequential damages arising from your use of the platform, your 
                            reliance on any astrological reading or report, or any decisions made based on content 
                            provided by AstroWord. Your use of AstroWord is entirely at your own risk. You accept full 
                            responsibility for any decision or action taken based on AstroWord's content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">5. Personal Data</h2>
                        <p>
                            Birth details (date of birth, time of birth, place of birth), name, and email address 
                            provided by users are collected solely for astrological calculation and service delivery 
                            purposes. Data is stored securely on Firebase (Google Cloud) and is not sold or shared with 
                            third parties except as required for service delivery (Firebase, Razorpay, Resend, Google Gemini). 
                            Users may request deletion of their personal data at any time by emailing{' '}
                            <a href="mailto:info@astroword.in" className="text-[#c9a84c] underline hover:opacity-80">
                                info@astroword.in
                            </a>. Please refer to our{' '}
                            <Link href="/privacy-policy" className="text-[#c9a84c] underline hover:opacity-80">
                                Privacy Policy
                            </Link>{' '}
                            for complete details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">6. Entertainment and Belief</h2>
                        <p>
                            Astrology is a traditional belief system with cultural and spiritual significance. 
                            AstroWord's services are offered in the spirit of this tradition for personal reflection and 
                            guidance. Results are based on probabilistic interpretations of planetary positions and 
                            do not guarantee specific outcomes in any area of life including marriage, career, health, 
                            or finances.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">7. Age Restriction</h2>
                        <p>
                            AstroWord's services are intended for users aged 18 years and above. Users under 18 must 
                            obtain consent from a parent or legal guardian before using any paid or free services on 
                            AstroWord.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">8. Governing Law</h2>
                        <p>
                            These terms are governed by the laws of India. Any disputes arising from use of AstroWord 
                            shall be subject to the exclusive jurisdiction of the competent courts in Bihar, India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
                        <p>
                            For questions, data deletion requests, or concerns:
                            <br />
                            Email:{' '}
                            <a href="mailto:info@astroword.in" className="text-[#c9a84c] underline hover:opacity-80">
                                info@astroword.in
                            </a>
                            <br />
                            Website:{' '}
                            <a href="https://www.astroword.in" className="text-[#c9a84c] underline hover:opacity-80">
                                astroword.in
                            </a>
                        </p>
                    </section>

                    <div className="border-t border-white/10 pt-8 text-sm text-white/40 font-mono">
                        <p>AstroWord — Precision Vedic AI</p>
                        <p>Contact: info@astroword.in</p>
                        <p>Governed by the laws of India · IT Act 2000</p>
                    </div>

                    <p className="text-muted/50 text-xs text-center mt-8">
                        Also see:{' '}
                        <Link href="/disclaimer" className="hover:text-gold transition-colors text-white/60">
                            Disclaimer
                        </Link>{' '}
                        ·{' '}
                        <Link href="/terms" className="hover:text-gold transition-colors text-white/60">
                            Terms
                        </Link>{' '}
                        ·{' '}
                        <Link href="/privacy-policy" className="hover:text-gold transition-colors text-white/60">
                            Privacy Policy
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}
