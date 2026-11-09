"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

// Non-breaking industrial code glyphs (no hyphens, slashes, or soft-wrap break triggers)
const INDUSTRIAL_GLYPHS = "0123456789ABCDEF!#%&*+<>_~^";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p";
  triggerOnHover?: boolean;
  durationMs?: number;
}

export function ScrambleText({
  text,
  className,
  as: Component = "span",
  triggerOnHover = true,
  durationMs = 340,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });
  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const wasInViewRef = useRef(false);

  const startScramble = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    isAnimatingRef.current = true;

    const startTime = performance.now();
    const len = text.length;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Characters settled into real values from left to right
      const settledCount = Math.floor(progress * len);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " " || char === "\n") return char;
          if (i < settledCount) return char;
          return INDUSTRIAL_GLYPHS[
            Math.floor(Math.random() * INDUSTRIAL_GLYPHS.length)
          ];
        })
        .join("");

      setDisplayText(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [text, durationMs]);

  // Trigger on viewport enter every time user scrolls past it (down or up)
  useEffect(() => {
    if (isInView && !wasInViewRef.current) {
      wasInViewRef.current = true;
      startScramble();
    } else if (!isInView) {
      wasInViewRef.current = false;
    }
  }, [isInView, startScramble]);

  // Handle external text prop changes (e.g. pipeline stage switching)
  useEffect(() => {
    if (wasInViewRef.current) {
      startScramble();
    } else {
      setDisplayText(text);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, startScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  const lines = displayText.split("\n");

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={cn("inline select-none font-inherit text-inherit", className)}
    >
      <Component className="inline font-inherit text-inherit">
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Component>
    </span>
  );
}
