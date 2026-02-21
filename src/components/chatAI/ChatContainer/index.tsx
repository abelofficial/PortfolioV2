'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useSyncExternalStore,
  useMemo,
} from 'react';
import { usePathname } from 'next/navigation';
import { SectionContainer } from '@components/ui/custom-container';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { ChatBoxInfo, FullChatBoxData } from '@/types';
import ChatToggleButton from '@components/chatAI/ChatToggleButton';
import ChatMessages from '@components/chatAI/ChatMessages';
import ChatInput from '@components/chatAI/ChatInput';
import ChatSuggestions from '@components/chatAI/ChatSuggestions';

export interface ChatContainerProps {
  chatBoxData: FullChatBoxData;
  locale: string;
}

const emptySubscribe = () => () => {};

const ChatContainer = ({ chatBoxData, locale }: ChatContainerProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [input, setInput] = useState('');

  // Derive chatBoxInfo based on current path
  const chatBoxInfo: ChatBoxInfo = useMemo(() => {
    const { homePage, allTechnicalLedgers, technicalLedgersPage } = chatBoxData;

    // Base info from homePage.chatBox (hint, openButtonLabel, chatTitle, etc.)
    const baseInfo: ChatBoxInfo = {
      hint: homePage.chatBox.hint,
      openButtonLabel: homePage.chatBox.openButtonLabel,
      chatTitle: homePage.chatBox.chatTitle,
      chatInputPlaceholder: homePage.chatBox.chatInputPlaceholder,
      suggestionLabel: homePage.chatBox.suggestionLabel,
      questions: homePage.chatBox.questions,
    };

    // Path pattern: /{locale}/technical-ledgers/{slugId}
    const pathSegments = pathname.split('/').filter(Boolean);

    // Check if we're on a specific technical ledger page (e.g., /en/technical-ledgers/my-slug)
    if (pathSegments.length >= 3 && pathSegments[1] === 'technical-ledgers') {
      const slugId = pathSegments[2];
      const ledger = allTechnicalLedgers.find((l) => l.slugId === slugId);
      if (ledger?.chatBox?.questions) {
        return {
          ...baseInfo,
          questions: ledger.chatBox.questions,
        };
      }
    }

    // Check if we're on the technical ledgers list page (e.g., /en/technical-ledgers)
    if (pathSegments.length === 2 && pathSegments[1] === 'technical-ledgers') {
      if (technicalLedgersPage?.chatBox?.questions) {
        return {
          ...baseInfo,
          questions: technicalLedgersPage.chatBox.questions,
        };
      }
    }

    // Default: home page questions
    return baseInfo;
  }, [chatBoxData, pathname]);
  // Hydration-safe mounted detection
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === 'streaming' || status === 'submitted';
  const isReady = status === 'ready';

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opening on mobile
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const mediaQuery = window.matchMedia('(max-width: 1279px)');
    if (mediaQuery.matches) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen, mounted]);

  const handleFormSubmit = useCallback(
    async (e?: React.FormEvent, manualMessage?: string) => {
      if (e) e.preventDefault();
      const messageToSend = (manualMessage ?? input).trim();
      if (!messageToSend || !isReady) return;

      setInput('');
      await sendMessage({ text: messageToSend, metadata: { locale: locale } });

      setCurrentSuggestionIndex(
        (prev) => (prev + 1) % chatBoxInfo.questions.length
      );
    },
    [chatBoxInfo.questions.length, input, sendMessage, isReady, locale]
  );

  const handleSuggestionClick = useCallback(
    (question: string) => {
      handleFormSubmit(undefined, question);
    },
    [handleFormSubmit]
  );

  const clearChat = () => {
    setMessages([]);
    setCurrentSuggestionIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const currentSuggestion =
    chatBoxInfo.questions[currentSuggestionIndex]?.singleQuestion;

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <ChatToggleButton
        isOpen={isOpen}
        onToggle={() => setIsOpen((v) => !v)}
        label={chatBoxInfo.openButtonLabel}
      />

      {/* Desktop: Always visible via CSS */}
      <div className="hidden h-full max-h-[calc(100dvh-10rem)] w-full xl:block">
        <div className="bg-card flex h-full w-full flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <SectionContainer
            disablePattern
            fullHeight
            title={chatBoxInfo.chatTitle}
            headerAction={
              messages.length > 0 ? (
                <button
                  onClick={clearChat}
                  className="text-muted-foreground rounded-md p-1 transition-colors hover:text-red-500"
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  <Trash2 size={18} />
                </button>
              ) : null
            }
          >
            <div className="flex h-full min-h-0 flex-col">
              <div className="px-4 pt-3 pb-2">
                <p className="text-muted-foreground/80 text-xs">
                  {chatBoxInfo.hint}
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-4">
                  <ChatSuggestions
                    questions={chatBoxInfo.questions}
                    suggestionLabel={chatBoxInfo.suggestionLabel}
                    onSuggestionClick={handleSuggestionClick}
                  />
                </div>
              ) : (
                <ChatMessages
                  ref={messagesEndRef}
                  messages={messages}
                  isLoading={isLoading}
                />
              )}

              <ChatInput
                ref={inputRef}
                input={input}
                onInputChange={setInput}
                onSubmit={handleFormSubmit}
                isReady={isReady}
                placeholder={chatBoxInfo.chatInputPlaceholder}
                currentSuggestion={currentSuggestion}
                showSuggestion={messages.length > 0}
                onSuggestionClick={() =>
                  handleFormSubmit(undefined, currentSuggestion)
                }
              />
            </div>
          </SectionContainer>
        </div>
      </div>

      {/* Mobile: Overlay controlled by isOpen state */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="bg-background/80 fixed inset-0 z-100 flex items-end justify-center overflow-hidden overscroll-contain p-4 backdrop-blur-md xl:hidden"
            style={{
              height: '100dvh',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="bg-card flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl">
              <SectionContainer
                disablePattern
                fullHeight
                title={chatBoxInfo.chatTitle}
                headerAction={
                  <div className="flex items-center gap-3">
                    {messages.length > 0 && (
                      <button
                        onClick={clearChat}
                        className="text-muted-foreground rounded-md p-1 transition-colors hover:text-red-500"
                        title="Clear chat"
                        aria-label="Clear chat"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-muted-foreground hover:text-foreground rounded-md p-1 transition-colors"
                      aria-label="Close chat"
                      title="Close"
                    >
                      <X size={20} />
                    </button>
                  </div>
                }
              >
                <div className="flex h-full min-h-0 flex-col">
                  <div className="px-4 pt-3 pb-2">
                    <p className="text-muted-foreground/80 text-xs">
                      {chatBoxInfo.hint}
                    </p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-4">
                      <ChatSuggestions
                        questions={chatBoxInfo.questions}
                        suggestionLabel={chatBoxInfo.suggestionLabel}
                        onSuggestionClick={handleSuggestionClick}
                      />
                    </div>
                  ) : (
                    <ChatMessages
                      ref={messagesEndRef}
                      messages={messages}
                      isLoading={isLoading}
                    />
                  )}

                  <ChatInput
                    ref={inputRef}
                    input={input}
                    onInputChange={setInput}
                    onSubmit={handleFormSubmit}
                    isReady={isReady}
                    placeholder={chatBoxInfo.chatInputPlaceholder}
                    currentSuggestion={currentSuggestion}
                    showSuggestion={messages.length > 0}
                    onSuggestionClick={() =>
                      handleFormSubmit(undefined, currentSuggestion)
                    }
                  />
                </div>
              </SectionContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatContainer;
