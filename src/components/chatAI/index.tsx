"use client";
import {useChat} from "@ai-sdk/react";
import {DefaultChatTransport} from "ai";
import {useState, useRef, useEffect} from "react";
import {SectionContainer} from "@components/ui/custom-container";
import ReactMarkdown from 'react-markdown';
import {motion, AnimatePresence} from "framer-motion";
import {MessageCircle, X, Send} from "lucide-react"; // Optional: for icons

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

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status !== 'ready') return;
        sendMessage({text: input});
        setInput("");
    };

    return (
        <>
            {/* MOBILE TOGGLE BUTTON (unchanged) */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
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
                        /* MOBILE: Fixed overlay */
                        fixed inset-0 z-[100] p-4 bg-background/80 backdrop-blur-md
                        /* DESKTOP: Back into the flow */
                        xl:relative xl:inset-auto xl:z-0 xl:bg-transparent xl:p-0 xl:h-full xl:w-full
                        flex flex-col items-center justify-end xl:justify-start
                    `}
                    >
                        {/* The "Shield" div that holds the actual chat */}
                        <div className={`
                        w-full max-w-lg xl:max-w-none 
                        /* MOBILE: 85% height | DESKTOP: 100% height */
                        h-[85vh] xl:h-full 
                        flex flex-col overflow-hidden bg-white dark:bg-neutral-900 
                        rounded-t-3xl xl:rounded-none shadow-2xl xl:shadow-none 
                        border xl:border-none border-primary/20
                    `}>
                            <SectionContainer
                                disablePattern
                                fullHeight
                                title="Chat With My AI"
                                headerAction={
                                    <button onClick={() => setIsOpen(false)} className="xl:hidden p-2">
                                        <X size={20}/>
                                    </button>
                                }
                            >
                                {/* Use flex-1 to push the input to the absolute bottom */}
                                <div className="flex flex-col h-full min-h-0">
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
                                        <div ref={messagesEndRef}/>
                                    </div>

                                    <form onSubmit={handleFormSubmit}
                                          className="flex-shrink-0 p-4 border-t border-primary/10">
                                        <div className="flex gap-2 items-center">
                                            <input
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="Ask about Abel..."
                                                className="flex-1 bg-transparent border-b border-primary/30 focus:outline-none text-sm py-2"
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