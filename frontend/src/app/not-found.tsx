export default function NotFound() {
    return (
        <div className="min-h-[100dvh] bg-bg flex items-center justify-center p-6">
            <div className="text-center space-y-4">
                <div className="text-6xl">🌙</div>
                <h1 className="text-gold font-serif text-3xl">Lost in the Cosmos</h1>
                <p className="text-muted text-sm">This page doesn&apos;t exist in any universe.</p>
                <a
                    href="/"
                    className="inline-block bg-gold/10 border border-gold/20 text-gold px-6 py-2 rounded-xl text-sm hover:bg-gold/20 transition-all mt-4"
                >
                    Return Home →
                </a>
            </div>
        </div>
    );
}
