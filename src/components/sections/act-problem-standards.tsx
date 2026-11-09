"use client";

import React, { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { STANDARDS_COMPARISONS } from "@/data/nasir-content";

export function ActProblemStandards() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const splitLineScale = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const leftCardY = useTransform(scrollYProgress, [0.1, 0.5], [36, 0]);
  const rightCardY = useTransform(scrollYProgress, [0.18, 0.58], [56, 0]);

  return (
    <section
      id="act-standards"
      ref={sectionRef}
      className="relative w-full border-b border-obsidian bg-paper text-obsidian"
    >
      <div className="mx-auto max-w-[1440px] border-x border-obsidian">
        {/* Concise Header */}
        <div className="border-b border-obsidian px-6 sm:px-12 py-12 lg:py-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="font-sans text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.02] text-obsidian max-w-2xl">
            TRIAGE SCORES ARE NOT CARBON TONNAGE.
          </h2>
          <p className="font-sans text-sm sm:text-base text-steel max-w-md leading-relaxed">
            NASIR strictly separates{" "}
            <strong className="text-obsidian font-semibold">
              API 580 maintenance triage
            </strong>{" "}
            from{" "}
            <strong className="text-obsidian font-semibold">
              OGMP 2.0 fugitive methane mass
            </strong>
            .
          </p>
        </div>

        {/* Visual Dual-Standard Split */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-obsidian">
          {/* Animated Center Divider Accent on Desktop */}
          <m.div
            style={{ scaleY: splitLineScale, transformOrigin: "50% 0%" }}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-vermillion z-10 pointer-events-none"
          />

          {STANDARDS_COMPARISONS.map((std, idx) => (
            <m.div
              key={std.id}
              style={{ y: idx === 0 ? leftCardY : rightCardY }}
              className="p-6 sm:p-12 lg:p-16 flex flex-col justify-between bg-paper"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-vermillion font-bold mb-4">
                  <span>{std.code}</span>
                  <span className="text-steel">{std.metrics[3].value}</span>
                </div>

                <h3 className="font-sans text-2xl sm:text-3xl font-bold uppercase tracking-tight text-obsidian mb-3">
                  {std.standardTitle}
                </h3>

                <p className="font-sans text-sm text-steel leading-relaxed mb-8 max-w-lg">
                  {std.nasirDeterministicProtocol}
                </p>

                {/* Visual Proportional Bar / Formula Plate */}
                {idx === 0 ? (
                  <div className="mb-8 space-y-2.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-obsidian font-bold">
                      <span>WEIGHTED COMPOSITE VECTOR</span>
                      <span className="text-vermillion">0–100 INDEX</span>
                    </div>
                    <div className="h-9 w-full flex gap-1">
                      <div className="w-[35%] bg-obsidian text-paper flex items-center justify-between px-3">
                        <span>CORROSION</span>
                        <span className="text-vermillion font-bold">35%</span>
                      </div>
                      <div className="w-[40%] bg-vermillion text-paper flex items-center justify-between px-3 font-bold">
                        <span>LEAK DELTA</span>
                        <span>40%</span>
                      </div>
                      <div className="w-[25%] bg-paper-muted text-obsidian border border-obsidian flex items-center justify-between px-2.5">
                        <span>PPM</span>
                        <span className="font-bold">25%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 space-y-2.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-obsidian font-bold">
                      <span>NON-OVERLAPPING MASS INTEGRATION</span>
                      <span className="text-vermillion">KG CH4 / HOUR</span>
                    </div>
                    <div className="h-9 w-full flex items-center gap-1">
                      <div className="flex-1 h-full bg-obsidian text-paper flex items-center justify-between px-3">
                        <span>VALID INTERVAL [T0 → T1]</span>
                        <span className="text-vermillion font-bold">INTEGRATED</span>
                      </div>
                      <div className="w-36 h-full border border-vermillion bg-vermillion/10 text-vermillion flex items-center justify-center px-2 font-bold">
                        OVERLAP SKIPPED
                      </div>
                    </div>
                  </div>
                )}

                {/* Formula Pill */}
                <div className="bg-obsidian text-paper px-4 py-3.5 font-mono text-xs chamfer-tr">
                  <span className="text-vermillion mr-2">$</span>
                  {std.formulaOrConstraint}
                </div>
              </div>

              {/* Minimal 2-Stat Footer */}
              <div className="grid grid-cols-2 gap-6 pt-8 mt-8 border-t border-hairline-light font-mono">
                {std.metrics.slice(0, 2).map((mItem) => (
                  <div key={mItem.label}>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-steel">
                      {mItem.label}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-obsidian mt-1">
                      {mItem.value}
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
