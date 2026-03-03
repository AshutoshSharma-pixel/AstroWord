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

            </div>
        </div>
    );
}
