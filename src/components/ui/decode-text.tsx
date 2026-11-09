"use client";

import React, { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

const GLYPHS = "0123456789ABCDEF//:_[]#+-*";

interface DecodeTextProps {
  text: string;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
  delayMs?: number;
}

export function DecodeText({
  text,
  className,
  as: Component = "span",
  delayMs = 0,
}: DecodeTextProps) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let frameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    const startTime = performance.now() + delayMs;
    const duration = 550;

    const tick = (now: number) => {
      if (now < startTime) {
        frameId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, (now - startTime) / duration);
      const revealedCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, idx) => {
          if (char === " " || idx < revealedCount) return char;
          return GLYPHS[(idx + Math.floor(progress * 24)) % GLYPHS.length];
        })
        .join("");

      setDisplayed(next);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
      }
    };

    timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(tick);
    }, 16);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [text, delayMs]);

  return (
    <m.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className={cn("inline-block font-mono", className)}
    >
      <Component>{displayed}</Component>
    </m.span>
  );
}
