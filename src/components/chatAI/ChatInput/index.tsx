'use client';

import { Send, Sparkles } from 'lucide-react';

export interface ChatInputProps {
  ref?: React.Ref<HTMLInputElement>;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isReady: boolean;
  placeholder: string;
  currentSuggestion?: string;
  showSuggestion?: boolean;
  onSuggestionClick?: () => void;
}

const ChatInput = ({
  ref,
  input,
  onInputChange,
  onSubmit,
  isReady,
  placeholder,
  currentSuggestion,
  showSuggestion,
  onSuggestionClick,
}: ChatInputProps) => {
  return (
    <div className="bg-card/60 shrink-0 border-t border-black/10 px-4 py-3 backdrop-blur dark:border-white/10">
      {showSuggestion && currentSuggestion && (
        <div className="pb-2">
          <button
            type="button"
            disabled={!isReady}
            onClick={onSuggestionClick}
            className="group text-primary/80 hover:border-primary/30 hover:bg-primary/5 hover:text-primary inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-black/2 px-3 py-1 text-[11px] font-semibold tracking-wide transition-transform disabled:opacity-50 dark:border-white/10 dark:bg-white/3"
          >
            <Sparkles
              size={12}
              className="transition-transform group-hover:rotate-12"
            />
            <span className="truncate">Ask: {currentSuggestion}</span>
          </button>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="focus-within:border-primary/40 focus-within:bg-primary/5 flex items-center gap-2 rounded-xl border border-black/10 bg-black/2 px-3 py-2 transition-colors dark:border-white/10 dark:bg-white/3 dark:focus-within:bg-white/4">
          <input
            ref={ref}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            className="placeholder:text-muted-foreground/70 flex-1 bg-transparent text-sm outline-none"
          />

          <button
            type="submit"
            disabled={!input.trim() || !isReady}
            className="text-primary transition-transform hover:scale-110 disabled:scale-100 disabled:opacity-30"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
