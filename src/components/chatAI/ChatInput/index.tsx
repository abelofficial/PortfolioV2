'use client';

import { Send, User2Icon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface ChatInputProps {
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
    <div className="bg-card/60 shrink-0 border-t border-black/10 px-3 py-2 backdrop-blur dark:border-white/10">
      {showSuggestion && currentSuggestion && (
        <div className="pb-2">
          <Badge
            variant="outline"
            className="group text-primary/80 hover:border-primary/30 hover:bg-primary/5 hover:text-primary inline-flex max-w-full cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-transform disabled:opacity-50"
            onClick={isReady ? onSuggestionClick : undefined}
          >
            <User2Icon
              size={12}
              className="transition-transform group-hover:rotate-12"
            />
            <span className="truncate">Ask: {currentSuggestion}</span>
          </Badge>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <Textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            className="placeholder:text-muted-foreground/70 min-h-11 flex-1 touch-manipulation resize-none placeholder:text-xs"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            disabled={!input.trim() || !isReady}
            className="text-primary hover:text-primary shrink-0 transition-transform hover:scale-110 disabled:scale-100 disabled:opacity-30"
            aria-label="Send message"
          >
            <Send size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
