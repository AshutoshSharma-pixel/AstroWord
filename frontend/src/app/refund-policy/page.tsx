import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Refund Policy | AstroWord',
    description:
        "AstroWord's refund policy for subscription plans and marriage reports. Contact us at info@astroword.in for support.",
    alternates: { canonical: 'https://www.astroword.in/refund-policy' },
};

export default function RefundPolicyPage() {
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

                <h1 className="text-4xl font-serif text-white mb-2">Refund Policy</h1>
                <p className="text-sm text-white/40 font-mono mb-10">Last updated: May 22, 2026</p>

                <div className="space-y-10 text-white/75 leading-relaxed text-[15px]">

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-white">Our Commitment to You</h2>
                        <p>
                            At AstroWord, every reading is generated fresh from your exact birth chart using Swiss
                            Ephemeris and powered by Google Gemini AI. Because each reading is personalised and
                            delivered instantly, we follow a no-refund policy for digital products — consistent with
                            standard practice for digital and AI-powered services.
                        </p>
                        <p>
                            That said, we genuinely care about your experience. If something went wrong, please reach
                            out before assuming a refund is not possible. We will always try to make it right.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-white">What Is Covered</h2>

                        <div className="space-y-4">
                            <div className="border border-white/10 rounded-xl p-4">
                                <p className="text-white font-medium mb-1">Subscription Plans (Starter, Pro, Annual)</p>
                                <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
                                    <li>
                                        All subscription purchases are final and non-refundable once the plan is
                                        activated and questions have been used.
                                    </li>
                                    <li>
                                        If you purchased a plan but have not used any questions yet, contact us within
                                        24 hours at{' '}
                                        <a href="mailto:info@astroword.in" className="text-[#c9a84c] underline hover:opacity-80">
                                            info@astroword.in
                                        </a>{' '}
                                        and we will review your case.
                                    </li>
                                    <li>
                                        If your plan was charged twice due to a technical error, we will issue a full
                                        refund for the duplicate charge. Please email us with your payment details.
                                    </li>
                                </ul>
                            </div>

                            <div className="border border-white/10 rounded-xl p-4">
                                <p className="text-white font-medium mb-1">Marriage Report (₹199)</p>
                                <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
                                    <li>
                                        The Marriage Report is a one-time purchase that generates and delivers a
                                        personalised PDF instantly.
                                    </li>
                                    <li>
                                        Because the report is generated and delivered immediately upon payment, it is
                                        non-refundable once downloaded.
                                    </li>
                                    <li>
                                        If your report failed to generate or download due to a technical issue on our
                                        end, email us at{' '}
                                        <a href="mailto:info@astroword.in" className="text-[#c9a84c] underline hover:opacity-80">
                                            info@astroword.in
                                        </a>{' '}
                                        with your order details and we will regenerate your report or issue a full refund.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-white">When We Will Refund</h2>
                        <p>We will issue a full refund in these situations:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Duplicate payment (charged twice for the same order)</li>
                            <li>Payment deducted but plan/report not activated or delivered</li>
                            <li>Technical failure on our end that prevented you from accessing your purchase</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-white">How to Request Support</h2>
                        <p>Email us at <a href="mailto:info@astroword.in" className="text-[#c9a84c] underline hover:opacity-80">info@astroword.in</a> with:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Your registered email address</li>
                            <li>The date and amount of the transaction</li>
                            <li>A brief description of the issue</li>
                        </ul>
                        <p className="pt-2">We respond to all emails within 48 hours on business days.</p>
                    </section>

                    <section className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-white font-medium">Need Assistance?</h3>
                                <p className="text-sm text-white/50">Our support team is here to help you.</p>
                            </div>
                            <a
                                href="mailto:info@astroword.in"
                                className="inline-flex items-center justify-center px-6 py-3 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 rounded-xl transition-all font-medium text-center"
                            >
                                Email Us — info@astroword.in
                            </a>
                        </div>
                    </section>

                    <div className="border-t border-white/10 pt-8 text-sm text-white/40 font-mono">
                        <p>AstroWord — India&apos;s First Precision Vedic AI</p>
                        <p>Website: <a href="https://www.astroword.in" className="hover:text-gold transition-colors">https://www.astroword.in</a></p>
                    </div>

                </div>
            </div>
        </div>
    );
}
