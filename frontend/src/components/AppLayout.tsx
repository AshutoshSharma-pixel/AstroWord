'use client';

import { useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout({
    children,
    onChatSelect,
    onNewReading,
    activeChatId
}: {
    children: React.ReactNode,
    onChatSelect?: (chatId: string, messages: any[], loadedChartData: any) => void,
    onNewReading?: () => void,
    activeChatId?: string | null
}) {
    useEffect(() => {
        // Wake up Railway container immediately
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`).catch(() => { });
        // Keep alive every 4 minutes
        const interval = setInterval(() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`).catch(() => { });
        }, 4 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex h-[100dvh] w-full overflow-hidden">
            <Sidebar
                onChatSelect={onChatSelect}
                onNewReading={onNewReading}
                activeChatId={activeChatId}
            />
            <main className="flex-1 flex flex-col relative mt-12 md:mt-0">
                <div className="hidden md:block">
                    <TopBar />
                </div>
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}
