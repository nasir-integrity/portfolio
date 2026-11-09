"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { PIPELINE_STAGES } from "@/data/nasir-content";
import { PipelineStage3DScene } from "@/components/scenes/domain-visual-scenes";

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
            THE TELEMETRY LIFECYCLE
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
              {/* Step Navigation Pill Strip */}
              <div className="grid grid-cols-6 gap-2 mb-10">
                {PIPELINE_STAGES.map((stage, idx) => {
                  const isActive = idx === activeStageIndex;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStageIndex(idx)}
                      className={`h-10 flex flex-col items-center justify-center font-mono text-sm font-bold transition-all cursor-pointer ${
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

              {/* Active Stage Narrative Hook */}
              <m.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div className="type-action text-vermillion">
                  {activeStage.subtitle}
                </div>

                <h3 className="type-title text-obsidian">
                  {activeStage.title}
                </h3>

                <p className="type-body text-steel">
                  {activeStage.summary}
                </p>

                <div className="bg-obsidian text-paper p-5 border-l-2 border-vermillion mt-8">
                  <div className="type-action text-vermillion mb-1">
                    PHYSICAL GUARANTEE
                  </div>
                  <div className="font-mono text-sm font-bold text-paper">
                    {activeStage.highlight}
                  </div>
                </div>
              </m.div>
            </div>

            <div className="pt-6 mt-10 border-t border-hairline-light flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-steel">
              <span>CONTINUOUS PIPELINE</span>
              <span className="text-vermillion">API 580 • OGMP 2.0</span>
            </div>
          </div>

          {/* Right 7 Columns: 3D Transformation Canvas */}
          <div className="lg:col-span-7 px-6 sm:px-12 lg:px-20 py-10 lg:py-16 bg-paper-muted/30 flex items-center justify-center">
            <m.div
              key={activeStage.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl"
            >
              <PipelineStage3DScene stepIndex={activeStageIndex} />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
