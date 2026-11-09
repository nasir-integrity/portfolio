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
    setActiveStageIndex(nextIdx);
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
        <div className="border-b border-obsidian px-6 sm:px-12 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-sans text-2xl sm:text-4xl font-bold uppercase tracking-tight text-obsidian">
            6-STAGE TELEMETRY PIPELINE.
          </h2>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-steel flex items-center gap-3">
            <span className="h-2 w-2 bg-vermillion" />
            <span>SCROLL OR CLICK TO STEP THROUGH</span>
          </div>
        </div>

        {/* Main 2-Column Sticky Stage */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left 5 Columns: Vertical Kinetic Step Rail + Concise Active Caption */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-obsidian flex flex-col justify-between relative">
            {/* Vertical Progress Rail */}
            <div className="relative pl-6 space-y-2.5">
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-hairline-light overflow-hidden">
                <m.div
                  style={{
                    scaleY: progressRailScaleY,
                    transformOrigin: "50% 0%",
                  }}
                  className="h-full w-full bg-vermillion"
                />
              </div>

              {PIPELINE_STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStageIndex(idx)}
                    className={`w-full text-left py-2 px-3 transition-colors cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-obsidian text-paper chamfer-sm"
                        : "text-steel hover:text-obsidian hover:bg-paper-muted/60"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive ? "text-vermillion" : "text-steel"
                        }`}
                      >
                        {stage.stepNumber}
                      </span>
                      <span className="font-sans text-sm sm:text-base font-bold uppercase tracking-tight truncate">
                        {stage.title}
                      </span>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 bg-vermillion shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Stage 1-Sentence Hook (Animated on Step Change) */}
            <m.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 pt-6 border-t border-hairline-light"
            >
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-vermillion mb-2">
                {activeStage.code}
              </div>
              <p className="font-sans text-sm sm:text-base text-obsidian leading-relaxed">
                {activeStage.summary}
              </p>
            </m.div>
          </div>

          {/* Right 7 Columns: Large Interactive Visual Plate */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 bg-paper-muted/50 flex items-center justify-center">
            <m.div
              key={activeStage.id}
              initial={{ opacity: 0, scale: 0.97, y: 14 }}
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
