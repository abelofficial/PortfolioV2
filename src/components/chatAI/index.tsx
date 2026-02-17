'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect, useCallback } from 'react';
import { SectionContainer } from '@components/ui/custom-container';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Trash2 } from 'lucide-react';
import useWindowWidth from '@/hooks/useWindowWidth';
import { ChatBoxInfo, HomePage } from '@/types';

export interface ChatAIProps {
  chatBoxInfo: ChatBoxInfo;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.2s]" />
      <span className="bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.1s]" />
      <span className="bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full" />
    </div>
  );
}

export default function ChatAI({ chatBoxInfo }: ChatAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);

  const width = useWindowWidth();
  const isDesktop = width >= 1280;

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mobile scroll lock (overlay only)
  useEffect(() => {
    const isMobile = window.innerWidth < 1280;
    const body = document.body;

    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevWidth = body.style.width;

    if (isOpen && isMobile) {
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100%';
    } else {
      body.style.overflow = prevOverflow || '';
      body.style.position = prevPosition || '';
      body.style.width = prevWidth || '';
    }

    return () => {
      body.style.overflow = prevOverflow || '';
      body.style.position = prevPosition || '';
      body.style.width = prevWidth || '';
    };
  }, [isOpen]);

  // Focus input when opened on mobile
  useEffect(() => {
    const isMobile = width < 1280;
    if (isOpen && isMobile) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen, width]);

  // Close on Escape (mobile overlay)
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleFormSubmit = useCallback(
    async (e?: React.FormEvent, manualMessage?: string) => {
      if (e) e.preventDefault();
      const messageToSend = (manualMessage ?? input).trim();
      if (!messageToSend || status !== 'ready') return;

      setInput('');
      await sendMessage({ text: messageToSend });

      setCurrentSuggestionIndex(
        (prev) => (prev + 1) % chatBoxInfo.questions.length
      );
    },
    [chatBoxInfo.questions.length, input, sendMessage, status]
  );

  const clearChat = () => {
    setMessages([]);
    setCurrentSuggestionIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <>
      {/* Mobile FAB */}
      <div className="fixed right-5 bottom-5 z-50 xl:hidden">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="bg-primary flex items-center gap-2 rounded-xl p-2 text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
          aria-label={chatBoxInfo.openButtonLabel}
        >
          {isOpen ? (
            <X size={20} />
          ) : (
            <>
              <MessageCircle size={20} />
              <span className="text-xs">{chatBoxInfo.openButtonLabel}</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="bg-background/80 fixed inset-0 z-[100] flex items-end justify-center p-4 backdrop-blur-md xl:relative xl:inset-auto xl:z-0 xl:h-full xl:w-full xl:bg-transparent xl:p-0 xl:backdrop-blur-none"
            style={{
              height: isDesktop ? undefined : '100dvh',
              paddingBottom: isDesktop
                ? undefined
                : 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="bg-card flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl transition-shadow xl:max-w-none xl:rounded-2xl xl:shadow-none xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
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
                      className="text-muted-foreground hover:text-foreground rounded-md p-1 transition-colors xl:hidden"
                      aria-label="Close chat"
                      title="Close"
                    >
                      <X size={20} />
                    </button>
                  </div>
                }
              >
                <div className="flex h-full min-h-0 flex-col">
                  {/* Header microcopy (more breathing room) */}
                  <div className="px-4 pt-3 pb-2">
                    <p className="text-muted-foreground/80 text-xs">
                      {chatBoxInfo.hint}
                    </p>
                  </div>

                  {/* Messages */}
                  <div className="relative min-h-0 flex-1">
                    {/* WOW: edge fades for scroll polish */}
                    <div className="from-card pointer-events-none absolute top-0 left-0 z-10 h-8 w-full bg-gradient-to-b to-transparent" />
                    <div className="from-card pointer-events-none absolute bottom-0 left-0 z-10 h-10 w-full bg-gradient-to-t to-transparent" />

                    <div className="custom-scrollbar h-full space-y-4 overflow-y-auto px-4 pt-2 pb-4">
                      {/* Empty state */}
                      {messages.length === 0 && (
                        <div className="flex flex-col gap-3 py-2">
                          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-semibold">
                            <Sparkles size={14} />
                            {chatBoxInfo.suggestionLabel}
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            {chatBoxInfo.questions.slice(0, 6).map((q, i) => (
                              <button
                                key={i}
                                onClick={() =>
                                  handleFormSubmit(undefined, q.singleQuestion)
                                }
                                className="text-foreground/90 hover:border-primary/30 hover:bg-primary/5 rounded-xl border border-black/10 bg-black/[0.02] p-3 text-left text-xs transition-all dark:border-white/10 dark:bg-white/[0.03] dark:text-white/90"
                              >
                                {q.singleQuestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Conversation */}
                      {messages.map((m) => {
                        const isUser = m.role === 'user';
                        return (
                          <div
                            key={m.id}
                            className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            {/* Assistant identity */}
                            {!isUser && (
                              <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.04]">
                                <Sparkles
                                  size={14}
                                  className="text-primary/70"
                                />
                              </div>
                            )}

                            {/* Responsive max width + softer assistant bubble */}
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed xl:max-w-[78%] ${
                                isUser
                                  ? 'bg-primary/90 hover:bg-primary text-white'
                                  : 'text-foreground bg-black/[0.035] dark:bg-white/[0.045]'
                              } `}
                            >
                              {m.parts.map((part, i) =>
                                part.type === 'text' ? (
                                  <div
                                    key={i}
                                    className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-headings:mt-3 prose-ul:my-2 prose-ol:my-2 prose-p:my-2 max-w-none"
                                  >
                                    <ReactMarkdown>{part.text}</ReactMarkdown>
                                  </div>
                                ) : null
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* WOW: typing indicator as a bubble with dots */}
                      {(status === 'streaming' || status === 'submitted') && (
                        <div className="flex items-end gap-2">
                          <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.04]">
                            <Sparkles size={14} className="text-primary/70" />
                          </div>
                          <div className="rounded-2xl bg-black/[0.035] px-4 py-2.5 dark:bg-white/[0.045]">
                            <TypingDots />
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Composer */}
                  <div className="bg-card/60 shrink-0 border-t border-black/10 px-4 py-3 backdrop-blur dark:border-white/10">
                    {messages.length > 0 && (
                      <div className="pb-2">
                        <button
                          type="button"
                          disabled={status !== 'ready'}
                          onClick={() =>
                            handleFormSubmit(
                              undefined,
                              chatBoxInfo.questions[currentSuggestionIndex]
                                .singleQuestion
                            )
                          }
                          className="group text-primary/80 hover:border-primary/30 hover:bg-primary/5 hover:text-primary inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-[11px] font-semibold tracking-wide transition-all disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03]"
                        >
                          <Sparkles
                            size={12}
                            className="transition-transform group-hover:rotate-12"
                          />
                          <span className="truncate">
                            Ask:{' '}
                            {
                              chatBoxInfo.questions[currentSuggestionIndex]
                                .singleQuestion
                            }
                          </span>
                        </button>
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit}>
                      <div className="focus-within:border-primary/40 focus-within:bg-primary/5 flex items-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2 transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:focus-within:bg-white/[0.04]">
                        <input
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={chatBoxInfo.chatInputPlaceholder}
                          className="placeholder:text-muted-foreground/70 flex-1 bg-transparent text-sm outline-none"
                        />

                        <button
                          type="submit"
                          disabled={!input.trim() || status !== 'ready'}
                          className="text-primary transition-transform hover:scale-110 disabled:scale-100 disabled:opacity-30"
                          aria-label="Send message"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </SectionContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
