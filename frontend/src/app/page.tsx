'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import WelcomeScreen from '@/components/WelcomeScreen';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const [chartData, setChartData] = useState<any>(null);

  // Lifted state to handle chat reloading from Sidebar
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const handleChatSelect = (chatId: string, messages: any[], loadedChartData: any) => {
    setActiveChatId(chatId);
    setChatMessages(messages);
    setChartData(loadedChartData || { isFallback: true, ascendant: { sign: 'Unknown' } });
  };

  // When user clicks "New Reading"
  const handleNewReading = () => {
    setChartData(null);
    setActiveChatId(null);
    setChatMessages([]);
  };

  return (
    <AppLayout
      onChatSelect={handleChatSelect}
      onNewReading={handleNewReading}
      activeChatId={activeChatId}
    >
      {!chartData ? (
        <WelcomeScreen onComplete={(data) => {
          setChartData(data);
          setActiveChatId(`chat_${Date.now()}`); // Create a new chat ID when starting
          setChatMessages([]); // Reset messages
        }} />
      ) : (
        <ChatInterface
          chartData={chartData}
          activeChatId={activeChatId}
          initialMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      )}
    </AppLayout>
  );
}
