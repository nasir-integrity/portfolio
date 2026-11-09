"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { PIPELINE_STAGES } from "@/data/nasir-content";
import { PipelineStage3DScene } from "@/components/scenes/domain-visual-scenes";
import { ScrambleText } from "@/components/ui/scramble-text";

export function ActPipelineScrollytelling() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
      className="relative w-full border-b border-obsidian bg-paper text-obsidian lg:h-[350vh]"
    >
      <div className="w-full lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between bg-paper overflow-hidden">
        {/* 1. Header Bar */}
        <div className="border-b border-obsidian px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="type-title text-obsidian">
            <ScrambleText text="THE TELEMETRY LIFECYCLE" />
          </h2>
          <div className="type-action text-steel flex items-center gap-3">
            <span className="h-2 w-2 bg-vermillion animate-pulse" />
            <span>STAGE {activeStage.stepNumber} OF 06</span>
          </div>
        </div>

        {/* 2. Main 2-Column Scrollytelling Stage */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left 5 Columns: Narrative Scrollytelling Anchor */}
          <div className="lg:col-span-5 px-6 sm:px-12 lg:px-20 py-10 lg:py-16 border-b lg:border-b-0 lg:border-r border-obsidian flex flex-col justify-between relative bg-paper">
            <div>
              {/* Minimal Scrubber Timeline Track */}
              <div className="relative mb-10 pb-3 border-b border-hairline-light">
                <div className="grid grid-cols-6 gap-1 relative">
                  {PIPELINE_STAGES.map((stage, idx) => {
                    const isActive = idx === activeStageIndex;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setActiveStageIndex(idx)}
                        className={`group relative py-2 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                          isActive
                            ? "text-obsidian font-bold"
                            : "text-steel/50 hover:text-obsidian"
                        }`}
                      >
                        <span className="font-mono text-xs tracking-wider">
                          {stage.stepNumber}
                        </span>
                        {isActive && (
                          <m.div
                            layoutId="pipeline-active-indicator"
                            className="absolute -bottom-3 left-0 right-0 h-[2px] bg-vermillion"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Stage Narrative Hook */}
              <m.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <h3 className="type-title text-obsidian cursor-default">
                  <ScrambleText text={activeStage.title} />
                </h3>

                <div className="text-xs font-mono uppercase tracking-[0.14em] text-steel font-medium">
                  {activeStage.subtitle}
                </div>

                <p className="type-body text-steel pt-2">
                  {activeStage.summary}
                </p>

                {/* Open Telemetry Spec Line (replacing generic box) */}
                <div className="pt-6 mt-8 border-t border-hairline-light flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-[0.14em] text-steel">
                    PHYSICAL GUARANTEE
                  </span>
                  <span className="font-mono text-base font-bold text-obsidian tracking-tight">
                    {activeStage.highlight}
                  </span>
                </div>
              </m.div>
            </div>

            <div className="pt-6 mt-10 border-t border-hairline-light flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-steel">
              <span>CONTINUOUS PIPELINE</span>
              <span className="text-vermillion font-bold">API 580 • OGMP 2.0</span>
            </div>
          </div>

          {/* Right 7 Columns: 3D Transformation Canvas (Full Edge-to-Edge Black Canvas) */}
          <div className="lg:col-span-7 bg-obsidian relative flex items-center justify-center overflow-hidden min-h-[440px] lg:min-h-0">
            <PipelineStage3DScene stepIndex={activeStageIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}
