"use client";
import {useChat} from "@ai-sdk/react";
import {DefaultChatTransport} from "ai";
import {useState, useRef, useEffect} from "react";
import {SectionContainer} from "@components/ui/custom-container";
import ReactMarkdown from 'react-markdown';
import {motion, AnimatePresence} from "framer-motion";
import {MessageCircle, X, Send} from "lucide-react"; 

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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status !== 'ready') return;
        setInput("");
        await sendMessage({text: input});
    };

    return (
        <>
            <div className="xl:hidden fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl shadow-2xl"
                >
                    {isOpen ? <X size={20}/> : <><MessageCircle size={20}/><span>Chat with my AI</span></>}
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
                        w-full h-full max-w-lg xl:max-w-none 
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