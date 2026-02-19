'use client';

const TypingDots = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.2s]" />
      <span className="bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.1s]" />
      <span className="bg-primary/70 h-1.5 w-1.5 animate-bounce rounded-full" />
    </div>
  );
};

export default TypingDots;
