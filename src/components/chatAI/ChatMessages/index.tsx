'use client';

import { memo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import { UIMessage } from '@ai-sdk/react';
import TypingDots from '@components/chatAI/TypingDots';
import { useChatContext } from '@components/chatAI/ChatContext';
import languages from '@/utils/languages';

export interface ChatMessagesProps {
  ref?: React.Ref<HTMLDivElement>;
  messages: UIMessage[];
  isLoading: boolean;
  locale: string;
}

const ChatMessages = memo(
  ({ ref, messages, isLoading, locale }: ChatMessagesProps) => {
    const { closeChat } = useChatContext();
    const router = useRouter();

    // Replace any known language in the URL path with the current locale
    const replaceLocaleInUrl = useCallback(
      (href: string): string => {
        const knownLanguages = languages.map((l) => l.language);
        // Match URLs starting with /{language}/ or /{language}
        const localePattern = new RegExp(
          `^/(${knownLanguages.join('|')})(/|$)`
        );
        return href.replace(localePattern, `/${locale}$2`);
      },
      [locale]
    );

    const handleLinkClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        closeChat();
        const localizedHref = replaceLocaleInUrl(href);
        router.push(localizedHref);
      },
      [closeChat, router, replaceLocaleInUrl]
    );

    return (
      <div className="relative min-h-0 flex-1">
        <div className="from-card pointer-events-none absolute top-0 left-0 z-10 h-8 w-full bg-linear-to-b to-transparent" />
        <div className="from-card pointer-events-none absolute bottom-0 left-0 z-10 h-10 w-full bg-linear-to-t to-transparent" />

        <div className="custom-scrollbar h-full space-y-4 overflow-y-auto overscroll-contain px-4 pt-2 pb-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/4">
                    <Sparkles size={14} className="text-primary/70" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed xl:max-w-[78%] ${
                    isUser
                      ? 'bg-primary/90 hover:bg-primary text-white'
                      : 'text-foreground bg-black/3.5 dark:bg-white/4.5'
                  } `}
                >
                  {m.parts.map((part, i: number) =>
                    part.type === 'text' ? (
                      <div
                        key={i}
                        className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-headings:mt-3 prose-ul:my-2 prose-ol:my-2 prose-p:my-2 max-w-none"
                      >
                        <ReactMarkdown
                          components={{
                            a: ({ href, children, ...props }) => (
                              <a
                                {...props}
                                href={href?.toString() || '#'}
                                onClick={(e) => handleLinkClick(e, href || '#')}
                                className="text-primary cursor-pointer hover:underline"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-end gap-2">
              <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/4">
                <Sparkles size={14} className="text-primary/70" />
              </div>
              <div className="rounded-2xl bg-black/3.5 px-4 py-2.5 dark:bg-white/4.5">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={ref} />
        </div>
      </div>
    );
  }
);

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
