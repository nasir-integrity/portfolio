"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
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
        INITIALIZING SPATIAL TWIN...
      </div>
    ),
  }
);

export function ActHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  // Track scroll position to gently scale down and dim hero as curtain slides over it
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0.35]);
  const textY = useTransform(scrollY, [0, 600], [0, -60]);

  const handleScrollToPipeline = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#act-standards", {
        duration: 1.2,
        offset: 0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document
        .querySelector("#act-standards")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="act-hero"
      ref={sectionRef}
      className="sticky top-0 h-screen w-full z-0 overflow-hidden flex items-center bg-obsidian text-paper"
    >
      <m.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative w-full h-full flex items-center"
      >
        {/* 1. Fullscreen 3D Background Stage */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <FacilityHeroScene className="w-full h-full" />
        </div>

        {/* 2. Semi-Transparent Dimming Layer for Legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-obsidian/75 pointer-events-none"
        />

        {/* 3. Elevated Full-Width Typography & Action Layer */}
        <m.div
          style={{ y: textY }}
          className="relative z-20 w-full max-w-7xl px-6 sm:px-12 lg:px-20 py-20 pointer-events-auto"
        >
          <h1 className="type-section-header text-paper mb-8">
            <DecodeText text="TRACEABLE" as="span" />
            <br />
            <span className="text-vermillion">INTEGRITY</span>
            <br />
            <span>&amp; CH4 RISK.</span>
          </h1>

          <p className="type-body text-paper/85 mb-12">
            Autonomous industrial risk intelligence connecting spatial 3D inspection
            with deterministic physical models and audit-grade carbon accounting.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="vermillion"
              size="lg"
              onClick={handleScrollToPipeline}
              asChild
            >
              <a href="#act-standards">
                <span>EXPLORE PLATFORM</span>
                <ArrowDownRight className="h-4 w-4" />
              </a>
            </Button>

            <Button variant="outlineDark" size="lg" asChild>
              <a
                href="https://github.com/ZimrionVarethos/pertamuda"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LAUNCH CORE APP</span>
                <ArrowUpRight className="h-4 w-4 text-vermillion" />
              </a>
            </Button>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
