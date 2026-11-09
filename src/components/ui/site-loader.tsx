"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

export function SiteLoader() {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    let mounted = true;

    const interval = window.setInterval(() => {
      setProgress((prev) =>
        prev < 90 ? prev + Math.ceil((94 - prev) * 0.22) : prev
      );
    }, 50);

    const markReady = () => {
      if (!mounted) return;
      window.clearInterval(interval);
      setProgress(100);
      const t = window.setTimeout(() => {
        if (mounted) setIsReady(true);
      }, 140);
      return () => window.clearTimeout(t);
    };

    window.addEventListener("nasir:hero-ready", markReady, { once: true });
    const fallbackTimer = window.setTimeout(markReady, 900);

    return () => {
      mounted = false;
      window.clearInterval(interval);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("nasir:hero-ready", markReady);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isReady && (
        <m.div
          key="site-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Loading NASIR Platform"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-obsidian p-6 sm:p-12 text-paper pointer-events-auto select-none"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-steel-light">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-vermillion animate-pulse" />
              NASIR // SYS.INIT
            </span>
            <span>API 580 • OGMP 2.0</span>
          </div>

          {/* Center Progress HUD */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.16em] mb-3">
              <span className="text-steel-light">CALIBRATING SPATIAL TWIN</span>
              <span className="text-paper font-bold tabular-nums">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
            <div className="h-[2px] w-full bg-hairline-dark overflow-hidden">
              <div
                className="h-full bg-vermillion transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
            <span>DETERMINISTIC RISK ENGINE</span>
            <span>V0.1.0</span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
