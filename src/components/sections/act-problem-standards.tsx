"use client";

import React, { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { STANDARDS_COMPARISONS } from "@/data/nasir-content";
import { Standards3DScene } from "@/components/scenes/domain-visual-scenes";
import { ScrambleText } from "@/components/ui/scramble-text";

export function ActProblemStandards() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const splitLineScale = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const leftCardY = useTransform(scrollYProgress, [0.1, 0.5], [30, 0]);
  const rightCardY = useTransform(scrollYProgress, [0.18, 0.58], [48, 0]);

  return (
    <section
      id="act-standards"
      ref={sectionRef}
      className="relative w-full border-b border-obsidian bg-paper text-obsidian"
    >
      {/* 1. Header with Full-Bleed Breathing Room */}
      <div className="section-pad border-b border-obsidian flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-4xl">
          <h2 className="type-section-header text-obsidian">
            <ScrambleText text="TRIAGE SCORES ARE NOT CARBON TONNAGE." />
          </h2>
        </div>
        <p className="type-body text-steel">
          Industrial facilities face catastrophic blind spots when mechanical decay
          is conflated with atmospheric emissions. NASIR enforces an absolute
          boundary between structural failure triage and audit-grade mass quantification.
        </p>
      </div>

      {/* 2. Visual Dual-Standard Split with 3D Object Visualizations */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-obsidian">
        {/* Animated Center Accent on Desktop */}
        <m.div
          style={{ scaleY: splitLineScale, transformOrigin: "50% 0%" }}
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-vermillion z-10 pointer-events-none"
        />

        {STANDARDS_COMPARISONS.map((std, idx) => (
          <m.div
            key={std.id}
            style={{ y: idx === 0 ? leftCardY : rightCardY }}
            className="section-pad flex flex-col justify-between bg-paper"
          >
            <div>
              <h3 className="type-title text-obsidian mb-6 cursor-default">
                <ScrambleText text={std.headline} />
              </h3>

              {/* 3D Interactive Spatial Object replacing Data/Formulas */}
              <div className="mb-10">
                <Standards3DScene variant={std.visualType} />
              </div>

              {/* Open Typographic Comparison: Industry Vulnerability vs Physical Law */}
              <div className="pt-6 border-t border-hairline-light space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs tracking-[0.14em] uppercase text-steel">
                    <span className="w-1.5 h-1.5 rounded-full bg-vermillion/70 inline-block" />
                    <span>Conventional Spreadsheet Flaw</span>
                  </div>
                  <p className="type-body text-steel text-sm sm:text-base leading-relaxed pl-3.5 border-l border-obsidian/20">
                    {std.problem}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs tracking-[0.14em] uppercase text-obsidian font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-obsidian inline-block" />
                    <span>NASIR Deterministic Law</span>
                  </div>
                  <p className="type-body text-obsidian text-sm sm:text-base leading-relaxed font-medium pl-3.5 border-l-2 border-obsidian">
                    {std.solution}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-mono text-steel uppercase tracking-[0.14em]">
                  <span>STANDARD REFERENCE</span>
                  <span className="text-vermillion font-bold">{std.tag}</span>
                </div>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
