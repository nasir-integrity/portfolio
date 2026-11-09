"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowDownRight, Terminal } from "lucide-react";
import { useLenis } from "lenis/react";
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
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const handleScrollTo = (targetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, {
        duration: 1.2,
        offset: -56,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="act-hero"
      ref={sectionRef}
      className="relative w-full border-b border-obsidian bg-obsidian text-paper pt-14 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] border-x border-hairline-dark grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem)] min-h-0">
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
              <Button
                variant="vermillion"
                size="lg"
                onClick={handleScrollTo("#act-pipeline")}
                asChild
              >
                <a href="#act-pipeline">
                  <span>SCROLL PIPELINE</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outlineDark"
                size="lg"
                onClick={handleScrollTo("#act-simulator")}
                asChild
              >
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
        <div className="lg:col-span-7 relative h-[500px] lg:h-full min-h-0 bg-obsidian flex flex-col justify-between overflow-hidden">
          {/* Top Interactive HUD Tags */}
          <div className="absolute top-6 inset-x-6 z-10 flex items-center justify-between pointer-events-none">
            <div className="hidden sm:flex items-center gap-2 border border-hairline-dark bg-obsidian/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-light backdrop-blur-sm">
              <span className="inline-block h-2 w-2 bg-vermillion animate-pulse" />
              <span>DIGITAL TWIN // SEP-3P-104A</span>
            </div>

            <div className="border border-hairline-dark bg-obsidian/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-light flex items-center gap-2 backdrop-blur-sm ml-auto">
              <span className="h-1.5 w-1.5 bg-vermillion" />
              <span>DRAG TO ORBIT 360°</span>
            </div>
          </div>

          {/* Interactive Floating Component Hotspots */}
          <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-2 font-mono text-[10px] pointer-events-none">
            <span className="border border-hairline-dark/80 bg-obsidian/80 px-2 py-1 text-steel-light">
              F-101 INLET
            </span>
            <span className="border border-hairline-dark/80 bg-obsidian/80 px-2 py-1 text-steel-light">
              ZONE A SHELL
            </span>
            <span className="border border-vermillion/60 bg-obsidian/80 px-2 py-1 text-vermillion">
              EV-01 RELIEF
            </span>
            <span className="border border-hairline-dark/80 bg-obsidian/80 px-2 py-1 text-steel-light">
              N-02 OUTLET
            </span>
          </div>

          <div className="relative w-full h-[500px] lg:h-full flex-1 min-h-0 overflow-hidden">
            <FacilityHeroScene className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
