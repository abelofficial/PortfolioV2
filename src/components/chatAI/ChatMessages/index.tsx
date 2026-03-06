'use client';

import React, { memo, useCallback } from 'react';
import {
  Bot,
  User2Icon,
  ArrowUpRight,
  LucideCornerUpRight,
} from 'lucide-react';
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
        <div className="custom-scrollbar flex h-full flex-1 flex-col justify-start gap-4 overflow-y-auto overscroll-contain px-4 pt-2 pb-4">
          <div className="mt-auto"></div>
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-primary text-foreground dark:text-accent ml-auto'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {m.parts.toReversed().map((part, i: number) =>
                    part.type === 'text' ? (
                      <div
                        key={i}
                        className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-headings:mt-3 prose-ul:my-2 prose-ol:my-2 prose-p:my-2 max-w-none"
                      >
                        <ReactMarkdown
                          components={{
                            h3: ({ children, ...props }) => (
                              <h3
                                className="py-2 text-sm font-semibold hyphens-auto"
                                {...props}
                              >
                                {children}
                              </h3>
                            ),
                            li: ({ children, ...props }) => {
                              const hasNestedList = React.Children.toArray(
                                children
                              ).some(
                                (child: unknown) =>
                                  React.isValidElement(child) &&
                                  (child.type === 'ul' || child.type === 'ol')
                              );

                              return (
                                <li
                                  className="my-1 text-xs leading-relaxed wrap-break-word hyphens-auto"
                                  {...props}
                                >
                                  {hasNestedList ? (
                                    <LucideCornerUpRight
                                      size={14}
                                      className="text-primary m-0 inline p-0"
                                    />
                                  ) : (
                                    <span className="text-primary mr-1 ml-3">
                                      •
                                    </span>
                                  )}
                                  {children}
                                </li>
                              );
                            },

                            p: ({ children, ...props }) => (
                              <p
                                className="my-2 inline text-xs leading-relaxed wrap-break-word hyphens-auto whitespace-pre-wrap"
                                {...props}
                              >
                                {children}
                              </p>
                            ),
                            a: ({ href, children, ...props }) => (
                              <a
                                {...props}
                                href={href?.toString() || '#'}
                                onClick={(e) => handleLinkClick(e, href || '#')}
                                className="text-primary cursor-pointer text-xs hover:underline"
                              >
                                {children}
                                <ArrowUpRight className="inline" size={14} />
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
                {isUser ? (
                  <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/4">
                    <User2Icon size={18} className="text-primary/70" />
                  </div>
                ) : (
                  <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/4">
                    <Bot size={18} className="text-primary/70" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-end gap-2">
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
