"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const INDUSTRIAL_GLYPHS = "0123456789ABCDEF!<>-_/[]{}—=+*^?#%";

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
  durationMs = 360,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-8% 0px -8% 0px",
  });
  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  const startScramble = useCallback(() => {
    if (isAnimatingRef.current) return;
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
          if (char === " ") return " ";
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

  // Trigger rapid scramble when element enters viewport
  useEffect(() => {
    if (isInView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      startScramble();
    }
  }, [isInView, startScramble]);

  // Handle external text prop changes (e.g. pipeline stage switching)
  useEffect(() => {
    if (hasTriggeredRef.current) {
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

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "inline-block select-none font-inherit text-inherit",
        className
      )}
    >
      <Component className="inline font-inherit text-inherit">
        {displayText}
      </Component>
    </span>
  );
}
