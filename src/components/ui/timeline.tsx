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

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
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
    const el = contentRef.current;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setHeight(entry.contentRect.height);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Rail progress animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 85%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  // Active dot highlight while scrolling
  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length === 0) return;

    let rafId: number | null = null;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible in the "center band"
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (!visible) return;

        const nextIndex = Number(
          (visible.target as HTMLElement).getAttribute('data-index') ?? 0
        );

        // Avoid thrashing state updates
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => setActiveIndex(nextIndex));
      },
      {
        // Center band – makes active feel intentional, not jumpy
        root: null,
        rootMargin: '-40% 0px -45% 0px',
        threshold: [0.15, 0.25, 0.4, 0.6, 0.8],
      }
    );

    nodes.forEach((n) => obs.observe(n));

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, [sorted.length]);

  return (
    <div ref={containerRef} className="relative w-full font-sans">
      <div ref={contentRef} className="relative mx-auto max-w-6xl pt-10">
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
              className="relative pb-10 pl-10 md:pl-14"
            >
              <div className="absolute top-2 left-2.5 md:left-4.5">
                <div
                  className={`relative rounded-full transition-all duration-300 ${isActive ? 'h-4 w-4' : 'h-3.5 w-3.5'} `}
                >
                  {/* core dot */}
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-primary opacity-100'
                        : 'bg-primary/40 dark:bg-primary/35 opacity-70'
                    } `}
                  />

                  {/* glow */}
                  <div
                    className={`absolute inset-0 rounded-full blur-sm transition-opacity duration-300 ${
                      isActive
                        ? 'bg-primary opacity-90'
                        : 'bg-primary opacity-10'
                    } `}
                  />

                  {/* active ring */}
                  <div
                    className={`ring-primary/20 absolute inset-0 rounded-full ring-4 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'} `}
                  />
                </div>
              </div>

              {/* Card hover lift on desktop */}
              <div className="rounded-2xl border border-black/5 bg-black/2 p-4 transition-all duration-200 xl:hover:-translate-y-0.5 xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-white/3 dark:xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.40)]">
                {/* Date/title */}
                <h3 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide">
                  {item.title}
                </h3>

                {/* Entry content */}
                <div className="space-y-2">{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
