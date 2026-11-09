"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { ARCHITECTURE_LAYERS } from "@/data/nasir-content";
import { Button } from "@/components/ui/button";
import { ScrambleText } from "@/components/ui/scramble-text";

const Architecture3DScene = dynamic(
  () =>
    import("@/components/scenes/domain-visual-scenes").then(
      (mod) => mod.Architecture3DScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[380px] sm:h-[460px] min-h-0 bg-obsidian-elevated/70 border border-hairline-dark/60 chamfer-tr flex items-center justify-center font-mono text-xs uppercase tracking-[0.18em] text-steel-light">
        <span className="inline-block h-2 w-2 bg-vermillion mr-2.5 animate-pulse" />
        INITIALIZING ARCHITECTURE STACK...
      </div>
    ),
  }
);

export function ActArchitectureScope() {
  const [activeLayerIdx, setActiveLayerIdx] = useState<number>(0);

  return (
    <section
      id="act-architecture"
      className="relative w-full border-b border-obsidian bg-paper text-obsidian"
    >
      <div className="section-pad">
        {/* Section Heading */}
        <div className="max-w-4xl mb-16 lg:mb-20">
          <h2 className="type-section-header text-obsidian mb-6">
            <ScrambleText text="ENGINEERING" />
            <br />
            <ScrambleText text="ARCHITECTURE" />
          </h2>
          <p className="type-body text-steel">
            Deterministic domain engines, real-time spatial digital twins, and
            cryptographically verifiable compliance dossiers built for industrial scale.
          </p>
        </div>

        {/* 2-Column Layout: Architecture Pillars + 3D Exploded Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left 6 Columns: 3 Architectural Pillars */}
          <div className="lg:col-span-6 space-y-6">
            {ARCHITECTURE_LAYERS.map((layer, idx) => {
              const isActive = idx === activeLayerIdx;
              return (
                <div
                  key={layer.id}
                  onMouseEnter={() => setActiveLayerIdx(idx)}
                  onClick={() => setActiveLayerIdx(idx)}
                  className={`p-6 sm:p-8 border transition-all cursor-pointer chamfer-tr ${
                    isActive
                      ? "border-obsidian bg-obsidian text-paper"
                      : "border-hairline-light bg-paper text-obsidian hover:border-obsidian"
                  }`}
                >
                  <h3 className="type-title mb-2">
                    <ScrambleText text={layer.title} />
                  </h3>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-vermillion mb-3">
                    {layer.subtitle}
                  </div>
                  <p
                    className={`type-body text-sm sm:text-base ${
                      isActive ? "text-paper/85" : "text-steel"
                    }`}
                  >
                    {layer.description}
                  </p>
                </div>
              );
            })}

            {/* Core Application Link */}
            <div className="pt-6">
              <Button variant="vermillion" size="lg" asChild>
                <a
                  href="https://github.com/ZimrionVarethos/pertamuda"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>INSPECT SOURCE CODE</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right 6 Columns: 3D Exploded Isometric Stack Canvas */}
          <div className="lg:col-span-6">
            <Architecture3DScene />
          </div>
        </div>
      </div>
    </section>
  );
}
