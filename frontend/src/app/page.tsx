'use client';

import { useState, useEffect } from 'react';
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

  // Restore chart from localStorage when returning from a tool page with a pending question
  useEffect(() => {
    const saved = localStorage.getItem('astroword_chart');
    const pending = sessionStorage.getItem('pending_question');
    if (saved && pending && !chartData) {
      try {
        const parsed = JSON.parse(saved);
        setChartData(parsed);
        setActiveChatId(`chat_${Date.now()}`);
        setChatMessages([]);
      } catch (e) { }
    }
  }, []);

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
