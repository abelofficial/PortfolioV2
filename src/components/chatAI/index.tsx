"use client";
import {useChat} from "@ai-sdk/react";
import {DefaultChatTransport} from "ai";
import {useState, useRef, useEffect} from "react";
import {SectionContainer} from "@components/ui/custom-container";
import ReactMarkdown from 'react-markdown';
import {motion, AnimatePresence} from "framer-motion";
import {MessageCircle, X, Send, Sparkles} from "lucide-react";

// 1. Define your starter questions
const SUGGESTED_QUESTIONS = [
    "What are Abel's core technical skills?",
    "Tell me about his work experience.",
    "Does he have experience with AWS or Cloud?",
    "What kind of projects has he worked on?"
];

export default function ChatAI() {
    const [isOpen, setIsOpen] = useState(false);
    const {messages, sendMessage, status} = useChat({
        transport: new DefaultChatTransport({api: '/api/chat'}),
    });

    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
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

    const handleFormSubmit = async (e?: React.FormEvent, manualMessage?: string) => {
        if (e) e.preventDefault();
        const messageToSend = manualMessage || input;

        if (!messageToSend.trim() || status !== 'ready') return;

        setInput("");
        await sendMessage({text: messageToSend});
    };

    return (
        <>
            <div className="xl:hidden fixed bottom-3 right-3 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-primary text-white p-2 rounded-xl"
                >
                    {isOpen ? <X size={20}/> : <><MessageCircle size={20}/><span className="text-xs">Chat with Abel&#39;s AI</span></>}
                </button>
            </div>

            <AnimatePresence>
                {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1280)) && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        className={`
                        fixed inset-0 z-[100] p-4 bg-background/80 backdrop-blur-md
                        xl:relative xl:z-0 xl:p-0 xl:w-full h-[60vh] xl:h-[60vh] xl:bg-transparent xl:backdrop-blur-none mt-auto
                        flex flex-col items-center justify-end`}
                    >
                        <div className={`
                        w-full h-full max-w-lg xl:max-none 
                        flex flex-col overflow-hidden bg-white dark:bg-neutral-900`}>
                            <SectionContainer
                                disablePattern
                                fullHeight
                                title="Abel's AI"
                                headerAction={
                                    <button onClick={() => setIsOpen(false)} className="xl:hidden">
                                        <X size={20}/>
                                    </button>
                                }
                            >
                                <div className="flex flex-col h-full min-h-0 m-0">
                                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">

                                        {/* 2. SUGGESTED QUESTIONS UI */}
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
                                                            <ReactMarkdown key={i}>{part.text}</ReactMarkdown> : null
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

                                    <form onSubmit={handleFormSubmit}
                                          className="flex-shrink-0 p-4 border-t border-primary/10">
                                        <div className="flex gap-2 items-center">
                                            <input
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="Ask about Abel..."
                                                className="flex-1 bg-transparent border-b border-primary/30 focus:outline-none text-sm"
                                            />
                                            <button type="submit" className="text-primary"><Send size={20}/></button>
                                        </div>
                                    </form>
                                </div>
                            </SectionContainer>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}