'use client';
import { useScroll, useTransform, motion } from 'motion/react';
import React, { useLayoutEffect, useRef, useState } from 'react';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 80%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  return (
    <div
      className="timeline relative w-full font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative mx-auto max-w-7xl pt-10">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pb-5">
            <div className="z-40 px-6 py-2">
              <div className="bg-primary-light h-4 w-4 rounded-full" />
            </div>

            <div className="relative w-full pr-4">
              <h3 className="text-md mb-4 block text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div className="z-40 px-3">
          <p className="text-primary text-sm">Start</p>
        </div>
        <div
          style={{ height: height + 'px' }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-neutral-200 md:left-8 dark:bg-neutral-700"
        >
          <motion.div
            style={{ height: heightTransform }}
            className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-linear-to-t from-[oklch(0.35_0.15_45)] from-10% via-[oklch(0.7_0.2_45)] via-90% to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
