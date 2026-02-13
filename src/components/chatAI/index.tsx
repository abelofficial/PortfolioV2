"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { SectionContainer } from "@components/ui/custom-container";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Trash2 } from "lucide-react";
import useWindowWidth from "@/useWindowWidth";

const SUGGESTED_QUESTIONS = [
    "What are Abel's core technical skills?",
    "Tell me about his work experience.",
    "Does he have experience with AWS or Cloud?",
    "What kind of projects has he worked on?"
];

export default function ChatAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
    const width = useWindowWidth();

    // setMessages allows us to clear the chat manually
    const { messages, sendMessage, status, setMessages } = useChat({
        transport: new DefaultChatTransport({ api: '/api/chat' }),
    });

    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const isMobile = window.innerWidth < 1280;
        if (isOpen && isMobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const isDesktop = width >= 1280;

    const handleFormSubmit = async (e?: React.FormEvent, manualMessage?: string) => {
        if (e) e.preventDefault();
        const messageToSend = manualMessage || input;

        if (!messageToSend.trim() || status !== 'ready') return;

        setInput("");
        await sendMessage({ text: messageToSend });

        // Rotate to the next suggestion
        setCurrentSuggestionIndex((prev) => (prev + 1) % SUGGESTED_QUESTIONS.length);
    };

    const clearChat = () => {
        setMessages([]);
        setCurrentSuggestionIndex(0);
    };

    return (
        <>
            <div className="xl:hidden fixed bottom-5 right-5 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-primary text-white p-2 rounded-xl shadow-lg"
                >
                    {isOpen ? <X size={20}/> : <><MessageCircle size={20}/><span className="text-xs">Chat with Abel&#39;s AI</span></>}
                </button>
            </div>

            <AnimatePresence>
                {(isOpen || isDesktop) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`
                        fixed inset-0 z-[100] p-4 bg-background/80 backdrop-blur-md
                        xl:relative xl:z-0 xl:p-0 xl:w-full h-[80vh] xl:h-[70vh] xl:bg-transparent xl:backdrop-blur-none mt-auto
                        flex flex-col items-center justify-end`}
                    >
                        <div className={`
                        w-full h-full max-w-lg xl:max-none 
                        flex flex-col overflow-hidden bg-white dark:bg-neutral-900 border border-primary/10 rounded-2xl xl:rounded-none shadow-2xl xl:shadow-none`}>
                            <SectionContainer
                                disablePattern
                                fullHeight
                                title="Abel's AI"
                                headerAction={
                                    <div className="flex items-center gap-3">
                                        {messages.length > 0 && (
                                            <button
                                                onClick={clearChat}
                                                className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                                                title="Clear chat"
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        )}
                                        <button onClick={() => setIsOpen(false)} className="xl:hidden">
                                            <X size={20}/>
                                        </button>
                                    </div>
                                }
                            >
                                <div className="flex flex-col h-full min-h-0 m-0">
                                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">

                                        
                                        {messages.length === 0 && (
                                            <div className="flex flex-col gap-3 py-4">
                                                <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-1">
                                                    <Sparkles size={14} />
                                                    Suggested Starters
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {SUGGESTED_QUESTIONS.map((q, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleFormSubmit(undefined, q)}
                                                            className="text-left text-xs p-3 rounded-xl border border-primary/10 bg-secondary/30 hover:bg-primary/5 hover:border-primary/30 transition-all text-neutral-600 dark:text-neutral-300"
                                                        >
                                                            {q}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        
                                        {messages.map((m) => (
                                            <div key={m.id}
                                                 className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                                                    m.role === "user" ? "bg-primary text-white" : "bg-neutral-200 dark:bg-neutral-800"
                                                }`}>
                                                    {m.parts.map((part, i) =>
                                                        part.type === 'text' ?
                                                            <ReactMarkdown key={i} >{part.text}</ReactMarkdown> : null
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {(status === 'streaming' || status === 'submitted') && (
                                            <div className="text-xs animate-pulse text-primary font-medium pl-2">
                                                Abel&#39;s AI is typing...
                                            </div>
                                        )}
                                        <div ref={messagesEndRef}/>
                                    </div>

                                    
                                    <div className="flex-shrink-0 border-t border-primary/10 bg-neutral-50/50 dark:bg-neutral-900/50">

                                        
                                        {messages.length > 0 && (
                                            <div className="px-4 pt-3">
                                                <button
                                                    type="button"
                                                    disabled={status !== 'ready'}
                                                    onClick={() => handleFormSubmit(undefined, SUGGESTED_QUESTIONS[currentSuggestionIndex])}
                                                    className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-primary/60 hover:text-primary disabled:opacity-50 transition-all group"
                                                >
                                                    <Sparkles size={12} className="group-hover:rotate-12 transition-transform" />
                                                    <span className="truncate">Ask: {SUGGESTED_QUESTIONS[currentSuggestionIndex]}</span>
                                                </button>
                                            </div>
                                        )}

                                        <form onSubmit={handleFormSubmit} className="p-4">
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                    placeholder="Ask about Abel..."
                                                    className="flex-1 bg-transparent border-b border-primary/30 focus:outline-none focus:border-primary text-sm py-1 transition-colors"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={!input.trim() || status !== 'ready'}
                                                    className="text-primary hover:scale-110 disabled:opacity-30 disabled:scale-100 transition-all"
                                                >
                                                    <Send size={20}/>
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