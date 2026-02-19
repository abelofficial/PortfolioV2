'use client';

import { MessageCircle, X } from 'lucide-react';

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
      <button
        onClick={onToggle}
        className="bg-primary flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
        aria-label={label}
      >
        {isOpen ? (
          <X size={20} />
        ) : (
          <>
            <MessageCircle size={20} />
            <span className="text-sm">{label}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatToggleButton;
