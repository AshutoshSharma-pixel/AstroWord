'use client';

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
    return (
        <div className="flex h-[100dvh] w-full overflow-hidden">
            <Sidebar
                onChatSelect={onChatSelect}
                onNewReading={onNewReading}
                activeChatId={activeChatId}
            />
            <main className="flex-1 flex flex-col relative h-full">
                <TopBar />
                <div className="flex-1 overflow-hidden pt-12 md:pt-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
