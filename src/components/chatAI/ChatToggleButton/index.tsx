'use client';

import { X } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export interface ChatToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
}

const ChatToggleButton = ({
  isOpen,
  onToggle,
  label,
}: ChatToggleButtonProps) => {
  return (
    <div className="fixed right-3 bottom-3 z-50 xl:hidden">
      {isOpen ? (
        <button
          onClick={onToggle}
          className="bg-primary-light flex items-center gap-2 rounded-xl px-3 py-2 shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
          aria-label={label}
        >
          <X size={20} />
        </button>
      ) : (
        <button
          onClick={onToggle}
          className="flex items-center justify-center overflow-hidden transition hover:scale-[1.02] active:scale-[0.98]"
          aria-label={label}
        >
          <DotLottieReact
            src="/anima-bot.lottie"
            loop
            autoplay
            className="h-30 w-25"
          />
        </button>
      )}
    </div>
  );
};

export default ChatToggleButton;
