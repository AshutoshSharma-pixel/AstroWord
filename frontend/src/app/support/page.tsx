import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Support | AstroWord',
    description:
        'Get help with AstroWord. Report issues, ask questions, or contact us at info@astroword.in. We respond within 48 hours.',
    alternates: { canonical: 'https://www.astroword.in/support' },
};

export default function SupportPage() {
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

                <h1 className="text-4xl font-serif text-white mb-2">Support</h1>
                <p className="text-sm text-white/40 font-mono mb-10">We are here to help</p>

                <div className="space-y-10 text-white/75 leading-relaxed text-[15px]">

                    <section className="space-y-3">
                        <p>
                            We are here to help. Whether you have a question about your reading, a technical issue,
                            or a payment problem — reach out and we will get back to you.
                        </p>
                    </section>

                    <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-white">Contact Us</h2>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-white/50">Email:</span> info@astroword.in</p>
                            <p><span className="text-white/50">Response time:</span> Within 48 hours on business days</p>
                        </div>
                        <div className="pt-2">
                            <a
                                href="mailto:info@astroword.in?subject=AstroWord Support"
                                className="inline-flex items-center justify-center px-6 py-3 border border-[#c9a84c] bg-[#c9a84c]/5 text-[#c9a84c] hover:bg-[#c9a84c]/15 rounded-xl transition-all font-medium text-base text-center w-full sm:w-auto"
                            >
                                Email Us — info@astroword.in
                            </a>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-xl font-serif text-white border-b border-white/10 pb-2">Common Issues &amp; Quick Fixes</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-white font-medium mb-1">My questions are not resetting</h3>
                                <p className="text-sm text-white/60">
                                    Your free questions reset at midnight IST every day. If your count has not reset
                                    after midnight, try refreshing the page or logging out and back in. If the issue
                                    persists, email us.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-1">My birth chart calculation seems wrong</h3>
                                <p className="text-sm text-white/60">
                                    AstroWord uses Swiss Ephemeris with Lahiri ayanamsa — the same standard used by
                                    professional Vedic astrologers in India. Please double-check your birth time and
                                    city. Even a 5-minute difference in birth time can change the Ascendant and planetary
                                    degrees. If you believe there is a genuine calculation error, email us with your birth
                                    details.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-1">My Marriage Report did not download</h3>
                                <p className="text-sm text-white/60">
                                    If your payment went through but the PDF did not download, please email us at{' '}
                                    <a href="mailto:info@astroword.in" className="text-[#c9a84c] underline hover:opacity-80">
                                        info@astroword.in
                                    </a>{' '}
                                    with your payment details and we will resend your report within 24 hours.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-1">I was charged but my plan was not activated</h3>
                                <p className="text-sm text-white/60">
                                    This occasionally happens due to payment gateway delays. Please wait 10 minutes and
                                    refresh. If your plan is still not showing, email us with your Razorpay payment ID
                                    and we will activate your plan manually.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-1">I want to cancel my subscription</h3>
                                <p className="text-sm text-white/60">
                                    AstroWord subscriptions are time-based (7 days, 30 days, or 1 year) and do not
                                    auto-renew. They expire automatically at the end of the period. No cancellation is
                                    needed.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-3 border-t border-white/10 pt-6">
                        <h2 className="text-lg font-semibold text-white">Refund Policy</h2>
                        <p className="text-sm">
                            For information about refunds, please read our{' '}
                            <Link href="/refund-policy" className="text-[#c9a84c] underline hover:opacity-80">
                                Refund Policy
                            </Link>
                            .
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
