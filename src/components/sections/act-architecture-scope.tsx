"use client";

import React, { useState } from "react";
import * as m from "motion/react-m";
import { Check, Cpu, Factory, ShieldAlert } from "lucide-react";
import {
  ARCHITECTURE_LAYERS,
  PROTOTYPE_BOUNDARIES,
} from "@/data/nasir-content";

export function ActArchitectureScope() {
  const [activeLayerIdx, setActiveLayerIdx] = useState<number>(0);

  return (
    <section
      id="act-architecture"
      className="relative w-full border-b border-obsidian bg-paper text-obsidian"
    >
      <div className="mx-auto max-w-[1440px] border-x border-obsidian">
        {/* Concise Header */}
        <div className="border-b border-obsidian px-6 sm:px-12 py-12 lg:py-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="font-sans text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.02] text-obsidian max-w-2xl">
            SYSTEM STACK &amp; CLAIM BOUNDARIES.
          </h2>
          <p className="font-sans text-sm sm:text-base text-steel max-w-md leading-relaxed">
            Four deterministic layers coupling multi-tenant isolation with
            explicit scientific boundaries.
          </p>
        </div>

        {/* Interactive 4-Layer Accordion / Hover Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-obsidian border-b border-obsidian">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const isActive = idx === activeLayerIdx;
            return (
              <m.div
                key={layer.id}
                onMouseEnter={() => setActiveLayerIdx(idx)}
                onClick={() => setActiveLayerIdx(idx)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={`p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-colors ${
                  isActive
                    ? "bg-obsidian text-paper"
                    : "bg-paper text-obsidian hover:bg-paper-muted/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-vermillion font-bold mb-4">
                    <span>{layer.code}</span>
                    <Cpu className="h-3.5 w-3.5" />
                  </div>

                  <h3 className="font-sans text-lg sm:text-xl font-bold uppercase tracking-tight mb-2">
                    {layer.layer}
                  </h3>

                  <div
                    className={`font-mono text-[10px] uppercase tracking-[0.1em] mb-6 ${
                      isActive ? "text-steel-light" : "text-steel"
                    }`}
                  >
                    {layer.stack}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-current/15">
                  {layer.keyModules.slice(0, 3).map((mod) => (
                    <span
                      key={mod}
                      className={`px-2 py-0.5 font-mono text-[10px] ${
                        isActive
                          ? "bg-obsidian-surface text-paper"
                          : "bg-paper-muted text-obsidian"
                      }`}
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Compact 3-Column Visual Strip: Verified Scope · Non-Claims · Sector Expansion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-obsidian">
          {/* Column 1: Verified MVP Scope */}
          <div className="p-6 sm:p-10 bg-paper">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-obsidian mb-5 flex items-center gap-2">
              <Check className="h-4 w-4 text-vermillion" />
              <span>VERIFIED MVP CAPABILITIES</span>
            </div>
            <div className="space-y-3">
              {PROTOTYPE_BOUNDARIES.currentCapabilities.map((cap) => (
                <div
                  key={cap}
                  className="flex items-start gap-3 font-sans text-xs sm:text-sm text-obsidian"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 bg-vermillion shrink-0" />
                  <span className="leading-relaxed">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Explicit Non-Claims */}
          <div className="p-6 sm:p-10 bg-paper">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-vermillion mb-5 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-vermillion" />
              <span>SCIENTIFIC CLAIM BOUNDARIES</span>
            </div>
            <div className="space-y-3">
              {PROTOTYPE_BOUNDARIES.explicitNonClaims.map((nonClaim) => (
                <div
                  key={nonClaim}
                  className="flex items-start gap-3 font-sans text-xs sm:text-sm text-steel"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 bg-obsidian shrink-0" />
                  <span className="leading-relaxed">{nonClaim}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Cross-Sector Expansion */}
          <div className="p-6 sm:p-10 bg-paper-muted/40 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-obsidian mb-5 flex items-center gap-2">
                <Factory className="h-4 w-4 text-vermillion" />
                <span>CROSS-SECTOR EXPANSION</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {PROTOTYPE_BOUNDARIES.sectorExpansionRoadmap.map((sector) => (
                  <div
                    key={sector.code}
                    className="bg-obsidian text-paper p-4 chamfer-tr"
                  >
                    <div className="font-mono text-[10px] text-vermillion uppercase tracking-[0.14em]">
                      {sector.code}
                    </div>
                    <div className="font-sans text-sm font-bold uppercase mt-0.5">
                      {sector.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
