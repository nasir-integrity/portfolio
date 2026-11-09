"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowDownRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DecodeText } from "@/components/ui/decode-text";

const FacilityHeroScene = dynamic(
  () => import("@/components/scenes/facility-hero-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-obsidian font-mono text-xs uppercase tracking-[0.18em] text-steel-light">
        <span className="inline-block h-2 w-2 bg-vermillion mr-2.5 animate-pulse" />
        LOADING 3D DIGITAL TWIN...
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

  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setVesselRot(latest);
  });

  return (
    <section
      id="act-hero"
      ref={sectionRef}
      className="relative min-h-screen w-full border-b border-obsidian bg-obsidian text-paper pt-14 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] border-x border-hairline-dark grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-3.5rem)]">
        {/* Left 5 Columns: Minimalist Kinetic Hook */}
        <m.div
          style={{ y: textY, opacity: textOpacity }}
          className="lg:col-span-5 p-6 sm:p-12 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-hairline-dark z-10"
        >
          <div className="my-auto py-8">
            <h1 className="font-sans text-4xl sm:text-6xl xl:text-[68px] font-bold uppercase tracking-tight leading-[0.98] text-paper mb-6">
              <DecodeText text="TRACEABLE" as="span" />
              <br />
              <span className="text-vermillion">INTEGRITY</span>
              <br />
              <span>&amp; CH4 RISK.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-steel-light leading-relaxed max-w-md mb-9">
              API 580 mechanical risk triage and OGMP 2.0 methane mass
              quantification—bound to a live 3D digital twin.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <Button variant="vermillion" size="lg" asChild>
                <a href="#act-pipeline">
                  <span>SCROLL PIPELINE</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outlineDark" size="lg" asChild>
                <a href="#act-simulator">
                  <Terminal className="h-4 w-4 text-vermillion" />
                  <span>LIVE SIMULATOR</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-hairline-dark flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-steel-light">
            <span>SEP-3P-104A // 3-PHASE SEPARATOR</span>
            <span className="text-vermillion">API 580 • OGMP 2.0</span>
          </div>
        </m.div>

        {/* Right 7 Columns: Dominant Interactive 3D Vessel Stage */}
        <m.div
          style={{ scale: canvasScale }}
          className="lg:col-span-7 relative min-h-[480px] lg:min-h-full bg-obsidian flex flex-col justify-between"
        >
          {/* Minimal Floating Orbit Cue */}
          <div className="absolute top-6 right-6 z-10 pointer-events-none">
            <div className="border border-hairline-dark bg-obsidian/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-light flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-vermillion" />
              <span>DRAG TO ORBIT 360°</span>
            </div>
          </div>

          <div className="w-full h-[500px] lg:h-full flex-1">
            <FacilityHeroScene
              className="w-full h-full"
              scrollProgress={vesselRot}
            />
          </div>
        </m.div>
      </div>
    </section>
  );
}
