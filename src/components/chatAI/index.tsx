'use client';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect } from 'react';
import { SectionContainer } from '@components/ui/custom-container';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Trash2 } from 'lucide-react';
import useWindowWidth from '@/useWindowWidth';

const SUGGESTED_QUESTIONS = [
  "What are Abel's core technical skills?",
  'Tell me about his work experience.',
  'Does he have experience with AWS or Cloud?',
  'What kind of projects has he worked on?',
];

export default function ChatAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const width = useWindowWidth();

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1280;
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isDesktop = width >= 1280;

  const handleFormSubmit = async (
    e?: React.FormEvent,
    manualMessage?: string
  ) => {
    if (e) e.preventDefault();
    const messageToSend = manualMessage || input;

    if (!messageToSend.trim() || status !== 'ready') return;

    setInput('');
    await sendMessage({ text: messageToSend });

    setCurrentSuggestionIndex(
      (prev) => (prev + 1) % SUGGESTED_QUESTIONS.length
    );
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentSuggestionIndex(0);
  };

  return (
    <>
      <div className="fixed right-5 bottom-5 z-50 xl:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary flex items-center gap-2 rounded-xl p-2 text-white shadow-lg"
        >
          {isOpen ? (
            <X size={20} />
          ) : (
            <>
              <MessageCircle size={20} />
              <span className="text-xs">Chat with Abel&#39;s AI</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`bg-background/80 fixed inset-0 z-[100] mt-auto flex h-[80vh] flex-col items-center justify-end p-4 backdrop-blur-md xl:relative xl:z-0 xl:h-[70vh] xl:w-full xl:bg-transparent xl:p-0 xl:backdrop-blur-none`}
          >
            <div
              className={`xl:max-none border-primary/10 flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl xl:rounded-none xl:shadow-none dark:bg-neutral-900`}
            >
              <SectionContainer
                disablePattern
                fullHeight
                title="Abel's AI"
                headerAction={
                  <div className="flex items-center gap-3">
                    {messages.length > 0 && (
                      <button
                        onClick={clearChat}
                        className="p-1 text-neutral-400 transition-colors hover:text-red-500"
                        title="Clear chat"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="xl:hidden"
                    >
                      <X size={20} />
                    </button>
                  </div>
                }
              >
                <div className="m-0 flex h-full min-h-0 flex-col">
                  <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
                    {messages.length === 0 && (
                      <div className="flex flex-col gap-3 py-4">
                        <div className="text-primary mb-1 flex items-center gap-2 text-xs font-semibold">
                          <Sparkles size={14} />
                          Suggested Starters
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {SUGGESTED_QUESTIONS.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => handleFormSubmit(undefined, q)}
                              className="border-primary/10 bg-secondary/30 hover:bg-primary/5 hover:border-primary/30 rounded-xl border p-3 text-left text-xs text-neutral-600 transition-all dark:text-neutral-300"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                            m.role === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-neutral-200 dark:bg-neutral-800'
                          }`}
                        >
                          {m.parts.map((part, i) =>
                            part.type === 'text' ? (
                              <ReactMarkdown key={i}>{part.text}</ReactMarkdown>
                            ) : null
                          )}
                        </div>
                      </div>
                    ))}
                    {(status === 'streaming' || status === 'submitted') && (
                      <div className="text-primary animate-pulse pl-2 text-xs font-medium">
                        Abel&#39;s AI is typing...
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="border-primary/10 flex-shrink-0 border-t bg-neutral-50/50 dark:bg-neutral-900/50">
                    {messages.length > 0 && (
                      <div className="px-4 pt-3">
                        <button
                          type="button"
                          disabled={status !== 'ready'}
                          onClick={() =>
                            handleFormSubmit(
                              undefined,
                              SUGGESTED_QUESTIONS[currentSuggestionIndex]
                            )
                          }
                          className="text-primary/60 hover:text-primary group flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase transition-all disabled:opacity-50"
                        >
                          <Sparkles
                            size={12}
                            className="transition-transform group-hover:rotate-12"
                          />
                          <span className="truncate">
                            Ask: {SUGGESTED_QUESTIONS[currentSuggestionIndex]}
                          </span>
                        </button>
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="p-4">
                      <div className="flex items-center gap-2">
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Ask about Abel..."
                          className="border-primary/30 focus:border-primary flex-1 border-b bg-transparent py-1 text-sm transition-colors focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={!input.trim() || status !== 'ready'}
                          className="text-primary transition-all hover:scale-110 disabled:scale-100 disabled:opacity-30"
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
