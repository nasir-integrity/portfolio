"use client";

import React from "react";
import * as m from "motion/react-m";
import { AlertTriangle, CheckCircle2, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChamferCard } from "@/components/ui/chamfer-card";
import { STANDARDS_COMPARISONS } from "@/data/nasir-content";

export function ActProblemStandards() {
  return (
    <section
      id="act-standards"
      className="relative w-full border-b border-obsidian bg-paper text-obsidian bg-blueprint-light"
    >
      <div className="mx-auto max-w-[1440px] border-x border-obsidian">
        {/* Section Header Strip */}
        <div className="border-b border-obsidian px-6 sm:px-10 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="vermillion">ACT II // PROBLEM &amp; STANDARDS</Badge>
              <Badge variant="light">SCIENTIFIC RIGOR</Badge>
            </div>
            <h2 className="font-mono text-2xl sm:text-4xl font-bold uppercase tracking-tight leading-[1.1]">
              WHY LEGACY SPREADSHEETS FAIL AGING OIL &amp; GAS INFRASTRUCTURE.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">
              Aging pipelines, pressure vessels, and storage tanks suffer from
              fragmented manual inspection logs. NASIR enforces a strict
              architectural separation between{" "}
              <strong className="text-obsidian font-semibold">
                operational risk triage (0–100)
              </strong>{" "}
              and{" "}
              <strong className="text-obsidian font-semibold">
                regulatory carbon mass accounting (kg CH4)
              </strong>
              .
            </p>
          </div>
        </div>

        {/* 2-Column Standards Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-obsidian">
          {STANDARDS_COMPARISONS.map((std, idx) => (
            <m.div
              key={std.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-obsidian pb-3 mb-6 font-mono text-xs uppercase tracking-[0.16em]">
                  <span className="font-semibold text-vermillion">
                    {std.code}
                  </span>
                  <span className="text-steel">{std.frameworkFocus}</span>
                </div>

                <h3 className="font-mono text-xl sm:text-2xl font-bold uppercase tracking-tight mb-6">
                  {std.standardTitle}
                </h3>

                {/* Legacy Failure Box */}
                <div className="mb-5 border border-obsidian bg-paper-muted p-4">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-steel mb-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-vermillion" />
                    <span>LEGACY FAILURE MODE</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-steel leading-relaxed">
                    {std.legacyFailureMode}
                  </p>
                </div>

                {/* NASIR Deterministic Protocol Box */}
                <ChamferCard
                  theme="light"
                  cut="tr"
                  className="mb-6 bg-paper p-5"
                  accentCorner
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-obsidian mb-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-vermillion" />
                    <span>NASIR DETERMINISTIC PROTOCOL</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-obsidian leading-relaxed mb-4">
                    {std.nasirDeterministicProtocol}
                  </p>
                  <div className="border border-obsidian bg-obsidian text-paper px-3.5 py-2.5 font-mono text-xs overflow-x-auto">
                    <span className="text-vermillion mr-2">$</span>
                    {std.formulaOrConstraint}
                  </div>
                </ChamferCard>
              </div>

              {/* 4-Cell Spec Sub-Grid */}
              <div className="grid grid-cols-2 gap-px bg-obsidian border border-obsidian">
                {std.metrics.map((mItem) => (
                  <div key={mItem.label} className="bg-paper p-3.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel mb-1">
                      {mItem.label}
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-obsidian">
                      {mItem.value}
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          ))}
        </div>

        {/* Scientific Claim Boundary Banner */}
        <div className="border-t border-obsidian bg-obsidian text-paper px-6 sm:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-vermillion text-paper chamfer-sm">
              <Scale className="h-4 w-4" />
            </span>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-vermillion">
                METHODOLOGY INTEGRITY RULE // ZERO-SUBSTITUTION PROHIBITED
              </div>
              <p className="font-sans text-xs sm:text-sm text-steel-light mt-0.5">
                Risk triage scores (0–100) prioritize physical maintenance and
                can never be claimed as carbon credits. Ambient methane ppm
                readings never generate mass tonnage without a validated{" "}
                <code className="font-mono text-paper">kg/h</code> flow rate and
                measured interval.
              </p>
            </div>
          </div>
          <a
            href="#act-simulator"
            className="shrink-0 border border-vermillion bg-vermillion/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-vermillion hover:bg-vermillion hover:text-paper"
          >
            TEST LIVE FORMULAS →
          </a>
        </div>
      </div>
    </section>
  );
}
