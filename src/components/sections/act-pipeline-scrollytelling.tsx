"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { PIPELINE_STAGES } from "@/data/nasir-content";
import { PipelineVisualPlate } from "./pipeline-visual-plates";

export function ActPipelineScrollytelling() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressRailScaleY = useTransform(scrollYProgress, [0, 1], [0.16, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const count = PIPELINE_STAGES.length;
    const nextIdx = Math.min(
      count - 1,
      Math.max(0, Math.floor(latest * count))
    );
    setActiveStageIndex((prev) => (prev !== nextIdx ? nextIdx : prev));
  });

  const activeStage = PIPELINE_STAGES[activeStageIndex];

  return (
    <section
      id="act-pipeline"
      ref={containerRef}
      className="relative w-full border-b border-obsidian bg-paper text-obsidian lg:h-[340vh]"
    >
      <div className="mx-auto max-w-[1440px] border-x border-obsidian lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] flex flex-col justify-between bg-paper overflow-hidden">
        {/* Compact Top Bar */}
        <div className="border-b border-obsidian px-6 sm:px-12 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-vermillion font-bold mb-1">
              OPERATIONAL LIFECYCLE // 6 PHASES
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-obsidian">
              THE TELEMETRY PIPELINE.
            </h2>
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-steel flex items-center gap-2.5">
            <span className="h-2 w-2 bg-vermillion animate-pulse" />
            <span>SCROLL OR TAP PHASES TO ADVANCE</span>
          </div>
        </div>

        {/* Main 2-Column Sticky Stage */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left 5 Columns: Narrative Scrollytelling Anchor */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-obsidian flex flex-col justify-between relative bg-paper">
            {/* Step Navigation Pill Strip */}
            <div>
              <div className="grid grid-cols-6 gap-1 mb-8">
                {PIPELINE_STAGES.map((stage, idx) => {
                  const isActive = idx === activeStageIndex;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStageIndex(idx)}
                      className={`h-9 flex flex-col items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-obsidian text-vermillion border-b-2 border-vermillion"
                          : "bg-paper-muted text-steel hover:text-obsidian hover:bg-paper-muted/80"
                      }`}
                    >
                      <span>{stage.stepNumber}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Editorial Hook */}
              <m.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-vermillion">
                  {activeStage.code}
                </div>

                <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-obsidian leading-[1.05]">
                  {activeStage.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">
                  {activeStage.subtitle}
                </p>

                <div className="bg-obsidian text-paper p-4 text-xs sm:text-sm font-sans leading-relaxed border-l-2 border-vermillion mt-6">
                  {activeStage.summary}
                </div>
              </m.div>
            </div>

            {/* Bottom Scrollytelling Progress Footnote */}
            <div className="pt-6 mt-8 border-t border-hairline-light flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
              <span>PHASE {activeStage.stepNumber} OF 06</span>
              <span className="text-vermillion">DETERMINISTIC PIPELINE</span>
            </div>
          </div>

          {/* Right 7 Columns: Command Console Visual Plate */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 bg-paper-muted/40 flex items-center justify-center">
            <m.div
              key={activeStage.id}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl"
            >
              <PipelineVisualPlate stage={activeStage} isActive={true} />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
