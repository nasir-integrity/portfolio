"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowDownRight, Box, GitBranch, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DecodeText } from "@/components/ui/decode-text";
import { HERO_METRICS } from "@/data/nasir-content";

const FacilityHeroScene = dynamic(
  () => import("@/components/scenes/facility-hero-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-obsidian font-mono text-xs uppercase tracking-[0.18em] text-steel-light">
        <span className="inline-block h-2 w-2 bg-vermillion mr-2.5 animate-pulse" />
        INITIALIZING R3F 3-PHASE SEPARATOR DIGITAL TWIN...
      </div>
    ),
  }
);

export function ActHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [vesselRot, setVesselRot] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0.15]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setVesselRot(latest);
  });

  return (
    <section
      id="act-hero"
      ref={sectionRef}
      className="relative min-h-screen w-full border-b border-obsidian bg-obsidian text-paper pt-14 bg-blueprint-dark"
    >
      {/* Top Telemetry Sub-Header Strip */}
      <div className="mx-auto max-w-[1440px] border-x border-b border-hairline-dark px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-light">
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 bg-vermillion" />
          <span>ACT I // DIGITAL TWIN OVERVIEW</span>
          <span className="hidden sm:inline text-hairline-dark">|</span>
          <span className="hidden sm:inline">
            NUSANTARA ASSET INTEGRITY &amp; RISK PLATFORM
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>API 580 + OGMP 2.0</span>
          <span className="text-vermillion">PERTAMUDA SEED &amp; SCALE MVP</span>
        </div>
      </div>

      {/* Main 2-Column Isotherm Hero Grid */}
      <div className="mx-auto max-w-[1440px] border-x border-hairline-dark grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-190px)]">
        {/* Left Column: Editorial Technical Typography */}
        <m.div
          style={{ y: textY, opacity: textOpacity }}
          className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-hairline-dark"
        >
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Badge variant="vermillion">SYS // NASIR-V1.0</Badge>
              <Badge variant="dark">OIL &amp; GAS ASSET INTEGRITY</Badge>
            </div>

            <h1 className="font-mono text-3xl sm:text-5xl xl:text-[54px] font-bold uppercase tracking-tight leading-[1.05] text-paper mb-6">
              <DecodeText text="TRACEABLE ASSET" as="span" />
              <br />
              <span className="text-vermillion">INTEGRITY &amp; CH4</span>
              <br />
              <span>RISK TRIAGE.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-steel-light leading-relaxed max-w-xl mb-8">
              An industrial intelligence platform engineered for aging oil, gas,
              and petrochemical facilities. NASIR connects validated field
              sensor observations with{" "}
              <strong className="text-paper font-medium">
                API 580 risk-based maintenance prioritization
              </strong>{" "}
              and{" "}
              <strong className="text-paper font-medium">
                OGMP 2.0 fugitive methane mass quantification
              </strong>
              —eliminating silent zero-substitution and unverified carbon claims.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Button variant="vermillion" size="lg" asChild>
                <a href="#act-pipeline">
                  <span>EXPLORE 6-STAGE PIPELINE</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outlineDark" size="lg" asChild>
                <a href="#act-simulator">
                  <Terminal className="h-4 w-4 text-vermillion" />
                  <span>LAUNCH RISK SIMULATOR</span>
                </a>
              </Button>
              <Button variant="outlineDark" size="lg" asChild>
                <a
                  href="https://github.com/ZimrionVarethos/pertamuda"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch className="h-4 w-4" />
                  <span>GITHUB SOURCE</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Bottom Spec Callout inside Left Column */}
          <div className="mt-10 pt-6 border-t border-hairline-dark grid grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <div className="text-[10px] text-steel-light uppercase tracking-[0.14em] mb-1">
                CORE ENGINE STACK
              </div>
              <div className="text-paper font-semibold">
                LARAVEL 13 • REACT 19 • THREE.JS
              </div>
            </div>
            <div>
              <div className="text-[10px] text-steel-light uppercase tracking-[0.14em] mb-1">
                CLAIM BOUNDARY POLICY
              </div>
              <div className="text-vermillion font-semibold">
                STRICT NULL-SAFETY (24H WINDOW)
              </div>
            </div>
          </div>
        </m.div>

        {/* Right Column: Interactive 3D R3F Vessel Canvas */}
        <m.div
          style={{ scale: canvasScale }}
          className="lg:col-span-6 relative min-h-[440px] lg:min-h-full bg-obsidian flex flex-col justify-between"
        >
          {/* Floating Top Canvas HUD */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <div className="border border-hairline-dark bg-obsidian-elevated/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper flex items-center gap-2">
              <Box className="h-3.5 w-3.5 text-vermillion" />
              <span>TWIN // 3-PHASE HORIZONTAL SEPARATOR (SEP-3P-104A)</span>
            </div>
            <div className="hidden sm:block border border-vermillion/50 bg-vermillion/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-vermillion">
              DRAG TO ORBIT 360°
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="w-full h-[460px] lg:h-full flex-1">
            <FacilityHeroScene
              className="w-full h-full"
              scrollProgress={vesselRot}
            />
          </div>

          {/* Bottom Canvas Telemetry Readout Strip */}
          <div className="border-t border-hairline-dark bg-obsidian-elevated px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
            <div className="flex items-center gap-2 text-paper">
              <span className="h-2 w-2 bg-vermillion" />
              <span>BEACON 01: OPTICAL CH4 SNIFFER (80 PPM)</span>
            </div>
            <div className="text-steel-light">
              BEACON 02: DIFF PRESSURE TRANSDUCER (7.4 BAR / 8.6 BASELINE)
            </div>
          </div>
        </m.div>
      </div>

      {/* Bottom 4-Metric Rigid Grid */}
      <div className="mx-auto max-w-[1440px] border-x border-t border-hairline-dark grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-hairline-dark bg-obsidian-elevated">
        {HERO_METRICS.map((item) => (
          <div key={item.code} className="p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-steel-light mb-3">
              <span>{item.code}</span>
              <span className="text-vermillion">{item.unit}</span>
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-paper tracking-tight mb-1.5">
              {item.value}
            </div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-paper mb-1">
              {item.label}
            </div>
            <p className="font-sans text-xs text-steel-light leading-relaxed">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
