"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
      <div className="w-full font-sans md:px-10" ref={containerRef}>
        <div ref={ref} className="relative max-w-7xl mx-auto pt-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pb-20"
          >
            <div className="px-6 z-40 py-2">
              <div className="h-4 w-4 rounded-full bg-primary-light" />
            </div>

            <div className="relative pr-4 w-full">
              <h3 className="block text-md mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
            style={{ height: height + "px" }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-neutral-200 dark:bg-neutral-700"
        >
          <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[oklch(0.35_0.15_45)] via-[oklch(0.7_0.2_45)] to-transparent from-[0%] via-[30%]"
          />
        </div>
      </div>
    </div>
  );
};
