'use client';

import { useRouter } from 'next/navigation';

export default function DashboardView() {
    const router = useRouter();

    const navigateTo = (feature: string) => {
        router.push(`/${feature}`);
    };

    return (
        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6 max-w-4xl mx-auto w-full h-full">
            <h1 className="text-3xl font-serif text-gold mb-2">Explore Tools</h1>
            <p className="text-muted text-sm mb-8">
                Discover deep astrological insights using our specialized calculation tools. These tools are completely free to use and do not consume your daily question limit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Marriage Report Card */}
                <button
                    onClick={() => router.push('/marriage-report')}
                    className="w-full md:col-span-2 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/40 hover:border-gold/70 hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-3xl">📜</span>
                                <span className="text-xs bg-gold text-black px-2 py-0.5 rounded-full font-mono font-medium">NEW · ₹199</span>
                            </div>
                            <h3 className="text-gold font-serif text-xl mb-2">
                                Your Complete Marriage Report
                            </h3>
                            <p className="text-muted text-sm mb-4 max-w-lg">
                                Get a 1200+ word personalised Vedic marriage report as an instant PDF. Spouse profile, marriage timing, love or arranged prediction, 2026–2027 forecast and Vedic remedies — all from your exact birth chart.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Future Spouse</span>
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Marriage Timing</span>
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">2026 Forecast</span>
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Instant PDF</span>
                            </div>
                        </div>
                        <div className="text-gold/40 group-hover:text-gold transition-colors text-2xl ml-4">→</div>
                    </div>
                </button>

                {/* Daily Transit Card */}
                <button
                    onClick={() => navigateTo('daily-horoscope')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="flex items-start justify-between">
                        <div className="text-3xl mb-4">☄️</div>
                        <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono font-medium">AI TRANSIT</span>
                    </div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Daily Planetary Transits
                    </h3>
                    <p className="text-muted text-sm mb-4">
                        How do the current planets affect your birth chart today? Get a personalised AI reading of today's cosmic influence on your life.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Live Positions</span>
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Personalised</span>
                    </div>
                </button>

                {/* Moon Sign Card */}
                <button
                    onClick={() => navigateTo('moon-sign')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🌙</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Moon Sign Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Find your Chandra Rashi. Discover your emotional nature, ruling elements, and mental patterns from the Moon's exact birth degree.
                    </p>
                </button>

                {/* Nakshatra Calculator Card */}
                <button
                    onClick={() => navigateTo('nakshatra-calculator')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">⭐</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Nakshatra Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Find your Janma Nakshatra (birth star) and Pada. Reveal your ruling deity, planetary lord, gana, and detailed personality traits.
                    </p>
                </button>

                {/* Lagna Calculator Card */}
                <button
                    onClick={() => navigateTo('lagna-calculator')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🌅</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Lagna Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Calculate your Ascendant rising sign and find where your Lagna lord resides to see the core direction of your life's path.
                    </p>
                </button>

                {/* Ishta Devata Card */}
                <button
                    onClick={() => navigateTo('ishta-devata')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="flex items-start justify-between">
                        <div className="text-3xl mb-4">🕉️</div>
                        <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono font-medium">JAIMINI</span>
                    </div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Ishta Devata Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Discover your personal guiding deity (chosen deity) and sacred mantra using the Jaimini Karakamsha method.
                    </p>
                </button>

                {/* Pitra Dosha Card */}
                <button
                    onClick={() => navigateTo('pitra-dosha')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">💀</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Pitra Dosha Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Check if you carry ancestral karmic afflictions like Sun-Rahu conjunct, and explore tailored Vedic remedies.
                    </p>
                </button>

                {/* Marriage Year Predictor Card */}
                <button
                    onClick={() => router.push('/marriage-year')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">💍</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Marriage Year Predictor
                    </h3>
                    <p className="text-muted text-sm mb-4">
                        When will you get married? Find your most auspicious marriage windows based on your Dasha and chart.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Dasha Timing</span>
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">7th House</span>
                    </div>
                </button>

                {/* Manglik Card */}
                <button
                    onClick={() => navigateTo('manglik')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🔴</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Manglik Dosha Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Do you have Manglik Dosha? Check if Mars is in positions that create challenges in your marriage chart.
                    </p>
                </button>

                {/* Raja Yoga Card */}
                <button
                    onClick={() => navigateTo('raja-yoga')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">👑</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Raja Yoga Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Discover all Raja Yogas in your birth chart — Gaja Kesari, Panch Mahapurusha, Dharma Karmadhipati, and more — with a detailed strength and Dasha activation reading.
                    </p>
                </button>

                {/* Dasha Calculator Card */}
                <button
                    onClick={() => navigateTo('dasha-calculator')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🪐</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Dasha Calculator
                    </h3>
                    <p className="text-muted text-sm mb-3">
                        Find your current Mahadasha &amp; Antardasha with AI-powered personalised Vedic reading.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Vimshottari</span>
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Mahadasha</span>
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Antardasha</span>
                    </div>
                </button>

                {/* Birth Tithi Calculator Card */}
                <button
                    onClick={() => navigateTo('birth-tithi-calculator')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🌙</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Birth Tithi Calculator
                    </h3>
                    <p className="text-muted text-sm mb-3">
                        Find your Janma Tithi — the sacred lunar day of your birth — with an AI-powered personalised Vedic reading.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Janma Tithi</span>
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Paksha</span>
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Tithi Lord</span>
                    </div>
                </button>

                {/* Upapada Lagna Card */}
                <button
                    onClick={() => navigateTo('upapada-lagna')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="flex items-start justify-between">
                        <div className="text-3xl mb-4">💍</div>
                        <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono font-medium">JAIMINI</span>
                    </div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Upapada Lagna
                    </h3>
                    <p className="text-muted text-sm mb-3">
                        Discover your Jaimini marriage sign — the cosmic DNA of your future spouse and your karmic marriage bond.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">12th House Arudha</span>
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Spouse Sign</span>
                    </div>
                </button>

                {/* Arudha Lagna Card */}
                <button
                    onClick={() => navigateTo('arudha-lagna')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="flex items-start justify-between">
                        <div className="text-3xl mb-4">🪞</div>
                        <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono font-medium">JAIMINI</span>
                    </div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Arudha Lagna
                    </h3>
                    <p className="text-muted text-sm mb-3">
                        How does the world see you? Reveal your Maya Lagna — the public image and social reputation others hold of you.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Maya Lagna</span>
                        <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-mono">Public Image</span>
                    </div>
                </button>

                {/* Darakaraka Card */}
                <button
                    onClick={() => navigateTo('darakaraka')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">💑</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Darakaraka Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Who is your destined spouse? What will they look like? Discover the planet that reveals your future partner.
                    </p>
                </button>

                {/* Atmakaraka Card */}
                <button
                    onClick={() => navigateTo('atmakaraka')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">☀️</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Atmakaraka Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        What is your soul's true purpose? What karmic lessons did you come here to learn in this incarnation?
                    </p>
                </button>

                {/* Amatyakaraka Card */}
                <button
                    onClick={() => navigateTo('amatyakaraka')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">💼</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Amatyakaraka Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        What career were you born for? Which profession will bring you the most success and deep fulfillment?
                    </p>
                </button>

                {/* Gana Calculator Card */}
                <button
                    onClick={() => navigateTo('gana')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🔱</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Gana Calculator
                    </h3>
                    <p className="text-muted text-sm">
                        Are you Deva, Manushya or Rakshasa Gana? Find out your cosmic nature and compatibility with your partner.
                    </p>
                </button>

                {/* Marriage Type Calculator Card */}
                <button
                    onClick={() => navigateTo('marriage-type')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">💝</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Love or Arranged Marriage
                    </h3>
                    <p className="text-muted text-sm">
                        Will you find love on your own or will destiny bring your partner through family?
                    </p>
                </button>

                {/* D9 Navamsa Chart Card */}
                <button
                    onClick={() => navigateTo('d9-chart')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="flex items-start justify-between">
                        <div className="text-3xl mb-4">📊</div>
                        <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full font-mono font-medium">DIVISIONAL</span>
                    </div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Navamsa D9 Chart
                    </h3>
                    <p className="text-muted text-sm">
                        Generate your Navamsa D9 chart to discover your soul purpose, Vargottama planets, and future spouse details.
                    </p>
                </button>

                {/* Spouse Initial Calculator Card */}
                <button
                    onClick={() => navigateTo('spouse-initial')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🔤</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Spouse Initial Letter
                    </h3>
                    <p className="text-muted text-sm">
                        What letter does your future spouse's name start with? Discover the sacred sound of your partner.
                    </p>
                </button>

                {/* Kaal Sarp Dosha Card */}
                <button
                    onClick={() => navigateTo('kaal-sarp-dosha')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🐍</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Kaal Sarp Dosha
                    </h3>
                    <p className="text-muted text-sm">
                        Check if Rahu and Ketu are hemming your planetary chart and explore the 12 serpent yogas.
                    </p>
                </button>

                {/* Sade Sati Card */}
                <button
                    onClick={() => navigateTo('sade-sati')}
                    className="w-full bg-surface2 border border-border hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] rounded-2xl p-6 text-left transition-all group"
                >
                    <div className="text-3xl mb-4">🔵</div>
                    <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold transition-colors">
                        Shani Sade Sati
                    </h3>
                    <p className="text-muted text-sm">
                        Find out if you are undergoing Shani Sade Sati or Shani Dhaiya transits and learn practical remedies.
                    </p>
                </button>

            </div>
        </div>
    );
}
