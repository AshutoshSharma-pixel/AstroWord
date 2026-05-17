import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy — AstroWord',
    description:
        'Learn how AstroWord collects, uses, and protects your personal data in compliance with Indian data protection laws.',
};

export default function PrivacyPolicyPage() {
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

                <h1 className="text-4xl font-serif text-white mb-2">Privacy Policy</h1>
                <p className="text-sm text-white/40 font-mono mb-10">Last updated: May 2026</p>

                <div className="space-y-10 text-white/75 leading-relaxed text-[15px]">

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">1. Who We Are</h2>
                        <p>
                            AstroWord (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an AI-powered Vedic astrology platform operated
                            by its founder. We provide personalised birth chart readings, predictive astrology,
                            and related spiritual tools. For any privacy-related concerns, contact us at{' '}
                            <a
                                href="mailto:itsashutosh769@gmail.com"
                                className="text-[#c9a84c] underline hover:opacity-80"
                            >
                                itsashutosh769@gmail.com
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h2>
                        <p className="mb-3">We collect the following categories of personal data:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>
                                <span className="text-white font-medium">Identity data:</span> your name and
                                email address, provided via Google Sign-In or email registration.
                            </li>
                            <li>
                                <span className="text-white font-medium">Astrology data:</span> date of birth,
                                time of birth, and place of birth — required to generate your Vedic birth chart.
                            </li>
                            <li>
                                <span className="text-white font-medium">Payment data:</span> billing transactions
                                are processed entirely by Razorpay. We do <strong>not</strong> store your card
                                numbers, UPI details, or bank information on our servers.
                            </li>
                            <li>
                                <span className="text-white font-medium">Usage data:</span> questions asked,
                                readings generated, and session metadata to improve our AI responses.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">3. Why We Collect Your Data</h2>
                        <p className="mb-3">Your personal data is used exclusively to:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Generate accurate Vedic astrology readings tailored to your birth details.</li>
                            <li>Authenticate your account and maintain your session securely.</li>
                            <li>Process subscription payments and manage plan entitlements.</li>
                            <li>Improve the quality, accuracy, and personalisation of our AI models.</li>
                            <li>Send transactional emails (e.g., payment receipts) where applicable.</li>
                        </ul>
                        <p className="mt-3">
                            We do <strong>not</strong> use your data for unsolicited marketing without your
                            explicit consent, and we never sell your personal information to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party Services We Use</h2>
                        <p className="mb-3">
                            To deliver our service, your data is shared with the following trusted third parties:
                        </p>
                        <div className="space-y-4">
                            <div className="border border-white/10 rounded-xl p-4">
                                <p className="text-white font-medium mb-1">Google Authentication (Firebase Auth)</p>
                                <p className="text-sm">
                                    Used to verify your identity via Google Sign-In. Subject to{' '}
                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] underline hover:opacity-80">Google&apos;s Privacy Policy</a>.
                                </p>
                            </div>
                            <div className="border border-white/10 rounded-xl p-4">
                                <p className="text-white font-medium mb-1">Firebase / Google Cloud (Database &amp; Hosting)</p>
                                <p className="text-sm">
                                    Your birth chart data, chat history, and account details are stored in
                                    Firebase Firestore, hosted on Google Cloud infrastructure in accordance with
                                    Google&apos;s data processing terms.
                                </p>
                            </div>
                            <div className="border border-white/10 rounded-xl p-4">
                                <p className="text-white font-medium mb-1">Razorpay (Payment Processing)</p>
                                <p className="text-sm">
                                    All payment transactions are handled by Razorpay, a PCI-DSS compliant
                                    payment gateway. Subject to{' '}
                                    <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] underline hover:opacity-80">Razorpay&apos;s Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">5. Data Retention &amp; Deletion</h2>
                        <p>
                            We retain your data for as long as your account is active. You may permanently
                            delete your account and all associated data at any time from the{' '}
                            <strong>Settings → Danger Zone</strong> section of the app. Upon deletion, your
                            profile, birth data, and chat history are permanently removed from our systems
                            within 30 days. Payment records may be retained for up to 7 years as required by
                            Indian financial regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights</h2>
                        <p className="mb-3">
                            Under the Digital Personal Data Protection (DPDP) Act, 2023 and the IT Act, 2000,
                            you have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Access the personal data we hold about you.</li>
                            <li>Request correction of inaccurate data.</li>
                            <li>Request deletion of your data (&quot;right to erasure&quot;).</li>
                            <li>Withdraw consent at any time (which will result in account closure).</li>
                            <li>Raise a grievance with us before filing a complaint with the Data Protection Board of India.</li>
                        </ul>
                        <p className="mt-3">
                            To exercise any of these rights, email us at{' '}
                            <a href="mailto:itsashutosh769@gmail.com" className="text-[#c9a84c] underline hover:opacity-80">
                                itsashutosh769@gmail.com
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">7. Cookies &amp; Tracking</h2>
                        <p>
                            We use essential session cookies to keep you logged in. We do not use advertising
                            cookies, cross-site tracking, or third-party analytics cookies that profile you
                            across the web. Firebase may use cookies as part of its authentication flow.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">8. Children&apos;s Privacy</h2>
                        <p>
                            AstroWord is not directed at children under the age of 13. We do not knowingly
                            collect personal data from minors. If you believe a minor has created an account,
                            please contact us and we will promptly delete it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">9. Governing Law</h2>
                        <p>
                            This Privacy Policy is governed by the laws of India, including the Information
                            Technology Act, 2000 and the Digital Personal Data Protection (DPDP) Act, 2023.
                            Any disputes shall be subject to the exclusive jurisdiction of courts in India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
                            the top of this page will reflect any changes. Continued use of AstroWord after
                            changes are posted constitutes your acceptance of the revised policy.
                        </p>
                    </section>

                    <div className="border-t border-white/10 pt-8 text-sm text-white/40 font-mono">
                        <p>AstroWord — Precision Vedic AI</p>
                        <p>Contact: itsashutosh769@gmail.com</p>
                        <p>Governed by the laws of India · DPDP Act 2023 · IT Act 2000</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
