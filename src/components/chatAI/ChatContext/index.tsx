'use client';

import { createContext, useContext } from 'react';

export interface ChatContextType {
  closeChat: () => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
