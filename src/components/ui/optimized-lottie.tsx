'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import type { DotLottieReact as DotLottieReactType } from '@lottiefiles/dotlottie-react';
import type { ComponentProps } from 'react';

type DotLottieProps = ComponentProps<typeof DotLottieReactType>;

// Lazy load the DotLottie component
const DotLottieReact = dynamic(
  () =>
    import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => null,
  }
);

// Hook for reduced motion preference using useSyncExternalStore
const getReducedMotionSnapshot = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getReducedMotionServerSnapshot = () => false;

const subscribeToReducedMotion = (callback: () => void) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};

const useReducedMotion = () => {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
};

export interface OptimizedLottieProps extends Omit<
  DotLottieProps,
  'autoplay' | 'loop'
> {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
}

const OptimizedLottie = ({
  src,
  className,
  loop = true,
  autoplay = true,
  playOnHover = false,
  ...props
}: OptimizedLottieProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(autoplay && !playOnHover);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    // Use Intersection Observer to only load/play when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!playOnHover) {
          setShouldPlay(entry.isIntersecting && autoplay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [autoplay, playOnHover, reducedMotion]);

  const handleMouseEnter = () => {
    if (playOnHover && isVisible) {
      setShouldPlay(true);
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover) {
      setShouldPlay(false);
    }
  };

  // Return placeholder for users who prefer reduced motion
  if (reducedMotion) {
    return <div ref={containerRef} className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVisible && (
        <DotLottieReact
          src={src}
          loop={loop}
          autoplay={shouldPlay}
          renderConfig={{
            autoResize: true,
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedLottie;
