'use client';
import { useRouter } from 'next/navigation';

export default function TopBar() {
    const router = useRouter();

    return (
        <div className="h-14 border-b border-border flex items-center justify-between px-4 sticky top-0 bg-bg/80 backdrop-blur z-40">

            {/* Chart Status */}
            <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-3 h-3">
                    {/* Pulsing Dot effect for "Chart Loaded" status */}
                    <span className="absolute inline-flex h-full w-full rounded-full bg-gold/50 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                </div>
                <span className="text-sm text-muted font-mono tracking-wide uppercase">Chart Loaded • D1/D9</span>
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center gap-3 ml-2 flex-shrink-0">
            </div>

        </div>
    );
}
