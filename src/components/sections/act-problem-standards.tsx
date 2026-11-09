"use client";

import React, { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { STANDARDS_COMPARISONS } from "@/data/nasir-content";
import { Standards3DScene } from "@/components/scenes/domain-visual-scenes";

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
            TRIAGE SCORES ARE NOT CARBON TONNAGE.
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
              <div className="type-action text-vermillion mb-3">
                {std.tag}
              </div>

              <h3 className="type-title text-obsidian mb-6">
                {std.headline}
              </h3>

              {/* 3D Interactive Spatial Object replacing Data/Formulas */}
              <div className="mb-10">
                <Standards3DScene variant={std.visualType} />
              </div>

              {/* Contrast Narrative: Fatal Flaw vs Physical Law */}
              <div className="space-y-4">
                <div className="bg-obsidian/5 p-5 border-l-2 border-vermillion">
                  <div className="type-action text-vermillion mb-1">
                    THE SPREADSHEET FLAW
                  </div>
                  <p className="type-body text-steel text-sm sm:text-base">
                    {std.problem}
                  </p>
                </div>

                <div className="bg-obsidian text-paper p-5">
                  <div className="type-action text-vermillion mb-1">
                    THE NASIR LAW
                  </div>
                  <p className="type-body text-paper/90 text-sm sm:text-base">
                    {std.solution}
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
