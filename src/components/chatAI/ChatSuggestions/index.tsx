'use client';

import { memo } from 'react';
import { Sparkles } from 'lucide-react';
import OptimizedLottie from '@components/ui/optimized-lottie';

export interface ChatSuggestionsProps {
  questions: { singleQuestion: string }[];
  suggestionLabel: string;
  onSuggestionClick: (question: string) => void;
}

const ChatSuggestions = memo(
  ({ questions, suggestionLabel, onSuggestionClick }: ChatSuggestionsProps) => {
    return (
      <div className="flex flex-col justify-center gap-3 py-2">
        <div className="text-primary mb-1 flex items-center gap-2 text-xs font-semibold">
          <Sparkles size={14} />
          {suggestionLabel}
        </div>
        <OptimizedLottie
          src="/anima-bot.lottie"
          loop
          autoplay
          className="mx-auto h-45 w-50"
        />
        <div className="grid grid-cols-1 gap-2">
          {questions.slice(0, 6).map((q, i) => (
            <button
              key={i}
              onClick={() => onSuggestionClick(q.singleQuestion)}
              className="text-foreground/90 hover:border-primary/30 hover:bg-primary/20 dark:hover:bg-primary/20 rounded-xl border border-black/10 bg-black/2 p-3 pt-2 text-left text-xs dark:border-white/10 dark:bg-white/3 dark:text-white/90"
            >
              {q.singleQuestion}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

ChatSuggestions.displayName = 'ChatSuggestions';

export default ChatSuggestions;
