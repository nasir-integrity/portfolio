"use client";

import React, { useState } from "react";
import * as m from "motion/react-m";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { PIPELINE_STAGES } from "@/data/nasir-content";
import { PipelineVisualPlate } from "./pipeline-visual-plates";

export function ActPipelineScrollytelling() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = PIPELINE_STAGES[activeStageIndex];

  const handlePrev = () => {
    setActiveStageIndex((prev) =>
      prev > 0 ? prev - 1 : PIPELINE_STAGES.length - 1
    );
  };

  const handleNext = () => {
    setActiveStageIndex((prev) =>
      prev < PIPELINE_STAGES.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <section
      id="act-pipeline"
      className="relative w-full border-b border-obsidian bg-paper text-obsidian"
    >
      <div className="mx-auto max-w-[1440px] border-x border-obsidian">
        {/* Top Section Header */}
        <div className="border-b border-obsidian px-6 sm:px-10 py-10 lg:py-14">
          <div className="max-w-3xl">
            <h2 className="font-sans text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.05] text-obsidian">
              FROM FIELD SENSOR INGESTION TO AUDITABLE REGULATORY DOSSIERS.
            </h2>
            <p className="mt-4 font-sans text-sm sm:text-base text-steel leading-relaxed">
              Deterministic 6-stage operational pipeline transforming raw field
              sensor telemetry into immutable, audit-grade compliance records.
            </p>
          </div>
        </div>

        {/* In-Flow 6-Stage Navigation Bar (Static, replaces sticky top-14 bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-obsidian divide-x divide-y sm:divide-y-0 divide-obsidian bg-paper">
          {PIPELINE_STAGES.map((stage, idx) => {
            const active = idx === activeStageIndex;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`px-4 py-3.5 text-left font-mono text-[11px] uppercase tracking-[0.12em] transition-colors cursor-pointer flex items-center justify-between ${
                  active
                    ? "bg-obsidian text-paper font-bold"
                    : "text-steel hover:bg-paper-muted hover:text-obsidian"
                }`}
              >
                <span className="truncate">
                  <span className="text-vermillion mr-1.5 font-bold">
                    {stage.stepNumber}
                  </span>
                  <span>{stage.title.split(" ")[0]}</span>
                </span>
                {active && (
                  <span className="h-1.5 w-1.5 bg-vermillion shrink-0 ml-1.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* 2-Column Single-Viewport Stage Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          {/* Left Column: Narrative & Engineering Specifications */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-obsidian flex flex-col justify-between bg-paper">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-vermillion">
                  <Layers className="h-3.5 w-3.5" />
                  <span>STAGE {activeStage.stepNumber} // 06</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                  {activeStage.code.split("//")[1]?.trim() || activeStage.code}
                </span>
              </div>

              <h3 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-tight text-obsidian mb-2">
                {activeStage.title}
              </h3>

              <p className="font-mono text-xs text-vermillion font-semibold mb-4">
                {activeStage.subtitle}
              </p>

              <p className="font-sans text-sm text-steel leading-relaxed mb-6">
                {activeStage.summary}
              </p>

              {/* Core Operational Specs (distilled list) */}
              <div className="space-y-2.5 border-t border-hairline-light pt-5">
                {activeStage.technicalDetails.map((detail) => (
                  <div
                    key={detail}
                    className="flex items-start gap-2.5 font-sans text-xs text-obsidian leading-relaxed"
                  >
                    <span className="mt-1 h-1.5 w-1.5 bg-vermillion shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Quick Switcher Prev/Next Controls */}
            <div className="mt-8 pt-4 border-t border-hairline-light flex items-center justify-between font-mono text-xs">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 text-steel hover:text-vermillion transition-colors cursor-pointer uppercase tracking-[0.12em]"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>PREV STAGE</span>
              </button>
              <span className="text-steel font-semibold">
                {activeStage.stepNumber} / 06
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 text-steel hover:text-vermillion transition-colors cursor-pointer uppercase tracking-[0.12em]"
              >
                <span>NEXT STAGE</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Active Interactive Saturation Plate */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-paper-muted/60 flex items-center justify-center">
            <m.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <PipelineVisualPlate stage={activeStage} isActive={true} />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
