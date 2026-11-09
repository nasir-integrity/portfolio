"use client";

import React from "react";
import * as m from "motion/react-m";
import { Check, Cpu, Factory, ShieldAlert, X } from "lucide-react";
import { ChamferCard } from "@/components/ui/chamfer-card";
import {
  ARCHITECTURE_LAYERS,
  PROTOTYPE_BOUNDARIES,
} from "@/data/nasir-content";

export function ActArchitectureScope() {
  return (
    <section
      id="act-architecture"
      className="relative w-full border-b border-obsidian bg-paper text-obsidian"
    >
      <div className="mx-auto max-w-[1440px] border-x border-obsidian">
        {/* Top Section Header */}
        <div className="border-b border-obsidian px-6 sm:px-10 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-sans text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.05] text-obsidian">
              ENGINEERED FOR DETERMINISTIC AUDITABILITY &amp; TRANSPARENT BOUNDARIES.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">
              Built on Laravel 13, React 19, Inertia.js, and Three.js. NASIR
              couples multi-tenant data isolation with explicit claim
              boundaries—documenting verifiable MVP capabilities and
              architectural limits.
            </p>
          </div>
        </div>

        {/* 4-Layer Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-obsidian border-b border-obsidian">
          {ARCHITECTURE_LAYERS.map((layer, idx) => (
            <m.div
              key={layer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-6 sm:p-8 flex flex-col justify-between bg-paper"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-vermillion font-bold mb-3">
                  <span>{layer.code}</span>
                  <Cpu className="h-3.5 w-3.5" />
                </div>

                <h3 className="font-sans text-lg sm:text-xl font-bold uppercase tracking-tight text-obsidian mb-2">
                  {layer.layer}
                </h3>

                <div className="py-2 mb-4 font-mono text-[10px] text-steel uppercase tracking-[0.1em]">
                  {layer.stack}
                </div>

                <p className="font-sans text-xs text-steel leading-relaxed mb-6">
                  {layer.responsibility}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-hairline-light">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel font-bold">
                  CORE MODULES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {layer.keyModules.map((mod) => (
                    <span
                      key={mod}
                      className="bg-paper-muted px-2 py-0.5 font-mono text-[10px] text-obsidian"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Prototype Scope Honesty & Multi-Sector Roadmap (2-Column Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-obsidian">
          {/* Left 7 Columns: Capabilities vs Explicit Non-Claims */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-8 bg-paper">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-obsidian mb-4 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center bg-obsidian text-paper">
                  <Check className="h-3 w-3 text-vermillion" />
                </span>
                <span>VERIFIED MVP CAPABILITIES</span>
              </div>
              <div className="space-y-3">
                {PROTOTYPE_BOUNDARIES.currentCapabilities.map((cap) => (
                  <div
                    key={cap}
                    className="flex items-start gap-3 font-sans text-xs sm:text-sm text-obsidian py-1"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 bg-vermillion shrink-0" />
                    <span className="leading-relaxed">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-vermillion mb-4 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center bg-vermillion text-paper">
                  <X className="h-3 w-3" />
                </span>
                <span>EXPLICIT PROTOTYPE BOUNDARIES &amp; NON-CLAIMS</span>
              </div>
              <div className="space-y-3">
                {PROTOTYPE_BOUNDARIES.explicitNonClaims.map((nonClaim) => (
                  <div
                    key={nonClaim}
                    className="flex items-start gap-3 font-sans text-xs sm:text-sm text-steel py-1"
                  >
                    <ShieldAlert className="h-4 w-4 text-vermillion shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{nonClaim}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Industrial Sector Expansion Roadmap */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 bg-paper-muted/50 flex flex-col justify-between space-y-6">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-obsidian mb-2 flex items-center gap-2">
                <Factory className="h-4 w-4 text-vermillion" />
                <span>CROSS-SECTOR EXPANSION ROADMAP</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-steel leading-relaxed mb-6">
                Engineered for upstream and midstream facilities, NASIR’s
                deterministic calculation contracts scale across heavy
                industrial sectors:
              </p>

              <div className="space-y-4">
                {PROTOTYPE_BOUNDARIES.sectorExpansionRoadmap.map((sector) => (
                  <ChamferCard
                    key={sector.code}
                    theme="light"
                    cut="tr"
                    indexTag={sector.code}
                    className="p-5"
                  >
                    <h4 className="font-sans text-base font-bold uppercase tracking-tight text-obsidian mb-1.5">
                      {sector.title}
                    </h4>
                    <p className="font-sans text-xs text-steel leading-relaxed">
                      {sector.scope}
                    </p>
                  </ChamferCard>
                ))}
              </div>
            </div>

            {/* Test Suite Verification Box (No raw PHP test file paths) */}
            <div className="bg-obsidian text-paper p-5 chamfer-tr font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-vermillion uppercase tracking-[0.15em] mb-2 font-bold">
                <span>AUTOMATED DOMAIN VERIFICATION</span>
                <span>CI VERIFIED</span>
              </div>
              <div className="text-paper font-semibold mb-2 text-sm font-sans">
                Deterministic Mathematical Invariants
              </div>
              <p className="font-sans text-xs text-steel-light leading-relaxed">
                Automated test suites independently verify 24h freshness window null
                propagation, interval overlap rejection, and cross-organization tenant
                isolation before deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
