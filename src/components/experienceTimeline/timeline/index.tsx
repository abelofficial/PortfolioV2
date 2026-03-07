'use client';

import { useScroll, useTransform, motion } from 'motion/react';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TimelineEntry } from '@/types';
import { cn } from '@/lib/utils';

const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => a.order - b.order);
  }, [data]);

  // Measure full timeline height for the rail container
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const measure = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    };

    measure();

    const ro = new ResizeObserver(() => {
      measure();
    });

    ro.observe(contentRef.current);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [sorted.length]);

  // Rail progress animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  // Active dot highlight while scrolling - with debouncing to prevent flickering
  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length === 0) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let pendingIndex: number | null = null;

    const updateActiveIndex = (index: number) => {
      if (pendingIndex === index) return;
      pendingIndex = index;

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setActiveIndex(index);
        pendingIndex = null;
      }, 100);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        // Find the most visible entry
        let bestEntry: IntersectionObserverEntry | undefined;
        let bestRatio = 0;

        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        }

        if (bestEntry) {
          const nextIndex = Number(
            (bestEntry.target as HTMLElement).getAttribute('data-index') ?? 0
          );
          updateActiveIndex(nextIndex);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    nodes.forEach((n) => obs.observe(n));

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      obs.disconnect();
    };
  }, [sorted.length]);

  return (
    <div ref={containerRef} className="relative w-full font-sans">
      <div ref={contentRef} className="relative mx-auto max-w-6xl pt-6">
        {/* Rail (base + animated fill) */}
        <div
          style={{ height: `${height}px` }}
          className="pointer-events-none absolute top-0 left-4 w-0.5 overflow-hidden rounded-full bg-black/10 md:left-6 dark:bg-white/10"
        >
          <motion.div
            style={{ height: heightTransform }}
            className="from-primary/90 via-primary/50 absolute inset-x-0 top-0 w-0.5 rounded-full bg-linear-to-b to-transparent shadow-[0_0_14px_rgba(255,115,0,0.35)]"
          />
        </div>

        {sorted.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              data-index={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative pb-6 pl-10 md:pl-14"
            >
              <div className="absolute top-2 left-2.5 md:left-4.5">
                <div
                  className={cn(
                    'relative rounded-full transition-transform duration-500 ease-out',
                    isActive ? 'h-4 w-4' : 'h-3.5 w-3.5'
                  )}
                >
                  {/* core dot */}
                  <div
                    className={cn(
                      'absolute inset-0 rounded-full transition-transform duration-500 ease-out',
                      isActive
                        ? 'bg-primary opacity-100'
                        : 'bg-primary/40 dark:bg-primary/35 opacity-70'
                    )}
                  />

                  {/* glow */}
                  <div
                    className={cn(
                      'bg-primary absolute inset-0 rounded-full blur-sm transition-opacity duration-500 ease-out',
                      isActive ? 'opacity-90' : 'opacity-10'
                    )}
                  />

                  {/* active ring */}
                  <div
                    className={cn(
                      'ring-primary/20 absolute inset-0 rounded-full ring-4 transition-opacity duration-500 ease-out',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </div>
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-black/5 bg-black/2 p-4 transition-transform duration-200 dark:border-white/10 dark:bg-white/3">
                {/* Date */}
                <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide">
                  {item.title}
                </p>

                {/* Entry content */}
                <div>{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
