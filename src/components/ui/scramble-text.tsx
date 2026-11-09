"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

const INDUSTRIAL_GLYPHS = "0123456789ABCDEF!<>-_/[]{}—=+*^?#%";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p";
  triggerOnView?: boolean;
  triggerOnHover?: boolean;
  durationMs?: number;
  glitchOnHover?: boolean;
}

export function ScrambleText({
  text,
  className,
  as: Component = "span",
  triggerOnView = true,
  triggerOnHover = true,
  durationMs = 420,
  glitchOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const isAnimatingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (glitchOnHover) setIsGlitching(true);

    const startTime = performance.now();
    const len = text.length;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Number of characters already settled into their real values
      const settledCount = Math.floor(progress * len);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < settledCount) return char;
          const randomChar =
            INDUSTRIAL_GLYPHS[
              Math.floor(Math.random() * INDUSTRIAL_GLYPHS.length)
            ];
          return randomChar;
        })
        .join("");

      setDisplayText(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
        isAnimatingRef.current = false;
        setIsGlitching(false);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [text, durationMs, glitchOnHover]);

  // Handle external text prop changes (e.g. stage switching)
  useEffect(() => {
    startScramble();
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
    <m.span
      onMouseEnter={handleMouseEnter}
      viewport={{ once: true, margin: "-20px" }}
      onViewportEnter={() => {
        if (triggerOnView) startScramble();
      }}
      className={cn(
        "inline-block relative select-none transition-colors",
        isGlitching && "text-shadow-glitch",
        className
      )}
    >
      <Component className="inline font-inherit text-inherit">
        {displayText}
      </Component>
    </m.span>
  );
}
