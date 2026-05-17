import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service — AstroWord',
    description:
        'Read the Terms of Service governing your use of AstroWord, India\'s AI-powered Vedic astrology platform.',
};

export default function TermsPage() {
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

                <h1 className="text-4xl font-serif text-white mb-2">Terms of Service</h1>
                <p className="text-sm text-white/40 font-mono mb-10">Last updated: May 2026</p>

                <div className="space-y-10 text-white/75 leading-relaxed text-[15px]">

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using AstroWord (&quot;the Service&quot;), you agree to be bound by these
                            Terms of Service (&quot;Terms&quot;). If you do not agree, you must not use the Service.
                            These Terms constitute a legally binding agreement between you and AstroWord.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
                        <p className="mb-3">
                            AstroWord is an AI-powered platform that provides Vedic astrology readings,
                            birth chart analysis, predictive timing, and related spiritual tools.
                        </p>
                        <div className="bg-white/5 border border-[#c9a84c]/20 rounded-xl p-4 text-sm">
                            <p className="text-[#c9a84c] font-semibold mb-1">⚠ Important Disclaimer</p>
                            <p>
                                All astrology readings, interpretations, and predictions provided by AstroWord
                                are for <strong>entertainment and spiritual guidance purposes only</strong>. They
                                are not a substitute for professional medical, financial, legal, or psychological
                                advice. We make no guarantees regarding the accuracy, completeness, or reliability
                                of any reading. You use this information entirely at your own discretion and risk.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">3. Account Registration</h2>
                        <p className="mb-3">
                            To access most features of AstroWord, you must create an account using Google
                            Authentication or email and password. By creating an account, you:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Confirm that all information provided is accurate and up to date.</li>
                            <li>
                                Accept sole responsibility for maintaining the security of your account
                                credentials.
                            </li>
                            <li>
                                Agree that you are at least 13 years of age (or the minimum age required by
                                law in your jurisdiction).
                            </li>
                            <li>
                                Accept liability for all activity occurring under your account, whether or not
                                authorised by you.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">4. Payments &amp; Refund Policy</h2>
                        <p className="mb-3">
                            All payments are processed securely by Razorpay, a PCI-DSS compliant payment
                            gateway. By making a payment, you agree to Razorpay&apos;s terms and conditions.
                        </p>
                        <div className="space-y-3">
                            <div className="border border-white/10 rounded-xl p-4">
                                <p className="text-white font-medium mb-1">Marriage Report (₹199 one-time)</p>
                                <p className="text-sm">
                                    This is a one-time payment for a generated PDF report. Once the PDF has
                                    been generated and delivered, the purchase is <strong>non-refundable</strong>.
                                    If the report fails to generate due to a technical error on our end, you are
                                    entitled to a full refund. Contact us within 48 hours of purchase.
                                </p>
                            </div>
                            <div className="border border-white/10 rounded-xl p-4">
                                <p className="text-white font-medium mb-1">Subscription Plans (Starter / Pro / Annual)</p>
                                <p className="text-sm">
                                    Subscription plans are <strong>non-refundable</strong> once the plan has
                                    been activated and used. If you have not used the plan at all within 24
                                    hours of purchase, you may request a refund by contacting us. We reserve
                                    the right to approve or deny refund requests on a case-by-case basis.
                                </p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm">
                            For refund requests, email{' '}
                            <a href="mailto:info@astroword.in" className="text-[#c9a84c] underline hover:opacity-80">
                                info@astroword.in
                            </a>{' '}
                            with your registered email address and payment ID.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">5. Acceptable Use</h2>
                        <p className="mb-3">You agree <strong>not</strong> to:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Use the Service for any unlawful purpose or in violation of these Terms.</li>
                            <li>
                                Scrape, crawl, or systematically extract data from AstroWord by automated means
                                without our prior written permission.
                            </li>
                            <li>
                                Resell, redistribute, or commercially exploit any readings, reports, or content
                                generated by AstroWord without authorisation.
                            </li>
                            <li>
                                Attempt to reverse-engineer, decompile, or otherwise access the source code or
                                underlying AI models powering the Service.
                            </li>
                            <li>
                                Impersonate any person or entity, or misrepresent your affiliation with any
                                person or entity.
                            </li>
                            <li>
                                Transmit any harmful, offensive, or disruptive content through the Service.
                            </li>
                            <li>
                                Share your account credentials or allow others to use your account to circumvent
                                plan limits.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">6. Intellectual Property</h2>
                        <p>
                            All content, designs, AI models, brand assets, and text on AstroWord — including
                            but not limited to the logo, astrology interpretations, UI design, and reading
                            methodology — are the intellectual property of AstroWord and are protected under
                            applicable Indian copyright and intellectual property laws. You may not reproduce,
                            distribute, or create derivative works from our content without express written
                            permission.
                        </p>
                        <p className="mt-3">
                            Readings generated specifically for your personal birth chart are for your personal,
                            non-commercial use only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">7. Service Availability</h2>
                        <p>
                            We strive to keep AstroWord available 24/7, but we do not guarantee uninterrupted
                            access. We reserve the right to modify, suspend, or discontinue the Service (or any
                            part thereof) at any time with or without notice. We shall not be liable to you or
                            any third party for any modification, suspension, or discontinuation of the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">8. Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by applicable law, AstroWord shall not be liable
                            for any indirect, incidental, special, consequential, or punitive damages arising
                            from your use of the Service — including, but not limited to, reliance on any
                            astrology reading for any personal, financial, medical, or legal decision.
                        </p>
                        <p className="mt-3">
                            Our total liability to you for any claim arising out of or in connection with these
                            Terms shall not exceed the amount you paid to us in the 3 months preceding the
                            claim.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">9. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account at our discretion,
                            without notice, if you violate these Terms or engage in conduct we deem harmful to
                            the Service or other users. You may also terminate your account at any time from
                            the Settings page. Termination does not entitle you to a refund of any unused
                            subscription period.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">10. Governing Law &amp; Disputes</h2>
                        <p>
                            These Terms are governed by and construed in accordance with the laws of India,
                            including the Information Technology Act, 2000 and the Consumer Protection Act,
                            2019. Any disputes arising out of or in connection with these Terms shall be
                            subject to the exclusive jurisdiction of competent courts in India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">11. Changes to Terms</h2>
                        <p>
                            We may revise these Terms at any time. The updated Terms will be posted on this
                            page with a revised &quot;Last updated&quot; date. Continued use of the Service after any
                            changes constitutes your acceptance of the new Terms. We encourage you to review
                            this page periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">12. Contact Us</h2>
                        <p>
                            For any questions, concerns, or complaints regarding these Terms, please contact us
                            at:{' '}
                            <a href="mailto:info@astroword.in" className="text-[#c9a84c] underline hover:opacity-80">
                                info@astroword.in
                            </a>
                        </p>
                    </section>

                    <div className="border-t border-white/10 pt-8 text-sm text-white/40 font-mono">
                        <p>AstroWord — Precision Vedic AI</p>
                        <p>Contact: info@astroword.in</p>
                        <p>Governed by the laws of India · IT Act 2000 · Consumer Protection Act 2019</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
