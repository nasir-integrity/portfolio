"use client";

import React, { useState } from "react";
import * as m from "motion/react-m";
import { Check, FileCode2, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PIPELINE_STAGES } from "@/data/nasir-content";
import { PipelineVisualPlate } from "./pipeline-visual-plates";

export function ActPipelineScrollytelling() {
  const [activeStageId, setActiveStageId] = useState<string>(
    PIPELINE_STAGES[0].id
  );

  return (
    <section
      id="act-pipeline"
      className="relative w-full border-b border-obsidian bg-paper text-obsidian bg-blueprint-light"
    >
      <div className="mx-auto max-w-[1440px] border-x border-obsidian">
        {/* Top Section Header */}
        <div className="border-b border-obsidian px-6 sm:px-10 py-10 lg:py-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="vermillion">ACT III // 6-STAGE OPERATIONAL PIPELINE</Badge>
              <Badge variant="light">ISOTHERM 2-COLUMN ARCHITECTURE</Badge>
            </div>
            <h2 className="font-mono text-2xl sm:text-4xl font-bold uppercase tracking-tight leading-[1.08]">
              FROM FIELD SENSOR INGESTION TO AUDITABLE REGULATORY DOSSIERS.
            </h2>
          </div>

          <div className="font-mono text-xs text-steel border border-obsidian bg-paper-muted px-4 py-3 chamfer-sm shrink-0">
            <div className="text-[10px] uppercase tracking-[0.14em] text-vermillion font-bold">
              INTERACTIVE SATURATION PLATES
            </div>
            <div className="mt-0.5">
              Scroll or hover plates to engage full-color telemetry readouts
            </div>
          </div>
        </div>

        {/* Sticky Stage Progress Selector Bar */}
        <div className="sticky top-14 z-30 border-b border-obsidian bg-paper/95 backdrop-blur-md grid grid-cols-3 sm:grid-cols-6 divide-x divide-obsidian">
          {PIPELINE_STAGES.map((stage) => {
            const active = stage.id === activeStageId;
            return (
              <a
                key={stage.id}
                href={`#${stage.id}`}
                onClick={() => setActiveStageId(stage.id)}
                className={`px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] flex items-center justify-between transition-colors ${
                  active
                    ? "bg-obsidian text-paper font-bold"
                    : "text-steel hover:bg-paper-muted hover:text-obsidian"
                }`}
              >
                <span className="truncate">
                  <span className="text-vermillion mr-1.5">
                    {stage.stepNumber}
                  </span>
                  <span className="hidden md:inline">
                    {stage.title.split(" ")[0]}
                  </span>
                </span>
                {active && <span className="h-1.5 w-1.5 bg-vermillion shrink-0" />}
              </a>
            );
          })}
        </div>

        {/* 6 Scrollytelling 2-Column Rows (Isotherm Reference: Left Text, Right Interactive Saturation Plate) */}
        <div className="divide-y divide-obsidian">
          {PIPELINE_STAGES.map((stage) => {
            const isActive = activeStageId === stage.id;
            return (
              <m.article
                key={stage.id}
                id={stage.id}
                onViewportEnter={() => setActiveStageId(stage.id)}
                viewport={{ amount: 0.45 }}
                className="grid grid-cols-1 lg:grid-cols-12 scroll-mt-28"
              >
                {/* Left Column: Narrative & Engineering Specifications */}
                <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-obsidian flex flex-col justify-between bg-paper">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-vermillion">
                        <Layers className="h-3.5 w-3.5" />
                        <span>STEP {stage.stepNumber} / 06</span>
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel border border-obsidian px-2 py-0.5">
                        {stage.code}
                      </span>
                    </div>

                    <h3 className="font-mono text-xl sm:text-2xl font-bold uppercase tracking-tight text-obsidian mb-2">
                      {stage.title}
                    </h3>

                    <p className="font-mono text-xs text-vermillion font-semibold mb-4">
                      {stage.subtitle}
                    </p>

                    <p className="font-sans text-sm text-steel leading-relaxed mb-6">
                      {stage.summary}
                    </p>

                    {/* Technical Implementation Bullets */}
                    <div className="space-y-2.5 border-t border-hairline-light pt-5">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-obsidian mb-2">
                        DETERMINISTIC IMPLEMENTATION SPECS
                      </div>
                      {stage.technicalDetails.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start gap-2.5 font-sans text-xs text-obsidian leading-relaxed"
                        >
                          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center bg-obsidian text-paper">
                            <Check className="h-2.5 w-2.5 text-vermillion" />
                          </span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Source Code Provenance Pill */}
                  <div className="mt-8 pt-4 border-t border-hairline-light flex items-center justify-between font-mono text-[11px] text-steel">
                    <span className="flex items-center gap-1.5">
                      <FileCode2 className="h-3.5 w-3.5 text-vermillion" />
                      <span>SOURCE ARTIFACT:</span>
                    </span>
                    <code className="text-obsidian font-semibold">
                      {stage.sourceModulePath}
                    </code>
                  </div>
                </div>

                {/* Right Column: Interactive Visual Plate with Saturation Shift */}
                <div
                  onMouseEnter={() => setActiveStageId(stage.id)}
                  className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-paper-muted/60 flex items-center justify-center"
                >
                  <m.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.45 }}
                    className="w-full"
                  >
                    <PipelineVisualPlate
                      stage={stage}
                      isActive={isActive}
                    />
                  </m.div>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
